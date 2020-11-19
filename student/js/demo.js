var tableData = [];
var editForm = document.getElementById("student-edit-form");
var modal = document.getElementsByClassName("modal")[0];
var newPage = 1;   //第几页
var pageSize = 20;   //每页条数
var allPage = 1;   //总条数
var nextPage = document.getElementById("next-btn");
var prevBtn = document.getElementById("prev-btn");
var tbody = document.getElementById("tbody");
// 为页面添加点击事件
function bindEvent() {
	var menuList = document.getElementsByClassName("menu")[0];
	menuList.onclick = function(e) {
		// console.log(e.target);   //确认点击事件添加(e.target存储的是点击的元素)
		if (e.target.tagName === 'DD') {
			// console.log(e.target.tagName);   //判读点击事件添加到DD标签上
			// console.log(this.children);
			// for(var i = 0; i < this.children.length; i ++){   //循环菜单栏使所有含有active的元素的class去掉
			// 	this.children[i].classList.remove('active');
			// }
			changeStyle(e.target); //左侧导航切换
			// var siblingMenu = getSiblings(e.target);
			// for(var i = 0; i < siblingMenu.length; i ++){   //循环菜单栏使所有含有active的元素的class去掉
			// 	siblingMenu[i].classList.remove('active');
			// }
			// e.target.classList.add('active');   //为点击对象添加class属性
			var id = e.target.getAttribute('data-id');
			// console.log(e.target.dataset);   //获取元素的data-id值
			var showContent = document.getElementById(id); //对应右侧内容显示出来、并让其他内容隐藏
			// var sinlingsContent = showContent.parentNode.lastChild;   //获取点击元素的兄弟元素
			changeStyle(showContent); //右侧内容区切换
			// var siblingsContent = getSiblings(showContent);   //获取点击元素的兄弟元素
			// for(var j = 0; j < siblingsContent.length; j ++){
			// 	siblingsContent[j].style.display = 'none';
			// }
			// showContent.style.display = 'block';
			console.log(getSiblings(showContent));
		}

	}
	var studentAddBtn = document.getElementById('student-add-submit');
	studentAddBtn.onclick = function() {
		var form = document.getElementById("student-add-form");
		var data = getFormData(form);
		if (data) {
			// data.appkey = "hjc990805_1570523974382";
			// var data = saveData('http://open.duyiedu.com/api/student/addStudent', data);
			// if(data.status == "success"){   //判断是否新增成功
			// alert('添加学生成功');
			// form.reset();   //新增成功后重置表单
			// var studentListDom = menuList.getElementsByTagName('dd')[0];
			// studentListDom.click();   //重置完成之后调整到学生列表页
			// }else {
			// 	alert(data.msg);
			// 	}
			transferData('/api/student/addStudent', data, function() {
				alert('添加学生成功');
				form.reset(); //新增成功后重置表单
				var studentListDom = menuList.getElementsByTagName('dd')[0];
				studentListDom.click(); //重置完成之后调整到学生列表页
				getTableData();
			})
		}
		return false;
	}
	
	tbody.onclick = function(e) {
		// console.log(e.target)
		if (e.target.classList.contains('edit')) { //判断当前点击的按钮是不是编辑按钮

			modal.style.display = 'block';
			var index = e.target.dataset.index;
			// tableData[index]
			// 将学生数据回填到编辑表单当中
			renderForm(tableData[index]);
		} else if (e.target.classList.contains('del')) { //判断当前点击的按钮是不是删除按钮
			var isDel = confirm('确认删除？');
			if(isDel){
				var index = e.target.dataset.index;
				transferData('/api/student/delBySno',{
					sNo : tableData[index].sNo,
				},function() {
					alert('删除成功');
					getTableData();   //更新页面数据
				})
			}
		}
	}
	var studentEditBtn = document.getElementById("student-edit-submit");   //获取编辑按钮
	studentEditBtn.onclick = function(e) {   //编辑学生提交按钮的点击事件
		e.preventDefault();   //阻止默认事件
		var data = getFormData(editForm);
		// console.log(data);
		if(data){
			transferData('/api/student/updateStudent',data,function() {
				alert('学生信息修改成功');
				modal.style.display = 'none';
				getTableData();   //获取修改后的学生列表
			})
		}
		return false;
	}
	modal.onclick = function (e){   //阻止事件冒泡
		if(e.target == this){
			this.style.display = 'none';
		}
	}
	// var modalContent = modal.getElementsByClassName("modal-content")[0];
	// modalContent.onclick = function(e){
	// 	e.stopPropagation();
	// }
	// var prevBtn = document.getElementById("prev-btn");
	// prevBtn.onclick = function() {   //点击上一页
	// 	newPage --;
	// 	getTableData();
	// }
	// var nextPage = document.getElementById("next-btn");
	// nextPage.onclick = function () {
	// 	nextPage ++;
	// 	getTableData();
	// }
	var turnPage = document.getElementsByClassName("turn-page")[0];
	turnPage.onclick = function(e){   //为翻页按钮添加点击事件
		// console.log(e.target.id);
		if(e.target.id == 'next-btn'){   //获取下一页数据
			newPage ++;
			getTableData();
		}else {   //获取上一页数据
			newPage --;
			getTableData();
		}
	}
	
}


// 获取所有的兄弟节点
function getSiblings(node) {
	var parent = node.parentNode, //获取node的父元素节点
		children = parent.children, //获取parent的所有的子元素节点(不包括文本节点)
		len = children.length,
		result = []; //新建一个返回数组
	for (var i = 0; i < len; i++) {
		if (children[i] != node) { //排除当前元素不等于它的兄弟节点
			result.push(children[i]);
		}
	}
	return result; //返回点击元素的兄弟元素
}
// 左右两边切换的样式
function changeStyle(node) {
	var siblingMenu = getSiblings(node);
	for (var i = 0; i < siblingMenu.length; i++) {
		siblingMenu[i].classList.remove('active');
	}
	node.classList.add('active');
}
// 获取表单数据
function getFormData(form) {   //传进去的是form表单
	var name = form.name.value,
		sex = form.sex.value,
		number = form.sNo.value,
		email = form.email.value,
		birth = form.birth.value,
		phone = form.phone.value,
		address = form.address.value;
		// console.log(name,sex,number,email,birth,address,phone);
	if (!name || !number || !email || !birth || !phone || !address) {
		alert('信息填写不完全，请检查后提交');
		return false;
	}
	if (!/^\d{4,16}$/.test(number)) {   //.test()为正则表达式的方法
		alert('学号应为4-16位的数字');
		return false;
	}
	if(!/^(19|20)\d{2}$/.test(birth)){
		alert('出生年份应该在1900-'+ new Date().getFullYear() +'年');
		return false;
	}
	if(!/^\w+@\w+\.com$/.test(email)){
		alert('邮箱格式不正确');
		return false;
	}
	if (!/^\d{11}$/.test(phone)){
		alert('请输入正确格式的电话号码');
		return false;
	}
	
	return {
		sNo: number,
		name: name,
		sex: sex,
		email: email,
		birth: birth,
		phone: phone,
		address: address
	}
}
// 数据交互函数
function transferData(url, data, success) {
	data.appkey = "duyi990805_1586593866263";
	var result = saveData('http://open.duyiedu.com' + url, data); //表单返回的结果
	if (result.status === 'success') {
		success(result.data)
	} else {
		alert(result.msg);
	}
}
// 获取学生列表数据
function getTableData() {
	transferData('/api/student/findByPage', {
		page: newPage,
		size: pageSize
	}, function(data) {
		tableData = data.findByPage;
		// data.cont：数据总条数
		allPage = Math.ceil(data.cont / pageSize);   //总页数
		renderTable(data.findByPage);

	})
}
// 渲染表格数据
function renderTable(data) {
	var str = "";
	// forEach(function(值,索引,所属数组对象))
	data.forEach(function(item, index) { //for in遍历对象、forEach遍历数组、等同于for循环
		str +=
			`<tr>
			<td>${item.sNo}</td>
			<td>${item.name}</td>
			<td>${(item.sex === 0 ? '男' : '女')}</td>
			<td>${item.email}</td>
			<td>${(new Date().getFullYear() - item.birth)}</td>
			<td>${item.phone}</td>
			<td>${item.address}</td>
			<td>
				<button type="button" class="btn edit" data-index=${index}>编辑</button>
				<button type="button" class="btn del" data-index=${index}>删除</button>
			</td>
		</tr>`
	});
	// var tbody = document.getElementById("tbody");
	tbody.innerHTML = str;
	if(allPage > newPage){   //判断显示下一页按钮
		nextPage.style.display = 'inline-block';
	}else {
		nextPage.style.display = 'none';
	}
	if(newPage > 1){   //判断显示上一页按钮
		prevBtn.style.display = 'inline-block';
	}else {
		prevBtn.style.display = 'none';
	}
}
// 编辑表单的回填,接的收参数是学生的信息
function renderForm(data) {

	// form.name.value = data.name;
	// form.sex.value = data.sex;
	// form.email.value = data.email;
	// form.birth.value = data.birtn;
	// form.address.value = data.address;
	// form.sNo.value = data.value;
	for (var prop in data) {
		if (editForm[prop]) {
			editForm[prop].value = data[prop];
		}
	}

}


bindEvent();
getTableData(); //打开页面的时候获学生列表
document.getElementsByClassName('active')[0].click(); //手动触发学生列表点击事件

//接口的使用
var data = saveData('http://open.duyiedu.com/api/student/findAll',{
	appkey: 'duyi990805_1586593866263'
})
console.log(data);

// 向后台存储数据
function saveData(url, param) {
	var result = null;
	var xhr = null;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	if (typeof param == 'string') {
		xhr.open('GET', url + '?' + param, false);
	} else if (typeof param == 'object') {
		var str = "";
		for (var prop in param) {
			str += prop + '=' + param[prop] + '&';
		}
		xhr.open('GET', url + '?' + str, false);
	} else {
		xhr.open('GET', url + '?' + param.toString(), false);
	}
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				result = JSON.parse(xhr.responseText);
			}
		}
	}
	xhr.send();
	return result;
}

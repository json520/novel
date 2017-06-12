import axios from 'axios'

let state = {
	rowList : '', //首页导航列表男频女频
	params :{ //可以为固定参数
		version : 30000,
		device  :'uuid'
	},
	uuid:'',
	catalogDataList:'' //书籍目录数据
}

const getters = {
	getOrderList : state => state.rowList,
	getuuid : state => state.uuid,
	getCatalogList : state => state.catalogDataList //获取目录数据
	//第一个state是传入的参数，第二个是返回的数据
//	getOrderList : function(state){
//		return state.rowList
//	}
}

const actions = { //在外部被调用
	fetchOrderList ({commit,state},uuid){ //uuid参数可以动态传递
		axios.get('http://139.196.150.50:8086/novelApi/mobile/novel/getCarefullySelectCatalogList.do',{
			params :{
				version : 30000,
				device  :uuid,
				product : '1',
				system	: 'h5'
			}
		})
		.then((response) =>{
			//调用mutations方法给操作state的数据，actions是不能直接对state操作
			
			let getList = response.data.data
		
			commit('updateOrderList',getList)
		})
		.catch((error) =>{
			console.log(error)
		})
	},
	getAjaxCatalogData({commit,state},obj){
		console.log(obj)
		let uuid = obj.uuid;
		let novelId = obj.id;
		axios.get('http://139.196.150.50:8080/zybrowser/mobile/novel/getChapterList.do',{
			params:{
				version : 30000,
				device  :uuid,
				system	: 'h5',
				novelId	: novelId,
				startChapterId:'0',
				chapterMaxCount:'10000'
			}
		})
		.then((response) =>{
			let getList = response.data.data;
			//调用方法赋值给state
			commit('updataCatalogList',getList)
		})
		.catch((error) =>{
			console.log(error)
		})
	}
}

const mutations = {
	updateOrderList (state,orderList){
		//第一个state是数据，第二个是调用的时候传入的参数
		state.rowList = orderList;
	},
	updataCatalogList(state,orderList){
		state.catalogDataList = orderList;
	},
	createUUID (state,len,radix){ //len,radix len为长度，radix为基数最大为16进制
		
	    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	    let uuid = [], i;
	    radix = radix || chars.length;
	 
	    if (len) {
	      // Compact form
	      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
	    } else {
	      // rfc4122, version 4 form
	      var r;
	 
	      // rfc4122 requires these characters
	      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	      uuid[14] = '4';
	 
	      // Fill in random data.  At i==19 set the high bits of clock sequence as
	      // per rfc4122, sec. 4.1.5
	      for (i = 0; i < 36; i++) {
	        if (!uuid[i]) {
	          r = 0 | Math.random()*16;
	          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
	        }
	      }
	    }
		 
//		return uuid.join('');
		state.uuid = uuid.join('')
	}
}


export default { //向外暴露所有数据
	state,
	getters,
	actions,
	mutations
}

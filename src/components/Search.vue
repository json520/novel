<template>
  <div class="search">
	  <header class="header">
	   	<img @click="goBack" class="header_back" src="../../static/icon/nav_icon_back_default-1@2x.png"/>
	   	<div class="input_wrapper">
	   		<div class="input_box" @click="onFouseInput">
	   			<img class="input_search_img" src="../../static/icon/search_click@2x.png"/>
	   			<span>输入书名或作者</span>
	   		</div>
	   		<form>
	   		<input v-on:keyup="getAjaxKeyup(value)" v-on:keydown.enter="getAjaxSearch(value)" 
	   			 v-model="value" value="value" @click="onFouseInput" id="search_input" 
	   			 type="search" autocomplete="off" placeholder="请输入书名/作者" 
	   			 :readonly="on"
	   			 />
	   		</form>
	   		<img @click="deleteInput" class="input_delete_img" src="../../static/icon/delete_click@2x.png"/>
	   	</div>
	   
	  </header>
	  <!--搜索状态 S-->
	  <div class="search_body_wrapper">
	  	<!--search history S-->
	  	<div class="search_history_wrapper"  v-if="searchHistory">
	  		<div class="search_history_title">
	  			<i></i>
	  			<span>搜索历史</span>
	  			<p @click="deleteSearchHistory" class="search_history_delete">清除</p>
	  		</div>
	  		<ul class="search_history_list">
	  			<li @click="getAjaxSearch(item)" v-for="(item,index) in SearchHistoryList">{{item}}</li>
	  			<!--<li>斗罗大陆</li>
	  			<li>斗罗大陆</li>
	  			<li>斗罗大</li>
	  			<li>斗破</li>
	  			<li>斗罗大陆</li>
	  			<li>斗罗大陆</li>
	  			<li>斗罗大</li>-->
	  		</ul>
	  	</div>
	  	<!--search history E-->
	  	<!--search linkage S-->
	  	<div class="search_linkage_wrapper" v-if="searchLinkage">
	  		<ul class="search_linkage_list">
	  			<li v-for="(item,index) in dataSearchLinkage" @click="getAjaxSearch(item.bookTitle,item.author)"><a href="">
	  				<div class="search_author_img">
	  					<img v-if="item.author" src="../../static/icon/people@2x.png"/>
	  					<img v-else src="../../static/icon/book@2x.png"/>
	  				</div>
	  				<div class="search_back_text">
	  					{{item.bookTitle}}{{item.author}}
	  				</div>
	  				<p v-if="item.author" class="search_is_author">作者</p>
	  			</a></li>
	  			
	  		</ul>
	  		
	  	</div>
	  	<!-- search linkage E-->
	  	<!-- search response S-->
	  	<div class="search_response_wrapper" v-if="searchResponse">
	  		<h3><span>共{{allNovelCount}}条搜索结果</span></h3>
	  		<ul class="category_center_list">
	 	 			<router-link tag="li" v-for="(item,index) in dataSearchResponse"
	 	 				:to="{path:'/details',query:{classId:item.novelId}}" :key="index">
	 	 				<img v-lazy="item.bookImage"/>
	 	 				<div class="category_center_box">
	 	 					<h4>{{item.title}}</h4>
	 	 					<div class="category_center_chapter">
	 	 						作者：<p>{{item.author}}</p>
	 	 						
	 	 					</div>
	 	 					<div class="category_center_label">
	 	 						<p>{{item.subCatalog}}</p>
	 	 						<span v-if="item.end == 0">连载</span>
	 	 						<i>{{item.chapterCount}}章</i>
	 	 					</div>
	 	 					<!--<p class="category_center_info">
	 	 						起点
	 	 					</p>-->
	 	 				</div>
	 	 				<div class="category_center_select" @click.stop="addBookrack(item,index)">
	 	 					<img v-if="!item.addBookrack" class="category_img_add" src="../../static/icon/Add-to_defult@2x.png"/>
	 	 					<img v-else class="category_img_select" src="../../static/icon/Add-to_selected@2x.png"/>
	 	 				</div>
	 	 			</router-link>
	 	 			
	 	 		</ul>
	  	</div>
	  	<!-- search response E-->
	  	
	  </div>
	  <!--搜索状态 E-->
	  
	  <!-- footer S-->
  	<v-footer :footerStyle="footerStyle"></v-footer>
  	<!-- footer E-->
  	
  </div>
</template>

<script>
	import axios from 'axios'
	import VFooter from '@/components/Footer'

let getuuid = localStorage.getItem("pgv_pvi");
	let uuid = null;
	if(getuuid){
		uuid = getuuid;
	}else{
		uuid = 'uuid';
	};
	let footerSetTime = null;	
	
export default {
  name: 'search',
  components:{
  	VFooter
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      searchHistory:false,   //控制所搜历史界面的显示
      searchLinkage:false,   //控制搜索联想界面的显示
      searchResponse:false,  //控制精准搜索界面的显示
      value:'',   //input的值
      dataSearchLinkage :'',  //搜索联想返回的数组
      dataSearchResponse :'',  //精准搜索返回的数组
      allNovelCount:'',  //			精准搜索返回的所有相关文本数量
      HaveSameKey:false, //localStorage里面和当前搜索值有没有相同的
      SearchHistoryList:'', //搜索历史数组
      HaveLocalStorage:false, //有localStorage
      isInputBlur:false,
      on:false,  //是否可读
      footerStyle:'',	
      footerAbsolute:false
    }
  },
  methods : {
  	initHandle(){
  		this.value = ""; //初始化搜索内容
  		
  	},
  	goBack () { //返回
  		this.$router.go(-1)
  	},
  	deleteInput () { //删除搜索文字
  			//搜索文字为空，光标归位，如果点击了则搜索历史出现，搜索联想和搜索返回都消失
  			this.value = ""; 
  			document.querySelector("#search_input").focus();
  			var getKeyInit = JSON.parse(localStorage.getItem("SEARCH_HISTORY"))
	  		if(getKeyInit){ //如果有localStorage,显示历史记录其他不显示
	  			this.searchHistory = true
	  		}
  			this.searchLinkage = false;
  			this.searchResponse = false;
  			this.listenFooter();
  	},
  	onFouseInput () { //刚进入点击搜索框
  		//检查有localStorage则准许搜索历史显示
  		
  		var getKeyInit = JSON.parse(localStorage.getItem("SEARCH_HISTORY"))
  		if(getKeyInit){

  			this.searchHistory = true
  			this.searchLinkage = false;
				this.searchResponse = false;
  		}
  		this.SearchHistoryList = getKeyInit;

  		document.querySelector(".input_box").style.display = "none";//文字隐藏
  		document.querySelector("#search_input").focus() //光标显示
			this.listenFooter();
  	},
  	getAjaxKeyup (value) { //输入搜索联想
  		console.log("联想")
			this.searchLinkage = true;
			this.searchResponse = false;
			this.searchHistory = false
			
  		var keyWord = document.querySelector("#search_input").value;
  			if(value == ""){ //光标闪烁搜索文字为空的时候，搜索历史显示，其他隐藏
  				this.searchHistory = true
  				this.searchLinkage = false;
					this.searchResponse = false;
					
  			}else{
  			
					axios.get('http://139.196.150.50:8086/novelApi/mobile/novel/novelSearchImagine.do',{
						params : {
							version :30000,
							system	:'h5',
							product : '1',
							device 	: uuid,
							keyword : value
						}
					})
					.then((response) =>{
						this.dataSearchLinkage = response.data.data
						this.listenFooter();
						
					})
					.catch((error) =>{
						console.log(error)
					})
			
  		}	
  	},
  	getAjaxSearch (value,nextValue) {//点击搜索精准搜索

  		var searchVal;
  		if(!value && !nextValue){
  			//书名和作者都没有值得时候不搜索
  		}else{
  		
  		if(!value){
  			searchVal = nextValue
  				
	  		}else{
	  			searchVal = value
	  		}
	  		
		  		this.addSearchHistory(searchVal)
				axios.get('http://139.196.150.50:8086/novelApi/mobile/novel/novelSearch.do',{
					params : {
						version : 30000,
						system	: 'h5',
						product : '1',
						device 	: uuid,
						keyword	:	searchVal,
						pageIndex	: '1'
					}
				})
				.then((response) =>{
			
					this.allNovelCount = response.data.data.allNovelCount
					let dataBox = response.data.data.novels
					let dataArrar = [];
		  			dataBox.forEach(function(item,i){ 
		  				item.addBookrack = false;
		  				dataArrar.push(item)
		  			});
		  			
		  			this.dataSearchResponse = dataArrar;
					console.log(this.dataSearchResponse)
					this.isAddBookrack() ;
					this.listenFooter();
					
					var _this = this;
					setTimeout(function(){ //与input的keyup有冲突进行延迟
						
						_this.searchLinkage = false;
		  			_this.SearchHistory = false;
		  			_this.searchResponse = true;
					},100)
					
					if(response.data.data.novels.length > 3){ //不能使用listenFooter,数据渲染有延迟
						
		//				document.querySelector(".footer_wrapper").style = ""
					}else{
						
		//				document.querySelector(".footer_wrapper").style = "position:absolute;left:0;bottom:0;z-index:2;"
					}
						
					
					document.querySelector("#search_input").blur();
						
				})
				.catch((error) =>{
					console.log(error)
				})
		
  			
  		}
  	},
  	addSearchHistory (value){ //添加到搜索历史记录
  		var _this = this
  		//历史记录存入本地：1.获取localStorage,有则查询当前搜索文字存在否，不存在则存入数组存入本地
  		var getKeyInit = JSON.parse(localStorage.getItem("SEARCH_HISTORY")) //是否有数组值
  		var setKey = [];
  		console.log(typeof(getKeyInit))
  		console.log(getKeyInit)
  		_this.SearchHistoryList = getKeyInit;
  		
  		if(getKeyInit && getKeyInit instanceof Array && value){
  				
  				getKeyInit.forEach(function (item,i){
  							if(item == value){
  								_this.HaveSameKey = true; //有相同的
  							}
  				})
  				if(_this.HaveSameKey){
//					alert("相同")
  					console.log(getKeyInit)
  						setKey = getKeyInit;
  						_this.HaveSameKey = false;
  				}else{
//					alert("没有相同")
  					getKeyInit.push(value)
  					console.log(getKeyInit)
  					setKey = getKeyInit
  				}
  				localStorage.setItem("SEARCH_HISTORY",JSON.stringify(setKey))
  		}else if(value){
				setKey.push(value)
				localStorage.setItem("SEARCH_HISTORY",JSON.stringify(setKey))
  		}
  		
  		_this.HaveSameKey = false;
  	},
  	deleteSearchHistory () { //删除存储的搜索历史记录
  		//把
  		localStorage.removeItem("SEARCH_HISTORY")
  		this.searchHistory = false;
  	},
  	addBookrack (value,index) { //添加到自己书架
  		
  		var _this = this
  		var redKey = JSON.parse(localStorage.getItem("MY_BOOK"));
  		var setKey = [];
  		
  		if(redKey && redKey instanceof Array && value){
  		
  			redKey.forEach(function(item,i){
  				console.log(item)
  					if(value.novelId == item.novelId){
  							_this.haveSameKey = true;
  							item.addBookrack = true;
  					}
  			});
  			if(_this.haveSameKey){ //有相同的
//				alert("已添加")
  				setKey = redKey;
  				_this.haveSameKey = false
  			}else{
//				alert("添加成功")
  				value.checked = false;
  				value.addBookrack = true;
  				redKey.push(value);
  				setKey = redKey;
  			};
		
			localStorage.setItem("MY_BOOK",JSON.stringify(setKey));
			}else if(value){
				
				value.checked = false;
				value.addBookrack = true;
  			setKey.push(value);
  			localStorage.setItem("MY_BOOK",JSON.stringify(setKey));
  			
  		};
  		
  	},
  	isAddBookrack(){ //判断是否已经添加到书架了
  		
  			var redKey = JSON.parse(localStorage.getItem("MY_BOOK"));
  			let $this = this;
  			if(redKey && redKey instanceof Array){
  					redKey.forEach(function(item,i){
  							$this.dataSearchResponse.forEach(function(value,index){
  								
  									if(value.novelId == item.novelId){
  										value.addBookrack = true;
  										
  									};
  							});
  							
  					});
  			}
  	},
  	
  	listenFooter(){ //计算判断footer是否需要定位
  		let $this = this
  			
  			var checkFooter = setInterval(function(){
				
				let bodyH = document.documentElement.clientHeight
		//			let s = window.screen.availHeight
		//			let a = window.document.body.offsetHeight;
				let appH;
				let footerH = document.querySelector(".footer_wrapper").offsetHeight;
//					alert("测试 地步的高度"+footerH)
					if($this.footerAbsolute){
						appH = document.getElementById("app").offsetHeight + footerH;
					}else{
						appH = document.getElementById("app").offsetHeight
					};
					if(bodyH - appH >0){
						//把底部设置为定位
						console.log("要定位")
						$this.footerStyle = "absolute"
						$this.footerAbsolute = true
					}else if(bodyH - appH <0){
						//把底部取消定位
						console.log("不定位")
						$this.footerStyle = "static"
						$this.footerAbsolute = false
					}
			
				clearInterval(checkFooter)
			},500)
  			
  	}
  	
  	/**** methods 结束  **/
  },
  watch : { //
  	router(to,from){
  		this.initHandle();
  	}
  },
//beforeRouteLeave (to,from,next){ //离开当前路由
//	alert("lai")
//	clearInterval(footerSetTime);
//	next();
//},
  mounted () {
  	this.onFouseInput();
		this.listenFooter()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
	width:100%;
	position: fixed;
	left:0;
	top:0;
	z-index:99;
	height:0.88rem;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	border-bottom:solid 1px #e1e1e1;
	background:white;
}
.header_back{
	width:0.24rem;
	height:0.44rem;
	position: absolute;
	left:0.3rem;
	top:0;
	bottom:0;
	margin:auto 0;
	z-index:3;
	
}
.input_wrapper{
	position:relative;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:center;
	height:0.56rem;
	width:6.06rem;
	margin-left:0.6rem;
}
.input_box{
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	font-size:0.28rem;
	color:#ccc;
	position:absolute;
	left:0.2rem;
	top:0;
	bottom:0;
	margin:auto 0;
	z-index:4;
}
.input_search_img{
	width:0.28rem;
	height:0.28rem;
}
#search_input{
	width:5.86rem;
	height:0.56rem;
	background:#f7f7f7;
	position:absolute;
	left:0;
	top:0;
	z-index:3;
	padding-left:0.2rem;
}
.input_delete_img{
	position: absolute;
	right:0.2rem;
	top:0;
	bottom:0;
	z-index:4;
	margin:auto 0;
	z-index:3;
	width:0.28rem;
	height:0.28rem;
}

/* search history S*/
.search_body_wrapper{
	margin-top:0.88rem;
}
.search_history_wrapper{
	padding:0.3rem 0.3rem 0 0.3rem;
	
}
.search_history_title{
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:start;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:start;
	position: relative;
	margin:0 0 0.2rem 0;
}
.search_history_title i{
	display:block;
	width:0.08rem;
	height:0.26rem;
	background:#ff6600;
}
.search_history_title span{
	display:block;
	font-size:0.26rem;
	color:#999;
	margin-left:0.1rem;
}
.search_history_delete{
	position: absolute;
	right:0;
	top:0;
	bottom:0;
	margin:auto 0;
	z-index:2;
	font-size:0.26rem;
	color:#999;
}
.search_history_list{
	width:100%;
	overflow: hidden;
	
}
.search_history_list li{
	height:0.5rem;
	line-height:0.5rem;
	display:-webkit-box;
	font-size:0.28rem;
	color:#666;
	border-radius: 50px;
	border:solid 1px #777878;
	display:table;
	float:left;
	padding:0 0.2rem;
	margin:0 0.2rem 0.2rem 0;
}
/* search history E*/

/*search_linkage_wrapper S*/
.search_linkage_wrapper{
	width:100%;
}
.search_linkage_list{
	padding:0 0 0 0.3rem;
}
.search_linkage_list li{
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:start;
	height:1rem;
	border-bottom:solid 1px #e1e1e1;
}
.search_linkage_list li a{
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:start;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:start;
}
.search_author_img img{
	width:0.26rem;
	height:0.3rem;
	
}
.search_back_text{
	font-size:0.3rem;
	color:#333;
	margin:0 0.2rem;
}
.search_is_author{
	font-size:0.2rem;
	color:#ff6a6a;
	border:solid 1px #ff6a6a;
	border-radius:0.04rem;
	padding:0 0.1rem;
	height:0.28rem;
	line-height:0.28rem;
	
	
}
/*search_linkage_wrapper E*/

/* search_response_wrapper S*/
.search_response_wrapper{
	
}
.search_response_wrapper h3{
	height:0.66rem;
	font-size:0.26rem;
	color:#999;
	background:#f7f7f7;
	padding-left:0.3rem;
	position: relative;
}
.search_response_wrapper h3 span{
	position:absolute;
	left:0.3rem;
	bottom:0.1rem;
	z-index:2;
}
.category_center_list{
	padding-left:0.3rem;
	
}
.category_center_list li{
	display:-webkit-box;
	-webkit-box-align:start;
	-webkit-box-pack:start;
	display:-moz-box;
	-moz-box-align:start;
	-moz-box-pack:start;
	position:relative;
	padding:0.2rem 0;
	border-bottom:solid 1px #e1e1e1;
}
.category_center_list li:last-child{
	border-bottom:none;
}
.category_center_list li img{
	width:1.6rem;
	height:2rem;
}
.category_center_box{
	margin-left:0.3rem;
}
.category_center_box h4{
	font-size:0.3rem;
	font-weight:bold;
	color:#333;
}
.category_center_chapter{
	font-size:0.28rem;
	color:#666;
	display:-webkit-box;
	display:-moz-box;
	margin:0.2rem 0 0.12rem 0;
}
.category_center_chapter p{
	margin-right:0.24rem;
}
.category_center_label{
	display:-webkit-box;
	display:-moz-box;
	font-size:0.28rem;
	color:#666;
}
.category_center_label p{
	margin-right:0.24rem;
}
.category_center_info{
	font-size:0.22rem;
	color:#ccc;
	margin-top:0.3rem;
}
.category_center_label i{
	font-style: normal;
	margin-left:0.3rem;
}
.category_center_select{
	position: absolute;
	right:0.3rem;
	top:0;
	bottom:0;
	margin:auto 0;
	z-index:1;
	display:-webkit-box;
	-webkit-box-align: center;
	-webkit-box-pack:center;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:center;
}
.category_center_select .category_img_add{
	width:0.54rem;
	height:0.54rem;
} 
.category_center_select .category_img_select{
	width:0.54rem;
	height:0.54rem;
}
/* search_response_wrapper E*/

</style>

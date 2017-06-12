<template>
  <div class="categorydetails">
    <div class="channel_title">
	  	<img @click="goBakc" class="channel_title_img_left" src="../../static/icon/nav_icon_back_default-1@2x.png"/>
	  	<p>{{navTitle}}</p>
	 	 </div>
	 	 <!-- 分类标题  S-->
	 	 <div class="category_nav_wrapper">
	 	 		<ul class="category_nav_list">
	 	 			<li :class="{active:allActive}" @click="screenData" >全部</li>
	 	 			<li v-for="(item,index) in navList" 
	 	 				:index="index"
	 	 				:BigCatalogId="item.contentBigCatalogId" 
	 	 				:SmallCatalogId="item.contentSmallCatalogId"
	 	 				@click="getAjaxlist(item.contentBigCatalogId,item.contentSmallCatalogId,'',index)"
	 	 				:class="{active:index==activeIndex}"
	 	 				>{{item.name}}</li>
	 	 			
	 	 		</ul>
	 	 		
	 	 </div>
	 	 <!-- 分类标题  E-->
	 	 <div class="category_center_wrapper">
	 	 		<header class="category_center_titel">
	 	 			<p :class="{active:hotA}" @click="screenEndData" :ishot="2">热度</p>
	 	 			<p :class="{active:hotB}" @click="screenEndData" :ishot="0">连载</p>
	 	 			<p :class="{active:hotC}" @click="screenEndData" :ishot="1">完结</p>
	 	 		</header>
	 	 		<p v-if="isLoading" class="loadingBox">
	 	 			<img src="../../static/load1.gif"/>
	 	 		</p>
	 	 		<ul v-else class="category_center_list">
	 	 			<router-link tag="li" v-for="(item,index) in dataList" :key="index" :to="{path:'/details',query:{classId:item.novelId}}">
	 	 				<!--v-lazy-->
	 	 				<img v-lazy="item.bookImage" :alt="item.title" />
	 	 				<div class="category_center_box">
	 	 					<h3>{{item.title}}</h3>
	 	 					<div class="category_center_chapter">
	 	 						<p>{{item.author}}</p>
	 	 						<span>{{item.chapterCount}}章</span>
	 	 					</div>
	 	 					<div class="category_center_label">
	 	 						<p>{{item.subCatalog}}</p>
	 	 						<span v-if="item.end == 0">连载</span>
	 	 					</div>
	 	 					<p class="category_center_info">
	 	 						{{item.srcWebName}}
	 	 					</p>
	 	 				</div>
	 	 				<div class="category_center_select" @click.stop="addBookrack(item,index)">
	 	 					<img v-if="!item.addBookrack" class="category_img_add" src="../../static/icon/Add-to_defult@2x.png"/>
	 	 					<img v-else class="category_img_select" src="../../static/icon/Add-to_selected@2x.png"/>
	 	 				</div>
	 	 			</router-link>
	 	 			
	 	 		</ul>
	 	 </div>
	 	 <!-- footer S-->
  	<v-footer></v-footer>
  	<!-- footer E-->
  </div>
</template>

<script>
	import axios from 'axios'
	import VFooter from '@/components/Footer'
	let page = 0;
	let getuuid = localStorage.getItem("pgv_pvi");
	let uuid = null;
	if(getuuid){
		uuid = getuuid;
	}else{
		uuid = 'uuid';
	};
export default {
  name: 'categorydetails',
  components:{
  	VFooter
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      navTitle:'',
      dataList:'',
      navList:'',
      smallcatalogid:'',
      bigcatalogid	:'',
      dataStatus 		:'2',
      allActive:true, //判断全部初始值为点击状态,
      activeIndex:'50',
      hotA:true,
      hotB:false,
      hotC:false,
      isLoading:true,   //数据加载中
      isAllClick:false   //判断是不是在全部分类
    }
  },
  methods : {
  	goBakc () {
  		this.$router.go(-1);
  	},
  	getAjaxData () { //大类中小类的列表
  		var params = this.$route.query;
  		var classId = params.bigContentCatalogId;
  		var title = params.title;
  		this.navTitle = title;
  		
  		axios.get('http://139.196.150.50:8086/novelApi/mobile/novel/getSmallContentCatalogList.do',{
  			params:{
  				version	:	30000,
  				system	: 'h5',
  				product : '1',
  				device	:	uuid,
  				bigContentCatalogId : classId
  				
  			}
  		})
  		.then((response) =>{
			console.log(response);
  			this.navList = response.data.data;
  			
  		})
  		.catch((error) =>{
  			console.log(error)
  		})
  	},
  	getAjaxlist (bigId,smallId,status,index) {//小类中的小说列表
  		
		this.isLoading = true;
		if(this.allActive){
			this.isAllClick = true;
			
		}else{
			
		}
		this.allActive = false;
//			alert(1)
			var params = this.$route.query;
			var classId = params.bigContentCatalogId;
				
			if(status == ''){
				status = this.dataStatus;
			}
				
  		axios.get('http://139.196.150.50:8086/novelApi/mobile/novel/getNovelsForContentCatalog.do',{
  			params : {
  				version :	30000,
  				system 	:	'h5',
  				product : '1',
  				device	:	uuid,
  				bigContentCatalogId	:	classId,
  				smallContentCatalogId :smallId,
  				finishStatus:status
  			}
  		})
  		.then((response) =>{
  			let dataBox = response.data.data;
//			this.dataList = response.data.data;
  			//添加一个识别加入书架的标识符addBookrack为false，如果加入了就把当前书籍id保存下来，addBookrack为true，
  			//下次进入的时候取出来循环查看如果有则设置标识符为true
  			let dataArrar = [];
  			dataBox.forEach(function(item,i){ 
  				item.addBookrack = false;
  				dataArrar.push(item)
  				
  			});
  			this.dataList = dataArrar;
  			console.log(dataArrar)
  			
  			this.isAddBookrack();
				this.isLoading = false;
  			
  			
//			console.log(response);
  			this.smallcatalogid = smallId;
  			this.bigcatalogid = classId
  		})
  		.catch((error) =>{
  			console.log(error)
  		})
  		
  		//改变当前颜色
  		
  		if(index === 0){//点击下标为0的时候高亮
  			this.activeIndex = 0;
  		}
//		alert(index)	
		
  		if(index === '' || index === null){
//				this.isAllClick = false;
//				alert("没有")
  				if(this.isAllClick){
  					
  					this.allActive = true
  					this.activeIndex = '50'
  				}else{
  					this.allActive = false
  				}
				 this.isAllClick = false;
  		}else{
  			this.activeIndex = index;
  			this.isAllClick = false;
  		}
  		
  		
  	},
  	addBookrack (value,index) { //添加到自己书架
  		var _this = this
  		var redKey = JSON.parse(localStorage.getItem("MY_BOOK"));
  		var setKey = [];
  		console.log(value)
  		console.log(redKey)
  		if(redKey && redKey instanceof Array && value){
  			
  			redKey.forEach(function(item,i){
  				console.log(item)
  					if(value.novelId == item.novelId){
  							_this.haveSameKey = true;
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
  							$this.dataList.forEach(function(value,index){
  								
  									if(value.novelId == item.novelId){
  										value.addBookrack = true;
  										
  									};
  							});
  							
  					});
  			}
  	},
  	screenData () {
			this.getAjaxlist(this.bigcatalogid,0,this.dataStatus);
			this.allActive = true;
			this.activeIndex = '50'
  	},
  	screenEndData (event) { //点击热度连载完结切换样式
  		var el = event.currentTarget;
  		var ishot = el.getAttribute("ishot")
			if(ishot == "2"){
				this.hotA = true;
				this.hotB = false;
				this.hotC = false;
			}else if(ishot == "0"){
				this.hotA = false;
				this.hotB = true;
				this.hotC = false;
			}else if(ishot == "1"){
				this.hotA = false;
				this.hotB = false;
				this.hotC = true;
			};
			//相应请求
			this.getAjaxlist(this.bigcatalogid,this.smallcatalogid,ishot,'')
			
  	},
  	
  },
  mounted () {
  	var params = this.$route.query;
  	var classId = params.bigContentCatalogId;
  	this.getAjaxData();
  	this.getAjaxlist(classId,0,this.dataStatus);
  	this.allActive = true;
  	
  },
  computed : {
		showList () {
			var showList = [];
			if(this.dataList.length > 4){
				for(var i = 0; i+page < 4+page;i++){
							
					showList.push(this.dataList[i+page])
				}
			}else{
				showList = this.dataList;
			}
			page = page+4;
			return showList;
		}
 },
 watch:{
 		'$route' (){
 			var params = this.$route.query;
	  	var classId = params.bigContentCatalogId;
	  	this.getAjaxData();
	  	this.getAjaxlist(classId,0,this.dataStatus);
	  	this.isAddBookrack(); //判断是否有书本已经添加过了
	  	//重置：热度连载完结高亮和小分类高亮
	  	
	  	this.hotA = true;
			this.hotB = false;
			this.hotC = false;
			this.allActive = true;
			this.activeIndex = '50'
	  	
 		}
 },
 created () {
// 	this.$nextTick(() =>{
// 		this.getAjaxlist();
// 	})
 	
 }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.channel_title{
	width:100%;
	height:0.88rem;
	line-height:0.88rem;
	text-align:center;
	font-size:0.36rem;
	color:#333;
	position: relative;
	border-bottom:solid 1px #e1e1e1;
}
.channel_title_img_left{
	width:0.24rem;
	height:0.44rem;
	position:absolute;
	left:0.3rem;
	top:0;
	bottom:0;
	margin:auto 0;
	z-index:1;	
}
/* 分类标题 S*/
.category_nav_wrapper{
	width:100%;
	line-height:0.58rem;
	font-size:0.28rem;
	color:#666;
	padding:0.15rem 0;
	background:#fafafa;
}
.category_nav_list{
	padding:0 0.3rem;
	
	overflow: hidden;
}
.category_nav_list li{
	float:left;
	margin-right:0.58rem;
	
}
.category_nav_list li.active{
	color:#ff6600;
}

.category_center_wrapper{
	
}
.category_center_titel{
	text-align:start;
	display:-webkit-box;
	border-top:solid 1px #e1e1e1;
	border-bottom:solid 1px #e1e1e1;
	box-sizing: border-box;
	height:0.66rem;
}
.category_center_titel p{
	margin-right:0.6rem;
	height:0.66rem;
	height:0.66rem;
	line-height:0.66rem;
	color:#b3b3b3;
	font-size:0.28rem;
	box-sizing:border-box;
}
.category_center_titel p:first-child{
	margin-left:0.3rem;
}
.category_center_titel p.active{
	color:#ff6600;
	border-bottom:solid 1px #ff6600;
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
	font-size:0.3rem;
}
.category_center_box{
	margin-left:0.3rem;
	width:5rem;
}
.category_center_box h3{
	font-size:0.3rem;
	font-weight:bold;
	color:#333;
	white-space:nowrap;
	overflow:hidden;
	text-overflow: ellipsis;
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
.loadingBox{
	width:100%;
	height:5.5rem;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
}
.loadingBox img{
		width:1rem;
		
}
/* 分类标题 E*/
</style>

<template>
	
  <div class="catalog">
  	<!--头部  S-->
    <div class="channel_title" >
	  	<img @click="goBack" class="channel_title_img_left" src="../../static/icon/nav_icon_back_default-1@2x.png"/>
	  	<p>书籍</p>
	  	<img @click="goBackIndex" class="channel_title_img_right" src="../../static/icon/2_defult.png"/>
	  </div>
	  <!-- 头部 E-->
	  
	  <!-- 加载loading-->
  	 <div class="isLoadingBox" v-if="isLoading"> <img src="../../static/load1.gif"/> </div>
  	 
  	 
	  <template v-else>
	  
  	<ul class="catalog_list" v-for="(item,index) in dataList" :key="index">
  		<h3 class="catalog_name">{{item.name}}</h3>
  		<router-link tag="li" :chapter="items.chapterId" :class="{active:items.chapterId==currentChapterId}"   v-for="(items,indexs) in item.chapters" :key="indexs" :to="{path:'/book',query:{classId:novelId,chapterId:items.chapterId,contentUrl:items.contentUrl}}" >{{items.title}}</router-link>
  		
  	</ul>
  	
  	
  	<div class="catalog_section" style="display:none">
  		<p class="catalog_last">上一页</p>
  		<!--如果没有上一页则不可点击为灰色-->
  		<div class="catalog_center">
  			<span>1000</span>-<span>1000</span>
  			<img src="../../static/icon/arrow_default@2x.png"/>
  		</div>
  		<p class="catalog_next">下一页</p>
  	</div>
  	
  	<!--章节mask S-->
  	<div class="aside_mask" style="display:none">
	  	<aside class="aside_wrapper">
	  		<h2>章节</h2>
	  		<ul class="asside_list">
	  			<li >1-100章</li>
	  			<li class="active">101-200章</li>
	  			<li>1-100章</li>
	  			<li>101-200章</li>
	  			<li>1-100章</li>
	  			<li>101-200章</li>
	  			<li>1-100章</li>
	  			<li>101-200章</li>
	  			<li>1-100章</li>
	  			<li>101-200章</li>
	  			<li>1-100章</li>
	  			<li>101-200章</li>
	  			<li>1-100章</li>
	  			<li>101-200章</li>
	  		</ul>
	  	</aside>
  	</div>
  	<!--章节mask E-->
  	
  	<!-- footer S-->
  	<v-footer></v-footer>
  	<!-- footer E-->
  		
	  </template>
  	
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
export default {
  name: 'catalog',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      dataList:'',
      novelId:'',
      isLoading:true,
      currentChapterId:''  //当前的chapterId
    }
  },
  components:{
  	VFooter
  },
  methods : {
  	goBack () {
  		this.$router.go(-1)
  	},
    goBackIndex (){ //返回首页
    	this.$router.push('/channel')
    },
	  	getAjaxData (){
	  		this.isLoading = true;
	  		var _this = this
	  		var params = this.$route.query;
	  		var novelId = params.classId;
	  		this.novelId = novelId;
	//		var chapterId = params.startChapterId;
				 axios.get('http://139.196.150.50:8086/novelApi/mobile/novel/getChapterList.do',{
				 		params:{
				 				version : 30000,
				 				system	:	'h5',
  							product : '1',
	  						device	: uuid,
	  						novelId	: novelId,
	  						startChapterId:'0',
	  						chapterMaxCount:'10000'
				 		}
				 })
				 .then((response) =>{
				 
				 	var s = response.data.data;
				 		console.log(response)
				 		this.dataList = response.data.data;
//						return response.data.data;
						this.isLoading = false;
						this.getCurrentChapterId(); 
				 })
				 .catch((error) =>{
				 	console.log(error)
				 })
	  	},
	  	getCurrentChapterId(){  //获得当前读到的ChapterId
//	  		currentChapterId
					let currentData = JSON.parse(sessionStorage.getItem('RECENTLY_READ'));
					//循环！如果有相同id的chapter赋值给currentChappterId;没有则赋值为空
					console.log(currentData)
					for(let [i,item] of currentData.entries()){
							console.log(item)
							if(this.novelId == item.novelId){
									this.currentChapterId = item.chapterId;
									break;
							}
					}
	  		
	  	}
  },
  computed:{
  	
  },
  watch:{
	'$route' : 'getAjaxData'
  },
  mounted	() {
		this.getAjaxData()
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
.channel_title_img_right{
	width:0.32rem;
	height:0.32rem;
	position:absolute;
	right:0.3rem;
	top:0;
	bottom:0;
	margin:auto 0;
	z-index:1;
	
}

.catalog_list li{
	font-size:0.36rem;
	color:#333;
	height:0.9rem;
	line-height:0.9rem;
	text-align:start;
	display: -webkit-box;
	display:-moz-box;
	border-bottom:solid 1px #e1e1e1;
	margin-left:0.3rem;
}
.catalog_list li p{
	margin-right:0.34rem;
}
.catalog_list li.active{
	color:#ff6600;
}

.catalog_section{
	padding:0 0.3rem;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:justify;
	font-size:0.34rem;
	color:#ccc;
	height:1.3rem;
}
.catalog_center{
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:center;
	font-size:0.28rem;
	color:#666;
	border:solid 1px #777878;
	height:0.54rem;
	width:2.6rem;
	border-radius:5px;
}
.catalog_center img{
	width:0.2rem;
	height:0.12rem;
	margin-left:0.2rem;
}
.catalog_next,.catalog_last{
	font-size:0.34rem;
	color:#333;
	border:solid 1px #777878;
	width:1.36rem;
	height:0.54rem;
	line-height:0.54rem;
	text-align:center;
	border-radius: 5px;
}
/* 章节 mask S*/
.aside_mask{
	position:fixed;
	left:0;
	right:0;
	top:0;
	bottom:0;
	margin:auto;
	z-index:99;
	background:rgba(0,0,0,0.3);
}
.aside_wrapper{
	width:5rem;
	height:100%;
	background:white;
	position: absolute;
	right:0;
	top:0;
	z-index:100;
}
.aside_wrapper h2{
	font-size:0.36rem;
	color:#333;
	font-weight:bold;
	text-align:center;
	line-height:0.88rem;
	height:0.88rem;
	border-bottom:solid 1px #ff6600;
}
.asside_list{
	
}
.asside_list li{
	font-size:0.36rem;
	color:#333;
	border-bottom:solid 1px #e1e1e1;
	text-align:start;
	height:0.9rem;
	line-height:0.9rem;
	padding-left:0.3rem;
}
.asside_list li.active{
	color:#ff6600;
}
.catalog_name{
	height:0.8rem;
	line-height:0.8rem;
	font-size:0.36rem;
	color:#969ba3;
	background:#f6f7f9;
	padding-left:0.3rem;
}
.isLoadingBox{
	width:100%;
	height:5.5rem;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
}
.isLoadingBox img{
	width:1rem;
}
/* 章节 mask E*/
</style>

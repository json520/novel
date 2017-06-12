<template>
  <div class="row">
  	<!-- header S-->
  	 <div class="channel_title">
	  	<img @click="goBack" class="channel_title_img_left" src="../../static/icon/nav_icon_back_default-1@2x.png"/>
	  	<p >{{navTitle}}</p>
	  	<img @click="toSearch" class="channel_title_img_right" src="../../static/icon/search_default1@2x.png"/>
	 	 </div>
	 	 <!-- header E-->
	 	 
	 	 <!-- 排行版标题 S-->
   	<nav>
   		<p  :class="{active:activeIndex === index}"  v-for="(item,index) in dataList"  @click="changeContentList(index)">
   			{{item.title}}
   			<span class="active_bottom" v-if="activeIndex === index"></span>
   		</p>
   		<!--<swiper :options="swiperOption">
		    <swiper-slide :class="swiper-slide" v-for="(item,index) in dataList" :key="index">{{item.title}}</swiper-slide>
		    
	  </swiper>-->
	  	<!--<swiper :options="swiperOption"  ref="mySwiper">-->  
            <!-- 这部分放你要渲染的那些内容 -->  
            <!--<swiper-slide v-for="(item,index) in dataList" :key="index" :class="{active:activeIndex === index}" @click="changeContentList(index)">  
            	{{item.title}}
            	<span class="active_bottom" v-if="activeIndex === index"></span>
            </swiper-slide>  -->
            <!-- 这是轮播的小圆点 -->  
            <!--<div class="swiper-pagination" slot="pagination"></div>-->  
        <!--</swiper>-->  
        
    <!--<swiper :options="swiperOption" @click="clickA">
	    <swiper-slide :index="index" v-for="(item,index) in dataList" :key="index" :class="{active:activeIndex === index}" @click="clickA">{{item.title}}
	    	<span class="active_bottom" v-if="activeIndex === index"></span>
	    </swiper-slide>
	    
  	</swiper>-->
   	<!--<div>  
        <swiper :options="swiperOption"  ref="mySwiper">  
            
            <swiper-slide v-for="(item,index) in dataList" :key="index"> 
            	{{item.title}}
            </swiper-slide>  
        </swiper>  
    </div>  -->
   		
   	</nav>
   	<!--测试-->
   
   	<!-- 排行版标题 E-->
   	
		<!--频道排行 S-->
		<div class="row_wrapper">
			<!--<p class="row_h3">
				<i class="title_logo"></i>
				<span>男频排行</span>
			</p>-->
			<div class="isLoadingBox" v-if="isLoading"> <img src="../../static/load1.gif"/> </div>
			
			<ul class="row_list">
				<router-link tag="li" v-for="(item,index) in showList" :to="{path:'/details',query:{classId:item.novelId}}" :key="index">
					<img class="row_list_img" v-lazy="item.bookImage"/>
					<div class="row_list_box">
						<h4>{{item.title}}</h4>
						<p class="row_list_info_author">{{item.author}}</p>
						<div class="row_list_info">
							<span v-if="item.subCatalog">{{item.subCatalog}}</span>
							<span>{{item.chapterCount}}章</span>
						</div>
						<p class="row_list_description">
							{{item.introduction}}
						</p>
					</div>
				</router-link>
			</ul>
			<!-- 排行分类标题S -->
			<ul class="list_title_wrapper">
				<router-link tag="li" v-for="(item,index) in showTitleList" :to="{path:'/details',query:{classId:item.novelId}}" :key="index">【{{item.subCatalog}}】<span>{{item.title}}</span></router-link>
				
			</ul>
			<!--排行分类标题E -->
			
		</div>
		<!--加载更多 S-->
			<div class="more_list" @click="haveMoreAjax" v-if="haveMore">点击加载更多<img src="../../static/icon/arrow1@2x.png" /></div>
		<!--加载更多 S-->
			<!--频道排行 S-->
			
			<!-- footer S-->
  	<v-footer :footerStyle="footerStyle">
  		
  		<div slot="borderBar" class="border_gray"></div>
  		
  	</v-footer>
  	<!-- footer E-->
  </div>
</template>

<script>
	import axios from 'axios'
	import VFooter from '@/components/Footer'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	
	let getuuid = localStorage.getItem("pgv_pvi");
	let uuid = null;
	if(getuuid){
		uuid = getuuid;
	}else{
		uuid = 'uuid';
	};
	
export default {
  name: 'row',
  components:{
  	VFooter,
  	swiper,
    swiperSlide 
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      navTitle:'排行1',
      dataList:[{'title':'排行1'},{'title':'排行2'},{'title':'排行3'},{'title':'排行4'}], //排行榜标题列表
      navWidth:'', //排行榜标题宽度
      contentList:'', //内容列表
      activeIndex:0,
      startNovelId:'',
      haveMore:true,
      isLoading:true,
      screenHeight:document.body.clientHeight, //记录body的默认高度
      footerStyle:'',
      footerAbsolute:false,
//     swiperOption: {  
                //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true  
//              notNextTick: true,  
//              pagination: '.swiper-pagination',  
//              slidesPerView: 3,  
//              centeredSlides: true,  
//              freeMode:true,
//              watchActiveIndex:true,
//              paginationClickable: true,  
//              spaceBetween: 30,  
//                  onClick: swiper => {  
//                      //这个位置放swiper的回调方法  
//                      console.log(swiper.activeIndex)
//                      this.page = swiper.realIndex+1;  
////                      this.index = swiper.realIndex;  
//                  }  
//              }  
                //一个思路！通过手势点击获取当前的x轴坐标！然后和屏幕的宽度做测量！超出的在检测左右滑动是多少！从而计算当前是点击了哪一个区块！
    }
  },
  methods:{
  	goBack () {
  		this.$router.go(-1);
  	},
  	toSearch (){ //跳转到搜索
			this.$router.push('/search')
		},
  	getAjaxData (){ //获取ajax数据
  		this.isLoading = true;
  		var params = this.$route.query;
  		var catalogId = params.id
  		this.navTitle = params.title
  		
  		axios.get('http://139.196.150.50:8086/novelApi/mobile/novel/getCarefullySelectCatalogDetail.do',{
  			params :{
  				version : 30000,
  				system	: 'h5',
  				product : '1',
  				device	: uuid,
  				catalogId:catalogId
  			}
  		})
  		.then((response) =>{
  			console.log(response)
  			this.dataList = response.data.data;
//			this.navWidth = 100/this.dataList.length + "%";
				this.changeContentList(0) //初始化第一个排行榜
				this.isLoading = false;
				
  		})
  		.catch((error) =>{
  			console.log(error)
  		})
  	},
  	changeContentList (index){ //通过下标进行数据切换,和样式改变
  		const $this = this;
  	
//			alert(11)
  		this.contentList = this.dataList[index];
  		this.activeIndex = index;
  		if(this.contentList.haveMore == 1){ //是否显示更多
					this.haveMore = true
				}else{
					this.haveMore = false
				};
			//获取页面的可视区域高度。document.body.clientHeight  app的内容高度：document.getElementById("app").offsetHeight		
			console.log("动态")	
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
			
			
  	},
  	haveMoreAjax (){ //添加更多，catalogId:；,subCatalogId:,startNovelId:列表最后一个id
  		var catalogId = this.contentList.catalogId;
  		var subCatalogId = this.contentList.subCatalogId; 
			var startNovelId = this.contentList.novelList[this.contentList.novelList.length-1].novelId
  		console.log(this.contentList.novelList[this.contentList.novelList.length-1].novelId)
  		axios.get('http://139.196.150.50:8086/novelApi/mobile/novel/getMoreNovelsForCarefullySelectRankingListSubCatalog.do',{
  			params:{
  				version	: 30000,
  				system	:	'h5',
  				product : '1',
  				device	:	uuid,
  				catalogId: catalogId,
  				subCatalogId:subCatalogId,
  				startNovelId:startNovelId
  			}
  		})
  		.then((response) =>{
  			let _this = this
  			if(response){
  				//循环添加到数据里面
  				var responseList = response.data.data.novels
  				responseList.forEach(function(item,i){
  					_this.contentList.novelList.push(item);
  				});
  				//返回的haveMore为0则不显示更多
  				if(response.data.data.haveMore == 0){
  					this.haveMore = false;
  				}else{
  					this.haveMore = true;
  				};
  			}
  			
  		})
  		.catch((error)=>{
  			console.log(error)
  		})
  		
  	}
  },
  computed:{
  	showList (){ //计算图片列表
  		var _thisList = this.contentList.novelList;
  		var showList = [];
  			if(_thisList){
  				_thisList.forEach(function(item,i){
  						if(item.showStyle == 2 || item.showStyle == 3){
//							item.showStyle == 3
  							showList.push(item)
  						}
  				});
  				return showList;
  			}
  	},
  	showTitleList (){ //计算排行内部分类标题列表
  		var _thisList = this.contentList.novelList;
  		var showList = [];
  			if(_thisList){
  				_thisList.forEach(function(item,i){
  						if(item.showStyle == 4){
  							showList.push(item)
  						}
  				});
  				return showList;
  			}
  	}
  	
  },
watch:{
	screenWidth (val) {
    this.screenHeight = val;
    console.log(2)
	}
},
  mounted (){
	this.getAjaxData();


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.row{
		font-size:0.2rem;
	}
nav{
	width:100%;
	height:0.8rem;
	line-height:0.8rem;
	/*display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:center;
	display:box;
	box-align:center;
	box-pack:center;*/
	font-size:0.32rem;
	color:#b2b2b2;
	background:#fafafa;
	border-bottom:solid 1px #e1e1e1;
	white-space: nowrap;
	overflow:hidden;
	text-overflow:ellipsis;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  white-space:nowrap;
}
nav p{
	height:100%;
	line-height:0.8rem;
	text-align:center;
	position:relative;
	padding:0 0.3rem;
	display:inline-block;
}

nav p.active{
	color:#4b4b4b;
}
nav p .active_bottom{
	width:0.9rem;
	height:2px;
	background:#ff6600;
	position: absolute;
	left:0;
	right:0;
	margin:0 auto;
	bottom:-0.01rem;
	z-index:2;
}
.border_gray{
	width:100%;
	height:5px;
	background:#ccc;
}
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
	width:0.28rem;
	position:absolute;
	right:0.3rem;
	top:0;
	bottom:0;
	margin:auto 0;
	z-index:1;
	
}
/*频道排行S*/
.row_wrapper{
	padding:0.3rem 0.3rem 0 0.3rem;
}
.row_h3{
	width:100%;
	text-align:start;
	display:-webkit-box;
	-webkit-box-align:center;
	display:-moz-box;
	-moz-box-align:center;
	display:box;
	box-align:center;
	font-size:0.3rem;
	font-weight:bold;
	color:#333;
	margin:0.3rem 0;
}
.title_logo{
	display:block;
	width:0.08rem;
	height:0.3rem;
	background:#ff6600;
	margin-right:0.1rem;
}
.row_list{
	/*padding-top:0.3rem;*/
}
.row_list li{
	display:-webkit-box;
	-webkit-box-align:start;
	-webkit-box-pack:start;
	display:-moz-box;
	-moz-box-align:start;
	-moz-box-pack:start;
	display:box;
	box-align:start;
	box-pack:start;
	margin-bottom:0.4rem;
}
.row_list li:last-child{
	margin-bottom:0.25rem;
}
.row_list_img{
	width:1.6rem;
	height:2rem;
}
.row_list_box{
	text-align:start;
	margin-left:0.3rem;
	height:2rem;
}
.row_list_box h4{
	font-size:0.3rem;
	font-weight:bold;
	color:#333;
	
}
.row_list_info_author{
	font-size:0.28rem;
	color:#666;
}
.row_list_info{
	text-align:start;
	display:-webkit-box;
	-webkit-box-align:center;
	display:-moz-box;
	-moz-box-align:center;
	display:box;
	box-align:center;
	margin:0.1rem 0 0.1rem 0;
}
.row_list_info span{
	display:inline-block;
	font-size:0.2rem;
	color:#FF6A6A;
	padding:0 0.1rem;
	height:0.28rem;
	line-height:0.28rem;
	border:solid 1px #FF6A6A;
	border-radius: 0.04rem;
}
.row_list_description{
	width:5rem;
	display:-webkit-box;
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
	overflow:hidden;
	font-size:0.28rem;
	color:#A2A2A2;
}
.list_title_wrapper li{
	text-align:start;
	font-size:0.3rem;
	color:#333;
	line-height:0.6rem;
}
.list_title_wrapper li span{
	color:#666;
	margin-left:0.3rem;
}
.more_list{
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:center;
	display:box;
	box-align:center;
	box-pack:center;
	font-size:0.24rem;
	color:#ccc;
	margin-top:0.25rem;
	height:0.6rem;
	border-top:solid 1px #E1E1E1;
}
.more_list img{
	width:0.12rem;
	height:0.2rem;
	margin-left:0.06rem;
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
.border_gray{
	width:100%;
	height:0.2rem;
	background:#f6f6f6;
	margin-bottom:0.5rem;
}

/*频道排行E*/
</style>

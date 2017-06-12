<template>
  <div class="details">
  	<!--头部  S-->
    <div class="channel_title" >
	  	<img @click="goBack" class="channel_title_img_left" src="../../static/icon/nav_icon_back_default-1@2x.png"/>
	  	<p>书籍</p>
	  	<img @click="goBackIndex" class="channel_title_img_right" src="../../static/icon/2_defult.png"/>
	  </div>
	  <!-- 头部 E-->
	  
	   <div class="isLoadingBox" v-if="isLoading"> <img src="../../static/load1.gif"/> </div>
	   
	  <template v-else>
	  	
	  <!-- 详情 S-->
	  <div class="details_wrapper" v-if="datanovelDetail">
	  	<div class="details_container" >
	  		<img class="details_img" v-lazy="datanovelDetail.bookImage"/>
	  		<div class="details_box">
	  				<h3>{{datanovelDetail.title}}</h3>
	  				<p class="details_chapter">
	  					<span>{{datanovelDetail.subCatalog}}</span>
	  					<span v-if="datanovelDetail.end==0">连载</span>
	  					<span>{{datanovelDetail.chapterCount}}章</span>
	  				</p>
	  				<p class="details_author">	作者：{{datanovelDetail.author}}</p>
	  				<p class="details_update_time">更新时间：{{newTime}}</p>
	  				<p class="details_source">{{datanovelDetail.srcWebName}}</p>
	  		</div>
	  	</div>
	  	<ul class="behavior_list">
	  		<li v-if="canHaveAdd" @click="addBookrack(datanovelDetail)">放入书架</li>
	  		<li v-else class="intoBookrackClass">已放入书架</li>
	  		<router-link tag="li" :to="{path:'/book',query:{classId:novelId,chapterId:firstChapter.chapterId,contentUrl:firstChapter.contentUrl}}">立即阅读</router-link>
	  		<li @click="cacheBook" class="active">缓存本书</li>
	  	</ul>
	  </div>
	  <!-- 详情 E-->
	  <!-- 内容简介 S-->
	  <div class="catalog_wrapper" v-if="datanovelDetail">
	  		<p class="catalog_new">[最新]</p>
	  		<p class="catalog_chapter">{{datanovelDetail.lastUpdateChapterTitle}}</p>
	  		<router-link tag="p" class="catalog_list" :to="{path:'/catalog',query:{classId:novelId}}">目录</router-link>
	  </div>
	  <div class="details_description_wrapper" v-if="datanovelDetail">
	  	<p class="details_description_title">
	  		<span class="details_logo"></span>
	  		<span class="details_logo_title" ref="folderall">内容简介</span>
	  	</p>
	  	<p class="details_description_text" ref="folderall">
	  		{{datanovelDetail.introduction}}
	  	</p>
	  </div>
	  <!--点击更多时候注意和来源的更多区分-->
	  <p class="details_description_more details_description_more2" v-show="isDescriptionUnfold" @click="MisDescriptionUnfold">
	  	展开<img src="../../static/icon/arrow2@2x.png"  />
	  </p>
	  <!-- 内容简介 E-->
	  
	  <!--边线-->
	  <div class="border_gray2"></div>
	  
	  
	  <!--本书其他书籍来源 S-->
	  <div class="other_source_wrapper" v-if="sourceList">
	  	<p class="details_description_title">
	  		<span class="details_logo"></span>
	  		<span class="details_logo_title">{{sourceList.title}}</span>
	  	</p>
	  	<ul class="other_list" >
	  		<router-link tag="li" v-for="(item,index) in this.sourceList.novelList" :to="{path:'/details',query:{classId:item.novelId}}" :key="index">
	  			<img v-lazy="item.bookImage" />
	  			<div class="other_list_box">
	  				<h3>{{item.title}}</h3>
	  				<div class="other_list_chapter">
	  					<span>{{item.subCatalog}}</span>
	  					<span v-if="item.end == 0">连载</span>
	  					<span>{{item.chapterCount}}章</span>
	  				</div>
	  				<div class="other_list_author">
	  					作者：{{item.author}}
	  				</div>
	  				<div class="other_list_update">
	  					章节：[最新]{{item.lastUpdateChapterTitle}} 
	  					<!--<span>大结局</span>-->
	  				</div>
	  				<div class="other_list_source">{{item.srcWebName}}</div>
	  			</div>
	  		</router-link>
	  		
	  	</ul>
	  </div>
	  <router-link class="other_list_more" v-if="sourceList.haveMore == 1"
	  	:to="{path:'/detailssourcemore',query:{id:novelId,type:sourceList.novelListType,title:sourceList.title}}" >
	  	更多<img src="../../static/icon/arrow1@2x.png"  />
	  </router-link>
	  <!--本书其他书籍来源 E-->
	  <!--分割线-->
	  <div class="border_gray2"></div>
	  
	  <!--本书相同作者 S-->
  	<div class="recommend" v-if="sameAuthorList">
    	<div class="recommend_title have_more">
    		<i class="title_logo"></i>
    		<span>{{sameAuthorList.title}}</span>
    		<router-link class="row_more" v-if="sameAuthorList.haveMore == 1" :to="{path:'/DetailsMore',query:{id:novelId,type:sameAuthorList.novelListType,title:sameAuthorList.title}}">
    			更多<img src="../../static/icon/arrow1@2x.png" />
    		</router-link>
    	</div>
    	<ul class="recommend_list">
    		<router-link tag="li" v-for="(item,index) in this.sameAuthorList.novelList" :key="index" :to="{path:'/details',query:{classId:item.novelId}}">
    			<img v-lazy="item.bookImage"/>
    			<p>{{item.title}}</p>
    		</router-link>
    		
    	</ul>
  	</div>
	  <!--本书相同作者  E-->
	  
	  <!--边线-->
	  <div class="border_gray2"></div>
	  
	  <!--本书同类小说 S-->
	  <div class="other_source_wrapper" v-if="sameTypeList.novelList">
	  	<p class="details_description_title">
	  		<span class="details_logo"></span>
	  		<span class="details_logo_title">{{sameTypeList.title}}</span>
	  	</p>
	  	<ul class="other_list">
	  		<router-link tag="li" v-for="(item,index) in this.sameTypeList.novelList" :key="index" :to="{path:'/details',query:{classId:item.novelId}}">
	  			<img v-lazy="item.bookImage"  />
	  			
	  			<div class="other_list_box">
	  				<h3>{{item.title}}</h3>
	  				<div class="other_list_chapter">
	  					<span v-if="item.end == 0">连载</span>
	  					<span>{{item.chapterCount}}章</span>
	  				</div>
	  				<div class="other_list_author">
	  					作者：{{item.author}}
	  				</div>
	  				<!--<p class="choiceness_text">{{item.introduction}}</p>-->
	  			</div>
	  		</router-link>
	  		
	  	</ul>
	  </div>
	  <router-link tag="p" class="other_list_more" v-if="sameTypeList.haveMore == 1" :to="{path:'/DetailsMore',query:{id:novelId,type:sameTypeList.novelListType,title:sameTypeList.title}}">
	  	更多<img src="../../static/icon/arrow1@2x.png"  />
	  </router-link>
	  <!-- 本书同类小说 E-->
	  
	  <!--边线-->
	  <div class="border_gray2"></div>
	  
	  <!-- footer S-->
  	<v-footer></v-footer>
  	<!-- footer E-->
  	</template>
  	<!--添加书架弹窗-->
  	<transition name="lovemask">
  		<div class="love_mask " v-if="addBookrackSucceed">
  			<p>{{addBookrackText}}</p>
  		</div>
  	</transition>
  	
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
  name: 'details',
  components:{
  	VFooter
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      websiteTitle:'',
      websiteDefault:'深夜小说中文网',
      isDescriptionUnfold:true,
      datanovelDetail:'1', //数据详情
      dataotherNovels:'1', //其它数据
      sourceList:'',//本书其它来源数据
      sameAuthorList:'',//本书相同作者
      sameTypeList:'',//本书同类型小说
      newTime:'', //转换时间
      novelId:'', //书籍id
      firstChapter:'', //立即阅读章节的数据
      haveSameKey:false,
      isLoading:true,
      recentlyChapter:'0', //当前阅读到的章节数
      addBookrackText:'添加书架成功', //点击添加书架提示语
      addBookrackSucceed:false, //点击书架显示按钮
      canHaveAdd:true  //可以点击加入书架
    }
  },
  methods:{
  	initHandle(){ //初始化数据
  		
  	},
  	goBack () {
  		this.$router.go(-1)
  	},
  	//点击展示全部简介
  	MisDescriptionUnfold () {
			this.$refs.folderall.style.cssText = "-webkit-line-clamp:300"
			this.isDescriptionUnfold = false;
  	},
  	getAjaxDetails () {
  		
  		this.isLoading = true;
  		
  		var params = this.$route.query;
  		var classId = params.classId;
  		this.novelId = classId;
  		
  		
  		
  		axios.get('http://139.196.150.50:8086/novelApi/mobile/novel/getNovelDetailByNovelId.do',{
  			params:{
  				version : 30000,
  				system	:	'h5',
					product : '1',
  				device	: uuid,
  				novelId	:	classId
  			}
  		})
  		.then( (response)=>{
//			console.log(response)
				let _this = this;
  			this.datanovelDetail = response.data.data.novelDetail;//详情
				let bookTitle = response.data.data.novelDetail.title;
  			let bookAuthor = response.data.data.novelDetail.author
  			let webKeywords = bookTitle+'小说'+bookTitle+'最新章节,'+bookTitle+'txt下载,'+bookTitle+'无弹窗,'+bookTitle+'吧,'+bookTitle+'离线完本'
  			let webDescription = bookTitle+','+bookTitle+'小说阅读,'+bookTitle+'由作家'+bookAuthor+'创作,笔趣阁提供'+bookTitle+'最新章节及txt下载,更多精彩尽在笔趣阁。'
  			setKeywords(webKeywords) //设置页面keywords
  			setDescription(webDescription) //设置页面description
  			
  			this.dataotherNovels = response.data.data.otherNovels;//其他来源
				var otherNovelsBox = response.data.data.otherNovels;
  			if(otherNovelsBox && otherNovelsBox instanceof Array){
  					otherNovelsBox.forEach(function(item,i){ //1：本书其它来源，2：本书同作者，3：本书同类型小说
  						if(item.novelListType == 1){
  							
  							_this.sourceList = item
  						}else if(item.novelListType ==2){
  							
  							_this.sameAuthorList = item
  						}else if(item.novelListType ==3){
  							
  							_this.sameTypeList = item
  						};
  					});
  			};
  			
//			setDescription()
  			
  			this.newTime = this.convertTime(response.data.data.novelDetail.lastUpdateDatetime); //转换时间格式
  			
  			this.websiteTitle = response.data.data.novelDetail.title //设置页面title
  			if(this.websiteTitle){
  				setTitle(this.websiteTitle+'_'+this.websiteDefault )
  			}else{
  				setTitle(this.websiteDefault)
  			}
					
  			
  			this.addRecentlyRead(); //最近阅读逻辑
  			this.isLoading = false;
  			
  		} )
  		.catch((error) =>{
  			console.log(error)
  		})
  		
  	},
  	getFirstChapter (){ //获取第一个章节、
  			var _this = this
	  		var params = this.$route.query;
	  		var classId = params.classId;
  			axios.get('http://139.196.150.50:8086/novelApi/mobile/novel/getChapterList.do',{
			 		params:{
			 				version : 30000,
			 				system	:	'h5',
			 				product : '1',
  						device	: uuid,
  						novelId	: classId,
  						startChapterId:'0',
  						chapterMaxCount:'1'
			 		}
			 })
			 .then((response) =>{
			 
			 	let s = response.data.data;
//			 		console.log(response)
//			 	if(s && s instanceof Array){
//			 		s.forEach(function(item,i){
//			 				if(item.sort == 1){
			 					this.firstChapter = s[0].chapters[0]
//			 					console.log(this.firstChapter)
//			 				}
//			 		})	
//			 	}
			 })
			 .catch((error) =>{
			 	console.log(error)
			 })
  	}
  	,
  	convertTime (time) { //转换时间格式
  		var newTime = '';
  		return newTime = time.substr(0,4)+'-'+time.substr(4,2)+'-'+time.substr(6,2)
  	},
  	addBookrack (value) { //添加到自己书架
//		console.log(value)
  		var _this = this
  		var redKey = JSON.parse(localStorage.getItem("MY_BOOK"));
  		var setKey = [];
//		console.log(value)
//		console.log(redKey)
  		if(redKey && redKey instanceof Array && value){
  			
  			redKey.forEach(function(item,i){
//				console.log(item)
  					if(value.novelId == item.novelId){
  							_this.haveSameKey = true;
								item.addBookrack = true;
  					}
  			});
  			
  			if(_this.haveSameKey){ //有相同的
//				alert("已添加")
				_this.canHaveAdd = false;
				_this.addBookrackSucceed = true //显示提示
//				_this.addBookrackText = "已添加到书架"
					var showMask = setTimeout(function(){
							
							_this.addBookrackSucceed = false
							
					},2000)
//					console.log("有相同")
					
  				setKey = redKey;
  				_this.haveSameKey = false
  			}else{
//					alert("添加成功")
					_this.canHaveAdd = false;
					_this.addBookrackSucceed = true
					var showMask = setTimeout(function(){
							_this.addBookrackSucceed = false
							
					},2000)
					
	  				value.checked = false;
	  				value.addBookrack = true;
	  				
	  				redKey.push(value);
	  				setKey = redKey;
  			};
		
			localStorage.setItem("MY_BOOK",JSON.stringify(setKey));
			}else if(value){
				value.checked = false;
				value.addBookrack = true;
//				console.log(value)
  			setKey.push(value);
  			localStorage.setItem("MY_BOOK",JSON.stringify(setKey));
  		};
  		console.log(JSON.parse(localStorage.getItem("MY_BOOK")))
  		
  	},
  	cacheBook (){ //缓存书籍
  		location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=cn.zhangyoukeji.browser.jisou"
  	},
    goBackIndex (){ //返回首页
    	this.$router.push('/channel')
    },
    addRecentlyRead () { //添加到最近阅读素材
    	
    	this.canHaveAdd = true; //重置加入书架
    	
  		let novelId = this.datanovelDetail.novelId
  		let  title = this.datanovelDetail.title
  		let bookImage = this.datanovelDetail.bookImage
  		let chapterCount = this.datanovelDetail.chapterCount
  		var _this = this
    	var  value = {
    			'novelId':novelId,
    			'title':title,
    			'bookImage':bookImage,
    			'chapterCount':chapterCount,
    			'recentlyRead':_this.recentlyChapter,
    			'firstChapterId':_this.firstChapter.chapterId,
    			'recentlyRead' : 0
    	};
  		
  		var redKey = JSON.parse(sessionStorage.getItem("RECENTLY_READ"));
  		var setKey = [];
//		console.log(value)
//		console.log(redKey)
  		if(redKey && redKey instanceof Array && value){
  			
  			redKey.forEach(function(item,i){
//				console.log(item)
  					if(value.novelId == item.novelId){
  							_this.haveSameKey = true;
  							return 
  					}
  			});
  			if(_this.haveSameKey){ //最近阅读里有
//				alert("已添加")
  				setKey = redKey;
  				_this.haveSameKey = false
  			}else{ //最近阅读里没有
//				alert("添加成功")
					
  				redKey.push(value);
  				setKey = redKey;
  			};
				sessionStorage.setItem("RECENTLY_READ",JSON.stringify(setKey));
			}else if(value){
				
  			setKey.push(value);
  			sessionStorage.setItem("RECENTLY_READ",JSON.stringify(setKey));
  			
  		};
  		//检测有没有加入过书架：
  		var redKey = JSON.parse(localStorage.getItem("MY_BOOK"));
//		console.log(redKey)/
  		if(redKey && redKey instanceof Array){
  			
  			redKey.forEach(function(item,i){
  				if(novelId == item.novelId){
  					
  						if(item.addBookrack){ //如果已经添加就不能点击添加书架
								
								_this.canHaveAdd = false;
							}
  						return
  				}
  			});
  			
  		};
  		
  		
  		
  	}
  },
  computed:{
  	//当数组长度大于3的时候，循环3个出来放到一个数组里面，并且显示更多，更多能点击跳转到more页面
//	showList () {
////		console.log(this.sourceList.novelList)
//		var showList = [];
//		if(this.sourceList.novelList.length > 3){
//				for(var i = 0; i < 3; i++){
//					showList.push(this.sourceList.novelList[i]);
//				}
//		}else{
//			showList = this.sourceList.novelList
//		}
//		return showList;
//	},
  	sameAuthorShowList (){ //本书相同作者限制数量3
  		var showList = [];
  		return this.sameAuthorList.novelList.slice(0,3)
  	},
    sameTypeShowList (){ //本书同类型小说限制数量3
    	var showList = [];
  		return this.sameTypeList.novelList.slice(0,3)
    }
    
  	
  },
  watch:{
  		//监听数据参数不一样
  		$route (to,from){
  			
  			this.getAjaxDetails();
  			this.getFirstChapter();
  		}
  	},
  mounted () {
  	this.getAjaxDetails(); //获取数据
		this.getFirstChapter(); //获取第一个章节
		
//		var bookId = this.$route.query.classId;
//		this.$store.dispatch('getAjaxCatalogData',{'uuid':uuid,'id':bookId})
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
.details_wrapper{
	padding:0 0.3rem;
}
.details_container{
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:start;
	display:-moz-box;
	-moz-box-pack:start;
	-moz-box-align:center;
	margin:0.3rem 0;
}
.details_img{
	width:1.6rem;
	height:2rem;
}
.details_box{
	margin-left:0.3rem;
	width:5rem;
}
.details_box h3{
	font-size:0.3rem;
	color:#333;
	font-weight:bold;
	margin-bottom:0.15rem;
	white-space:nowrap;
	overflow:hidden;
	text-overflow: ellipsis;
}
.details_chapter{
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:start;
	display:-moz-box;
	-moz-box-pack:start;
	-moz-box-align:center;
	font-size:0.28rem;
	color:#666;
	margin-bottom:0.14rem;
}
.details_chapter span{
	margin-right:0.24rem;
}
.details_author{
	font-size:0.28rem;
	color:#666;
}
.details_update_time{
	font-size:0.28rem;
	color:#666;
}
.details_source{
	font-size:0.22rem;
	color:#ccc;
}
.behavior_list{
	width:100%;
	overflow:hidden;
}
.behavior_list li{
	float: left;
	font-size:0.28rem;
	color:#666;
	border: solid 1px #666;
	box-sizing:border-box;
	border-radius: 0.04rem;
	margin-right:0.3rem;
	width:2.1rem;
	height:0.6rem;
	line-height:0.6rem;
	text-align:center;
}
.behavior_list li:nth-child(3n){
	margin-right:0;
}
.behavior_list li.active{
	border:solid 1px #ff6600;
	color:#ff6600;
}

/*最新 S*/
.catalog_wrapper{
	width:6.9rem;
	margin:0.4rem auto;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:start;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:start;
	font-size:0.28rem;
	background:#f6f6f6;
	height:0.6rem;
	color:#666;
	position: relative;
}
.catalog_new{
	color:#ff6600;
	margin:0 0.2rem;
}
.catalog_chapter{
	/*margin-right:0.3rem;*/
	width:4rem;
	overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
}
.catalog_list{
	position:absolute;
	right:0.2rem;
	top:0;
	bottom:0;
	margin:auto 0;
	z-index:2;
	width:1rem;
	height:0.4rem;
	line-height:0.4rem;
	text-align:center;
	background:#f8d9c5;
	color:#333;
}
/* 最新 E*/

/*内容简介 S*/
.details_description_wrapper{
	padding:0 0.3rem;
}
.details_description_title{
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:start;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:start;
}
.details_logo{
	display:block;
	width:0.08rem;
	height:0.3rem;
	background:#ff6600;
	margin-right:0.1rem;
}
.details_logo_title{
	display:block;
	font-size:0.28rem;
	color:#333;
	font-weight: bold;
}
.details_description_text{
	font-size:0.28rem;
	color:#666;
	line-height:0.42rem;
	text-align: justify;
	display:-webkit-box;
	-webkit-box-orient:vertical;
	-webkit-line-clamp:3;
	overflow:hidden;
	margin:0.13rem 0 0.23rem 0;
}
.details_description_more{
	font-size:0.24rem;
	color:#ccc;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:center;
	height:0.6rem;
	margin-top:0.23rem;
	border-top:solid 1px #e1e1e1;
}
.details_description_more img{
	width:0.2rem;
	height:0.12rem;
	margin-left:0.06rem;
}
/*内容简介 E*/
.border_gray2{
	width:100%;
	height:0.2rem;
	background:#F6F6F6;
}
/*本书其它来源 S*/
.other_source_wrapper{
	padding:0 0.3rem;
	margin-top:0.3rem;
}
.other_list{
	margin-top:0.3rem;
}
.other_list li{
	display:-webkit-box;
	-webkit-box-align:start;
	-webkit-box-pack:start;
	display:-moz-box;
	-moz-box-align:start;
	-moz-box-pack:start;
	margin-bottom:0.3rem;
}
.other_list li img{
	width:1.6rem;
	height:2rem;
}
.other_list_box{
	margin-left:0.3rem;
	font-size:0.28rem;
	color:#666;
	text-align:start;
	width:5rem;
	
}
.other_list_box h3{
	font-size:0.3rem;
	color:#333;
	font-weight: bold;
	margin-bottom:0.1rem;
	white-space:nowrap;
	overflow:hidden;
	text-overflow: ellipsis;
}

.other_list_update{
	overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
}

.other_list_source{
	font-size:0.22rem;
	color:#ccc;
}

.other_list_more{
	font-size:0.24rem;
	color:#ccc;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:center;
	height:0.6rem;
	margin-top:0.23rem;
	border-top:solid 1px #e1e1e1;
}
.other_list_more img{
	width:0.12rem;
	height:0.2rem;
	margin-left:0.06rem;
}
.choiceness_text{
	display:-webkit-box;
	-webkit-box-orient:vertical;
	overflow:hidden;
	-webkit-line-clamp:2;
	font-size:0.28rem;
	color:#A2A2A2;
	width:5rem;
}
/*本书其它来源 E*/

/* 主编力荐 S*/
	.recommend{
	padding:0 0.3rem;
}
.recommend_title{
	width:100%;
	margin:0.3rem 0;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:start;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:start;
	font-size:0.3rem;
	color:#333;
	font-weight: bold;
}
.choiceness{
	padding:0 0.3rem;
}
.choiceness_title{
	width:100%;
	height:0.6rem;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:start;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:start;
	font-size:0.3rem;
	color:#333;
	font-weight: bold;
}
.recommend_title img{
	width:0.3rem;
}
.choiceness_title img{
	width:0.1rem;
}
.title_logo{
	display:block;
	width:0.08rem;
	height:0.3rem;
	background:#ff6600;
	margin-right:0.1rem;
}
.recommend_list{
	overflow:hidden;
}

.recommend_list li{
	float: left;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:start;
	-webkit-box-orient:vertical;
	margin-right:1.05rem;
	width:1.6rem;
}
.recommend_list li:nth-child(3n){
	margin-right:0;
}
.recommend_list li img{
	width:1.6rem;
	height:2rem;
}
.recommend_list li p{
	width:1.6rem;
	text-align: start;
	display:-webkit-box;
	-webkit-box-orient:vertical;
	overflow:hidden;
	-webkit-line-clamp:2;
	font-size:0.3rem;
	margin-top:0.07rem;
	margin-bottom:0.23rem;
}
.people_recommend{
	font-size:0.24rem;
	color:#666;
	font-weight: normal;
}
.have_more{
	position: relative;
}
.row_more{
	font-size:0.24rem;
	color:#ccc;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:center;
	display:box;
	box-align:center;
	box-pack:center;
	position: absolute;
	top:0;
	bottom:0;
	margin:auto 0;
	right:0;
	z-index:2;
	font-weight: normal;
}
.row_more img{
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
/* 主编力荐 E*/


.love_mask{
	position: fixed;
	left:0;
	right:0;
	top:0;
	bottom:0;
	margin:auto;
	z-index:101;
	color:#ff6600;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:center;
}
.behavior_list .intoBookrackClass{
	color:#ccc;
	border:solid 1px #ccc;
}
.love_mask p{
	background:rgba(0,0,0,0.8);
	border-radius:0.04rem;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	font-size:0.28rem;
	height:0.6rem;
	line-height:0.6rem;
	padding:0 0.2rem;
}
.lovemask-enter-active{ 
	
	/*v-if显示的时候的动画*/
	animation:fadeIn 100ms ease;
}
.lovemask-leave-active{
	/*v-if隐藏的时候显示的动画*/
	animation:fadeOut 2s ease;
}
@keyframes fadeIn{
	from{
		opacity:0;
	}
	to{
		opacity:1;
	}
}

@-webkit-keyframes fadeIn {
  0% {
    transform: translate3d(0, -100%, 0);
    opacity:0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity:1;
  }
}
@keyframes fadeOut{
	from{
		opacity:1;
	}
	to{
		opacity:0;
	}
}
</style>

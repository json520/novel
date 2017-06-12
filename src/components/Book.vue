<template>
  <div class="book" :style="{'background':changeBg}">
  	
  	
  	<!-- 加载loading-->
  	<div class="isLoadingBox" v-if="isLoading"> <img src="../../static/load1.gif"/> </div>
  	 
  	<template v-else>
  		
  	<!--头部  S-->
  	<transition name="fade">
	    <div class="channel_title" v-if="isNave" >
		  	<img @click="goBack" class="channel_title_img_left" src="../../static/icon/nav_icon_back_default-1@2x.png"/>
		  	
		  	<router-link tag="p" :to="{path:'/details',query:{classId:novelId}}">书籍详情</router-link>
		  	<img @click="goBackIndex" class="channel_title_img_right" src="../../static/icon/2_defult.png"/>
		  </div>
	  </transition>
	  <!-- 头部 E-->
  	<main id="book_main" @click="touchMain" :style="{'font-size':fontSize,'height':appHeight}" >
  		<section>
	  		<header>{{dataList.chapterTitle}}</header>
	  		<p v-for="(item,i) in dataList.contents">{{item}}</p>
	  		<!--<p>大法兰克大姐夫拉斯快递劫匪了kasjdfasdlfkj是的佛教阿斯蒂芬阿斯蒂芬阿斯蒂芬阿萨德离开家阿萨德浪费空间阿萨德浪费空间啊是的咯看风景啊是的咯看风景啊是的咯看风景阿萨德看风景阿斯蒂芬来看看就阿斯蒂芬阿斯蒂芬阿斯蒂芬；离开家啊</p>
	  		<p>速度快发髻收到了开发科技局来看看就少撸点看我IE李庆伟哦，水电费离开了昆明，我我看我快快动动围绕  就请我诶积分阿萨德经济法撒地方啥地方看金蔷薇弗兰克激动的房间拉升的看蒋锋企为了看风景阿斯利康的风景企为了看风景阿斯利康大姐夫去晚了看离开家我IMOK哦哦哦</p>-->
  		</section>
  		
  	</main>
  	
  	<!--目录 S-->
  	<div class="catalog" :style="{'background':changeBg,'position':catalogStyleP,'bottom':catalogStyleB}">
  		<router-link tag="p" class="catalog_menu" :to="{path:'/catalog',query:{classId:novelId}}">目录</router-link>
  		
  		<router-link v-if="isOkChapter" tag="p" class="catalog_last" :to="{path:'/book',query:{classId:novelId,chapterId:lastChapterId,contentUrl:lastContentUrl}}">上一章</router-link>
  		<p v-else class="isNoChapter">上一章</p>
  		<router-link v-if="isOkNextChapter" tag="p" class="catalog_next"  :to="{path:'/book',query:{classId:novelId,chapterId:chapterId,contentUrl:contentUrl,isNext:1}}" :chapterId="chapterId" :contentUrl="contentUrl">下一章</router-link>
  		<p v-else class="isNoChapter">下一章</p>
  	</div>
  	<!--目录 E-->
  	
  	<!-- menu S -->
  	<transition name="fadedown">
  	
  	<div class="menu_wrapper" v-if="isMenu">
  		<!--设置弹窗-->
  	<transition name="fadeset">
  		
	  	<div class="set_wrapper" v-if="isSettimg">
	  		<div class="font_size_box">
	  			<span class="font_size_title">字号大小：</span>
	  			<p @click="setFontSizeSmall" class="small_font_size" :class="{active:indexSmall==activeIndex}">小号</p>
	  			<p @click="setFontSizeNormall" class="normal_font_size" :class="{active:indexNormal==activeIndex}">标准</p>
	  			<p @click="setFontSizeBig" class="big_font_size" :class="{active:indexBig==activeIndex}">大号</p>
	  		</div>
	  		<div class="bg_color_box">
	  			<span class="bg_color_title">背景颜色：</span>
	  			<p @click="MchangeBg" class="day_color" style="background:#fff;" :class="{active:indexWhite==dayBg}">白天</p>
	  			<p @click="MchangeBg" class="night_color" style="background:#111;" :class="{active:indexBlack==dayBg}">夜晚</p>
	  			<p @click="MchangeBg" class="reminiscence_color" style="background:#f0e2c4;" :class="{active:indexRetor==dayBg}">怀旧</p>
	  			<p @click="MchangeBg" class="protect_color" style="background:#c5e0c5;" :class="{active:indexEye==dayBg}">护眼</p>
	  		</div>
	  	</div>
  			
  	</transition>
  		<ul class="menu_list">
  			<router-link tag="li" :to="{path:'/catalog',query:{classId:novelId}}">
  				<img  src="../../static/icon/3_defult.png"/>
  				<!--<img src="../../static/icon/3_click.png" />-->
  				<span>目录</span>
  			</router-link>
  			
  			<li @click="setBlack" v-if="ifDayNight">
  				<img src="../../static/icon/4_defult.png"/>
  				<span>夜间</span>
  			</li>
  			<li @click="setBlack" v-else class="active">
  				<img src="../../static/icon/8_click.png"/>
  				<span>日间</span>
  			</li>
  			
  			<li @click="setSetting" v-if="ifSetting">
  				<img src="../../static/icon/7_defult.png"/>
  				<span>设置</span>
  			</li>
  			<li @click="setSetting" v-else class="active">
  				<img src="../../static/icon/7_click.png"/>
  				<span>设置</span>
  			</li>
  			
  			<li @click="setOffLine" v-if="ifOffLine">
  				<img src="../../static/icon/5_defult.png"/>
  				<span>离线</span>
  			</li>
  			<li @click="setOffLine" v-else class="active">
  				<img src="../../static/icon/5_click.png"/>
  				<span>离线</span>
  			</li>
  			
  			<li @click="setLove" v-if="ifLove">
  				<img src="../../static/icon/6_defult.png"/>
  				<span>喜欢</span>
  			</li>
  			<li @click="setLove" v-else class="active">
  				<img src="../../static/icon/6_click.png"/>
  				<span>喜欢</span>
  			</li>
  			
  		</ul>
  	</div>
  		
  	</transition>
  	<!--menu E-->
  	
  	<!-- mask S-->
  	<v-alert-free style="display:none"></v-alert-free>
  	
  	<!-- first mask S-->
  	<div class="guide_mask_wrapper" v-if="isFirst" @click="closeMask">
  		<div class="guide_mask">
  			<img src="../../static/icon/11.png"/>
  			<p class="guide_text">点击中间出现目录</p>
  		</div>
  	</div>
  	<!--喜欢的弹窗-->
  	<div class="love_mask" style="display:none">
  		<p>添加本书到书架</p>
  	</div>
  	
  	<!-- first mask E-->
  	
  	
  	
  	</template>
  	<!-- footer S-->
  	<v-footer :footerBoxColor="footerBoxColor" :footerStyle="footerStyle" :footerBg="footerBg"></v-footer>
  	<!-- footer E-->
  	
  </div>
</template>

<script>
	import VAlertFree from '@/components/AlertFree'
	import VFooter from '@/components/Footer'
	import axios from 'axios'
	let getuuid = localStorage.getItem("pgv_pvi");
	let uuid = null;
	if(getuuid){
		uuid = getuuid;
	}else{
		uuid = 'uuid';
	};
export default {
  name: 'book',
  components:{
  	VAlertFree,
  	VFooter
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      dataList:'',
      footerBoxColor:'', //footer-box的颜色
      dataChapterList:'',
      lastChapter:'', //上一章
      nextChapter:'', //下一章
      nowIndex:'', //当前章节的下标
      wrapperIndex:'', //当前章节外围的下标
      chapterId:'', //下一章当前章节的id
      contentUrl:'', //下一章当前章节的url
      lastChapterId:'', //上一章
      lastContentUrl:'',//上一章
      novelId:'', //id
      isFirst	:true, //显示第一次弹窗
      isMenu:false,		//显示底部菜单
    	isNave:false,		//显示顶部菜单
    	isBlack:false,	//切换颜色条件
    	changeColor:'', //点击夜间背景颜色
    	isSettimg:false, //设置
    	chapterTitle:'', //章节标题
    	fontSize	:'50px',
    	changeBg:'white',
    	ifDayNight:true, //夜间图标切换
    	ifSetting:true, //设置图标切换
    	ifOffLine:true, //离线图标切换
    	ifLove:true,  //喜欢图标切换
    	haveSameKey:false, //判断最近阅读有没有相同的
    	recentlyChapter:'',  //阅读到的章节
    	nowChapter:'',  //阅读到的chapterid
    	isLoading:true,
    	indexSmall:'0', //字体下标
    	indexNormal:'1',
    	indexBig:'2',
    	activeIndex:'1',
    	indexWhite:'0',  //设置背景颜色白天下标
    	indexBlack:'1', //黑夜
    	indexRetor:'2', //怀旧
    	indexEye:'3', //护眼
    	dayBg:'0', //默认控制值
    	isOkChapter:true, //有上一章可以点击
    	isOkNextChapter:true, //有下一章可以点击
    	footerStyle:'', //设置footer定位
      footerAbsolute:false, //判断是否为定位
      catalogStyleP:'static', //设置目录定位
      catalogStyleB:'', //设置目录bottom
      appHeight:'', //当出现定位的时候加高app的高度
      footerBg:''   //footerWrapper的颜色
    }
  },
  methods : {
  	initHandle(){ //初始化数据
  		
  	},
  	goBack () {
  		this.$router.go(-1);
  	},
  	getAjaxData (){ //
//		alert("第一次请求数据")
  		this.isLoading = true;
  		var params = this.$route.query;
  		var classId = params.classId;
  		this.novelId = classId;
  		var chapterId = params.chapterId
  		var contentUrl = params.contentUrl
  		let bookFirstChapter;
  		//获取本书最开始的章节id
//		firstChapterId
  		let items = JSON.parse(sessionStorage.getItem("RECENTLY_READ"));
//		console.log(items)
  		if(items && items instanceof Array){
  			
  			items.forEach(function(item,i){
  					if(classId == item.novelId){
  						bookFirstChapter = item.firstChapterId;
  						return
  					}
  			})
  		}
//		console.log("最开始章节"+bookFirstChapter)
  		
  			axios.get('http://139.196.150.50:8086/novelApi/mobile/novel/transcodeNovelContentUrl.do',{
  				params:{
  					version : 30000,
	  				system	:	'h5',
	  				device	: uuid,
	  				product : '1',
	  				novelId	:	classId,
	  				chapterId:chapterId,
	  				url		:	contentUrl
  				}
  			})
  			.then((response) =>{
							
  				this.dataList = response.data.data;
//							alert(this.dataList)
  				this.nowChapter = response.data.data.chapterId //设置当前章节id
  				this.chapterTitle = response.data.data.chapterTitle; 
  				
					this.addRecentlyRead();
  				this.isLoading = false;
  				
  				this.listenFooter();
  				if(chapterId == bookFirstChapter){
//					alert("第一个章节了")
  					this.isOkChapter = false;
  				}else{
  					this.isOkChapter = true;
  				}
  				
  				
  				
  			})
  			.catch((error) =>{
  				console.log(error)
  			})
  	},
  	getAjaxChapterData (){//获取目录 用以在当前页面点击下一页
//		alert("初始化目录")
  		var _this = this
  		var params = this.$route.query;
  		var classId = params.classId;
  		var ParamschapterId = params.chapterId
//		var chapterId = params.startChapterId;
			 axios.get('http://139.196.150.50:8086/novelApi/mobile/novel/getChapterList.do',{
			 		params:{
			 				version : 30000,
			 				system	:	'h5',
  						device	: uuid,
  						product : '1',
  						novelId	: classId,
  						startChapterId:'0',
  						chapterMaxCount:'10000'
			 		}
			 })
			 .then((response) =>{
//			 	console.log(response)
			 		var ss = response.data.data;
			 		var chapterArray = []
			 			ss.forEach(function(item,i){
			 				item.chapters.forEach(function(item,i){
			 					
			 						chapterArray.push(item)
			 				});
			 			});
			 			this.dataChapterList = chapterArray;
			 			let s = chapterArray;
			 			let _this = this;
						console.log(s)
			 			for(var i = 0; i < s.length; i++){
			 				
									if(ParamschapterId == s[i].chapterId){
											console.log(i)
											console.log(s[i+1])
											//设置下一章
											if(s.includes(s[i+1])){ //如果有
												this.chapterId = s[i+1].chapterId; //下一个chapterId
												this.contentUrl =  s[i+1].contentUrl;
												
												this.isOkNextChapter = true;
											}else{
//												alert("没有最后一章");
												this.isOkNextChapter = false;
											}
											
											//设置上一章
											if(ParamschapterId == s[0].chapterId){  //为第一章
														this.isOkChapter = false
											}else{
												
													if(s.includes(s[i-1])){ //如果有上一章则设置上一章的id和contentUrl
														this.lastChapterId = s[i-1].chapterId;
														this.lastContentUrl = s[i-1].contentUrl;
														this.isOkChapter = true;
														
													}else{
														this.isOkChapter = false;
													}
											}
											
			 								break;
									}

			 			}
			 			
			 })
			 .catch((error) =>{
			 	console.log(error)
			 })
  	},
  	addAjaxData (){ //通过参数动态添加class
//		alert("jia")
		this.isOkNextChapter = true;  //初始化;
		this.isLoading = true;
		var params = this.$route.query;
		var classId = params.classId;
		var ParamschapterId = params.chapterId
  	var paramsContentId = params.contentUrl	
  	var haveNext = params.isNext;	
  	
  		axios.get('http://139.196.150.50:8086/novelApi/mobile/novel/transcodeNovelContentUrl.do',{
  				params:{
  					version : 30000,
	  				system	:	'h5',
	  				product : '1',
	  				device	: uuid,
	  				novelId	:	classId,
	  				chapterId:ParamschapterId,
	  				url		:	paramsContentId
  				}
  			})
  			.then((response) =>{
						let resData = response.data.data;
						this.dataList = resData;
						this.nowChapter = resData.chapterId  //阅读到的当前章节
						let s = this.dataChapterList;
						let $this = this;
						let currentChapterId = null;
						
						//加个标识符识别点击的是上一章还是下一章
						if(haveNext){
//							alert("下一章")
							currentChapterId = $this.chapterId
						}else{
//							alert("上一章")
							currentChapterId = $this.lastChapterId
						};
						
//						//如果当前id就是最后一个id!那么下一章不可点击
//						if(s[i+1].chapterId ==  s[s.length -1].chapterId){
//							this.isOkNextChapter = false;
//						}else{
//							this.isOkNextChapter = true;
//						}	
							
						for(var i = 0; i < s.length; i++){
								//如果当前章节id在数组里面有，则下一章节和上一章节都有
								
								
								if(s[i].chapterId == currentChapterId){
								//设置下一章：如果有下一章的！则设置id和contenturl,没有则不可点击
										
										if(s.includes(s[i+1])){ 
											this.chapterId = s[i+1].chapterId;
											this.contentUrl =  s[i+1].contentUrl;
											this.isOkNextChapter = true;
										}else{
//											alert("没有最后一章")
											this.isOkNextChapter = false;
										};
										
										//设置上一章：有则设置id和contentUrl,没有则不可点击		
								
										if(ParamschapterId == s[0].chapterId){  //为第一章
													this.isOkChapter = false
										}else{
											
												if(s.includes(s[i-1])){ //如果有上一章则设置上一章的id和contentUrl
													this.lastChapterId = s[i-1].chapterId;
													this.lastContentUrl = s[i-1].contentUrl;
													this.isOkChapter = true;
													
												}else{
													this.isOkChapter = false;
												}
										};
											
			 								break;
								}else{ //是从目录点击进入的
											
								
								}

			 			}
						console.log("执行了定位")
						this.listenFooter(); //设置footer是否定位
						this.addRecentlyRead() //添加到最近阅读
						this.isLoading = false; //取消loading
  			})
  			.catch((error) =>{
  				console.log(error)
  			})
  		
  	},
  	lastAjaxData (){ //上一章
  		axios.get('http://139.196.150.50:8086/novelApi/mobile/novel/transcodeNovelContentUrl.do',{
  				params:{
  					version : 30000,
	  				system	:	'h5',
	  				product : '1',
	  				device	: uuid,
	  				novelId	:	this.novelId,
	  				chapterId:this.chapterId,
	  				url		:	this.contentUrl
  				}
  			})
  			.then((response) =>{
						let resData = response.data.data;
						this.dataList = resData;
						let s = this.dataChapterList;
						let $this = this;
//						console.log(s)
						for(var i = 0; i < s.length; i++){
//			 				console.log(i)
									if(s[i-1].chapterId == $this.chapterId){
											$this.chapterId = $this.chapterId-1 ; //下一个chapterId
											$this.contentUrl =  s[i-1].contentUrl;
			 								return
									}

			 			}
						

  			})
  			.catch((error) =>{
  				console.log(error)
  			})
  	},
  	firstInto (){ //每次刷新判断是否是第一次进入
//		alert("是第一次进入")
  		var getFirstInto = localStorage.getItem("firstIntoKey")
  		if(getFirstInto){
  				this.isFirst = false;
  		}else{
				  this.isFirst = true;
  		}
  		
  	},
  	closeMask (){ //第一次进入关闭弹窗
  		this.isFirst = false;
  		localStorage.setItem("firstIntoKey","1")
  	},
  	touchMain (){ //点击中间呼出菜单
  		
  			this.isMenu = !this.isMenu
  			this.isNave = !this.isNave
  	},
  	setBlack (){ //设置夜间白天
  		this.ifDayNight = !this.ifDayNight
  		this.isBlack = !this.isBlack;
  		let bgKey;
  		if(this.isBlack){
  			this.changeBg = "black"
  			this.dayBg = '1'
//			document.querySelector(".footer_btn_box").style ="background:#404040"
			this.footerBoxColor = "#404040"
  			bgKey = "rgb(17, 17, 17)"
  		}else{
  			this.changeBg = "white";
  			this.dayBg = '0';
//			document.querySelector(".footer_btn_box").style ="background:"
			this.footerBoxColor = "";
  			bgKey = "rgb(255, 255, 255)"
  		}
  		
  		localStorage.setItem("BACKGROUND",bgKey)
  	},
  	setSetting (){ //点击设置
  		this.ifSetting = !this.ifSetting;
  		this.isSettimg = !this.isSettimg
  	},
  	setFontSizeBig (){ //设置大号字体
  		var fontSizeKey = localStorage.getItem("FONT_SIZE");
  		if(fontSizeKey && fontSizeKey == "60px"){
  			this.fontSize = fontSizeKey;
  		}else{
				this.fontSize = "60px"
  			localStorage.setItem("FONT_SIZE","60px")
  		}
  		this.activeIndex = '2'
  	},
  	setFontSizeSmall (){ //设置小号字体
  		var fontSizeKeySmall = localStorage.getItem("FONT_SIZE");
  		if(fontSizeKeySmall && fontSizeKeySmall == "40px"){
  			
  			this.fontSize = fontSizeKeySmall;
  		}else{
//			document.querySelector("#book_main").style.cssText = "font-size:60px"
				this.fontSize = "40px"
  			localStorage.setItem("FONT_SIZE","40px")
  		}
  		this.activeIndex = '0'
  	},
  	setFontSizeNormall (){ //设置默认字体
  		var fontSizeKeyNormall = localStorage.getItem("FONT_SIZE");
  		if(fontSizeKeyNormall && fontSizeKeyNormall == "50px"){
  			this.fontSize = fontSizeKeyNormall;
  		}else{
//			document.querySelector("#book_main").style.cssText = "font-size:60px"
				this.fontSize = "50px"
  			localStorage.setItem("FONT_SIZE","50px")
  		}
  		this.activeIndex = '1'
  	},
  	resetUserSet (){ //每次进入重置用户设置
  		var fontSizeKey = localStorage.getItem("FONT_SIZE");
  		var bgKey = localStorage.getItem("BACKGROUND");
  		if(fontSizeKey){
  			this.fontSize = fontSizeKey;
  		};
  		if(bgKey){
  			this.changeBg = bgKey;
//			console.log(bgKey)
  			if(bgKey == "rgb(17, 17, 17)" ){
	  			
	  			this.dayBg = '1'
//	  			console.log(document.getElementById("footer_btn_box"))
//	  			console.log(document.querySelector(".footer_btn_box"))
//	  			document.querySelector(".footer_btn_box").style="background:#404040"
	  		}else{
//	  			document.querySelector(".footer_btn_box").style="background:"
	  			if(bgKey == "rgb(255, 255, 255)"){
	  				this.dayBg = '0'
	  			}else if(bgKey == "rgb(240, 226, 196)"){ //怀旧
	  				this.dayBg = '2'
	  			}else if(bgKey == "rgb(197, 224, 197)"){ //护眼
	  				this.dayBg = '3'
	  			}
	  		}
  			
  		};
  	},
  	MchangeBg (event){ //点击改变颜色
  		this.ifDayNight = true;
  		var el = event.currentTarget;
  		var bgKey = el.style.background;
//		alert(bgKey)
  		if(bgKey == "rgb(17, 17, 17)" ){
//			alert("夜晚")
  			this.dayBg = '1'
//			alert(document.querySelector(".footer_btn_box"))
//			document.querySelector(".footer_btn_box").style="background:#404040"
				this.footerBoxColor = "#404040"
  		}else{
//			document.querySelector(".footer_btn_box").style="background:"
				this.footerBoxColor = ""
  			if(bgKey == "rgb(255, 255, 255)"){
//				alert("白天")
  				this.dayBg = '0'
  			}else if(bgKey == "rgb(240, 226, 196)"){ //怀旧
//				alert("怀旧")
  				this.dayBg = '2'
  			}else if(bgKey == "rgb(197, 224, 197)"){ //护眼
//				alert("护眼")
  				this.dayBg = '3'
  			}
  		}
  		this.changeBg = bgKey;
  		localStorage.setItem("BACKGROUND",bgKey)
  	},
  	setCatalog (){ //点击目录
  		
  	},
  	setOffLine	(){ //点击离线
		
  			location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=cn.zhangyoukeji.browser.jisou"
  	},
  	setLove (){ //点击喜欢
  			this.ifLove = !this.ifLove
  			var params = this.$route.query;
				var novelId = params.classId;
				var loveObj
				var loveIdx
				let items = JSON.parse(sessionStorage.getItem("RECENTLY_READ"));
				//  
				
  			if(this.ifLove){
		  		
//		  		console.log(item)
		  		var redKey = JSON.parse(localStorage.getItem("MY_BOOK"));
		  		var setKey = [];
		  		if(redKey && redKey instanceof Array){
		  			
		  				redKey.push(item);
		  				setKey = redKey
		  		}else{
		  			setKey.push(item)
		  		}
		  		localStorage.setItem("MY_BOOK",JSON.stringify(setKey))
  			}else{
  				items.forEach(function(item,i){
		  			if(item.novelId == novelId){
		  					loveObj = item;
		  					loveIdx = i;
		  			}
		  			
		  		});
		  		
		  		
  				
  			}
  	},
  	addBookrack () { //添加到自己书架
  		
  	},
  	goBackIndex (){ //返回首页
    	this.$router.push('/channel');
    },
    addRecentlyRead () { //添加到最近阅读
    	 
    var params = this.$route.query;
		var novelId = params.classId;
		var chapterId = params.chapterId
		let contentUrl = params.contentUrl
 
		var _this = this
		var redKey = JSON.parse(sessionStorage.getItem("RECENTLY_READ"));
		var setKey = [];
		var nowItem
		var nowIndex
//		console.log(redKey) 
		//从详情页进入会有最近阅读的id，从书架进入没有最近阅读
		if(redKey && redKey instanceof Array ){ 
			
			redKey.forEach(function(item,i){
//				console.log(item)
					if(novelId == item.novelId){
//						console.log(item)
							_this.haveSameKey = true;
							
							nowItem = item  //本地存储的元素
							nowIndex = i   //在本地存储的当前index
							return 
					}
			});
//			alert(1111)
			if(!_this.haveSameKey){ 
//				alert("已添加")
				setKey = redKey;
				
			}else{//有存储
//				alert("添加成功")
					var firstId = nowItem.firstChapterId //第一个id
					var nowId = _this.nowChapter //现在的id
					var recentlyChapter
					
					if(nowId > firstId){
						 recentlyChapter = nowId-firstId+1
					}else if(nowId === firstId){
						recentlyChapter = 1
					}else{
						recentlyChapter = 1
					};
					
				nowItem.isreaded = true;
				nowItem.recentlyRead = recentlyChapter;
				nowItem.chapterId = chapterId ; 
				nowItem.contentUrl = contentUrl;
//					console.log(nowItem)
					//删除存储里面的对象，然后把修改的放进去
				redKey.splice(nowIndex,1) 	
				redKey.push(nowItem);
				setKey = redKey;
				_this.haveSameKey = false;
//				console.log(setKey)
			};
//			console.log(setKey)
				sessionStorage.setItem("RECENTLY_READ",JSON.stringify(setKey));
//				console.log(sessionStorage.getItem("RECENTLY_READ"))
//					console.log(sessionStorage.getItem("RECENTLY_READ"))
				
			}else{
					//没有最近阅读
			}
		
	},
	listenFooter(){ //计算判断footer是否需要定位
  		let $this = this
//			catalogStyleP
				$this.appHeight = "" ; 
  			var checkFooter = setInterval(function(){
				let bodyH = document.documentElement.clientHeight; //获取可视区域高度
				let appH;
				let footerH = document.querySelector(".footer_wrapper").offsetHeight; //footer组件高度
				let catalogH = document.querySelector(".catalog").offsetHeight; //catalog高度
				let bodyBg = document.querySelector(".book").style.background;
				
//					alert("测试 地步的高度"+footerH)
					if($this.footerAbsolute){ //footer定位也就是
						appH = document.getElementById("app").offsetHeight + footerH +catalogH;
					}else{
						appH = document.getElementById("app").offsetHeight;
					};
					if(bodyH - appH >0){
						//把底部设置为定位
//						console.log("要定位")
						$this.footerStyle = "absolute";
						$this.footerBg = bodyBg;
						$this.footerAbsolute = true;
						$this.catalogStyleP = "absolute";
						$this.catalogStyleB = footerH+'px';
						$this.appHeight = bodyH-footerH + 'px'
						
					}else if(bodyH - appH <0){
						//把底部取消定位
//						console.log("不定位")
						$this.footerStyle = "static";
						$this.footerBg = "";
						$this.footerAbsolute = false;
						$this.catalogStyleP = "static";
						$this.catalogStyleB = ''
						$this.appHeight = ''
					}
			
				clearInterval(checkFooter)
			},500)
  			
  	}
  	
  },
  watch : {
//	'$route' :'addAjaxData'
	
  	$route (){
  		
//		alert("路由变化进入！")
  		
  		console.log('下一章的chapterid是',this.chapterId)
  		console.log('下一章的contentUrl是',this.contentUrl)
  		this.isMenu = false;
  		this.isNave = false;
  		let classId = this.$route.query.classId;
//			alert("改编")
  			//在第二次进入判断是不是同一个novelId!是的话就继续下一页。不是的话就进行重新请求
  			console.log("点击进入的id="+classId)
  			console.log("this.novelId="+this.novelId)
  			
  			if(classId && this.novelId){
  		
	  			if(classId == this.novelId){
	  				console.log("是同一本书！")
	  				
	  				this.addAjaxData();
	  			}else{
//	  				alert("不是同意本书")		
	  				console.log("不是同一本！重新请求")
	  				
	  				this.getAjaxData();
	  				this.getAjaxChapterData();
	  				
	  			}
	  		
	//		this.getAjaxChapterData();
					console.log(this.novelId)
					
  		}	
				
  	}
  },
//beforeRouteUpdate(to,from,next){
//	console.log(to,from)
//	alert("当前组件复用")
//	this.addAjaxData();
//	
//},
  mounted (){
		
  	this.getAjaxData() //请求中文
  	this.firstInto() //第一次进入
  	this.resetUserSet();  //还原用户设置
  	this.getAjaxChapterData() //获取目录
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.book{
		background:white;
	}
#book_main{
	padding:0 0.3rem;
}
/*header S*/
.channel_title{
	width:100%;
	height:0.88rem;
	line-height:0.88rem;
	font-size:0.36rem;
	color:#333;
	position:fixed;
	top:0;
	left:0;
	z-index:99;
	border-bottom:solid 1px #e1e1e1;
	background:white;
	
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
	height:0.28rem;
	position:absolute;
	right:0.3rem;
	top:0;
	bottom:0;
	margin:auto 0;
	z-index:1;
	
}
.channel_title p{
	width:1.36rem;
	height:0.44rem;
	text-align:center;
	line-height:0.44rem;
	font-size:0.28rem;
	color:#333;
	border:solid 1px #777878;
	border-radius:0.04rem;
	position: absolute;
	left:1.1rem;
	top:0;
	bottom:0;
	margin:auto 0;
	z-index:2;
}

/* header E*/
/* section S*/
#book_main{
	font-size:50px;
}
section{
	width:100%;
}
section header{
	font-size:0.46em;
	font-weight:bold;
	color:#333;
	padding-top:0.1rem;
	margin-bottom:0.55rem;
}
section header i{
	margin-right:0.4rem;
	font-style: normal;
}
section p{
	font-size:0.4em;
	color:#333;
	line-height:0.7rem;
	padding-bottom:0.56rem;
}
/* section E*/

/* menu S*/
.menu_wrapper{
	width:100%;
	
	position: fixed;
	bottom:0;
	left:0;
	z-index:99;
	margin:0 auto;
	background:white;
	
}
.menu_list{
	height:0.98rem;
	padding:0 0.6rem;
	overflow:hidden;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:justify;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:justify;
	border-top:solid 1px #a5a5a5;
	
}
.menu_list li{
	height:100%;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	-webkit-box-orient:vertical;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:center;
	-moz-box-orient:vertical;
	color:#333;
}
.menu_list li img{
	width:0.38rem;
	height:0.38rem;
	margin-bottom:0.1rem;
}
.menu_list li span{
	display:block;
	font-size:0.22rem;
	
}
.menu_list li.active{
	color:#ff6600;
}
/* menu E*/
/*目录	*/
.catalog{
	width:100%;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:justify;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:justify;
	height:1.3rem;
	border-top:solid 1px #eaeaea;
	left:0;
	z-index:1;
}
.catalog p{
	font-size:0.34rem;
	color:#404040;
	border:solid 1px #404040;
	border-radius: 0.04rem;
	width:1.36rem;
	height:0.54rem;
	text-align:center;
	line-height:0.54rem;
}
.catalog_menu{
	margin-left:0.3rem;
}
.catalog_next{
	margin-right:0.3rem;
}
/*　目录　Ｅ*/
/* first mask S*/
.guide_mask_wrapper{
	background:rgba(0,0,0,0.7);
	position: fixed;
	left:0;
	right:0;
	top:0;
	bottom:0;
	z-index:101;
	margin:auto;
	display: -webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	display: -moz-box;
	-moz-box-align:center;
	-moz-box-pack:center;
	
}
.guide_mask{
	display: -webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	-webkit-box-orient:vertical;
	display: -moz-box;
	-moz-box-align:center;
	-moz-box-pack:center;
	-moz-box-orient:vertical;
}
.guide_mask img{
	width:0.8rem;
	margin-bottom:0.1rem;
}
.guide_text{
	font-size:0.38rem;
	color:#ff6600;
}
/* first mask E*/
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
.love_mask p{
	background:rgba(0,0,0,0.3);
	border-radius:0.04rem;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	font-size:0.28rem;
	height:0.6rem;
	line-height:0.6rem;
	padding:0 0.2rem;
}
.set_wrapper{
	/*position: fixed;*/
	left:0;
	bottom:0;
	margin:auto;
	z-index:101;
	background:white;
	width:100%;
	/*-webkit-box-shadow:0px -0.05rem 0.05rem #a5a5a5;*/
	/*box-shadow:0px -0.05rem 0.05rem #a5a5a5;*/
	border-top:solid 1px #a5a5a5;
	
}
.font_size_box,.bg_color_box{
	font-size:0.28rem;
	color:#777878;
	height:1.14rem;
	line-height:1.14rem;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:start;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:start;
}

.bg_color_box{
	height:1.5rem;
	line-height:1.5rem;
	border-top:solid 1px #e1e1e1;
}
.font_size_box p{
	margin-left:0.4rem;
	border:solid 1px #777878;
	text-align:center;
	width:1.26rem;
	height:0.54rem;
	line-height:0.54rem;
	border-radius: 0.04rem;
}
.font_size_box p.active{
	border:solid 1px #ff6600;
	color:#ff6600;
}
.bg_color_box p{
	margin-left:0.4rem;
	width:0.76rem;
	height:0.76rem;
	text-align:center;
	line-height:0.76rem;
	border-radius: 50px;
}
.bg_color_box p.active{
	border:solid 2px #ff6600;
}
.font_size_title,.bg_color_title{
	margin-left:0.4rem;
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
.catalog .isNoChapter{
	color:#ccc;
	border:solid 1px #ccc;
	margin-right:0.3rem;
}

/*向下滑动的动画和向上滑动的动画*/

.fade-enter-active {
 
  animation:fold-in 0.5s ease;
}
.fade-leave-active {
  
 animation:fold-out 0.5s ease;
}


.fadedown-enter-active{
	animation:fold-up 0.5s ease;
}
.fadedown-leave-active{
	animation:fold-down 0.5s ease;
}


.fadeset-enter-active{
	animation:fadeset-up 0.5s ease;
}
.fadeset-leave-active{
	animation:fadeset-down 0.5s ease;
}
/*顶部动画*/
@keyframes fold-in {
  0% {
    transform: translate3d(0, -100%, 0);
    opacity:0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity:1;
  }
}

@keyframes fold-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity:1;
  }
  100% {
    transform: translate3d(0, -100%, 0);
    opacity:0;
  }
}
@-webkit-keyframes fold-in {
  0% {
    transform: translate3d(0, -100%, 0);
    opacity:0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity:1;
  }
}

@-webkit-keyframes fold-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity:1;
  }
  100% {
    transform: translate3d(0, -100%, 0);
    opacity:0;
  }
}

/*底部动画*/
@keyframes fold-up {
  0% {
    transform: translate3d(0, 100%, 0);
    opacity:0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity:1;
  }
}
@keyframes fold-down {
  0% {
    transform: translate3d(0, 0, 0);
    opacity:1;
  }
  100% {
    transform: translate3d(0, 100%, 0);
    opacity:0;
  }
}
@-webkit-keyframes fold-up {
  0% {
    transform: translate3d(0, 100%, 0);
    opacity:0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity:1;
  }
}
@-webkit-keyframes fold-down {
  0% {
    transform: translate3d(0, 0, 0);
    opacity:1;
  }
  100% {
    transform: translate3d(0, 100%, 0);
    opacity:0;
  }
}
/*底部设置动画*/
@keyframes fadeset-up{
	0% {
		transform:translate3d(0,100%,0);
		opacity:0;
	}
	100% {
		transform:translate3d(0,0,0);
		opacity:1;
		
	}
}
@keyframes fadeset-down{
	0%{
		transform:translate3d(0,0,0);
		opacity:1;
	}
	100%{
		transform:translate3d(0,100%,0);
		opacity:1;	
	}
}
@-webkit-keyframes fadeset-up{
	0% {
		transform:translate3d(0,100%,0);
		opacity:0;
	}
	100% {
		transform:translate3d(0,0,0);
		opacity:1;
		
	}
}
@-webkit-keyframes fadeset-down{
	0%{
		transform:translate3d(0,0,0);
		opacity:1;
	}
	100%{
		transform:translate3d(0,100%,0);
		opacity:1;	
	}
}
</style>

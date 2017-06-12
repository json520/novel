<template>
  <div class="bookrack">
    <header class="bookrack_header">
    		<div class="header_left" @click="goBakc">
    			<img v-if="isHeader" src="../../static/icon/nav_icon_back_default-1@2x.png"/>
    			<p v-else @click.stop="choiceAll">{{checkAllText}}</p>
    		</div>
    		<p>书架</p>
    		<div class="header_right">
    			<img v-if="isRentlyReadSearch" @click="toSearch" src="../../static/icon/search_default1@2x.png"/>
    			<template v-if="isRecentlyRead">
    				
	    			<template v-if="isHeader">
	    				<img @click="toSearch" src="../../static/icon/search_default1@2x.png"/>
	    					<p v-if="isManage" @click="choiceStart">管理</p>
	    			</template>
	    			<p v-else @click="cancelChange">取消</p>
	    			
    			</template>
    			
    			<p v-if="haveOneCheck" @click="choiceEnd">删除</p>	
    			
    		</div>
    </header>
    
    <div class="bookrack_btn_wrapper">
    	<div class="bookrack_btn_container">
    		<p :class="{active:isActiveA}" @click="clickMyBookrank">我的书架</p>
    		<p :class="{active:isActiveB}"@click="getDataLately">最近阅读</p>
    	</div>
    </div>
    <!--我的书架S-->
    <div v-if="isShowBook" class="bookrack_text_wrapper">
    	<ul class="bookrack_list">
    		<li @click="clickMyBook(item)" v-for="(item,index) in dataList"  :key="index">
    			<div class="bookrack_list_img_box">
    				<img class="bookrack_list_img" v-lazy="item.bookImage"/>
    				<div class="chapter_box">
    					<template v-if="item.isreaded">
    						<span>{{item.recentlyRead}}</span>/<span>{{item.chapterCount}}章</span>
    					</template>
    					<p v-else>未读</p>
    				</div>
    				<div class="bookrack_check_mask" v-if="checkMask">
		      		<div class="bookrack_type" @click.stop="change2(index)" > 
	    					<div class="check_img_box">
			      			<img v-if="!item.checked" src="../../static/icon/radio_default1@2x.png"/>
			      			<img v-else src="../../static/icon/radio_selected@2x.png"/>
			      		</div>
		      		</div>
    				</div>
    			</div>
    			<p class="bookrack_list_title">{{item.title}}</p>
    			
    		</li>
    		<!--添加加号S-->
    		<router-link v-if="isAddBookIcon" tag="li" :to="{path:'/channel'}"><img class="bookrack_list_img" src="../../static/icon/Add-to1@2x.png"/></router-link>
    		
    	</ul>
    </div>
    <!--我的书架E-->
    
    <!--最近阅读 S-->
    
    <div v-else class="bookrack_text_wrapper">
    	<ul class="bookrack_list">
    		<li @click="clickRecentlyRead(item)" v-for="(item,index) in latelyReadList"  :key="index">
    			<div class="bookrack_list_img_box">
    				<img class="bookrack_list_img" v-lazy="item.bookImage"/>
    				<div class="chapter_box">
    					<span >{{isRecentlyReadChapter === item.recentlyRead ? 0 : item.recentlyRead}}</span>/<span>{{item.chapterCount}}章</span>
    				</div>
    				<!--<div class="bookrack_check_mask" v-if="checkMask">
		      		<div class="bookrack_type" @click.stop="change2(index)" > 
	    					<div class="check_img_box">
			      			<img v-if="!item.checked" src="../../static/icon/radio_default1@2x.png"/>
			      			<img v-else src="../../static/icon/radio_selected@2x.png"/>
			      		</div>
		      		</div>
    				</div>-->
    			</div>
    			<p class="bookrack_list_title">{{item.title}}</p>
    			
    		</li>
    		<!--添加加号S-->
    		<!--<router-link tag="li" :to="{path:'/channel'}" class="add_mybook"><img src="../../static/icon/Add-to1@2x.png"/></router-link>-->
    		
    	</ul>
    </div>
    
    <!-- 最近阅读 E-->
    
    <!--mask S-->
    <div class="mask_wrapper" v-if="isMaskWrapper">
    	<div class="mask_container">
    		<div class="mask_text_box">
    			<img src="../../static/icon/1.png" />
					<p class="mask_text">确定删除所选的<span>{{deleteNum}}</span>本书籍吗？</p>
    		</div>
    		
				<div class="mask_btn_box">
					<p class="btn_cancel" @click="deleteCancel">取消</p>
					<p class="btn_confirm active" @click="deleteConfire">确定</p>
				</div>
				
    	</div>
    </div>
    <!--mask E-->
    
    <!-- footer S-->
  	<v-footer :footerStyle="footerStyle">
  		<div class="border_gray" slot="borderBar"></div>
  	</v-footer>
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
export default {
  name: 'bookrack',
  components:{
  	VFooter
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      checkAllText:'全选',
      isShowBook:true, //显示我的书架或最近阅读
      isHeader:true,  //显示完成和全选
      dataList:'', //书籍数据
      latelyReadList:'',//最近阅读数据
      isActiveA:true,		//我的书架显示class
      isActiveB:false, //最近阅读显示class
//    isdefault:false, //是否选中书籍
      checkedList:[], //选中框的box
      checkedDataList:[], //选中框的临时id存储
   		checkMask:false, //显示书本上面的遮罩层
   		isManage:true,  //显示管理
   		isMaskWrapper:false, //弹窗删除
   		deleteNum:'', //删除的书架数量
   		isCheckAll:false,  //是否选中所有
   		haveOneCheck:false, //选中最少一个书本的时候
   		isRentlyReadSearch:false, //在最近阅读的时候现在的搜索框
   		isRecentlyRead:true,  //在最近阅读的时候
   		isRecentlyReadChapter:'null',
   		isRecentlyReadChapters:'',
   		footerStyle:'', //设置footer定位
      footerAbsolute:false, //判断是否为定位
      haveSameKey:false,
      recentlyChapter:'0', //当前阅读到的章节数
      firstChapter:'', //立即阅读章节的数据
      isAddBookIcon:true  //点击管理的时候不显示+号
    }
  },
  computed:{
  	judgeChapter(item){
  		return 0
  	}
  },
  methods:{
  	initHandle(){ //初始化操作，在页面进入的时候进行初始化
  			
				this.isHeader = true;	//显示管理
				this.isActiveA = true;		//我的书架显示class
      	this.isActiveB =false; //最近阅读显示class
      	this.checkedDataList=[]; //选中框的临时id存储
   			this.checkMask=false; //显示书本上面的遮罩层
   			this.isManage=true;  //显示管理
   			this.isMaskWrapper=false; //弹窗删除
   			this.isCheckAll=false;  //是否选中所有
				this.haveOneCheck = false; //
				this.isRecentlyRead = true;
				this.isAddBookIcon = true;
				this.isRentlyReadSearch = false; //最近阅读的放大镜
  	},
  	goBakc () { //返回上一页
  		this.$router.go(-1);
  	},
  	cancelChange(){ //点击取消
  		this.checkMask = false;
  		this.isHeader = true;
  		this.isAddBookIcon = true;
  		this.listenFooter();
  	},
  	choiceStart (){ //点击管理
  		this.checkMask = true;
  		this.isHeader = false;
  		this.isAddBookIcon = false;
  		this.listenFooter();
  	},
  	choiceEnd(){ //点击完成
  		
  		this.isMaskWrapper = true;
  		let getdeleteNum = this.checkedDataList.length;
  		this.deleteNum = getdeleteNum
  	},
  	choiceAll(){ //点击全选
  		let allDataList = this.dataList;
  		this.isCheckAll = !this.isCheckAll;
  		let checkedIdArr = []
  		if(this.isCheckAll){ //选中所有
  				
  				this.haveOneCheck = true;
					this.isRecentlyRead = false;
  				this.checkAllText = "取消全选";
  				
  				allDataList.forEach(function(item,i){
  					item.checked = true;
  					checkedIdArr.push(item.novelId);
  				});
  				this.checkedDataList = checkedIdArr;
  				
  		}else{ //不选中所有
  				this.haveOneCheck = false;
					this.isRecentlyRead = true;
					this.checkAllText = "全选";
					
  				allDataList.forEach(function(item,i){
  					
  					item.checked = false;
  					
  				});
  				this.checkedDataList = [];
  		}
  		
  		
  		
  		
  	},
  	deleteConfire (){ //删除 点击确定
  		this.isMaskWrapper = false;
  		let _this = this
  		//循环this.checkedDataList中的数目，在localStorage中，如果出现，则删除
  		let checkedList = this.checkedDataList; //选中的id数组
  		let dataList = this.dataList //书架里有的
  		for(var i = 0; i< checkedList.length; i++){
  				for(var j = 0; j<dataList.length ; j++ ){
//					 console.log(1)
  					 if(checkedList[i] == dataList[j].novelId){
  					 			
  					 			_this.dataList.splice(j,1)
  					 			
  					 }
  				}
  		};
  		//删除完后其他所有都还原
  		let  setArr = this.dataList; 
  		localStorage.setItem("MY_BOOK",JSON.stringify(setArr)) //同步到本地
  		this.checkedDataList = []   //重置临时存储选中的id
  		this.isHeader = true;				//完成复原 全选复原
  		this.checkMask = false;			//所有遮罩层去掉
			this.isAddBookIcon = true;  //+号显示
  		this.haveOneCheck = false;
  		this.isRecentlyRead = true;
  		
  		this.listenFooter();
  		
  	},
  	deleteCancel (){ //删除 点击取消
  		this.isMaskWrapper = false;
  	},
  	change2 (index) { //选择书本获取id
  		var _this = this;
//			haveOneCheck
		
  			//获取当前对象
  			var obj = this.dataList;
  			//当当前点击为true时，改为false,不能用变量obj会不生效
  				this.dataList[index].checked = !this.dataList[index].checked;
  				//如果选中了放进去
  				var checkedId = obj[index].novelId
  				if(this.dataList[index].checked){
  					this.checkedDataList.push(checkedId)
  				}else{
  					var checkIdx;
  					this.checkedDataList.forEach(function(item,i){
  							
  							if(item == checkedId){
  								//如果里面有了这个id,获取他在里面当前的下标
  								checkIdx = i
  								return 
  							};
  					});
  					//删除里面的id
  					this.checkedDataList.splice(checkIdx,1);
  				};
  				
  					if(this.checkedDataList.length > 0){
								this.haveOneCheck = true;
								this.isRecentlyRead = false;
								
						}else{
							this.haveOneCheck = false;
							this.isRecentlyRead = true;
						}
			
  	},

		clickMyBookrank (){
			this.isActiveA = true;
			this.isActiveB = false;
			this.isShowBook = true; //显示我的书架
			this.isRecentlyRead = true;
  		this.isRentlyReadSearch = false;
			this.saveMyBookrack();
			
			this.listenFooter();
		},
  	getDataLately () { //获取最近阅读的数据
  			
  			
  			this.initHandle(); //初始化显示
  			
  			this.isActiveB = true;
  			this.isActiveA = false;
  			this.isShowBook = false; //显示最近阅读
  			this.isRecentlyRead = false;
  			this.isRentlyReadSearch = true;
  			
  			
  			this.syncMyBookrackRecently();
  			this.listenFooter();
  			
  	},
  	syncMyBookrackRecently(){ //同步我的书架和最近阅读
  			//获取localStorage的RECENTLY_READ 值  返回的是一个数组对象
  			var redKey = JSON.parse(sessionStorage.getItem("RECENTLY_READ"));
  			var getMyBook = JSON.parse(localStorage.getItem("MY_BOOK")); //默认书架
  			
  			this.latelyReadList = redKey
  			console.log(getMyBook)
  			console.log(redKey)
  			//把默认的书架和
  			if(redKey && getMyBook){
  			
	  			for(var i = 0; i< redKey.length;	i++){
	  				
	  				for(var j = 0; j< getMyBook.length; j++){
							
	  					if(redKey[i].novelId == getMyBook[j].novelId){
	  						console.log(redKey[i])
								getMyBook[j].isreaded = redKey[i].isreaded
								getMyBook[j].recentlyRead = redKey[i].recentlyRead
								getMyBook[j].chapterId = redKey[i].chapterId
								getMyBook[j].contentUrl = redKey[i].contentUrl
								
								
								//要id,chapter,url
								
	  					}
	  				}
	  			}
  			}	
  			console.log(getMyBook)
  			localStorage.setItem("MY_BOOK",JSON.stringify(getMyBook));
  	},
  	saveMyBookrack (){ //把默认的书架保存到本地
  		this.isActiveA = true;
			this.isActiveB = false;
			
  		var getMyBook = JSON.parse(localStorage.getItem("MY_BOOK"))
  		if(getMyBook){

  			this.dataList = getMyBook
  		}else{

  		}
  		
  	},
  	clickMyBook(item){ //点击我的书架直接进入阅读页面！
  		//可能是第一次读就没有详情页的最近阅读
  		let isreaded = item.isreaded
  		let id = item.novelId
  		let nowChapter = item.chapterId
  		let url = item.contentUrl
  		
  		/**
  		 1.如果是未读isreaded=false，则直接获取第一个章节并且请求阅读,用this.$router.push()
  		 * **/
//		console.log(item)
  		if(!isreaded){
  				
	  				axios.get('http://139.196.150.50:8086/novelApi/mobile/novel/getChapterList.do',{
				 		params:{
				 				version : 30000,
				 				system	:	'h5',
				 				product : '1',
	  						device	: uuid,
	  						novelId	: id,
	  						startChapterId:'0',
	  						chapterMaxCount:'1'
				 		}
				 })
				 .then((response) =>{
				 		let s = response.data.data;
				 		let firstChapter = s[0].chapters[0];
				 		this.firstChapter = s[0].chapters[0];
				 		this.addRecentlyRead (item); //添加详情页数据
				 		
				 		this.$router.push({
				 			path:'/book',
				 			query:{
					 			'classId'		:	firstChapter.novelId,
					 			'chapterId' :	firstChapter.chapterId,
					 			'contentUrl':	firstChapter.contentUrl
					 			}
				 			})
				 		
				 })
				 .catch((error) =>{
				 		console.log(error)
				 })
  		}else{
  			// 2.如果是已读isreaded=true，则会有当前章节的参数,直接进入请求
  			//防止离开页面再进入点击我的书架会直接进入，但是没有进入之前的书籍详情，致使最近阅读没有记载
  			
  			this.addRecentlyRead (item)
  			
  			this.$router.push({
		 			path:'/book',
		 			query:{
			 			'classId'		:	id,
			 			'chapterId' :	nowChapter,
			 			'contentUrl':	url
			 			}
		 			})
  			
  		}

  	},
  	clickRecentlyRead(item){ //点击最近阅读到详情页
  		
  		let id = item.novelId
  		let nowChapter = item.chapterId
  		let url = item.contentUrl
  		
  		this.$router.push({
 			path:'/book',
 			query:{
	 			'classId'		:	id,
	 			'chapterId' :	nowChapter,
	 			'contentUrl':	url
	 			}
 			})
  	},
  	 addRecentlyRead (item) { //添加到最近阅读素材
    
  		var _this = this
    	var  value = {
    			'novelId':item.novelId,
    			'title':item.title,
    			'bookImage':item.bookImage,
    			'chapterCount':item.chapterCount,
    			'recentlyRead':_this.recentlyChapter,
    			'firstChapterId':_this.firstChapter.chapterId,
    			'recentlyRead' : 0,
    			
    	};
  		
  		var redKey = JSON.parse(sessionStorage.getItem("RECENTLY_READ"));
  		var setKey = [];
  		if(redKey && redKey instanceof Array && value){
  			
  			redKey.forEach(function(item,i){
  					if(value.novelId == item.novelId){
  							_this.haveSameKey = true;
  							return 
  					}
  			});
  			if(_this.haveSameKey){ //最近阅读里有
  				setKey = redKey;
  				_this.haveSameKey = false
  			}else{ //最近阅读里没有
					
  				redKey.push(value);
  				setKey = redKey;
  			};
				sessionStorage.setItem("RECENTLY_READ",JSON.stringify(setKey));
			}else if(value){
				
  			setKey.push(value);
  			sessionStorage.setItem("RECENTLY_READ",JSON.stringify(setKey));
  			
  		};
  		
  	},
  	listenFooter(){ //计算判断footer是否需要定位
  		let $this = this
  			
  			var checkFooter = setInterval(function(){
				
				let bodyH = document.documentElement.clientHeight
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
//						console.log("要定位")
						$this.footerStyle = "absolute"
						$this.footerAbsolute = true
					}else if(bodyH - appH <0){
						//把底部取消定位
//						console.log("不定位")
						$this.footerStyle = "static"
						$this.footerAbsolute = false
					}
			
				clearInterval(checkFooter)
			},100)
  			
  	},
  	
  	toSearch (){ //跳转到搜索
			this.$router.push('/search')
		} 
		/** methods 结束 **/
  },
  watch:{
  	$route (to,from){
  		this.initHandle();
  		this.saveMyBookrack(); //
  		this.syncMyBookrackRecently(); //同步最近阅读到书架的数据
  		this.listenFooter();
  		
  	} 
  },
  mounted () {
  	this.saveMyBookrack();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bookrack_header{
	width:100%;
	text-align:center;
	height:0.88rem;
	line-height:0.88rem;
	font-size:0.36rem;
	color:#333;
	font-weight:bold;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:justify;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:justify;
	border-bottom:solid 1px #e1e1e1;
}
.header_left{
	font-size:0.3rem;
	color:#333;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:center;
	font-weight: normal;
	margin-left:0.3rem;
}
.header_left img{
	width:0.24rem;
	height:0.44rem;
}
.header_right{
	font-size:0.3rem;
	color:#333;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:center;
	font-weight: normal;
	margin-right:0.3rem;
}
.header_right img{
	width:0.28rem;
	height:0.28rem;
	margin-right:0.3rem;
}
.bookrack_btn_wrapper{
	width:100%;
	background:#fafafa;
	height:0.88rem;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:center;
}
.bookrack_btn_container{
	width:4.6rem;
	height:0.56rem;
	border:solid 1px #FF6600;
	box-sizing:border-box;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:center;
	border-radius:0.12rem;
	overflow: hidden;
}
.bookrack_btn_container p{
	width:50%;
	height:0.56rem;
	font-size:0.28rem;
	color:#ff6600;
	line-height:0.56rem;
	text-align:center;
}
.bookrack_btn_container p.active{
	color:white;
	background:#FF6600;
}
/*bookrack_text_wrapper S*/
.bookrack_text_wrapper{
	padding:0 0.3rem;
}
.bookrack_list{
	width:100%;
	overflow: hidden;
	margin-top:0.3rem;
}
.bookrack_list li{
	margin-bottom:0.3rem;
	/*float:left;*/
	margin-right:0.75rem;
	display:inline-block;
	vertical-align:top;
}
.bookrack_list li:nth-child(3n){
	margin-right:0;
}
.bookrack_list_img_box{
	position:relative;
	width:1.8rem;
}
.bookrack_list_img{
	width:1.8rem;
	height:2.4rem;
	
}
.chapter_box{
	font-size:0.24rem;
	color:white;
	height:0.3rem;
	line-height:0.3rem;
	text-align:center;
	background:rgba(0,0,0,0.3);
	position:absolute;
	left:0;
	bottom:0;
	z-index:1;
	width:100%;
}
.bookrack_check_mask{
	position: absolute;
	left:0;
	top:0;
	width:100%;
	height:100%;
	margin:auto;
	z-index:2;
	background:rgba(0,0,0,0.3)
}
.bookrack_type{
	width:100%;
	height:100%;
	
}
.check_img_box{
	position:absolute;
	top:0.1rem;
	right:0.1rem;
}
.check_img_box img{
	width:0.38rem;
	height:0.38rem;
}
.bookrack_list_title{
	font-size:0.3rem;
	color:#333;
	width:1.8rem;
	display:-webkit-box;
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
	overflow:hidden;
	line-height: 0.44rem;
	text-align:center;
}
.add_mybook{
	width:1.8rem;
	height:2.4rem;
	background:#f7f7f7;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:center;
	float:left;
	margin-bottom:0.3rem;
}

/*bookrack_text_wrapper E*/

/* mask S*/
.mask_wrapper{
	position:fixed;
	left:0;
	right:0;
	top:0;
	bottom:0;
	margin:auto;
	z-index:98;
	background:rgba(0,0,0,0.3);
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:center;
}
.mask_container{
	background:white;
	width:6rem;
	height:3.7rem;
	font-size:0.3rem;
	color:#333;
}
.mask_container img{
	width:1.04rem;
	height:1.06rem;
	margin-bottom:0.4rem;
}
.mask_text span{
	color:#ff6600;
}
.mask_text_box{
	width:100%;
	height:2.9rem;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	-webkit-box-orient:vertical;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:center;
	-moz-box-orient:vertical;
}
.mask_btn_box{
	height:0.8rem;
	display:-webkit-box;
}
.mask_btn_box p{
	width:50%;
	height:0.8rem;
	line-height:0.8rem;
	text-align:center;
	font-size:0.3rem;
	color:#8c8c8c;
	box-sizing:border-box;
	border-top:solid 1px #e1e1e1;
	border-right:solid 1px #e1e1e1;
}
.mask_btn_box p.active{
	color:#ff6600;
	background:#f8ddca;
}
.border_gray{
	width:100%;
	height:0.2rem;
	background:#f6f6f6;
	margin-bottom:0.5rem;
}
/* mask E*/
</style>

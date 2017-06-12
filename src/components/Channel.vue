<template>
  <div class="channel">
  	
  	<template v-if="isHaveNav">
  		<!--顶部标题 S-->
  	 <div class="header" >
		    <div class="header_left" @click="refreshPage">
		    	<img src="../../static/icon/nav_logo.png" alt="极搜阅读logo" />
		    	<span >笔趣阁</span>
		    </div>
		    <ul class="header_right">
		    		<li @click="refreshPage">精选</li>
		    		<router-link to="/category" tag="li">分类</router-link>
		    </ul>
		    
		    <!--<img @click="toBookrank" class="header_bookrack" src="../../static/icon/9_defult.png" /> 不删除书架logo-->
		    <p @click="toBookrank" class="header_bookrack">书架</p>
		    
	  </div>
	  <!--顶部标题 S-->
	  
	  <!-- 搜索组件 S -->
	  <v-search v-if="isHaveNav"></v-search>
	  <!-- 搜索组件 E -->
	  
	  <!-- 动态导航栏 S -->
	  <ul class="home_list" >
    		<li @click="watchUrl(item.catalogId,item.name,item.isRankingList)" v-for="(item,index) in tableList" :key="item.catalogId"
    		:style="{width:liWidth}"	
    		><img v-lazy="item.imageUrl"/>{{item.name}}</li>
	  </ul>
	  <!-- 动态导航栏 E -->
	  </template>
	  
	  <!-- 二级导航栏 S-->
	  
	 
  	 <div class="channel_title" v-else>
	  	<img @click="goBack" class="channel_title_img_left" src="../../static/icon/nav_icon_back_default-1@2x.png"/>
	  	<p>{{navTitle}}</p>
	  	<!--<router-link tag="img" to="/search" class="channel_title_img_right" src="../../static/icon/search_default1@2x.png"> </router-link>-->
	  	<img @click="toSearch" class="channel_title_img_right" src="../../static/icon/search_default1@2x.png"/>
	  </div>
	  <!-- 二级导航栏 E-->
  	
  	<!-- 加载loading-->
  	 <div class="isLoadingBox" v-if="isLoading"> <img src="../../static/load1.gif"/> </div>
	  
  	
  	<p v-else :is="item.showStyle ==3 ? currentViewRow : currentViewList" v-for="(item,index) in dataLists" :dataLists="dataLists" :dataIndex="index" ></p>
  	<!-- 动态内容组件 E-->
  	<!-- footer S-->
  	<v-footer></v-footer>
  	<!-- footer E-->
  </div>
</template>
<script>
	
import VSearch from '@/components/SearchIndex'
import VRowDetail from '@/components/RowDetail'
import VListDetail from '@/components/ListDetail'
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
  name: 'channel',
  components:{
  	VSearch,
  	VRowDetail,
  	VListDetail,
  	VFooter
  },
  props:{
  	channelData:[String,Number]
  },
  created () {
  	
  },
  data () {
    return {
      msg: 'Welcome to JSON programme world',
      websiteTitle:'',
      websiteDefault:'笔趣阁',
      isHaveNav:true, //是否切换头部
      navTitle:'', //带返回导航栏标题
      dataLists : '', //数据列表
      dataIndex:'',
      currentViewRow:'v-row-detail', //动态组件横列
      currentViewList : 'v-list-detail', //动态组件竖列
      columnDataList:'',  //导航栏数组
      isLoading:true
    }
  },
  watch:{
	'$route' : 'getAjaxData' //监听路由变化执行ajax请求
  },
  methods : {
  	watchUrl (id,title,isRankingList) { //区别是否是排行耪， 如果为0则是频道页，否则则跳转到排行榜
  		console.log(id,title,isRankingList)
  		if(isRankingList == 0){ 
  			this.$router.push({
  				path : '/channel',
  				query:	{
  					id : id,
  					title	: title
  				}
  			});	
  		}else{
  			this.$router.push({
  				path : '/row',
  				query:	{
  					id : id,
  					title	: title
  				}
  			});	
  		};
  		
  	},
  	getAjaxData () { //获取数据
  			this.isLoading = true
				let $this = this;
				let paramsId = this.$route.query.id;
				let catalogId = null;
				if(paramsId){
					catalogId = paramsId;
					this.isHaveNav = false;
					this.navTitle = this.$route.query.title;
					
					this.websiteTitle = this.$route.query.title;
					setTitle(this.websiteTitle+'_'+this.websiteDefault )
				}else{
					catalogId = '0'
					this.isHaveNav = true;
					setTitle(this.websiteDefault)
					
				};
//				setDescription(111) 
				
				axios.get('http://139.196.150.50:8086/novelApi/mobile/novel/getCarefullySelectCatalogDetail.do',{
					params : {
						version : 30000,
						device  :	uuid,
						system	: 'h5',
						product : '1',
						catalogId: catalogId
					}
				})
			  .then( (response) =>{
				  	this.dataLists = response.data.data;
		//			  	console.log(this.dataLists)
						this.isLoading = false;
			  })
			  .catch(function(error){
			    console.log(error);
			  });
			},
		getAjaxBookrankData () { //返回默认书架
//		this.isActiveA = true;
//		this.isActiveB = false
		var getMyBook = localStorage.getItem("MY_BOOK");
		if(getMyBook){
			//如果有则不处理
			
		}else{
		
	  		axios.get('http://139.196.150.50:8086/novelApi/mobile/novel/getDefaultBookShelf.do',{
	  			params : {
	  				version	: 30000,
	  				system 	: 'h5',
	  				product : '1',
	  				device	:	uuid
	  			}
	  		})
	  		.then((response) =>{
	  			
	  			console.log(response)
	//				this.dataList = response.data.data
					let dataArr = response.data.data;
					let setArr = [];
					dataArr.forEach(function(item,i){
						item.checked = false; //给每个书架添加一个标识符，用以选择是否选中
						item.recentlyRead = 0; //当前多少页
						item.isreaded = false; //是否读过
						setArr.push(item)
					});
	  			localStorage.setItem("MY_BOOK",JSON.stringify(setArr))	
	  			
	  		})
	  		.catch((error) => {
	  			console.log(error)
	  		})
			};
		
  	},
			firstCreateUUId (){ //初始uuid，设置长度和基数16进制
				if(localStorage.getItem("pgv_pvi")){
					//生成过则不重新生成
				}else{
					var uuidKey = this.createUUID(16,16); 
					localStorage.setItem("pgv_pvi",uuidKey);
				};
			},
			createUUID (len,radix){ //len,radix len为长度，radix为基数最大为16进制
		    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
		    let uuid = [], i;
		    radix = radix || chars.length;
		 
		    if (len) {
		     
		      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
		    } else {
		      let r;
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
			 
			return uuid.join('')
		},
		toBookrank (){ //跳转到书架
			this.$router.push('/bookrack');
		},
		toSearch (){ //跳转到搜索
			this.$router.push('/search')
		},
		refreshPage (){ //刷新当前页面
			this.$router.go(0)
		},
  	goBack () {//返回上一个路由
  		this.$router.go(-1);
  	}
	
		/*** methods 结束 ***/	
  },
  mounted () {
  	this.firstCreateUUId();  //创建uuId
		this.getAjaxData();
		this.$store.dispatch('fetchOrderList',uuid)//通过store进行列表数据请求
		this.getAjaxBookrankData(); 
		//初始化书架
  },
  computed : {
  	liWidth () { //动态设置导航宽度
  			var num = this.$store.getters.getOrderList.length;
  			var numWidth = 100 / num + "%";
  			return numWidth;
  	},
  	tableList (){ //动态返回store中的导航数据
			this.columnDataList = this.$store.getters.getOrderList
  		return this.$store.getters.getOrderList
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped >
	/* header S*/
	/*设置display：-box;可动态设置align和pack*/
	@mixin display-box($align:center,$pack:center,$orient:horizontal){
		display:-webkit-box;
		-webkit-box-align:$align;
		-webkit-box-pack:$pack;
		-webkit-box-orient:$orient;
		display:-moz-box;
		-moz-box-align:$align;
		-moz-box-pack:$pack;
		-moz-box-orient:$orient;
	}
	

.header{
	@include display-box(center,justify);
	width:100%;
	height:0.88rem;
	position: relative;
	border-bottom:solid 1px #e1e1e1;
	.header_left{
		@include display-box(center,start);
		margin-left:0.3rem;
		height:100%;
		font-size:0.34rem;
		color:#333;
		img{
			width:0.40rem;
			height:0.44rem;
			margin-right:0.1rem;
		}
	}
	.header_right{
		@include display-box;
		height:100%;
		margin-right:1.2rem;
		li{
			height:100%;
			margin-left:0.3rem;
			font-size:0.34rem;
			color:#666;
			height:0.88rem;
			line-height:0.88rem;
		}
	}
	.header_bookrack{
		position:absolute;
		right:0.3rem;
		top:0;
		bottom:0;
		margin:auto 0;
		z-index:2;
		font-size:0.34rem;
		color:#666;
		height:0.88rem;
		line-height:0.88rem;
	}
	
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
}



.home_list{
	@include display-box(center,justify)
	width:100%;
	overflow: hidden;
	height:1.3rem;
	border-bottom:solid 1px #e1e1e1;
	li{
		@include display-box(center,center,vertical)
		height:100%;
		font-size:0.26rem;
		color:#666;
		&:last-child{
			margin-right:0;
		}
		img{
			width:0.36rem;
			height:0.36rem;
			margin-bottom:0.12rem;
		}
	}
}
.border_gray_one{
	width:100%;
	height:1px;
	background:#ccc;
}
.isLoadingBox{
	width:100%;
	height:5.5rem;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	img{
		width:1rem;
	}
}
</style>

<template>
  <div class="more">
    <div class="channel_title">
	  	<img @click="goBakc" class="channel_title_img_left" src="../../static/icon/nav_icon_back_default-1@2x.png"/>
	  	<p>{{naveTitle}}</p>
	  	<img @click="toSearch" class="channel_title_img_right" src="../../static/icon/search_default1@2x.png"/>
	 	 </div>
	 	 
	 	 
	 	 <!-- 加载loading-->
  	 <div class="isLoadingBox" v-if="isLoading"> <img src="../../static/load1.gif"/> </div>
  	 
	 	 <template v-else>
	 	 	
	 	 <!--重磅精选 S-->
		<div class="choiceness" v-if="moreDetaLists!=null">
			
    	<ul class="choiceness_list">
    		<router-link tag="li" v-for="(item,index) in moreDetaLists" :to="{path:'/details',query:{classId:item.novelId}}" :key="index">
    			<img v-lazy="item.bookImage"/>
    			<div class="choiceness_list_right">
    					<h4>{{item.title}}</h4>
    					<div>
    						<span class="choiceness_author">{{item.author}}</span>
    						<span class="choiceness_serialize" v-if="item.end =='0'">连载</span>
    						<span class="choiceness_end" v-else>完结</span>
    					</div>
    					<div class="label_box">
    						<span>{{item.catalog}}</span>
    						<span>{{item.chapterCount}}章</span>
    					</div>
    					<p class="choiceness_text">{{item.introduction}}</p>
    			</div>
    		</router-link>
    	</ul>
    	
		</div>
		<!--更多-->
		<div class="border_gray_one" ></div>
    
    	<!-- 分割线  S-->
	  	<div class="border_gray"></div>
	  	<!-- 分割线 E-->
  	<!--重磅精选 E-->	
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
  name: 'more',
  components:{
		VFooter
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      moreDetaLists : '1',
      naveTitle:'',
      isLoading:true
    }
  },
  watch:{
  		'$route' : 'getAjaxMore' //监听路由变化执行ajax请求
  },
  methods:{
  	getAjaxMore () {
  		this.isLoading = true;
  		let params = this.$route.query;
  		let catalogId = params.catalogId;
  		let subCatalogId = params.subCatalogId;
  		this.naveTitle = params.title
  		console.log(params)
  			axios.get('http://139.196.150.50:8086/novelApi/mobile/novel/getNovelsForSubCarefullySelectCatalog.do',{
					params : {
						version : 30000,
						system	:	'h5',
						product : '1',
						device  :	uuid,
						catalogId: catalogId,
						subCatalogId : subCatalogId
					}
				})
			  .then( (response) =>{
			  	this.moreDetaLists = response.data.data;
//			  	console.log(this.moreDetaLists)
				this.isLoading = false;	
			  	
			  })
			  .catch(function(error){
			    console.log(error);
			  });
  	},
  	goBakc () {
  		this.$router.go(-1)
  	},
  	toSearch (){ //跳转到搜索
			this.$router.push('/search')
		}
  },
  mounted () {
  	this.getAjaxMore();
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
	position:relative;
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
	height:0.28rem;
	position:absolute;
	right:0.3rem;
	top:0;
	bottom:0;
	margin:auto 0;
	z-index:1;
	
}

.choiceness{
	margin-top:0.3rem;
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
.choiceness_list li{
	width:100%;
	display:-webkit-box;
	-webkit-box-align:start;
	-webkit-box-pack:start;
	font-size:0.3rem;
	margin-bottom:0.4rem;
}
.choiceness_list li img{
	width:1.6rem;
	height:2rem;
}
.choiceness_list_right{
	width:5rem;
	text-align:start;
	margin-left:0.3rem;
}
.choiceness_list_right h4{
	font-size:0.3rem;
	color:#333;
	font-weight: bold;
	
}
.choiceness_author{
	font-size:0.28rem;
	color:#666;
	margin-right:0.24rem;
}
.choiceness_serialize{
	font-size:0.28rem;
	color:#0e85ff;
}
.choiceness_end{
	font-size:0.28rem;
	color:#ff6600
}
.label_box{
	margin:0.1rem 0 0.1rem 0;
	font-size:0.2rem;
	color:#FF6A6A;
}
.label_box span{
	display:inline-block;
	border:solid 1px #FF6A6A;
	border-radius: 0.04rem;
	padding:0 0.1rem;
	height:0.28rem;
	line-height:0.28rem;
	margin-right:0.2rem;
}
.choiceness_text{
	display:-webkit-box;
	-webkit-box-orient:vertical;
	overflow:hidden;
	-webkit-line-clamp:2;
	font-size:0.28rem;
	color:#A2A2A2;
}
.choiceness_title img{
	width:0.1rem;
}
.more_li{
	width:100%;
	height:0.6rem;
	line-height:0.6rem;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	font-size:0.24rem;
	color:#ccc;
}
.more_li img{
	width:0.12rem;
	height:0.2rem;
	margin-left:0.08rem;
}
.title_logo{
	display:block;
	width:0.08rem;
	height:0.3rem;
	background:#ff6600;
	margin-right:0.1rem;
}
.border_gray{
	width:100%;
	height:0.2rem;
	background:#f6f6f6;
}
.border_gray_one{
	width:100%;
	height:1px;
	background:#e1e1e1;
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
/*重磅精选 E*/
</style>

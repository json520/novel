<template>
  <div class="more">
    <div class="channel_title">
	  	<img @click="goBakc" class="channel_title_img_left" src="../../static/icon/nav_icon_back_default-1@2x.png"/>
	  	<p>{{navTitle}}</p>
	  	<img @click="toSearch" class="channel_title_img_right" src="../../static/icon/search_default1@2x.png"/>
	 	 </div>
	 	 
	 	 <!--重磅精选 S-->
		<div class="choiceness" v-if="moreDetaLists!=null">
			
    	<!--<ul class="choiceness_list">
    		<router-link tag="li" v-for="(item,index) in moreDetaLists" :classid="item.novelId" :to="{path:'/details',query:{classId:item.novelId}}" :key="index">
    			<img v-lazy="item.bookImage"/>
    			<div class="choiceness_list_right">
    					<h4>{{item.title}}</h4>
    					<div>
    						<span class="choiceness_author">{{item.author}}</span>
    						<span class="choiceness_serialize" v-if="item.end =='0'">连载</span>
    						<span class="choiceness_end" v-else>完结</span>
    					</div>
    					<div class="label_box">
    						<span v-if="item.subCatalog">{{item.subCatalog}}</span>
    						<span>{{item.chapterCount}}章</span>
    					</div>
    					<p class="choiceness_text">{{item.introduction}}</p>
    			</div>
    		</router-link>
    	</ul>-->
    	
    	<ul class="other_list" >
	  		<router-link tag="li" v-for="(item,index) in moreDetaLists" :to="{path:'/details',query:{classId:item.novelId}}" :key="index">
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
		<!--更多-->
		<div class="border_gray_one" ></div>
    
    	<!-- 分割线  S-->
	  	<div class="border_gray"></div>
	  	<!-- 分割线 E-->
  	<!--重磅精选 E-->	
	 	 
	 	 <!-- footer S-->
  	<v-footer></v-footer>
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
  name: 'more',
  components:{
		VFooter
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      moreDetaLists : '',
      navTitle:''
    }
  },
  methods:{
  	toSearch(){
  		this.$router.push('/search')
  	},
  	getAjaxMore () {
  		let params = this.$route.query;
  		let novelId = params.id;
  		let novelListType = params.type;
  		this.navTitle = params.title;
  		console.log(params)
  			axios.get('http://139.196.150.50:8086/novelApi/mobile/novel/getMoreNovelsForNovelDetail.do',{
					params : {
						version : 30000,
						system	:	'h5',
						product : '1',
						device  :	uuid,
						novelId: novelId,
						novelListType : novelListType
					}
				})
			  .then( (response) =>{
			  	this.moreDetaLists = response.data.data.novelList;
			  	
			  })
			  .catch(function(error){
			    console.log(error);
			  });
  	},
  	goBakc () {
  		this.$router.go(-1)
  	},
//	isImgNull (item){
//		var imgUrl;
//		if(item.bookImage == ''){
//			imgUrl = 'http://www.qu.la//BookFiles/BookImages/xiansha.jpg';
//		}else{
//			imgUrl = item.bookImage
//		}
//		return imgUrl
//	}
  	
  },
  watch:{
  	'$route' : 'getAjaxMore'
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
/*重磅精选 E*/
</style>

<template>
  <div class="category">
  	<div class="channel_title">
	  	<img @click="goBakc" class="channel_title_img_left" src="../../static/icon/nav_icon_back_default-1@2x.png"/>
	  	<p>分类</p>
	  	<img @click="toSearch" class="channel_title_img_right" src="../../static/icon/search_default1@2x.png"/>
	 	 </div>
	 	 
	 	 <!--加载gif-->
	 	 <div class="isLoadingBox" v-if="isLoading"> <img src="../../static/load1.gif"/> </div>
	 	 
    <ul class="category_list" >
    	<router-link tag="li" v-for="(item,index) in categoryDate" :key="index" :to="{path:'/category/categorydetails',query:{bigContentCatalogId:item.contentBigCatalogId,title:item.name}}">
    		<div class="category_box">
    			<p class="category_title">{{item.name}}</p>
    			<p class="category_num">{{item.novelCount}}本</p>
    		</div>
    		<img v-lazy="item.imageUrl"/>
    	</router-link>
    	
    </ul>
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
  name: 'category',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      categoryDate:[],
      isLoading:true,
      footerStyle:'', //设置footer定位
      footerAbsolute:false, //判断是否为定位
    }
  },
  components:{
  	VFooter
  },
  methods:{
  	toSearch(){
  		this.$router.push('/search')
  	},
  	goBakc () {
  		this.$router.go(-1)
  	},
  	getAjaxCategory () {
  		this.isLoading = true;
  		axios.get('http://139.196.150.50:8086/novelApi/mobile/novel/getBigContentCatalogList.do',{
  			params:{
  				version	: 30000,
  				system	:	'h5',
  				product : '1',
  				device	:	uuid
  			}
  		})
  		.then((response) =>{
//			console.log(response);
  			this.categoryDate = response.data.data;
//			console.log(this.categoryDate)
				this.isLoading = false;
				
				this.listenFooter();
  		})
  		.catch((error)=>{
  			console.log(error)
  		})
  		
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
  			
  	}
  },
  watch:{
  	'$route' :'getAjaxCategory'
  },
  mounted (){
  	this.getAjaxCategory();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.category{
	width:100%;
	height:100%;
	background:#f7f7f7;
}
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
.category_list{
	padding:0.1rem 0.2rem 0 0.2rem;
	/*width:100%;*/
	overflow:hidden;
}
.category_list li{
	float:left;
	margin-right:0.1rem;
	margin-bottom:0.1rem;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:start;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:start;
	background:white;
	width:3.5rem;
	height:2.2rem;
}
.category_list li:nth-child(2n){
	margin-right:0;
}
.category_list li img{
	width:1.4rem;
	height:1.8rem;
}
.category_box{
	width:1.9rem;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	-webkit-box-orient:vertical;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:center;
	-moz-box-orient:vertical;
	display:box;
	box-align:center;
	box-pack:center;
	box-orient:vertical;
}
.category_title{
	font-size:0.28rem;
	color:#666;
}
.category_num{
	font-size:0.24rem;
	color:#ff6600;
	margin-top:0.12rem;
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
</style>

<template>
	
  <div class="footer_wrapper" :style="{'position':footerStyle,'background':footerBg}">
   <!-- footer S-->
   <!--<div class="border_gray"></div>-->
   <slot name="borderBar"></slot>
   
  	<footer class="footer">
  		<div class="footer_btn_box" id="footer_btn_box" :style="{'background':footerBoxColor}">
  			<img src="../../static/icon/nav_logo.png"  />
  			深夜阅读更多免费小说
  		</div>
  		<ul class="footer_right">
  			<!--<li v-for="(item,index) in tableList"><a href="">精选</a></li>-->
  			<li @click="refreshPage">精选</li>
		    <router-link to="/category" tag="li">分类</router-link>
  			<li @click="watchUrl(item.catalogId,item.name,item.isRankingList)" v-for="(item,index) in tableList" :key="item.catalogId">{{item.name}}</li>
    		<!--<li><a href="">男频</a></li>
    		<li><a href="">女频</a></li>
    		<li><a href="">完结</a></li>
    		<li><a href="">分类</a></li>
    		<li><a href="">排行</a></li>-->
		  </ul>
  		<div class="input_wrapper">
			  	<input class="searchInput" type="text" />
			  	<div class="input_text" @click="toSearch">
			  		<img src="../../static/icon/foot_search_White.png"/>
			  		<span>输入书名/作者找书</span>
			  	</div>
  		</div>
  	</footer>
  	<!-- footer E-->
  </div>
</template>

<script>
	let getuuid = localStorage.getItem("pgv_pvi");
	let uuid = null;
	if(getuuid){
		uuid = getuuid;
	}else{
		uuid = 'uuid';
	};
	
export default {
  name: 'footer',
  props:[
  	'footerBoxColor',//标志框颜色
  	'footerStyle', 
  	'footerBg' //footerWrapper颜色
  ],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      columnDataList:''
    }
  },
  methods:{
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
  	refreshPage (){ //跳转到首页
			this.$router.push('/channel')
		},
		toSearch (){ //跳转到搜索
			this.$router.push('/search')
		},
  },
  
  computed:{
  	tableList (){ //动态返回store中的导航数据
  		return this.$store.getters.getOrderList
  	}
  },
  mounted (){
  	
  	this.$store.dispatch('fetchOrderList',uuid)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* footer S*/
.footer_wrapper{
	width:100%;
	/*background:white;*/
	left:0;
	right:0;
	bottom:0;
	padding-top:0.5rem;
}
.footer{
	/*margin-top:0.5rem;*/
}
.border_gray{
	width:100%;
	height:0.2rem;
	background:#F6F6F6;
}
.footer_btn_box{
	width:6.9rem;
	height:0.56rem;
	line-height: 0.56rem;
	position:relative;
	font-size:0.28rem;
	background:#fae7da;
	color:#666;
	margin:0 auto;
	display:block;
	box-align:center;
	box-pack:center;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:center;
	
}
.footer_btn_box img{
	width:0.30rem;
	height:0.34rem;
	left:0.5rem;
	top:0;
	bottom:0;
	margin: auto 0;
	margin-right:0.1rem;
	z-index:2;
}


.footer_right{
	padding:0 0.3rem;
	overflow: hidden;
	height:100%;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:justify;
	display:-moz-box;
	-moz-box-pack:justify;
	-moz-box-align:center;
}
.footer_right li{
	height:100%;
	display:block;
	font-size:0.34rem;
	height:0.94rem;
	line-height:0.94rem;
	color:#333;
}

/* footer E*/
.input_wrapper{
	position: relative;
	height:0.96rem;
	line-height:0.96rem;
	/*background:white;*/
}
.searchInput{
	width:6.9rem;
	height:0.56rem;
	line-height:0.56rem;
	text-align:center;
	border-radius: 0.12rem;
	position:absolute;
	left:0;
	right:0;
	top:0;
	bottom:0;
	margin:auto;
	z-index:2;
	/*background:white;*/
	border:solid 1px #e1e1e1;
}
.input_text{
	position:absolute;
	left:0;
	right:0;
	top:0;
	bottom:0;
	margin:auto;
	z-index:2;
	font-size:0.28rem;
	color:#8e8e93;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	display:-moz-box;
	-moz-box-pack:center;
	-moz-box-align:center;
}
.input_text img{
	width:0.28rem;
	height:0.28rem;
	margin-right:0.1rem;
}
</style>

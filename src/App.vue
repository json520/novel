<template>
  <div id="app" >
	   <!--<header class="header" v-show="isHeader">
		    <div class="header_left" >
		    	<img src="./assets/logo.png" alt="" />
		    	<span>小说标题</span>
		    </div>
		    <ul class="header_right">
		    		<router-link to="/channel/choiceness" tag="li"><a href="javascript:void(0)">精选</a></router-link>
		    		<router-link to="/channel/male" tag="li" @click="changeMale"><a href="javascript:void(0)">男频</a></router-link>
		    		<router-link to="/channel/female" tag="li"><a href="javascript:void(0)">女频</a></router-link>
		    </ul>
		    <img class="header_bookrack" src="./assets/logo.png" alt="" />
	  </header>
	  
	  <v-search></v-search>
	  -->
	  <!--<div class="border_gray"></div>
	  <ul class="home_list">
				<router-link to="/channel/finish" tag="li"><img src="./assets/logo.png"/><a href="javascript:void(0)">完结{{msg}}</a></router-link>
    		<router-link to="/row" tag="li"><img src="./assets/logo.png"/><a href="javascript:void(0)">排行</a></router-link>
    		<router-link to="/category" tag="li"><img src="./assets/logo.png"/><a href="javascript:void(0)">分类</a></router-link>
	  </ul>-->
	  <!--主要内容 S-->
	  <!--<v-channel :channel-data="msg"></v-channel>-->
	  <!--<keep-alive>-->
	  	<router-view></router-view>
	  <!--</keep-alive>-->
  	<!-- 主要内容 E-->
  	<!-- footer S-->
  	<!--<v-footer></v-footer>-->
  	<!-- footer E-->
  </div>
</template>

<script>
import VChannel from './components/Channel'
import VFooter from './components/Footer'
import axios from 'axios'

var footerSetTime
export default {
  name: 'app',
  components:{
		VChannel,
		VFooter
	},
	created (){
//		alert(1)
//    this.$emit('viewIn',"投注站");
	
  },
	data () {
		return {			
			msg:"11",
			isHeader:true
		}
	},
	methods : {
			listenFooter (){ //在首页监听footer的位置，但是较耗内存
				
			footerSetTime = 	setInterval(function(){
					let appH  = document.querySelector("#app").offsetHeight;
					let pageH = document.documentElement.clientHeight;
					let footerH = document.querySelector(".footer_wrapper")
					console.log(appH,pageH)
					if(appH > pageH){

//						console.log("有滚动条")
						footerH.style = "";
					}else{
//						console.log("无滚动条")
						footerH.style = "position:absolute;left:0;bottom:0;z-index:2;"
					}
					
				},500)
			
			}
	},
	mounted () {
//		this.listenFooter();
	},
	watch : {
		'$route' (to, from) {
//	    console.log(to.path)
	    if(to.path == "/channel/choiceness" || to.path == "/"){
	   	 	this.isHeader = true
//	    	console.log(this.isHeader)
				if(from){
	
				}
 	 		}
//	    clearInterval(footerSetTime) //离开的时候清除定时器
//	    this.listenFooter();
		}
	}
}
</script>

<style >
	
#app {
 font-family: "Segoe UI", "Lucida Grande", Helvetica, Arial,
	"Microsoft YaHei", FreeSans, Arimo, "Droid Sans",
	"wenquanyi micro hei", "Hiragino Sans GB", "Hiragino Sans GB W3",
	FontAwesome, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
}
:not(input,textarea) {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color:transparent;
  	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    tap-highlight-color: rgba(0, 0, 0, 0);
}
#uc_recommend_ad {display:none !important; }
body{
		background:white;
	}
</style>

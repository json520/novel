<template>
  <div class="bookrack">
    <header class="bookrack_header">
    		<div class="header_left" @click="goBakc">
    			<img v-if="isHeader" src="../../static/icon/nav_icon_back_default-1@2x.png"/>
    			<p v-else>全选</p>
    		</div>
    		<p>书架</p>
    		<div class="header_right">
    			<template v-if="isHeader">
    				<img src="../../static/icon/search_default1@2x.png"/>
    				<p>管理</p>
    			</template>
    			<p v-else>完成</p>	
    		</div>
    </header>
    <!--书架S-->
    <div class="bookrack_btn_wrapper">
    	<div class="bookrack_btn_container">
    		<p :class="{active:isActiveA}" @click="clickMyBookrank">我的书架</p>
    		<p :class="{active:isActiveB}"@click="getDataLately">最近阅读</p>
    	</div>
    </div>
    <div class="bookrack_text_wrapper">
    	<ul class="bookrack_list">
    		<router-link tag="li" v-for="(item,index) in dataList" :to="{path:'/details',query:{classId:item.novelId}}" :key="index">
    			<div class="bookrack_list_img_box">
    				<img class="bookrack_list_img" v-lazy="item.bookImage"/>
    				<div class="chapter_box">
    					<span>0</span>/<span>{{item.chapterCount}}章</span>
    				</div>
    				<!--<img class="bookrack_list_recommend_img" src="./../assets/logo.png"/>-->
    				<div class="bookrack_check_mask">
    					<div class="check_img_box">
    						<img v-if="isdefault" src="../../static/icon/radio_default1@2x.png"/>
    						<img v-else src="../../static/icon/radio_selected@2x.png"/>
    					</div>
    				</div>
    				
    			</div>
    			<p class="bookrack_list_title">{{item.title}}</p>
    		</router-link>
    		
    		<!--添加加号S-->
    		<router-link tag="li" :to="{path:'/channel'}" class="add_mybook"><img src="../../static/icon/Add-to1@2x.png"/></router-link>
    		
    	</ul>
    </div>
    
    <!--书架E-->
    <!--mask S-->
    <div class="mask_wrapper" style="display:none">
    	<div class="mask_container">
    		<div class="mask_text_box">
    			<img src="../../static/icon/1.png" />
					<p class="mask_text">确定删除所选的<span>2</span>本书记吗？</p>
    		</div>
    		
				<div class="mask_btn_box">
					<p class="btn_cancel">取消</p>
					<p class="btn_confirm active">确定</p>
				</div>
				
    	</div>
    </div>
    <!--mask E-->
    
  </div>
</template>

<script>
	import axios from 'axios'
	let getuuid = localStorage.getItem("pgv_pvi");
	let uuid = null;
	if(getuuid){
		uuid = getuuid;
	}else{
		uuid = 'uuid';
	};
export default {
  name: 'bookrack',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      isHeader:true, 
      dataList:'', //书籍数据
      isActiveA:true,		//我的书架显示class
      isActiveB:false, //最近阅读显示class
      isdefault:false //是否选中书籍
    }
  },
  methods:{
  	goBakc () { //返回上一页
  		this.$router.go(-1)
  	},
//	getAjaxData () { //返回默认书架
//		this.isActiveA = true;
//		this.isActiveB = false
//		axios.get('http://139.196.150.50:8080/zybrowser/mobile/novel/getDefaultBookShelf.do',{
//			params : {
//				version	: 30000,
//				system 	: 'h5',
//				device	:	uuid
//			}
//		})
//		.then((response) =>{
//			
//			console.log(response)
//				this.dataList = response.data.data
//			localStorage.setItem("MY_BOOK",JSON.stringify(response.data.data))
//			
//		})
//		.catch((error) => {
//			console.log(error)
//		})
//	},
		clickMyBookrank (){
			this.isActiveA = true;
			this.isActiveB = false;
			this.saveMyBookrack();
		},
  	getDataLately () { //获取最近阅读的数据
  			//获取localStorage的RECENTLY_READ 值  返回的是一个数组对象
  			this.isActiveB = true;
  			this.isActiveA = false;
  			var redKey = JSON.parse(localStorage.getItem("RECENTLY_READ"));
  			this.dataList = redKey
  	},
  	saveMyBookrack (){ //把默认的书架保存到本地
  		var getMyBook = localStorage.getItem("MY_BOOK")
  		if(getMyBook){
//			alert("使用本地")
  			console.log("使用本地")
  			this.dataList = JSON.parse(getMyBook)
  		}else{
  			this.getAjaxData();
  			
  		}
  		
  	}
  },
  watch:{
  	'$route' : 'saveMyBookrack'
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
	float:left;
	margin-right:0.75rem;
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
/* mask E*/
</style>

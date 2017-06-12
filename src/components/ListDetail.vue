<template>
  <div class="list_detail">
    <!--重磅精选 S-->
		<div class="choiceness" v-if="dataLists[0]!=null">
			<p class="choiceness_title">
    		<i class="title_logo"></i>
    		<span>{{dataLists[dataIndex].title}}</span>
    	</p>
    	<ul class="choiceness_list">
    		<router-link tag="li" v-for="(item,index) in dataLists[dataIndex].novelList" :classid="item.novelId"
    			:to="{path:'/details',query:{classId:item.novelId}}" :key="index">
    			<img v-lazy="item.bookImage"/>
    			<div class="choiceness_list_right">
    					<h4>{{item.title}}</h4>
    					<div>
    						<span class="choiceness_author">{{item.author}}</span>
    						<span class="choiceness_serialize" v-if="item.end =='0'">连载</span>
    						<span class="choiceness_end" v-else>完结</span>
    					</div>
    					<div class="label_box">
    						<span>{{item.subCatalog}}</span>
    						<span>{{item.chapterCount}}章</span>
    					</div>
    					<p class="choiceness_text">{{item.introduction}}</p>
    			</div>
    		</router-link>
    	</ul>
    	
		</div>
		<!--更多-->
		<div class="border_gray_one" ></div>
    <router-link class="more_li" v-if="dataLists[dataIndex].haveMore === 1" :to="{path:'/more',query:{catalogId:dataLists[dataIndex].catalogId,subCatalogId:dataLists[dataIndex].subCatalogId,title:dataLists[dataIndex].title}}">更多<img src="../../static/icon/arrow1@2x.png" /></router-link>
    	<!-- 分割线  S-->
	  	<div class="border_gray"></div>
	  	<!-- 分割线 E-->
  	<!--重磅精选 E-->	
  </div>
</template>

<script>
export default {
  name: 'list_detail',
  props:[
  	'dataLists',
  	'dataIndex'
  ],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      showAll:false
    }
  },
  computed :{
//	showListDetail () {
//	  		let showList = [];
//	  		let $index = this.dataIndex;
//	  		let	$dataList = this.dataLists;
//	  		//大于3显示3个，小于3全显示
//	  		if($dataList[$index].novelList.length > 6){
//	  			for(let i=0;i<6;i++){
//	  				showList.push($dataList[$index].novelList[i]);
//	  			}
//	  		}else{
//	  			showList = $dataList[$index].novelList;
//	  		};
//	  		
//	  		if($dataList[$index].haveMore == 1){ //等于1则显示更多
//	  			this.showAll = true;
//	  		}
//	  		return showList
//	}
  },
  mounted (){
 	 	
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*重磅精选 S*/

.choiceness{
	padding:0 0.3rem;
}
.choiceness_title{
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
	padding:0 0.05rem;
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
/*重磅精选 E*/
</style>

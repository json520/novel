<template>
	<div class="rwodetail">
	
  	<div class="recommend" v-if="dataLists[dataIndex]!=null">
    	<div class="recommend_title have_more">
    		<i class="title_logo"></i>
    		<span>{{dataLists[dataIndex].title}}</span>
    		<router-link  :to="{path:'/more',query:{catalogId:dataLists[dataIndex].catalogId,subCatalogId:dataLists[dataIndex].subCatalogId,title:dataLists[dataIndex].title}}" class="row_more" v-if="dataLists[dataIndex].haveMore === 1">
    			更多<img src="../../static/icon/arrow1@2x.png" />
    		</router-link>
    	</div>
    	<ul class="recommend_list" >
    		<router-link tag="li" v-for="(item,index) in dataLists[dataIndex].novelList"  :to="{path:'/details',query:{classId:item.novelId}}" :key="index">
    			<img v-lazy="item.bookImage"/>
    			<p>{{item.title}}</p>
    		</router-link>
    		
    	</ul>
  	</div>
  	<!--主编力荐 粗线分割线-->
  	<div class="border_gray"></div>
	</div>	
</template>

<script>
export default {
  name: 'hello',
  props : [
  	'dataLists', //父组件传过来的数据
  	'dataIndex'  //父组件
  ],
  data () {
    return {
      msg: 'Welcome to JSON programmers world',
      showAll:false //显示更多
    }
  },
  mounted () {
//	console.log(this.dataLists)
//	console.log(this.dataIndex)
  },
  computed : {
//	showList () {
//
//		let showList = [];
//		let $index = this.dataIndex;
//		let	$dataList = this.dataLists;
//		//大于3显示3个，小于3全显示
//		if($dataList[$index].novelList.length > 6){
//			for(let i=0;i<6;i++){
//				showList.push($dataList[$index].novelList[i]);
//			};
//			
//		}else{
//			showList = $dataList[$index].novelList;
//		};
//		if($dataList[$index].haveMore == 1){ //等于1则显示更多
//			this.showAll = true;
//		}else{
//			this.showAll = false
//		};
//		
//		return showList
//	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 主编力荐 S*/
	.recommend{
	padding:0 0.3rem;
}
.recommend_title{
	width:100%;
	/*height:0.6rem;*/
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
.choiceness{
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
.recommend_title img{
	width:0.3rem;
}
.choiceness_title img{
	width:0.1rem;
}

.recommend_list{
	overflow:hidden;
	
}
.title_logo{
	display:block;
	width:0.08rem;
	height:0.3rem;
	background:#ff6600;
	margin-right:0.1rem;
}
.recommend_list li{
	/*float: left;*/
	/*display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:start;
	-webkit-box-orient:vertical;*/
	display:inline-block;
	vertical-align:top;
	margin-right:1.05rem;
	width:1.6rem;
}
.recommend_list li:nth-child(3n){
	margin-right:0;
}
.recommend_list li img{
	width:1.6rem;
	height:2rem;
}
.recommend_list li p{
	width:1.6rem;
	text-align: start;
	display:-webkit-box;
	-webkit-box-orient:vertical;
	overflow:hidden;
	-webkit-line-clamp:2;
	font-size:0.3rem;
	margin-top:0.07rem;
	margin-bottom:0.23rem;
}
.people_recommend{
	font-size:0.24rem;
	color:#666;
	font-weight: normal;
}
.border_gray{
	width:100%;
	height:0.2rem;
	background:#f6f6f6;
}
.have_more{
	position: relative;
}
.row_more{
	font-size:0.24rem;
	color:#ccc;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:center;
	display:box;
	box-align:center;
	box-pack:center;
	position: absolute;
	top:0;
	bottom:0;
	margin:auto 0;
	right:0;
	z-index:2;
	font-weight: normal;
}
.row_more img{
	width:0.12rem;
	height:0.2rem;
	margin-left:0.06rem;
}
/* 主编力荐 E*/
</style>

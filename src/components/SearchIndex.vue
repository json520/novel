<template>
  <div class="input_wrapper">
  	<input class="searchInput" type="text" />
  	<router-link class="input_text" :to="{path:'/search'}">
  		<img src="../../static/icon/top_search.png"/>
  		<span>输入书名/作者找书</span>
  	</router-link>
  </div>
</template>

<script>
export default {
  name: 'searchIndex',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	
.input_wrapper{
	position: relative;
	height:0.96rem;
	line-height:0.96rem;
	background:#f8f8f8;
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
	background:white;
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

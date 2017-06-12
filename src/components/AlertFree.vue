<template>
  <div class="alertFree">
    <div class="alert_container">
    	<div class="alert_box">
    		<p>去深夜小说免费看全本</p>
    		<p>更有优质海量小说免费看</p>
    	</div>
    	<p class="free_read">免费畅读</p>
    	<img class="free_close" src="../../static/icon/delete_click1@2x.png"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'alertFree',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alertFree{
	background:rgba(0,0,0,0.3);
	position: fixed;
	left:0;
	right:0;
	top:0;
	bottom:0;
	margin:auto;
	z-index:100;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:center;
}
.alert_container{
	width:6rem;
	height:3rem;
	background:white;
	border-radius: 0.06rem;
	/*overflow:hidden;*/
	position: relative;
}
.alert_box {
	font-size:0.3rem;
	color:#333;
	height:2.2rem;
	display:-webkit-box;
	-webkit-box-align:center;
	-webkit-box-pack:center;
	-webkit-box-orient: vertical;
	display:-moz-box;
	-moz-box-align:center;
	-moz-box-pack:center;
	-moz-box-orient: vertical;
}
.alert_box p{
	line-height:0.5rem;
}
.free_read{
	width:100%;
	height:0.8rem;
	background:#f8ddca;
	color:#ff6600;
	font-size:0.3rem;
	text-align:center;
	line-height:0.8rem;
	border-bottom-left-radius:0.06rem;
	border-bottom-right-radius:0.06rem;
}
.free_read.active{
	color:white;
}
.free_close{
	position: absolute;
	right:-0.2rem;
	top:-0.2rem;
	z-index:101;
	width:0.6rem;
	height:0.6rem;
}
</style>

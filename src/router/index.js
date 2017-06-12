import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import VChannel from '@/components/Channel'
import ss from '@/components/SearchIndex'
import VRow from '@/components/Row'
import VCategory from '@/components/Category'
import VBookRack from '@/components/BookRack'
import VDerails from '@/components/Details'
import VCategoryDetails from '@/components/CategoryDetails'
import VCatalog from '@/components/Catalog'
import VBook from '@/components/Book'
import VSearch from '@/components/Search'
import VMore from '@/components/More' //点击更多
import VDetailsMore from '@/components/DetailsMore' //详情页点击更多
import VDetailsSourceMore from '@/components/DetailsSourceMore'

Vue.use(Router)

export default new Router({
//mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: VChannel,
      
    },
    {
      path: '/channel/',
      name: 'VChannel',
      component: VChannel,
//   beforeEnter: (to, from, next) => {
////			document.title = "1"
//    console.log('1', to)
//    console.log('小弟A：大兄弟，哪儿旮沓的呀！', from)
//    next() // 大哥：过去吧！
//    // 调用next通过路由
//  },
//    afterEnter: (to, from, next) => {
////    	alert(1)
//      console.log('2', to)
//      console.log('小弟A：大兄弟，哪儿旮沓的呀！', from)
//      next({ path: '/a' }) // 大哥：像那边走！
//      // 调用next({ path: '/' })中止导航，并跳到首页
//    }
    },
    {
    	path:'/row',
    	name:'row',
    	component:VRow
    },
    {
    	path:'/category',
    	name:'category',
    	component:VCategory
    },
    {
    	path:'/bookrack',
    	name:'boorkrack',
    	component:VBookRack
    	
    },
    {
    	path:'/details',
    	name:'derails',
    	component:VDerails
    },
    {
    	path:'/category/categorydetails',
    	name:'categoryDetails',
    	component:VCategoryDetails
    },
    {
    	path:'/catalog',
    	name:'catalog',
    	component:VCatalog
    },
    {
    	path:'/book',
    	name:'book',
    	component:VBook
    },
    {
    	path:'/search',
    	name:'search',
    	component:VSearch
    },
    {
    	path:'/more',
    	name:'more',
    	component:VMore
    },
    {
    	path:'/detailsmore',
    	name:'detailsmore',
    	component:VDetailsMore
    },
    {
    	path:'/detailssourcemore',
    	name:'detailsSourcemore',
    	component:VDetailsSourceMore
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
	   if (savedPosition) {
	    return savedPosition
	  } else {
	    return { x: 0, y: 0 }
	  }
  }
//,
// 	beforeEach((to, from, next) => {
//// ...
//	})
})

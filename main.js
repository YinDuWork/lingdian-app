import Vue from 'vue'
import App from './App'
// 自定义图标
import iconfont from './components/com-iconfont/iconfont.vue'
Vue.component('iconfont', iconfont)
//过滤器
import Filter from './common/filter.js'
Vue.use(Filter)

Vue.config.productionTip = false

App.mpType = 'app'

// 定义全局无图标toast信息
Vue.prototype.toast = (msg)=> {
	uni.showToast({
		title: msg,
		icon: 'none'
	});
};
const app = new Vue({
    ...App
})
app.$mount()

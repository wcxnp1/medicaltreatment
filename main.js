import App from './App'
import Mycomponents from "./Mycomponents/myindex.vue"
//定义全局的日期方法
Date.prototype.VP_FORMAT = function(format) {
	// console.log('==========>this.getDate() ' + this.getTime() / (24 * 60 * 60 * 1000));
	// console.log('==========>new Date().getDate() ' + new Date().getTime() / (24 * 60 * 60 * 1000));
	var ds = parseInt(this.getTime() / (24 * 60 * 60 * 1000)) - parseInt(new Date().getTime() / (24 * 60 * 60 *
		1000));
	var n = '';
	if (ds == 0) {
		n = '(今天)';
	}
	if (ds == 1) {
		n = '(明天)';
	}
	if (ds == 2) {
		n = '(后天)';
	}
	if (ds == -1) {
		n = '(昨天)';
	}
	if (ds == -2) {
		n = '(前天)';
	}
	var date = {
		'M+': this.getMonth() + 1,
		'd+': this.getDate(),
		'h+': this.getHours(),
		'm+': this.getMinutes(),
		's+': this.getSeconds(),
		'q+': Math.floor((this.getMonth() + 3) / 3),
		'S+': this.getMilliseconds(),
		'n+': n
	};
	if (/(y+)/i.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	for (var k in date) {
		if (new RegExp('(' + k + ')').test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ('00' + date[k]).substr(('' + date[
				k]).length));
		}
	}
	return format;
};
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

try {
	function isPromise(obj) {
		return (
			!!obj &&
			(typeof obj === "object" || typeof obj === "function") &&
			typeof obj.then === "function"
		);
	}

	// 统一 vue2 API Promise 化返回格式与 vue3 保持一致
	uni.addInterceptor({
		returnValue(res) {
			if (!isPromise(res)) {
				return res;
			}
			return new Promise((resolve, reject) => {
				res.then((res) => {
					if (res[0]) {
						reject(res[0]);
					} else {
						resolve(res[1]);
					}
				});
			});
		},
	});
} catch (error) {}

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.component('my-components', Mycomponents)
	return {
		app
	}
}
// #endif
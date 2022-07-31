import App from './App'
import divider from "./components/common/divider.vue";

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.component('divider', divider)
App.mpType = 'app'
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
	app.component('divider', divider)
	return {
		app
	}
}
// #endif

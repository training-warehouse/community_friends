<template>
	<view>
		<template v-if="searchList.length === 0">
			<view class="py-2 font-md px-2">搜索历史</view>
			<view class="flex flex-wrap">
				<view class="border rounded font mx-2 my-1 px-1 py-1" hover-class="bg-light"
					v-for="(item,index) in list" :key="index" @click="clickSearchHistory(item)">{{item}}</view>
			</view>
		</template>
		<template v-else>
			<!-- 搜索结果列表 -->
			<block v-for="(item,index) in searchList" :key='index'>
				<common-list :item="item" :index="index"></common-list>
			</block>
		</template>
	</view>
</template>

<script>
	const demo = [{
		username: "昵称",
		userpic: "/static/default.jpg",
		newstime: "2021-12-02 下午23:50",
		isFollow: false,
		title: "我是标题",
		titlepic: "/static/demo/datapic/11.jpg",
		support: {
			type: "support",
			support_count: 1,
			unsupport_count: 2
		},
		comment_count: 2,
		share_num: 1
	}, {
		username: "昵称",
		userpic: "/static/default.jpg",
		newstime: "2021-12-02 下午23:50",
		isFollow: false,
		title: "我是标题",
		titlepic: "",
		support: {
			type: "unsupport",
			support_count: 1,
			unsupport_count: 2
		},
		comment_count: 0,
		share_num: 1
	}, {
		username: "昵称",
		userpic: "/static/default.jpg",
		newstime: "2021-12-02 下午23:50",
		isFollow: false,
		title: "我是标题",
		titlepic: "",
		support: {
			type: "",
			support_count: 1,
			unsupport_count: 0
		},
		comment_count: 2,
		share_num: 0
	}, {
		username: "昵称",
		userpic: "/static/default.jpg",
		newstime: "2021-12-02 下午23:50",
		isFollow: false,
		title: "我是标题",
		titlepic: "",
		support: {
			type: "",
			support_count: 1,
			unsupport_count: 0
		},
		comment_count: 2,
		share_num: 0
	}]


	import commonList from '@/components/common/common-list.vue'

	export default {
		components: {
			commonList
		},
		data() {
			return {
				list: ['python', 'uni-app 商城实战开发', '微商学院', '鬼吹灯-云南虫谷', '六道', '特效实战系列教程', '依赖注入'],
				searchText: '',
				searchList: ''
			}
		},
		onNavigationBarSearchInputChanged(e) {
			this.searchText = e.text
		},
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				this.searchEvent()
			}
		},
		methods: {
			clickSearchHistory(text) {
				this.searchText= text
				this.searchEvent()
			},
			searchEvent() {
				// 收起键盘
				uni.hideKeyboard()
				uni.showLoading({
					title: '加载中...',
					mask: false
				})

				// 请求搜索
				setTimeout(() => {
					this.searchList = demo
					uni.hideLoading()
				}, 2000)
			}
		}
	}
</script>

<style>

</style>

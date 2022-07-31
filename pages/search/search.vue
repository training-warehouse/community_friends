<template>
	<view>
		<template v-if="searchList.length === 0">
			<view class="py-2 font-md px-2">搜索列表</view>
			<view class="flex flex-wrap">
				<view class="border rounded font mx-1 my-1 px-2 py-1" hover-class="bg-light"
					v-for="(item,index) in list" :key="index" @click="clickSearchHistory(item)">
					{{item}}
				</view>
			</view>
		</template>

		<template v-else>
			<block v-for="(item,index) in searchList" :key="index">
				<common-list :item="item" :index="index"></common-list>
			</block>
		</template>
	</view>
</template>

<script>
	const demo = [{
		username: "昵称",
		userpic: "/static/default.jpg",
		newstime: "2022-07-30 下午04:42",
		isFlow: false,
		title: "标题",
		titlepic: "/static/demo/datapic/11.jpg",
		support: {
			type: 'support',
			support_count: 1,
			unsupport_count: 2
		},
		comment_count: 5,
		share_num: 3
	}, {
		username: "昵称",
		userpic: "/static/default.jpg",
		newstime: "2022-07-30 下午04:42",
		isFlow: false,
		title: "标题",
		titlepic: "",
		support: {
			type: 'unsupport',
			support_count: 1,
			unsupport_count: 2
		},
		comment_count: 0,
		share_num: 3
	}, {
		username: "昵称",
		userpic: "/static/default.jpg",
		newstime: "2022-07-30 下午04:42",
		isFlow: false,
		title: "标题",
		titlepic: "",
		support: {
			type: '',
			support_count: 0,
			unsupport_count: 2
		},
		comment_count: 5,
		share_num: 0
	}]


	import CommonList from '@/components/common/common-list.vue'

	export default {
		components: {
			CommonList
		},

		data() {
			return {
				searchText: "",
				list: ['uni-app交友平台开发', '实战教程', '系列教程', 'python', 'go', 'C++'],
				// 搜索结果
				searchList: []
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
			searchEvent() {
				// 收起键盘
				uni.hideKeyboard()

				uni.showLoading({
					title: '加载中...',
					mask: false
				})
				setTimeout(() => {
					this.searchList = demo
					uni.hideLoading()
				}, 2000)
			},
			clickSearchHistory(text){
				this.searchText = text
				this.searchEvent()
			}
		}
	}
</script>

<style>
</style>

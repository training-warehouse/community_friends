<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view scroll-x class="scroll-row border-bottom border-light-secondary" :scroll-into-view="scrollInto"
			scroll-with-animation style="height: 100rpx;">
			<view v-for="(item,index) in tabBars" :key="index" class="scroll-row-item px-3 py-2 font-md"
				:id="'tab'+index" :class="tabIndex === index ? 'text-main font-lg font-weight-bold':''"
				@click="changeTab(index)">
				{{item.name}}
			</view>
		</scroll-view>

		<swiper :duration="150" :current="tabIndex" @change="onChangeTab" :style="{height:scrollH+'px'}">
			<swiper-item v-for="(item,index) in newsList" :key="index">
				<scroll-view scroll-y :style="{height:scrollH+'px'}" @scrolltolower="loadmore(index)">
					<template v-if="item.list.length > 0">
						<block v-for="(item2,index2) in item.list" :key="index">
							<common-list :item="item2" :index="index2" @follow="follow" @doSupport=doSupport></common-list>
							<divider></divider>
						</block>
						
						<load-more :loadmore="item.loadmore"></load-more>
					</template>
					<template v-else>
						<nothing></nothing>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
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
	import loadMore from '@/components/common/load-more.vue'
	

	export default {
		components: {
			commonList,
			loadMore,
		},
		data() {
			return {
				tabIndex: 0,
				scrollInto: "",
				scrollH: 600,
				tabBars: [{
					name: "关注"
				}, {
					name: "推荐"
				}, {
					name: "体育"
				}, {
					name: "热点"
				}, {
					name: "财经"
				}, {
					name: "娱乐"
				}, {
					name: "军事"
				}, {
					name: "历史"
				}, {
					name: "本地"
				}],
				newsList: []
			}
		},
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url:'../search/search'
			})
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - uni.upx2px(100 + 1)
				}
			})

			// 根据选项获取数据
			this.getData()
		},
		methods: {
			getData() {
				var arr = []
				for (let i = 0; i < this.tabBars.length; i++) {
					let obj = {
						loadmore: "上拉加载更多",
						list: []
					}
					if(i<3){
						obj.list = demo
					}
					arr.push(obj)
				}
				this.newsList = arr
			},
			follow(index) {
				this.list[index].isFollow = true
				uni.showToast({
					title: '关注成功'
				})
			},
			doSupport(data) {
				let item = this.list[data.index]
				let msg = data.type === 'support' ? '顶' : '踩'

				if (item.support.type === '') {
					item.support[data.type + '_count']++
				} else if (item.support.type === 'support' && data.type === 'unsupport') {
					item.support.support_count--
					item.support.unsupport_count++
				} else if (item.support.type === 'unsupport' && data.type === 'support') {
					item.support.unsupport_count--
					item.support.support_count++
				}

				item.support.type = data.type
				uni.showToast({
					'title': msg + '成功'
				})
			},
			changeTab(index) {
				if (this.tabIndex !== index) {
					this.tabIndex = index
					this.scrollInto = 'tab' + index
				}
			},
			onChangeTab(e) {
				this.changeTab(e.detail.current)
			},
			loadmore(index) {
				let item = this.newsList[index]
				if (item.loadmore !== '上拉加载更多') return

				item.loadmore = '加载中'
				setTimeout(() => {
					item.list = [...item.list, ...item.list]
					item.loadmore = '上拉加载更多'
				}, 2000)
			}
		}
	}
</script>

<style>
</style>

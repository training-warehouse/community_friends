<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view scroll-x class="scroll-row border-bottom border-light-secondary" style="height: 100rpx;"
			:scroll-into-view="scrollInto" scroll-with-animation>
			<view v-for="(item,index) in tabBars" :key="index" class="scroll-row-item px-3 py-2 font-md"
				:id="'tab'+index" :class="tabIndex===index?'text-main font-lg font-weight-bold':''"
				@click="changeTab(index)">
				{{item.name}}
			</view>
		</scroll-view>

		<swiper :duration="200" :current="tabIndex" @change="onChangeTab" :style="`height:${scrollH}px`">
			<swiper-item v-for="(item,index) in newsList" :key="index">
				<scroll-view scroll-y="true" :style="`height:${scrollH}px`" @scrolltolower="loadmore(index)">
					<template v-if="item.list.length">
						<!-- 列表 -->
						<block v-for="(item,i) in item.list" :key="i">
							<common-list :item="item" :index="i" @follow="follow" @doSupport=doSupport />
							<divider />
						</block>

						<!-- 上拉加载 -->
						<load-more :loadmore="item.loadmore" />
					</template>
					<template v-else>
						<nothing />
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


	import CommonList from "@/components/common/common-list.vue"
	import LoadMore from '@/components/common/load-more.vue'
	import Nothing from '@/components/common/nothing.vue'

	export default {
		components: {
			CommonList,
			LoadMore,
			Nothing
		},

		data() {
			return {
				scrollH: 600,
				tabIndex: 0,
				scrollInto: 'tab0',
				tabBars: [{
					name: '关注'
				}, {
					name: '推荐'
				}, {
					name: '体育'
				}, {
					name: '热点'
				}, {
					name: '财经'
				}, {
					name: '娱乐'
				}, {
					name: '军事'
				}, {
					name: '历史'
				}, {
					name: '本地'
				}],

				newsList: []
			}
		},
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '/pages/search/search'
			})
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '/pages/add-input/add-input'
			})
		},
		onLoad() {
			let res = uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - uni.upx2px(101)
				}
			})
			this.getData()
		},
		methods: {
			getData() {
				let arr = []
				for (let i = 0; i < this.tabBars.length; i++) {
					let obj = {
						// 上拉加载更多 / 加载中... / 没有更多了
						loadmore: '上拉加载更多',
						list: []
					}
					if (i < 3) {
						obj.list = demo
					}
					arr.push(obj)
				}
				this.newsList = arr
			},
			follow(index) {
				this.list[index].isFlow = true
				uni.showToast({
					title: '关注成功'
				});
			},
			doSupport(data) {
				let item = this.list[data.index]
				let msg = data.type === 'support' ? '顶' : '踩'

				if (item.support.type === '') {
					item.support[data.type + '_count']++
				} else if (item.support.type === 'support' && data.type === 'unsupport') {
					item.support.unsupport_count++
					item.support.support_count--
				} else if (item.support.type === 'unsupport' && data.type === 'support') {
					item.support.support_count++
					item.support.unsupport_count--
				}
				item.support.type = data.type

				uni.showToast({
					title: msg + ' 成功'
				})
			},
			changeTab(index) {
				if (this.tabIndex === index) return
				this.tabIndex = index
				this.scrollInto = 'tab' + index
			},
			onChangeTab(e) {
				this.changeTab(e.detail.current)
			},
			loadmore(index) {
				let item = this.newsList[index]
				if (item.loadmore !== '上拉加载更多') return

				item.loadmore = '加载中...'
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

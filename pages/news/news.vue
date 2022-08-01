<template>
	<view>
		<uni-nav-bar :border="false" :fixed="true" :statusBar="true">
			<view class="flex justify-center align-center font-weight-bold w-100">
				<!-- <view class="font-lg text-main mx-1">关注</view> -->
				<view class="mx-1" v-for="(item,index) in tabBars" :key="index" @click="changeTab(index)"
					:class="tabIndex === index? 'font-lg text-main':'font-md text-light-muted'">{{item.name}}
				</view>
			</view>
			<text class="iconfont icon-fatie_icon" slot="right" @onClickRight="openAddInput"></text>
		</uni-nav-bar>


		<swiper :duration="200" :style="`height:${scrollH}px`" :current="tabIndex" @change="onChangeTab">
			<!-- 关注 -->
			<swiper-item>
				<scroll-view scroll-y="true" :style="`height:${scrollH}px`" @scrolltolower="loadmoreEvent">
					<block v-for="(it,index) in list" :key="index">
						<common-list :item="it" :index="index" @doSupport="doSupport"></common-list>
						<divider></divider>
					</block>
					<load-more :loadmore="loadmore"></load-more>
				</scroll-view>
			</swiper-item>
			<!-- 话题 -->
			<swiper-item>
				<scroll-view scroll-y="true" :style="`height:${scrollH}px`">
					<common-list></common-list>
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
		isFlow: true,
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
		isFlow: true,
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
		isFlow: true,
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


	import uniNavBar from "@/components/uni-ui/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue"
	import CommonList from '@/components/common/common-list.vue'
	import LoadMore from '@/components/common/load-more.vue'

	export default {
		components: {
			uniNavBar,
			CommonList,
			LoadMore
		},

		data() {
			return {
				scrollH: 500,
				tabIndex: 0,
				tabBars: [{
					name: '关注'
				}, {
					name: '话题'
				}],
				// 关注列表
				list: [],
				loadmore: '上拉加载更多'
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - res.statusBarHeight - 44
				}
			})

			this.list = demo
		},

		methods: {
			openAddInput() {
				uni.navigateTo({
					url: '/pages/add-input/add-input',
				});
			},
			changeTab(index) {
				this.tabIndex = index
			},
			onChangeTab(e) {
				this.tabIndex = e.detail.current
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
			loadmoreEvent() {
				if (this.loadmore !== '上拉加载更多') return

				this.loadmore = '加载中...'
				setTimeout(() => {
					this.list = [...this.list, ...this.list]
					this.loadmore = '上拉加载更多'
				}, 2000)
			}
		}
	}
</script>

<style>

</style>

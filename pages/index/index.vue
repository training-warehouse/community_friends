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
				<scroll-view scroll-y :style="{height:scrollH+'px'}">
					<block v-for="(item2,index2) in item.list" :key="index">
						<common-list :item="item2" :index="index2" @follow="follow" @doSupport=doSupport></common-list>
						<divider></divider>
					</block>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import commonList from '@/components/common/common-list.vue'

	export default {
		components: {
			commonList
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
						list: [{
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
						}]
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
			}
		}
	}
</script>

<style>
</style>

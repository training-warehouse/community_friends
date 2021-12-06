<template>
	<view>
		<block v-for="(item,index) in list" :key="index">
			<common-list :item="item" :index="index" @follow="follow" @doSupport=doSupport></common-list>
			<divider></divider>
		</block>
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
		},
		onLoad() {

		},
		methods: {
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
			}
		}
	}
</script>

<style>
</style>

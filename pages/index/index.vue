<template>
	<view>
		<block v-for="(item,index) in list" :key="index">
			<common-list :item="item" :index="index"></common-list>
			<divider></divider>
		</block>
	</view>
</template>

<script>
	import commonList from '@/components/common/common-list.vue'
	
	export default {
		components:{
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
				}]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
</style>

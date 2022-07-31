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
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-ui/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue"

	export default {
		components: {
			uniNavBar
		},

		data() {
			return {
				tabIndex: 0,
				tabBars: [{
					name: '关注'
				}, {
					name: '话题'
				}]
			}
		},
		methods: {
			openAddInput() {
				uni.navigateTo({
					url: '/pages/add-input/add-input',
				});
			},
			changeTab(index){
				this.tabIndex = index
			}
		}
	}
</script>

<style>

</style>

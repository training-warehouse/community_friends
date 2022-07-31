<template>
	<view class="p-2">
		<!-- 头像 -->
		<view class="flex align-center justify-between">
			<view class="flex align-center">
				<image :src="item.userpic" class="rounded-circle mr-2" style="width: 65rpx;height: 65rpx;"
					@click.stop="openSpace" lazy-load>
				</image>
				<view class="">
					<view style="line-height: 1.5;" class="font">{{item.username}}</view>
					<text style="line-height: 1.5;" class="font-sm text-light-muted">{{item.newstime}}</text>
				</view>
			</view>
			<view
				class="flex align-center justify-center rounded font bg-main text-white animate__animated animate__faster"
				hover-class="animate__jello" style="width: 90rpx;height: 50rpx;" @click="follow" v-if="!item.isFlow">关注
			</view>
		</view>

		<!-- 标题 -->
		<view class="my-1 font-md" @click="openDetail">{{item.title}}</view>

		<!-- 图片 -->
		<image :src="item.titlepic" style="height: 350rpx;" class="rounded w-100" lazy-load v-if="item.titlepic"
			@click="openDetail">
		</image>

		<!-- 图标按钮 -->
		<view class="flex align-center">
			<view class="flex flex-1 align-center justify-center animate__animated animate__faster"
				hover-class="animate__jello text-main" @click="doSupport('support')"
				:class="item.support.type==='support'?'support-active':''">
				<text class="iconfont icon-dianzan2 mr-2"></text>
				<text>{{item.support.support_count>0?item.support.support_count:'顶'}}</text>
			</view>
			<view class="flex flex-1 align-center justify-center animate__animated animate__faster"
				hover-class="animate__jello text-main" @click="doSupport('unsupport')"
				:class="item.support.type==='unsupport'?'support-active':''">
				<text class="iconfont icon-cai mr-2"></text>
				<text>{{item.support.unsupport_count>0?item.support.unsupport_count:'踩'}}</text>
			</view>
			<view class="flex flex-1 align-center justify-center animate__animated animate__faster"
				hover-class="animate__jello text-main" @click="openDetail">
				<text class="iconfont icon-pinglun2 mr-2"></text>
				<text>{{item.comment_count>0?item.comment_count:'评论'}}</text>
			</view>
			<view class="flex flex-1 align-center justify-center animate__animated animate__faster"
				hover-class="animate__jello text-main" @click="openDetail">
				<text class="iconfont icon-fenxiang mr-2"></text>
				<text>{{item.share_num>0?item.share_num:'分享'}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: Number
		},
		methods: {
			openSpace() {
				console.log('打开个人空间')
			},
			follow() {
				this.$emit('follow', this.index)
			},
			openDetail() {
				console.log('打开详情页')
			},
			doSupport(type) {
				this.$emit('doSupport', {
					type,
					index: this.index
				})
			}
		}
	}
</script>

<style>
	.support-active {
		color: #FF4A6A;
	}
</style>

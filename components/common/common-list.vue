<template>
	<view class="p-2">
		<!-- 头像 -->
		<view class="flex align-center justify-between">
			<view class="flex align-center">
				<image :src="item.userpic" class="rounded-circle mr-2" style="width: 65rpx;height: 65rpx;" lazy-load
					@click="openSpace">
				</image>
				<view>
					<view class="font" style="line-height: 1.5;">{{item.username}}</view>
					<text class="font-sm text-light-muted" style="line-height: 1.5;">{{item.newstime}}</text>
				</view>
			</view>
			<view>
				<view v-if="!item.isFollow"
					class="flex align-center justify-center rounded bg-main text-white animated faster"
					hover-class="jello" style="width: 90rpx;height: 50rpx;" @click="follow">
					关注</view>
			</view>
		</view>

		<!-- 标题 -->
		<view class="my-1 font-md" @click="openDetail">
			{{item.title}}
		</view>
		<!-- 图片 -->
		<image v-if="item.titlepic" :src="item.titlepic" class="rounded w-100" style="height: 350rpx;"
			@click="openDetail">
		</image>
		<!-- 图标按钮 -->
		<view class="flex align-center">
			<view class="flex align-center justify-center flex-1 animated faster" hover-class="jello text-main"
				:class="item.support.type === 'support'? 'support-active':''" @click="doSupport('support')">
				<text class="iconfont icon-dianzan2 mr-2"></text>
				<text>{{item.support.support_count === 0 ? '顶':item.support.support_count}}</text>
			</view>
			<view class="flex align-center justify-center flex-1 animated faster" hover-class="jello text-main"
				:class="item.support.type === 'unsupport'? 'support-active':''" @click="doSupport('unsupport')">
				<text class="iconfont icon-cai mr-2"></text>
				<text>{{item.support.unsupport_count === 0 ? '踩':item.support.unsupport_count}}</text>
			</view>
			<view class="flex align-center justify-center flex-1 animated faster" hover-class="jello text-main"
				@click="openDetail">
				<text class="iconfont icon-pinglun2 mr-2"></text>
				<text>{{item.comment_count === 0 ? '评论':item.comment_count}}</text>
			</view>
			<view class="flex align-center justify-center flex-1 animated faster" hover-class="jello text-main"
				@click="openDetail">
				<text class="iconfont icon-fenxiang mr-2"></text>
				<text>{{item.share_num === 0 ? '分享':item.share_num}}</text>
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
				console.log('openSpace')
			},
			follow() {
				this.$emit('follow', this.index)
			},
			openDetail() {
				console.log('openDetail')
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

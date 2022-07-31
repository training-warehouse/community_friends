<template>
	<view>
		<uni-nav-bar leftIcon="back" statusBar :border="false" @clickLeft="back">
			<view class="flex align-center justify-center w-100">
				所有人可见<text class="iconfont icon-shezhi ml-1"></text>
			</view>
		</uni-nav-bar>

		<textarea value="" v-model="content" placeholder="说一句话吧~" class="uni-textarea px-2"></textarea>
		<upload-image ref="uploadImage" @change="changeImage" :list="imageList" :show="show">
		</upload-image>

		<view class="fixed-bottom bg-white flex align-center" style="height: 85rpx;">
			<view class="iconfont icon-caidan footer-btn animate__animated" hover-class=" animate__jello"></view>
			<view class="iconfont icon-huati footer-btn animate__animated" hover-class=" animate__jello"></view>
			<view class="iconfont icon-tupian footer-btn animate__animated" hover-class=" animate__jello"
				@click="iconClickEvent('uploadImage')"></view>

			<view class="bg-main text-white ml-auto flex align-center justify-center rounded mr-2 animate__animated"
				hover-class=" animate__jello" style="width: 140rpx;height: 60rpx;">发送</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-ui/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue"
	import uploadImage from "@/components/common/upload-image.vue"

	export default {
		components: {
			uniNavBar,
			uploadImage
		},

		data() {
			return {
				content: "",
				imageList: [],
				showBack: false
			}
		},
		computed: {
			show() {
				return this.imageList.length > 0
			}
		},

		onBackPress() {
			if ((this.content !== '' || this.imageList.length > 0) && !this.showBack) {
				uni.showModal({
					content: '是否保存为草稿？',
					showCancel: true,
					cancelText: '不保存',
					confirmText: '保存',
					success: res => {
						if (res.confirm) {
							this.store()
						} else {
							uni.removeStorage({
								key: 'add-input'
							})
						}
						uni.navigateBack({
							delta: 1
						})
					},
				});
				this.showBack = true
				return true
			} else {
				return false
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'add-input',
				success: res => {
					if (res.data) {
						let result = JSON.parse(res.data)
						this.content = result.content
						this.imageList = result.imageList
					}
				}
			})
		},

		methods: {
			changeImage(imgList) {
				this.imageList = imgList
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			store() {
				uni.setStorage({
					key: 'add-input',
					data: JSON.stringify({
						content: this.content,
						imageList: this.imageList
					})
				})
			},
			iconClickEvent(e) {
				switch (e) {
					case 'uploadImage':
						this.$refs.uploadImage.chooseImage()
						break
				}
			}
		}
	}
</script>

<style>
	.footer-btn {
		width: 86rpx;
		height: 86rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 50rpx;
	}
</style>

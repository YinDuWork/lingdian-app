<template>
	<view class="person-img">
		<image class="image" src="@/static/img/person_img_default.png" mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onNavigationBarButtonTap(e) {
			uni.showActionSheet({
				itemList: ['拍照', '从手机相册选择', '保存本地'],
				success: (e) => {
					uni.showToast({
						title:"点击了第" + e.tapIndex + "个选项",
						icon:"none"
					})
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.person-img {
	position: relative;
	width: 100%;
	height: 100%;
	background-color: $bg_color;
	.image {
		position: absolute;
		left: 50%;
		top: 50%;
		-webkit-transform: translate(-50%,-50%);
		transform: translate(-50%,-50%);
		max-height: 100%;
		max-width: 100%;
	}
}
</style>

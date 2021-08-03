<template>
	<view class="image-info">
		<uni-file-picker class="file-list" title="上传模特照片" :value="imageList"></uni-file-picker>
		<uni-file-picker class="file-list" title="上传模特视频" :value="videoList" file-mediatype="video"></uni-file-picker>
	</view>
</template>

<script>
export default {
	data() {
		return {
			imageList: [], // 照片集合
			videoList: [], // 视频集合
		};
	},
	onLoad() {
	},
	methods: {
	}
};
</script>

<style lang="scss">
	.image-info {
		padding: 20upx;
		.file-list {
			margin-bottom: 40upx;
		}
	}
</style>

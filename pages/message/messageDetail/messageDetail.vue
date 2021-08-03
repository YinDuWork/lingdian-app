<template>
	<view class="message-detail">
		<view class="title ellipsis">{{title}}</view>
		<view class="content">
			{{content}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '测试公告',
				content: '测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告测试公告'
			};
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.message-detail {
	padding: 20upx 30upx;
	line-height: 60upx;
	.title {
		text-align: center;
		font-size: 34upx;
		font-weight: 700;
		line-height: 100upx;
	}
}
</style>

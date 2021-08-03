<template>
	<view class="comment-item flex">
		<view class="left">
			<image class="face" :src="data.face"></image>
		</view>
		<view class="right flex_grow">
			<view class="flex justify_between">
				<view>
					<view class="name">{{data.username}}</view>
					<uni-rate class="score" size="14" active-color="#cfb787" :value="data.score" :readonly="true" />
				</view>
				<view class="date">
					{{data.date}}
				</view>
			</view>
			<view class="content">{{data.content}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"comment-item",
		props: {
			type: { // list-列表模式(左图右信息) card-卡片模式(上图下信息)
				type: String,
				default: 'list'
			},
			data: Object,
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.comment-item {
		margin-bottom: 10upx;
		padding-bottom: 20upx;
		color: #999999;
		.left {
			width: 100upx;
			margin-right: 20upx;
			.face {
				width: 80upx;
				height: 80upx;
				border-radius: 50%;
			}
		}
		.right {
			.name {
				color: $uni-text-color;
				font-weight: 700;
			}
			.score {
				margin-top: 16upx;
				margin-bottom: 16upx;
			}
			.content {
				font-size: 28upx;
			}
		}
	}
</style>

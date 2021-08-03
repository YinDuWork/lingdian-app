<!--弹窗-信息框-->
<template>
	<view>
		<view class="nodata_box">
			<view v-if="!noImg" class="nodata_img_con">
				<image class="nodata_img" :src="noDataImg"></image>
			</view>
			<view class="nodata_font" v-html="notice"></view>
		</view>
	</view>
</template>

<script>
	import noDataImg from '@/static/img/nodata.png'
	export default {
		props: {
			noDataImg: { // 默认图片
				default: noDataImg
			},
			noImg: { // 没有图片
				type: Boolean,
				default: false
			},
			notice: { // 默认：暂无记录
				default: '暂无数据哦~'
			},
		}
	}
</script>

<style>
	.nodata_box {
		padding: 40upx;
		text-align: center;
	}
	.nodata_box .nodata_img_con {
		padding: 160upx 0 60upx;
	}
	.nodata_box .nodata_img{
		width: 304upx;
		height: 200upx;
	}
	
	.nodata_font {
		font-size: 28upx;
		color: #999;
		text-align: center;
	}
</style>
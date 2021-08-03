<template>
	<view class="detail-item flex"><view class="label flex_shrink">{{label}}</view>
	    <view v-if="isTel" class="info flex_grow">
			<a class="info_tel" :href="'tel:'+val">{{val}}</a>
		</view>
		<view v-else class="info flex_grow">{{val}}{{unit}}</view>
	</view>
</template>

<script>
	export default {
		name:"model-item",
		props: {
			label: String,
			val: [String, Number],
			unit: String,
			isTel: { // 是否是可拨打的电话号码
				type: Boolean,
				default: false
			}
		},
	}
</script>

<style lang="scss">
.detail-item {
	line-height: 60upx;
	color: #999999;
	.label {
		margin-right: 20upx;
		color: #666666;
	}
	.info_tel{
		color: $color;
		text-decoration: none;
	}
}
</style>

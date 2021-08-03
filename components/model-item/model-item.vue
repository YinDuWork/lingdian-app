<template>
	<view class="model-item flex flex_center" :class="[type, simple?'simple':'']" @click="modelDetailFn">
		<view class="model-pic flex_shrink" :style="{backgroundImage: `url(${data.src})`}"></view>
		<view class="model-body">
			<view class="name">{{data.name}}<iconfont v-if="!simple" class="sex" :icon="data.sex==1?'men':'women'" color="#999" :size="15"></iconfont></view>
			<view v-if="!simple" class="ellipsis">
				<text v-if="data.age">{{data.age}}岁</text>
				<text v-if="data.area"><text class="line">|</text>{{data.area}}</text>
				<text v-if="data.score">
					<text class="line">|</text>
					<iconfont class="icon-prefix" icon="collect-filled" :size="16" color="#999"></iconfont>
					<text class="score">{{data.score}}</text>
				</text>
			</view>
			<view v-if="!simple" class="ellipsis">
				<text v-if="data.height">{{data.height}}</text>
				<!-- 三围：B（breast） W（waist） H（hip） -->
				<text v-if="data.BWH"><text class="line">|</text>{{data.BWH}}</text>
				<text v-if="data.shoeSize"><text class="line">|</text>{{data.shoeSize}}</text>
			</view>
			<view v-if="!simple" class="ellipsis">合作品牌：{{data.cooperation|joinSplicing('、')}}</view>
			<view class="money ellipsis">￥{{data.money|money}}<text class="unit">/{{data.unit}}</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"model-item",
		props: {
			type: { // list-列表模式(左图右信息) card-卡片模式(上图下信息)
				type: String,
				default: 'list'
			},
			data: Object, // 单个模特信息
			simple: { // 是否简单展示信息
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
			};
		},
		methods: {
			// 模特详情
			modelDetailFn() {
				uni.navigateTo({
					url: '/pages/model/modelDetail/modelDetail?item=' + encodeURIComponent(JSON.stringify(this.data))
				})
			}
		}
	}
</script>

<style lang="scss">
.model-item {
	position: relative;
	margin-bottom: 20upx;
	line-height: 40upx;
	color: $uni-text-color-grey;
	font-size: 26upx;
	box-sizing: border-box;
	background: #fff;
	.model-pic{
		width: 200upx;
		height: 200upx;
		margin-right: 20upx;
		border-radius: 4px;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}
	.model-body {
		width: calc(100% - 160upx);
	}
	.name {
		margin-bottom: 16upx;
		color: $uni-text-color;
		font-size: 30upx;
		font-weight: 700;
	}
	.sex {
		margin-left: 10upx;
		font-weight: 500;
	}
	.score {
		margin-right: 40upx;
	}
	.money {
		position: absolute;
		top: 10upx;
		right: 20upx;
		color: $deep-color;
		font-size: 30upx;
		.unit {
			font-size: 26upx;
		}
	}
	&.list {
		width: 100%;
		padding: 0 20upx;
		border: 0;
	}
	&.simple {
		.model-pic{
			width: 120upx;
			height: 120upx;
			margin-right: 20upx;
			border-radius: 4px 4px 0 0;
		}
		.money {
			position: unset;
			top: unset;
			right: unset;
		}
	}
	&.card {
		flex-wrap: wrap;
		float: left;
		width: 44%;
		margin-left: 4%;
		border: 1px solid #efefef;
		border-radius: 4px;
		.model-body {
			width: 100%;
			padding: 10upx;
		}
		.model-pic{
			width: 100%;
			height: 180upx;
			margin-right: 0;
			border-radius: 4px 4px 0 0;
		}
		.money {
			position: unset;
			top: unset;
			right: unset;
		}
	}
}
.line {
	padding: 0 20upx;
}
</style>

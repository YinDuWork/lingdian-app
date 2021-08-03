<template>
	<view class="index">
		<swiper indicator-dots="true">
			<swiper-item v-for="(img, key) in banners" :key="key"><image class="swiper-img" :src="img" /></swiper-item>
		</swiper>
		<view class="new-model">
		 	<view class="new-model-title flex justify_between flex_center">
		 		<text class="title">通知公告</text>
		 		<text class="more" @click="showAllMessageFn">查看更多</text>
		 	</view>
		 	<view class="notice-list">
		 		<view class="ellipsis" v-for="(item, index) in noticeList" :key="index" @click="showMessageItem(index)">
				<uni-icons class="icon" type="sound" color="#cfb787" size="12"></uni-icons>{{item.title}}</view>
		 	</view>
		</view>
		<view class="new-model">
			<view class="new-model-title flex justify_between flex_center">
				<text class="title">最新资源</text>
				<text class="more" @click="showAllModelFn">查看更多</text>
			</view>
			<view class="model-list clearfix">
				<model-item v-for="(item, index) in modelList" :key="index" :data="item" type="card" simple></model-item>
			</view>
		</view>
	</view>
</template>

<script>
import modelItem from '@/components/model-item/model-item.vue'
export default {
	components: {
		modelItem
	},
	data() {
		return {
			banners: [
				'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091015%2Fvrzy3aqifjnvrzy3aqifjn.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627829625&t=5c2d36e2f8b33965cfdb74cb32511e2c',
				'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fe%2F5976e06a09958.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627829719&t=ad64e84bd603450b99c4d3fa7659177d',
				'https://img2.baidu.com/it/u=124501528,149722444&fm=26&fmt=auto&gp=0.jpg',
				'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F7116610823%2F0.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627829822&t=261434c892db1f8e12c4f4a1530f4e2c'
			],
			noticeList: [
				{title: '测试公告测试公告测试公告1'},
				{title: '测试公告测试试公告测试公告2'},
				{title: '测试公告测试公告测试公告测试公告测试公告测试公告3'},
			],
			modelList: [],
		};
	},
	onLoad() {
		this.modelList = [
			{name: '肖遥', sex: '1',age:12,money:4500,unit:'天', age: 23, area: '北京',modelType:['可爱'],country: '中国', score:5,height:184,BWH:'90-62-94',shoeSize:42,cooperation:['小米','阿迪达斯','华为'], src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2F1112%2F12061P91610%2F1Q206091610-3-1200.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628272159&t=2a4e52248b3613d0375e8b2ea91e650d'},
			{name: '张菡', sex: '0',age:19,money:8000,unit:'天', age: 19, area: '上海',modelType:['可爱'],country: '中国', score:5,height:178,BWH:'90-62-94',shoeSize:42,cooperation:[], src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F04%2F20200204060141_PFTEs.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628272245&t=d8c4959c7c209ab685765369ef1c9759'},
			{name: '张菡', sex: '1',age:22,money:6200,unit:'天', age: 23, area: '北京',modelType:['可爱'],country: '中国', score:3,height:188,BWH:'90-62-94',cooperation:['小米','阿迪达斯','华为','斐乐','百事','柯晨','华为','斐乐','百事','柯晨'], src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F04%2F20200204060141_PFTEs.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628272245&t=d8c4959c7c209ab685765369ef1c9759'},
			{name: '张菡', sex: '1',age:22,money:6200,unit:'天', age: 23, area: '北京',modelType:['可爱'],country: '中国', score:3,height:188,BWH:'90-62-94',cooperation:['小米','阿迪达斯','华为','斐乐','百事','柯晨','华为','斐乐','百事','柯晨'], src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F04%2F20200204060141_PFTEs.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628272245&t=d8c4959c7c209ab685765369ef1c9759'},
		];
	},
	methods: {
		// 查看更多消息
		showAllMessageFn() {
			uni.switchTab({
				url: '../message/message'
			})
		},
		// 查看具体消息
		showMessageItem(index) {
			uni.navigateTo({
				url: '../message/messageDetail/messageDetail'
			})
		},
		// 查看更多资源
		showAllModelFn() {
			uni.switchTab({
				url: '../model/modelList'
			})
		},
	}
};
</script>

<style lang="scss" scoped>
.index {
	padding-bottom: 50px;
}
swiper,
.swiper-img {
	width: 100%;
	height: 500rpx !important;
}
.notice-bar {
	width: 690upx;
	margin: 30upx 30upx 0;
	border-radius: 30upx;
}
.new-model-title {
	padding: 30upx;
	.title {
		position: relative;
		padding-left: 10px;
		&::before {
			content: "";
			position: absolute;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
			width: 3px;
			height: 30upx;
			background-color: $color;
		}
	}
	.more {
		color: #999;
		font-size: 24upx;
	}
}
.notice-list {
	padding: 0 50upx;
	line-height: 60upx;
	color: #666666;
	.icon {
		margin-right: 16upx;
	}
}
</style>

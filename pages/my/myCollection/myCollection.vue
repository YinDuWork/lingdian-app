<template>
	<view class="model-list">
		<!-- 搜索栏 -->
		<!-- <uni-nav-bar :fixed="true" :border="false" color="#666666" background-color="#FFFFFF">
			<view class="serarch-con flex flex_grow">
				<uni-icons class="input-uni-icon" type="search" size="22" color="#666666" />
				<input confirm-type="search" class="search-input flex_grow" type="text" placeholder="输入模特信息" @confirm="confirm">
			</view>
		</uni-nav-bar> -->
		<!-- 列表数据 -->
		<com-scroller ref="refList" :list="modelList" :listKey="listKey" :reload="reload" :queryModel="queryModel" @loaded="loadedList">
			<uni-swipe-action>
				<uni-swipe-action-item v-for="(item, index) in modelList" :key="index" :right-options="swipeOptions" @click="swipeClick($event, index)">
					<model-item :data="item" type="list" simple></model-item>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</com-scroller>
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
				fetch: '', // 列表接口
				listKey: 'modelList', // 列表请求返回的字段key
				queryModel: { // 请求列表参数
				},
				reload: false,
				modelList: [], // 列表数据
				swipeOptions: [
					{
						text: '取消收藏',
						style: {
							backgroundColor: 'rgb(255,58,49)'
						}
					}
				],
			};
		},
		onLoad() {
			this.modelList = [
				{name: '肖遥', sex: '1',age:12,money:4500,unit:'天', age: 23, area: '北京',modelType:['可爱'],country: '中国', score:5,height:184,BWH:'90-62-94',shoeSize:42,cooperation:['小米','阿迪达斯','华为'], src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2F1112%2F12061P91610%2F1Q206091610-3-1200.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628272159&t=2a4e52248b3613d0375e8b2ea91e650d'},
				{name: '张菡', sex: '0',age:19,money:8000,unit:'件', age: 19, area: '上海',modelType:['可爱'],country: '中国', score:5,height:178,BWH:'90-62-94',shoeSize:42,cooperation:[], src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F04%2F20200204060141_PFTEs.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628272245&t=d8c4959c7c209ab685765369ef1c9759'},
				{name: '张菡', sex: '1',age:22,money:6200,unit:'天', age: 23, area: '北京',modelType:['可爱'],country: '中国', score:3,height:188,BWH:'90-62-94',cooperation:['小米','阿迪达斯','华为','斐乐','百事','柯晨','华为','斐乐','百事','柯晨'], src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F04%2F20200204060141_PFTEs.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628272245&t=d8c4959c7c209ab685765369ef1c9759'},
				{name: '张菡', sex: '1',age:16,money:4500,unit:'小时', age: 23, area: '北京',modelType:['可爱'],country: '中国', score:3,height:178,BWH:'90-62-94',cooperation:['小米','阿迪达斯','华为'], src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F04%2F20200204060141_PFTEs.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628272245&t=d8c4959c7c209ab685765369ef1c9759'},
				{name: '张菡', sex: '1',age:22,money:6200,unit:'天', age: 23, area: '北京',modelType:['可爱'],country: '中国', score:3,height:188,BWH:'90-62-94',cooperation:['小米','阿迪达斯','华为','斐乐','百事','柯晨','华为','斐乐','百事','柯晨'], src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F04%2F20200204060141_PFTEs.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628272245&t=d8c4959c7c209ab685765369ef1c9759'},
				{name: '张菡', sex: '1',age:16,money:4500,unit:'天', age: 23, area: '北京',modelType:['可爱'],country: '中国', score:3,height:178,BWH:'90-62-94',cooperation:['小米','阿迪达斯','华为'], src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F04%2F20200204060141_PFTEs.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628272245&t=d8c4959c7c209ab685765369ef1c9759'},
				{name: '张菡', sex: '1',age:22,money:6200,unit:'天', age: 23, area: '北京',modelType:['可爱'],country: '中国', score:3,height:188,BWH:'90-62-94',cooperation:['小米','阿迪达斯','华为','斐乐','百事','柯晨','华为','斐乐','百事','柯晨'], src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F04%2F20200204060141_PFTEs.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628272245&t=d8c4959c7c209ab685765369ef1c9759'},
				{name: '张菡', sex: '1',age:16,money:4500,unit:'天', age: 23, area: '北京',modelType:['可爱'],country: '中国', score:3,height:178,BWH:'90-62-94',cooperation:['小米','阿迪达斯','华为'], src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F04%2F20200204060141_PFTEs.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628272245&t=d8c4959c7c209ab685765369ef1c9759'},
				{name: '张菡', sex: '1',age:22,money:6200,unit:'天', age: 23, area: '北京',modelType:['可爱'],country: '中国', score:3,height:188,BWH:'90-62-94',cooperation:['小米','阿迪达斯','华为','斐乐','百事','柯晨','华为','斐乐','百事','柯晨'], src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F04%2F20200204060141_PFTEs.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628272245&t=d8c4959c7c209ab685765369ef1c9759'},
				{name: '张菡', sex: '1',age:16,money:4500,unit:'天', age: 23, area: '北京',modelType:['可爱'],country: '中国', score:3,height:178,BWH:'90-62-94',cooperation:['小米','阿迪达斯','华为'], src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F04%2F20200204060141_PFTEs.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628272245&t=d8c4959c7c209ab685765369ef1c9759'},
				{name: '张菡', sex: '1',age:22,money:6200,unit:'天', age: 23, area: '北京',modelType:['可爱'],country: '中国', score:3,height:188,BWH:'90-62-94',cooperation:['小米','阿迪达斯','华为','斐乐','百事','柯晨','华为','斐乐','百事','柯晨'], src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F04%2F20200204060141_PFTEs.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628272245&t=d8c4959c7c209ab685765369ef1c9759'},
				{name: '张菡', sex: '1',age:16,money:4500,unit:'天', age: 23, area: '北京',modelType:['可爱'],country: '中国', score:3,height:178,BWH:'90-62-94',cooperation:['小米','阿迪达斯','华为'], src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F04%2F20200204060141_PFTEs.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628272245&t=d8c4959c7c209ab685765369ef1c9759'},
				{name: '肖遥', sex: '1',age:11,money:4500,unit:'天', age: 23, area: '北京',modelType:['可爱'],country: '中国', score:3,height:178,BWH:'90-62-94',cooperation:['小米','阿迪达斯','华为'],shoeSize:42, src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2F1112%2F12061P91610%2F1Q206091610-3-1200.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628272159&t=2a4e52248b3613d0375e8b2ea91e650d'},
			];
		},
		methods: {
			// 获取列表数据
			loadedList(list) {
				this.reload = false;
				this.modelList = list;
			},
			// 左滑操作
			swipeClick(e, index) {
				uni.showToast({
					title: `点击了${e.content.text}按钮`,
					icon: 'none'
				});
			}
		},
	};
</script>

<style lang="scss" scoped>
	.model-list {
		height: 100%;
	}
	.serarch-con {
		position: absolute;
		height: 72upx;
		margin: 8upx 0;
		padding: 0 30upx;
		line-height: 72upx;
		border-radius: 40upx;
		box-sizing: border-box;
		background-color: #f8f8f8;
		.search-input {
			height: 72upx;
			margin-left: 20upx;
			line-height: 72upx;
		}
	}
</style>
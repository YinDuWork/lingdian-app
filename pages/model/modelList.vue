<template>
	<view class="model-list">
		<!-- 搜索栏 -->
		<uni-nav-bar :fixed="false" :border="false" color="#666666" background-color="#FFFFFF">
			<view class="serarch-con flex flex_grow">
				<uni-icons class="input-uni-icon" type="search" size="22" color="#666666" />
				<input confirm-type="search" class="search-input flex_grow" type="text" placeholder="输入模特信息" @confirm="confirm">
			</view>
			<iconfont slot="right" class="switch" :icon="switchList?'card-list':'card'" color="#666666" size="20" @click="switchViewFn"></iconfont>
		</uni-nav-bar>
		<!-- 筛选条件及切换视图 -->
		<view class="filter-con">
			<sl-filter ref="refFilter" class="filter" :isTransNav="true" themeColor="#cfb787" reflexTitle :menuList="filterList" @result="filterChangeHandle"></sl-filter>
			<view class="all-filter-btn">筛选<iconfont icon="screen" color="#666666" size="12" @click="showAllFilterFn"></iconfont></view>
		</view>
		<!-- 列表数据 -->
		<com-scroller ref="refList" :list="modelList" :listKey="listKey" :reload="reload" top="100" emptyTip="暂无模特信息，快去上传吧" :queryModel="queryModel" @loaded="loadedList">
			<view>
				<model-item v-for="(item, index) in modelList" :key="index" :data="item" :type="switchList?'list':'card'"></model-item>
			</view>
		</com-scroller>
		
		<!-- 模特卡 -->
		<com-all-filter ref="refAllFilter" :list="allFilter" @confirm="allFilterConfirm"></com-all-filter>
	</view>
</template>

<script>
	import modelItem from '@/components/model-item/model-item.vue'
	import comPopup from '@/components/com-popup/com-popup.vue'
	import comAllFilter from '@/components/com-all-filter/com-all-filter.vue'
	import { SEX, COUNTRY, MODEL_TYPE, AREA } from '@/common/dics.js'
	import { modelFilters } from '@/common/modelFilter.js'
	export default {
		components: {
			modelItem,
			comPopup,
			comAllFilter
		},
		data() {
			return {
				fetch: '', // 列表接口
				listKey: 'modelList', // 列表请求返回的字段key
				filterList: [],
				allFilter: [],
				switchList: true, // 视图展示是否为列表：list、card
				typeList: [
					{key: '1', value: '儿童'},{key: '2', value: '儿童'},{key: '3', value: '儿童'},{key: '4', value: '儿童'},{key: '5', value: '儿童'},
				], // 模特卡列表
				queryModel: { // 请求列表参数
					sex: '', // 性别
					area: '', // 地域
					type: '', // 模特卡
				},
				reload: false,
				modelList: [], // 列表数据
			};
		},
		created() {
			modelFilters[0].detailList = modelFilters[0].detailList.concat(SEX);
			modelFilters[1].detailList = modelFilters[1].detailList.concat(COUNTRY);
			modelFilters[2].detailList = modelFilters[2].detailList.concat(MODEL_TYPE);
			modelFilters[3].detailList = modelFilters[3].detailList.concat(AREA);
			this.filterList = Object.assign([], modelFilters).slice(0,4);
			this.allFilter = Object.assign([], modelFilters);
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
			// 展示所有筛选项弹窗
			showAllFilterFn() {
				this.$refs.refAllFilter.open();
				this.$refs.refFilter.$refs.popupRef.close();
			},
			// 切换列表展示视图
			switchViewFn() {
				this.switchList = !this.switchList;
			},
			// 筛选条件改变
			filterChangeHandle(result) {
				for (let key in result) {
					this.queryModel[key] = result[key];
				}
				this.reload = true;
				this.$refs.refList.loadData();
			},
			// 全部筛选条件改变
			allFilterConfirm(result) {
				console.log(result.result)
				for (let key in result.result) {
					this.queryModel[key] = result.result[key];
				}
				this.reload = true;
				this.$refs.refList.loadData();
			},
			// 获取列表数据
			loadedList(list) {
				this.reload = false;
				this.modelList = list;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.model-list {
		height: 100%;
	}
	.serarch-con {
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
	.filter-con {
		position: absolute;
		top: --window-top; /* css变量 */
		left: 0;
		width: 100%;
		z-index: 10;
		display: flex;
		align-items: center;
		background-color: #fff;
		.filter {
			width: calc(100% - 100upx);
		}
		.all-filter-btn {
			width: 150upx;
			color: #666666;
			font-size: 28upx;
			text-align: center;
		}
	}
	.filter-list {
		height: 800upx;
		padding: 0 30upx 30upx;
		font-size: 28upx;
		overflow: auto;
		.filter-title {
			height: 80upx;
			line-height: 80upx;
			font-size: 30upx;
			font-weight: 700;
		}
		.filter-option-item {
			display: inline-block;
			margin-right: 20upx;
			margin-bottom: 20upx;
			padding: 10upx 30upx;
			color: #666666;
			background-color: $bg_color;
			border-radius: 30upx;
		}
		.slider-range {
			padding-left: 50upx !important;
			padding-right: 50upx !important;
		}
	}
</style>
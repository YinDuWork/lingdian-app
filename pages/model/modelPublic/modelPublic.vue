<template>
	<view class="public">
		<com-tabs v-if="!showTabs" :data="tabs"></com-tabs>
		<base-info v-show="currTabIndex===0"></base-info>
		<images-info v-show="currTabIndex===1"></images-info>
		<view class="btn-group">
			<button v-show="currTabIndex===0" type="primary" @click="saveInfoFn">下一步</button>
			<button v-show="currTabIndex===1" plain type="warn" @click="prevFn">上一步</button>
			<button v-show="currTabIndex===1" type="primary" @click="prevFn">保存</button>
		</view>
	</view>
</template>
<script>
	import comTabs from '@/components/com-tabs/com-tabs.vue'
	import baseInfo from './baseInfo.vue';
	import imagesInfo from './imagesInfo.vue';
	export default {
		components: {
			comTabs,
			baseInfo,
			imagesInfo
		},
		data() {
			return {
				showTabs: false, // 是否展示tabs
				currTabIndex: 0, // 当前展示的tab下标
				tabs: [ // tabs数据
				    {title: '模特详情', key: '1'},
				    {title: '视频展示', key: '2'},
				],
			};
		},
		onLoad(data) {
			if (data && data.type) {
				if (data.type === 'add') {
					this.showTabs = true;
				}
			}
		},
		methods: {
			// 保存信息
			saveInfoFn() {
				this.currTabIndex++;
			},
			// 上一步
			prevFn() {
				this.currTabIndex--;
			}
		}
	}
</script>

<style lang="scss">
.public {
	padding-bottom: 40upx;
	.btn-group {
		padding: 0 40upx;
	}
}
</style>

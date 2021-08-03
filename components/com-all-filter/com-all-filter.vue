<template>
	<com-popup title="全部筛选" :show.sync="show">
		<view class="filter-list" slot="body">
			<view v-for="(item, index) in list" :key="item.key">
				<view class="filter-title">{{item.title}}</view>
				<view v-if="item.type==='option'" class="filter-option-item" :class="{selected: dItem.isSelected}"
				    v-for="(dItem, dIndex) in item.detailList" :key="item.value" @click="itemClickFn(dIndex,item.detailList,item.key, item.isMutiple)">
					{{dItem.title}}
				</view>
				<view v-if="item.type==='range'">
					<com-slider-range v-model="item.value" :min="item.min" :max="item.max" :block-size="20" :step="item.step"
					   background-color="#c0c0c0" active-color="#cfb787" :bar-height="2" :format="item.formatter" @change="sliderChange"></com-slider-range>
				</view>
			</view>
			<view class="btn-group">
				<button type="warn" plain @click="resetFn">重置</button>
				<button type="primary" @click="confirmFn">确定</button>
			</view>
		</view>
	</com-popup>
</template>

<script>
	import comSliderRange from '@/components/com-slider-range/com-slider-range.vue'
	export default {
		name:"com-all-filter",
		components: {
			comSliderRange,
		},
		props: {
			list: Array,
		},
		data() {
			return {
				show: false, // 是否展示
				result: {},
			};
		},
		computed: {
		},
		methods: {
			open() {
				this.show = true;
			},
			close() {
				this.show = false;
			},
			// 确定
			confirmFn() {
				let result_str = {};
				for (let key in this.result) {
					if (typeof this.result[key] == 'object') {
						result_str[key] = this.result[key].join(',');
					} else {
						result_str[key] = this.result[key];
					}
				}
				for (let i = 0; i < this.list.length; i++) {
					if (this.list[i].type === 'range') {
						this.result[this.list[i].key] = this.list[i].value;
						result_str[this.list[i].key] = this.list[i].value.join(',');
					}
				}
				this.$emit('confirm', {'result_str': result_str, 'result': this.result});
				this.close();
			},
			// 重置
			resetFn() {
				for (let key in this.result) {
					if (typeof this.result[key] === 'object') {
						delete this.result[key];
					} else {
						delete this.result[key];
					}
				}
				for (let i = 0; i < this.list.length; i++) {
					if (this.list[i].type === 'option') {
						for (let j = 0; j < this.list[i].detailList.length; j++) {
							if (j === 0) { // 第一项不限
								this.list[i].detailList[j].isSelected = true;
							} else {
								this.list[i].detailList[j].isSelected = false;
							}
						}
					} else if (this.list[i].type === 'range') {
						this.list[i].value = [this.list[i].min, this.list[i].max];
					}
				}
				// #ifdef H5
				this.$forceUpdate();
				// #endif
				this.close();
			},
			// 筛选项选中或取消
			itemClickFn(index, list, key, isMutiple) {
				if (isMutiple == true) {
					if (index === 0) {
						list[index].isSelected = true;
						for (let j = 1; j < list.length; j++) {
							list[j].isSelected = false;
						}
						delete this.result[key];
					} else {
						list[index].isSelected = !list[index].isSelected;
						if (list[index].isSelected) { // 选中
						    // 处理全选项的效果和值
							list[0].isSelected = false;
							if (!this.result[key]) this.result[key] = [];
							let idx = this.result[key].indexOf('');
							if (idx > -1) {
								this.result[key].splice(idx, 1);
							}
							this.result[key].push(list[index].value);
						} else {
							let idx = this.result[key].indexOf(list[index].value);
							this.result[key].splice(idx, 1);
							if (this.result[key].length === 0) list[0].isSelected = true;
						}
					}
				} else {
					this.result[key] = list[index].isSelected ? '' : list[index].value;
					for (let i = 0; i < list.length; i++) {
						if (index == i && !list[i].isSelected) {
							list[i].isSelected = true
						} else {
							list[i].isSelected = false
						}
					}
				}
				
				// #ifdef H5
				this.$forceUpdate();
				// #endif
			},
			// 滑块改变
			sliderChange(values) {
				// this.redult[]
			}
		}
	}
</script>

<style lang="scss">
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
			&.selected {
				color: #FFFFFF;
				background-color: $color;
			}
		}
		.slider-range {
			padding-left: 50upx !important;
			padding-right: 50upx !important;
		}
	}
</style>

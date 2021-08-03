<template>
	<view class="form-item" :class="{'checkbox': value.length, required: required}">
		<view v-if="label" class="form-item-label">{{label}}</view>
		<view class="form-item-con" :class="{'no-label':!label}" @click="showList">
			<view v-if="value.length">
				<text class="check-item" v-for="item in curArr" :key="item[valueField]">{{item[textField]}}</text>
			</view>
			<view v-else class="picker-con">
				<view class="c_999">请选择{{label}}</view>
				<uni-icons v-show="!disabled" class="right-icon" type="arrowright"></uni-icons>
			</view>
		</view>
		<uni-popup ref="refPopup" type="right" :mask-click="false">
			<view class="mask-con">
				<view class="mask-title flex justify_between flex_center">
					<uni-icons class="close" type="closeempty" size="24" color="#999" @click="closeList"></uni-icons>
					{{label}}
					<button class="save" type="primary" size="mini" @click="saveFn">保存</button>
				</view>
				<view class="mask-body">
					<text class="check-item" :class="{'selected': item.selected}" v-for="(item, index) in list" :key="item[valueField]" @click="selectItem(index)">{{item[textField]}}</text>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				curValue: [], // 选中的数据值
				newList: this.list,
			}
		},
		props:{
			value: Array,
			label: String,
			noLable:{
				type: Boolean,
				default: false
			},
			list: Array,
			valueField: {
				type: String,
				default: 'value'
			},
			textField: {
				type: String,
				default:'title'
			},
			disabled:Boolean,
			required:{
				type: Boolean,
				default: false
			},
		},
		computed: {
			curArr() {
				return this.newList.filter(item=>this.value.indexOf(item[this.valueField])>-1);
			}
		},
		mounted(){
			this.curValue = this.value;
		},
		methods:{
			// 展示所有选择项
			showList() {
				if (this.disabled) {
					return;
				}
				this.newList.forEach((item, index)=>{
					if (this.value.indexOf(item[this.valueField])>-1) {
						this.$set(this.newList[index], 'selected', true)
					} else {
						this.$set(this.newList[index], 'selected', false)
					}
				});
				this.$emit('list:update', this.newList);
				this.$refs.refPopup.open();
			},
			closeList() {
				this.$refs.refPopup.close();
			},
			// 选择项点击事件
			selectItem(index) {
				let curItem = this.newList[index];
				this.$set(this.newList[index], 'selected', !curItem.selected)
				this.$emit('list:update', this.newList);
				this.setCurValue();
			},
			setCurValue() {
				this.$nextTick(()=>{
					this.curValue = [];
					this.newList.forEach(item=>{
						if (item.selected) {
							this.curValue.push(item[this.valueField]);
						}
					});
				});
			},
			// 保存
			saveFn() {
				this.$emit('input', this.curValue);
				this.closeList();
			}
		},
		watch:{
			value(cur){
				this.curValue = cur;
				this.closeList();
			}
		}
	}
</script>

<style lang="scss" scoped>
.uni-popup {
	z-index: 999;
}
/deep/ .uni-popup .uni-popup__wrapper.right {
	padding-top: 0;
}
.mask-con {
	width: 750upx;
	height: 100%;
    background: white;
	overflow: auto;
    .mask-title {
        position: relative;
        height: 88upx;
		padding: 0 30upx;
        line-height: 88upx;
        color: #18202C;
        font-size: 34upx;
		.save {
			margin: 0;
		}
    }
	.mask-body {
		padding: 20upx 30upx;
	}
}
</style>
  
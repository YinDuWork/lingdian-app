<template>
	<view class="form-item" :class="{'checkbox': value.length, required: required}">
		<view v-if="label" class="form-item-label">{{label}}</view>
		<view class="form-item-con" :class="{'no-label':!label}">
			<view v-if="value.length">
				<text class="check-item" v-for="(item, index) in curArr" :key="index">{{item}}
					<uni-icons class="close" type="closeempty" color="#b1b1b1" @click="delFn(index)"></uni-icons>
				</text>
			</view>
			<text v-if="!disabled" class="add-item" @click="addFn"><uni-icons type="plusempty"></uni-icons></text>
		</view>
		<uni-popup v-if="!disabled" ref="refDialogInput" type="dialog">
			<uni-popup-dialog :title="'添加'+label" mode="input" :placeholder="'请输入'+label" before-close @confirm="dialogInputConfirm" @close="dialogInputClose"></uni-popup-dialog>
		</uni-popup>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				curArr: []
			}
		},
		props:{
			value: String,
			label: String,
			noLable:{
				type: Boolean,
				default: false
			},
			disabled:Boolean,
			required:{
				type: Boolean,
				default: false
			},
			separator: {
				type: String,
				default: ','
			}
		},
		mounted() {
			this.curArr = this.value.split(this.separator);
		},
		methods:{
			// 添加项
			addFn() {
				this.$refs.refDialogInput.open()
			},
			// 删除项
			delFn(index) {
				let valArr = this.value.split(this.separator);
				valArr.splice(index, 1);
				this.$emit('input', valArr.join(this.separator));
				this.$refs.refDialogInput.close()
			},
			// 输入对话框的确定事件
			dialogInputConfirm(val) {
				val = val.trim();
				if (val) {
					if (this.curArr.indexOf(val)>-1) {
						this.toast(`该${this.label}已存在`)
					} else {
						let valArr = this.value?this.value.split(this.separator):[];
						valArr.push(val);
						this.$emit('input', valArr.join(this.separator));
						this.$refs.refDialogInput.close()
					}
				}
			},
			// 输入对话框的取消事件
			dialogInputClose() {
				this.$refs.refDialogInput.close()
			}
		},
		watch:{
			value(cur){
				this.curArr = cur.split(this.separator);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.check-item {
		.close {
			margin-left: 10upx;
		}
	}
	.add-item {
		position: absolute;
		top: 18upx;
		right: 20upx;
		display: inline-block;
		height: 30px;
		padding: 0 10px;
		line-height: 30px;
		background-color: #f5f5f5;
		border-radius: 4px;
	}
</style>
  
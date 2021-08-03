<template>
	<view class="form-item" :class="{required: required}">
		<view v-if="label" class="form-item-label" :style="{width:labelWidth?labelWidth:'auto'}">{{label}}</view>
		<view class="form-item-con" :class="{'no-label':!label}">
			<picker @change="bindPickerChange" :value="index"  :mode="mode" :range="array" :disabled="disabled" :range-key="textField">
				<view class="picker-con">
					<text class="picker-text" :class="{'c_999':!text}" :style="{textAlign: align}">{{text||placeholderText}}</text>
					<uni-icons v-show="!disabled" class="right-icon" type="arrowright"></uni-icons>
				</view>
			</picker>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				index: this.mode === 'selector' ? '' : [],
				text: '', // 展示的内容
				placeholderText: this.placeholder,
			}
		},
		props:{
			list: Array,
			isClear:{
				type:Boolean,
				default:false
			},
			label:String,
			align: {
				type: String,
				default: 'rignt'
			},
			mode: {
				type: String,
				default: 'selector'
			},
			separator: { // mode="multiSelector"时的分隔符
				type: String,
				default: '-'
			},
			isObject: { // 是否为键值对类型
				type: Boolean,
				default: true
			},
			valueField: {
				type:String,
				default: 'value'
			},
			textField: {
				type:String,
				default:'title'
			},
			labelWidth:String,
			clearLabel:{
				type: String,
				default:'暂无'
			},
			placeholder: String,
			disabled:Boolean,
			value:[String, Number,Array],
			required:{
				type: Boolean,
				default: false
			},
			noLabel:{ // 是否没有label
				type:Boolean,
				default:true
			}
		},
		computed:{
			array(){
				if(this.isClear){
					if(this.isObject){
						let obj = {};
						obj[this.valueField] = '';
						obj[this.textField] = this.clearLabel;
						return [obj].concat(this.list);
					}else{
						return [this.clearLabel].concat(this.list);
					}
				}else{
					return this.list;
				}
			}
		},
		mounted(){
			this.resetIndex();
			if (!this.placeholder) {
				this.placeholderText = `请选择${this.label||''}`;
			}
		},
		methods:{
			bindPickerChange(e){
				let _this = this;
				_this.index = e.target.value;
				if(_this.isClear&&_this.index===0){
					_this.$emit('input','');
					_this.$emit('change','',_this.index);
				}else{
					if (_this.mode === 'selector') { // 单列选择器
						let obj = _this.array[_this.index];
						let val = obj;
						if(_this.isObject){
							val = obj[_this.valueField];
						}
						_this.$emit('input',val);
						_this.$emit('change',val,_this.index);
					} else { // 多列选择器
					    let val = [];
						_this.index.forEach((iItem, i)=>{
							val[i] = _this.isObject?_this.array[i][iItem][_this.valueField]:_this.array[i][iItem];
						})
						_this.$emit('input',val);
						_this.$emit('change',val,_this.index);
					}
				}
				_this.resetText();
			},
			resetIndex(){
				let _this = this;
				if (_this.mode==='multiSelector') { // 多列
				    let index = [];
					_this.value.forEach((vItem, i)=>{
						if (_this.isObject) {
							index[i] = _this.array[i].findIndex(v=>v[_this.valueField]==vItem);
						} else {
							index[i] = _this.array[i].findIndex(v=>v==vItem);
						}
					})
					_this.index = index;
				} else if(_this.value||typeof _this.value=='number'){
					if(_this.isObject){
						_this.index = _this.array.findIndex(v=>v[_this.valueField]==_this.value);
					}else{
						_this.index = _this.array.findIndex(v=>v==_this.value);
					}
				}else{
					_this.index = '';
				}
				_this.resetText();
			},
			resetText() {
				let _this = this;
				if (_this.mode==='multiSelector'&&_this.index.length) { // 多列
					if (!_this.isObject) {
						_this.text = _this.value.join(_this.separator);
						return;
					}
					let text = [];
					_this.index.forEach((iItem, i)=>{
						text[i] = _this.array[i][iItem][_this.textField];
					})
					_this.text = text.join(_this.separator);
				} else if(_this.value||typeof _this.value=='number'){
					let obj = _this.array[_this.index];
					if(obj&&_this.isObject){
						_this.text = obj[_this.textField];
						return;
					}else{
						_this.text = obj;
						return;
					}
				}else{
					_this.text = '';
				}
			}
		},
		watch:{
			value(cur){
				this.resetIndex();
			}
		}
	}
</script>

<style>
</style>
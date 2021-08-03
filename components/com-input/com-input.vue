<template>
	<view class="form-item" :class="{required: required}">
		<view v-if="label" class="form-item-label" :style="{width:labelWidth?labelWidth:'auto'}">{{label}}</view>
		<view v-if="notInput" class="form-item-con" :style="{textAlign: align}"><slot name="text"></slot></view>
		<!-- #ifdef H5 -->
		<!-- H5 暂未支持动态切换，使用 v-if 进行整体切换 -->
		<input v-else-if="password" class="form-item-con" :style="{textAlign: align}" password :class="{'no-label':!label,'disable-uni-input':disabled||!curValue}" v-model="curValue"
			:maxlength="maxlength" :disabled="disabled" :placeholder="placeholderText" placeholder-class="c_999" @change="_change"/>
		<input v-else-if="type=='text'" class="form-item-con" :style="{textAlign: align}" :class="{'no-label':!label,'disable-uni-input':disabled||!curValue}" v-model="curValue"
		  :maxlength="maxlength" :disabled="disabled" :placeholder="placeholderText" placeholder-class="c_999" @change="_change"/>
		<input v-else-if="type=='number'" class="form-item-con" :style="{textAlign: align}" type="number" :class="{'no-label':!label,'disable-uni-input':disabled||!curValue}" v-model="curValue"
		    :maxlength="maxlength" :disabled="disabled" :placeholder="placeholderText" placeholder-class="c_999" @change="_change"/>
		<input v-else-if="type=='digit'" class="form-item-con" :style="{textAlign: align}" type="digit" :class="{'no-label':!label,'disable-uni-input':disabled||!curValue}" v-model="curValue"
			:maxlength="maxlength" :disabled="disabled" :placeholder="placeholderText" placeholder-class="c_999" @change="_change"/>
		<input v-else-if="type=='idcard'" class="form-item-con" :style="{textAlign: align}" type="idcard" :class="{'no-label':!label,'disable-uni-input':disabled||!curValue}" v-model="curValue"
			:maxlength="maxlength" :disabled="disabled" :placeholder="placeholderText" placeholder-class="c_999" @change="_change"/>
		<!-- #endif -->
		<textarea v-else-if="type=='textarea'" class="form-item-con" :style="{textAlign: align}" :class="{'no-label':!label,'disable-uni-input':disabled||!curValue}" v-model="curValue"
			:maxlength="maxlength" auto-height :disabled="disabled" :placeholder="placeholderText" placeholder-class="c_999" @change="_change"/>
		<input v-else class="form-item-con" :style="{textAlign: align}" :type="type" :password="password" :class="{'no-label':!label,'disable-uni-input':disabled||!curValue}" v-model="curValue"
		  :maxlength="maxlength" :disabled="disabled" :placeholder="placeholderText" placeholder-class="c_999" @change="_change"/>
		<slot></slot>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				curValue: '',
				placeholderText: this.placeholder
			}
		},
		props:{
			value: [String, Number],
			type: { // 	input 的类型   text:文本输入键盘  number:数字输入键盘  idcard:身份证输入键盘  digit:带小数点的数字键盘
			    type: String,
			    default: "text"
			},
			password: false, // 是否是密码类型(H5和App写此属性时，type失效)
			label: String,
			noLable:{
				type: Boolean,
				default: false
			},
			notInput:{ // 非input
				type: Boolean,
				default: false
			},
			labelWidth:String,
			align: {
				type: String,
				default: 'rignt'
			},
			maxlength: { // 最大输入长度。uniapp的input组件默认值为140，设置为-1的时候不限制最大长度
				type: [String, Number],
				default: -1
			},
			placeholder: String,
			disabled:Boolean,
			required:{
				type: Boolean,
				default: false
			}
		},
		mounted(){
			this.curValue = this.value;
			if (!this.placeholder) {
				this.placeholderText = `请输入${this.label||''}`;
			}
		},
		methods:{
			_change(e){
				this.$emit('change',e);
			},
		},
		watch:{
			value(cur){
				this.curValue = cur;
			},
			curValue(cur){
				this.$emit('input', cur);
			}
		}
	}
</script>

<style>
</style>

<template>
	<view>
		<view class="form-box">
			<com-input label="姓名" v-model="formData.name" required></com-input>
			<com-select label="性别" v-model="formData.applytnr" :list="sexOptions" required></com-select>
			<com-input label="年龄" v-model="formData.name" type="number" maxlength="2"></com-input>
			<com-input label="联系电话" v-model="formData.name" type="number" maxlength="11" required></com-input>
			<com-select label="地区" v-model="formData.name" :list="areaOptions" required></com-select>
			<com-select label="国籍" v-model="formData.name" :list="countryOptions" required></com-select>
		</view>
		<view class="form-box">
			<com-input label="身高(cm)" v-model="formData.name" type="digit" required></com-input>
			<com-input label="体重(kg)" v-model="formData.weight" type="digit"></com-input>
			<com-input label="三围" v-model="formData.bwh" :list="bwhOptions" mode="multiSelector" :isObject="false" required></com-input>
			<com-input label="鞋码" v-model="formData.name" type="number"></com-input>
			<com-input label="服装尺码" v-model="formData.name" :isObject="false" :list="clothingSizeOptions"></com-input>
		</view>
		<view class="form-box">
			<com-input label="喜好" v-model="formData.hobby" type="textarea"></com-input>
			<com-input label="技能" v-model="formData.skill" type="textarea"></com-input>
			<com-editbox label="合作品牌" v-model="formData.cooperation" required></com-editbox>
			<com-input label="备注" v-model="formData.name" type="textarea"></com-input>
		</view>
		<view class="form-box">
			<com-input label="价格" v-model="formData.name" type="number" required></com-input>
			<com-select label="单位" v-model="formData.unit" :list="unitOptions" :isObject="false" required></com-select>
			<com-checkbox label="标签" v-model="formData.modelType" :list="modelTypeOptions" required></com-checkbox>
			<view class="form-item">
				<view class="form-item-label">评分</view>
				<view class="form-item-con score-con">
					<uni-rate class="score" size="16" active-color="#cfb787" :value="formData.score" margin="5" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import comInput from '@/components/com-input/com-input.vue';
	import comSelect from '@/components/com-select/com-select.vue';
	import comCheckbox from '@/components/com-checkbox/com-checkbox.vue';
	import comEditbox from '@/components/com-editbox/com-editbox.vue';
	import {
		SEX,
		COUNTRY,
		MODEL_TYPE,
		AREA,
		HEIGHT,
		WEIGHT,
		BWH,
		SHOESIZE,
		CLOTHINGSIZE,
		PRICE_UNIT
	} from '@/common/dics.js'
	export default {
		components: {
			comInput,
			comSelect,
			comCheckbox,
			comEditbox
		},
		data() {
			return {
				sexOptions: SEX,
				countryOptions: COUNTRY,
				modelTypeOptions: MODEL_TYPE,
				areaOptions: AREA,
				heightOptions: HEIGHT,
				weightOptions: WEIGHT,
				shoesizeOptions: SHOESIZE,
				bwhOptions: BWH,
				clothingSizeOptions: CLOTHINGSIZE,
				unitOptions: PRICE_UNIT,
				cooperationOptions: [],
				formData: {
					name: '',
					weight: '',
					modelType: [],
					hobby: '',
					skill: '',
					cooperation: '测试1,测试2',
					bwh: '',
					unit: '',
				}
			};
		},
		methods: {
		},
	}
</script>

<style lang="scss" scoped>
	.form-box{
		.score-con {
			.score {
				display: inline-block;
			}
		}
	}
</style>

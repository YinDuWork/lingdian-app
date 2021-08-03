<template>
	<view class="person-info">
		<view class="form-box">
			<com-input label="头像" notInput>
				<view slot="text" class="flex flex_center justify_end" @click="showImgFn">
					<image class="slot-image" src="/static/img/person_img_default.png" mode="widthFix"></image>
					<uni-icons class="right-icon" type="arrowright"></uni-icons>
				</view>
			</com-input>
			<com-input label="姓名" v-model="custName"></com-input>
			<com-input label="联系电话" v-model="mobile"></com-input>
			<com-input label="个性签名" v-model="signature" type="textarea"></com-input>
		</view>
		<button class="common-btn" type="primary" @click="saveFn">保存</button>
	</view>
</template>

<script>
	import comInput from '@/components/com-input/com-input.vue';
	export default {
		components: {
			comInput
		},
		data() {
			return {
				custName: '张若',
				mobile: '13289478809',
				signature: ''
			}
		},
		methods: {
			// 查看头像
			showImgFn() {
				uni.navigateTo({
					url: './personImg'
				})
			},
			// 保存
			saveFn() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.person-info {
	.list {
		padding: 20upx;
		border-top: 10px solid #F7F7F7;
	}
	.slot-image {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
	}
}
</style>

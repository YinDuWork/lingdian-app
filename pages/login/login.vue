<template>
	<view class="login-page">
		<view class="logo-con">
			<image class="logo" src="../../static/img/logo_white.png"></image>
		</view>
		<view class="login-form">
			<view class="login-form-item">
				<iconfont icon="phone" color="#999999"></iconfont>
				<input v-model="phone" maxlength="11" placeholder="请输入您的手机号" />
				<!-- <uni-icons type="clear"></uni-icons> -->
			</view>
			<view class="login-form-item">
				<iconfont icon="pwd" color="#999999"></iconfont>
				<input v-model="pwd" type="password" maxlength="20" placeholder="请输入您的登录密码" />
			</view>
		</view>
		<button class="big-btn" type="primary" @click="loginFn">登录</button>                                                                              
	</view>
</template>
<script>
import { REGEX } from '@/common/env.js'
export default {
	data() {
		return {
			phone: '', // 手机号
			pwd: '', // 密码
		}
	},
	methods: {
		// 登录按钮
		loginFn() {
			let _this = this;
			// 校验
			let emptyPhoneToast = '请输入手机号！';
			let emptyPwdToast = '请输入您的登录密码';
			// if (!_this.valid(_this.phone, emptyPhoneToast, REGEX.mobile)||!_this.valid(_this.pwd, emptyPwdToast, REGEX.loginPwd)) {
			// 	return;
			// }
			// 获取登录人信息
			// fetchLogin({phoneno: _this.phone, loginPswd:password}).then((res)=>{
			// })
			uni.switchTab({
				url: '/pages/index/index'
			});
		},
		// 校验手机号,密码
		valid(val, emptyToast, regex) {
			if (!val) {
				this.toast(emptyToast);
				return false;
			}
			if (!regex.regex.test(val)) {
				this.toast(regex.msg);
				return false;
			}
			return true;
		}
	}
}
</script>
<style lang="scss">
.login-page {
	height: 100%;
	padding: 140upx 40upx 40upx;
	color: #333;
	background-color: #FFFFFF;
	box-sizing: border-box;
}
.logo-con {
	width: 240upx;
	height: 240upx;
	margin: 0 auto;
	padding: 20upx;
	border-radius: 25px;
	box-sizing: border-box;
	background: $color;
}
.logo {
	width: 200upx;
	height: 200upx;
}
.login-form {
	margin-top: 80upx;
	margin-bottom: 100upx;
}

.login-page input {
	padding: 0 20upx 0 100upx;
	height: 90upx;
	line-height: 90upx;
}

.login-page .login-form-item {
    position: relative;
    margin-bottom: 40upx;
    font-size: 30upx;
    background: #f7f7f7;
    border-radius: 60upx;
	// border-bottom: 1px solid #e8e3e3;
}

.login-page .login-form-item .iconfont {
	position: absolute;
	left: 20upx;
	top: 24upx;
	width: 40upx;
	height: 40upx;
	font-size: 40upx;
	border-right: 2upx solid #dedede;
	padding-right: 20upx
}

.common-btn {
	margin: 100upx auto;
}
</style>

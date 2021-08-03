<template>
	<view>
		<view class="my-top flex flex_center">
			<image class="avatar" :src="avatarUrl"></image>
			<view v-if="username">
				<view class="name">{{username}}</view>
				<view>{{signature}}</view>
			</view>
			<view v-else>
				<view class="login-btn" @click="toLogin">登录</view>
				<view class="login-btn-mess">登录后查看更多内容哦</view>
			</view>
		</view>
		<view class="fun-list">
			<view class="fun-item flex flex_center" v-for="(item, index) in functions" :key="index" @click="functionFn(index)">
				<image class="icon" :src="'/static/img/'+item.icon+'.png'"></image>
				<text class="title">{{item.title}}</text>
				<uni-icons type="arrowright" color="#999999"></uni-icons>
			</view>
		</view>
		<button v-if="username" class="common-btn" type="primary" @click="logoutFn">退出登录</button>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		data() {
			return {
				username: '张若', // 昵称
				avatarUrl: '/static/logo.png', // 用户头像
				signature: '我的个性签名...', // 个性签名
				functions: [
					{title: '我的收藏', icon: 'my_collection', path: '/pages/my/myCollection/myCollection'},
					{title: '我的资源', icon: 'my_list', path: '/pages/my/myModel/myModel'},
					{title: '个人信息', icon: 'my_info', path: '/pages/my/personInfo/personInfo'},
				],
			};
		},
		computed: {
			// ...mapState(['userInfo'])
		},
		methods: {
			// ...mapActions(['logout']),
			// 退出
			logoutFn() {
				// this.logout();
			},
			// 个人中心功能跳转
			functionFn(index) {
				// if (!this.username) {
				// 	this.toLogin();
				// 	return;
				// }
				uni.navigateTo({
					url: this.functions[index].path
				})
			},
			topClickFn() {
				if (this.username) return;
				this.toLogin();
			},
			// 登录
			toLogin() {
				uni.reLaunch({
					url: '/pages/login/login'
				})
			}
		}
	}
</script>

<style lang="scss">
.my-top {
	height: 400upx;
	padding: 64upx 56upx;
	color: #fff;
	background: url(../../static/img/my_bg.png) no-repeat;
	background-size: 100% 100%;
	box-sizing: border-box;
	.avatar {
		width: 160upx;
		height: 160upx;
		margin-right: 40upx;
		border-radius: 50%;
		background-color: #ffffff;
	}
	.login-btn {
		display: inline-block;
		width: 200upx;
		height: 60upx;
		margin-bottom: 30upx;
		line-height: 60upx;
		font-size: 36upx;
	}
	.login-btn-mess {
		font-size: 28upx;
	}
	.name {
		margin-bottom: 20upx;
		font-size: 36upx;
	}
}
.fun-list {
	padding: 0 20upx;
	border-top: 20upx solid #F7F7F7;
	border-bottom: 20upx solid #F7F7F7;
	.fun-item {
		height: 100upx;
		color: #666;
		border-bottom: 1px solid $uni-border-color;
		&:last-of-type {
			border-bottom: 0;
		}
		.icon {
			width: 44upx;
			height: 44upx;
			margin-right: 3%;
		}
		.title {
			width: 84%;
		}
	}
}
</style>

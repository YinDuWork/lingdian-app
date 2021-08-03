<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		uni.onTabBarMidButtonTap(()=>{
			uni.navigateTo({
				url: '/pages/model/modelPublic/modelPublic?type=add',
				animationType: "slide-in-bottom", // 动画类型
				animationDuration: 150, // 窗口动画持续时间，单位为 ms
				fail(err) {
				    console.log(err)
				}
			})
		});
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/*每个页面公共css */ 
@import '@/common/uni-ui.scss';
uni-tabbar .uni-tabbar__mid {
	padding: 10px;
	background: #fff;
	border-radius: 50%;
}
.uni-picker-container .uni-picker-action.uni-picker-action-confirm {
	color: $color;
}
</style>

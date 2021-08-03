<template>
	<!-- 底部按钮 -->
	<view>
		<view class="footer flex flex_center">
			<view class="btn flex1" @click="funFn('share')"><iconfont class="icon-prefix" icon="share" :size="18" color="#666666"></iconfont>分享</view>
			<view class="btn flex1" @click="funFn('collent')"><iconfont class="icon-prefix" :icon="isCollected?'collect-filled':'collect'" :size="18" color="#666666"></iconfont>{{isCollected?'已收藏':'收藏'}}</view>
			<view class="btn flex1" @click="funFn('comment')"><iconfont class="icon-prefix" icon="comment" :size="18" color="#666666"></iconfont>评价</view>
			<view class="btn flex1" @click="funFn('edit')"><iconfont class="icon-prefix" icon="edit" :size="18" color="#666666"></iconfont>编辑</view>
		</view>
		<comment-public :show.sync="showCommentPublic"></comment-public>
		<set-model-label :show.sync="showModelLabel"></set-model-label>
	</view>
</template>

<script>
	import commentPublic from '../commentPublic/commentPublic.vue'
	import setModelLabel from '../setModelLabel/setModelLabel.vue'
	export default {
		components: {
			commentPublic,
			setModelLabel
		},
		data() {
			return {
				isCollected: false, // 是否收藏
				showCommentPublic: false, // 是否展示发布评论
				showModelLabel: false, // 是否设置模特标签
			}
		},
		methods: {
			// 底部功能
			funFn(type) {
				switch (type) {
					case 'share':
						break;
					case 'collent':
						this.isCollected = !this.isCollected;
						// TODO 处理收藏
						break;
					case 'comment':
					this.showCommentPublic = true;
						// TODO 处理发布评论
						break;
					case 'edit':
					this.showModelLabel = true;
						break;
				}
			}
		}
	}
</script>

<style lang="scss">
.footer {
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 99upx;
	color: #666;
	border-top: solid 1upx #eee;
	background-color: #fff;
	z-index: 2;
	.btn {
		text-align: center;
		border-right: 1px solid #c1c1c1;
		&:last-child {
			border-right-width: 0;
		}
	}
}
</style>

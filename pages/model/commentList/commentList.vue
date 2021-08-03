<template>
	<view class="comment-list">
		<!-- 列表数据 -->
		<com-scroller ref="refList" :list="list" :listKey="listKey" :reload="reload" :queryModel="queryModel" @loaded="loadedList">
			<view>
				<comment-item v-for="(item, index) in list" :key="index" :data="item"></comment-item>
			</view>
		</com-scroller>
		<comment-public :show.sync="showCommentPublic"></comment-public>
	</view>
</template>

<script>
	import commentItem from '@/components/comment-item/comment-item.vue'
	import commentPublic from '../commentPublic/commentPublic.vue'
	export default {
		components: {commentItem, commentPublic},
		data() {
			return {
				fetch: '', // 列表接口
				listKey: 'modelList', // 列表请求返回的字段key
				queryModel: { // 请求列表参数
					
				},
				reload: false,
				list: [
					{id: '1', username:"大黑哥",face:"https://ae01.alicdn.com/kf/HTB1fbseTmzqK1RjSZFLq6An2XXaL.jpg",date:'2019-04-21',
						score: 5, content:"模特很好，配合度很高，不是照片杀对手，清纯漂亮"},
					{id: '2', username:"大黑哥",face:"https://ae01.alicdn.com/kf/HTB1fbseTmzqK1RjSZFLq6An2XXaL.jpg",date:'2019-04-21',
						score: 3, content:"模特很好，配合度很高，不是照片杀对手，清纯漂亮"},
					{id: '3', username:"大黑哥",face:"https://ae01.alicdn.com/kf/HTB1fbseTmzqK1RjSZFLq6An2XXaL.jpg",date:'2019-04-21',
						score: 2, content:"好看，可以，不愧是专业的"},
				], // 列表数据
				showCommentPublic: false
			};
		},
		onNavigationBarButtonTap(e) {
			this.showCommentPublic = true;
		},
		methods: {
			// 获取列表数据
			loadedList(list) {
				this.reload = false;
				this.list = list;
			},
		}
	}
</script>

<style lang="scss">
.comment-list {
	padding: 20upx;
	box-sizing: border-box;
}
</style>

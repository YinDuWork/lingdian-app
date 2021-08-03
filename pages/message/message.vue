<template>
	<view class="message-list">
		<!-- 列表数据 -->
		<com-scroller ref="refList" :list="messageList" :listKey="listKey" :reload="reload" :queryModel="queryModel" @loaded="loadedList">
			<uni-list>
				<uni-list-chat v-for="(item, index) in messageList" :key="item.id" :title="item.title" :avatar="item.face" :time="item.time" :clickable="true" :note="item.desc"></uni-list-chat>
			</uni-list>
		</com-scroller>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fetch: '', // 列表接口
				listKey: 'messageList', // 列表请求返回的字段key
				queryModel: { // 请求列表参数
				},
				reload: false,
				messageList: [], // 列表数据
			};
		},
		onLoad() {
			this.messageList = [
				{face:"https://ae01.alicdn.com/kf/HTB1fbseTmzqK1RjSZFLq6An2XXaL.jpg",title: '评价', desc: 'ddddddddddddd', time: '2021-07-10'},
				{face:"https://ae01.alicdn.com/kf/HTB1fbseTmzqK1RjSZFLq6An2XXaL.jpg",title: '评价', desc: 'ddddddddddddd', time: '2021-07-10'},
				{face:"https://ae01.alicdn.com/kf/HTB1fbseTmzqK1RjSZFLq6An2XXaL.jpg",title: '评价', desc: 'ddddddddddddd', time: '2021-07-10'},
				{face:"https://ae01.alicdn.com/kf/HTB1fbseTmzqK1RjSZFLq6An2XXaL.jpg",title: '评价', desc: 'ddddddddddddd', time: '2021-07-10'},
				{face:"https://ae01.alicdn.com/kf/HTB1fbseTmzqK1RjSZFLq6An2XXaL.jpg",title: '评价', desc: 'ddddddddddddd', time: '2021-07-10'},
			];
		},
		methods: {
			// 获取列表数据
			loadedList(list) {
				this.reload = false;
				this.messageList = list;
			}
		},
	};
</script>

<style lang="scss" scoped>
	.message-list {
		height: 100%;
	}
</style>
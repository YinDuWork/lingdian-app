<template>
	<uni-popup ref="refPopup" type="bottom" :mask-click="false" @change="changeFn">
		<view class="mask-con">
			<view class="mask-title flex justify_between flex_center">
				<uni-icons class="close" type="closeempty" size="24" color="#999" @click="close"></uni-icons>
				<text>{{title}}</text>
				<button class="public" type="primary" size="mini" @click="setFn">设置</button>
			</view>
			<view class="mask-body">
				<text class="check-item" :class="{'selected': item.selected}" v-for="(item, index) in list" :key="item.value" @click="selectItem(index)">{{item.title}}</text>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	import { MODEL_TYPE } from '@/common/dics.js'
export default {
    props: {
        show: Boolean, // 是否展示弹窗
        title: { // 标题
			type: String,
			default: '模特标签'
		}
    },
    data() { 
        return {
            closed: false,
			list: MODEL_TYPE
        }
    },
    computed: {
        leftLength() { // 剩余字数
            return this.maxLength - this.commentValue.length;
        }
    },
    watch: {
		show: {
			handler (val) {
				if (val) {
					this.$refs.refPopup.open();
				} else {
					this.$refs.refPopup.close();
				}
			}
		}
    },
    methods: {
		// 状态发生变化触发
		changeFn(e) {
		},
        close() {
            this.$emit('update:show', false);
        },
		// 选择项点击事件
		selectItem(index) {
			let curItem = this.list[index];
			this.$set(this.list[index], 'selected', !curItem.selected)
		},
		// 设置
		setFn() {
			this.close();
		}
    }
}
</script>

<style lang="scss" scoped>
.uni-popup {
	z-index: 999;
}
.mask-con {
    padding: 0 30upx 30upx;
    background: white;
    .mask-title {
        position: relative;
        height: 88upx;
        line-height: 88upx;
        color: #18202C;
        font-size: 34upx;
		.public {
			margin: 0;
		}
    }
	.mask-body {
		padding: 20upx 0;
		.comment-value {
			width: 100%;
			padding: 20upx;
			box-sizing: border-box;
			border: 1px solid $uni-border-color;
			border-radius: 5px;
		}
		.length {
			text-align: right;
			line-height: 60upx;
			color: #999;
		}
	}
}
</style>
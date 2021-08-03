<template>
	<uni-popup ref="refPopup" :type="type" :mask-click="false" @change="changeFn">
		<view class="mask-body" :class="{'brab': type==='top', 'bratb': type==='center', 'brar': type==='left', 'bral': type==='right'}">
			<view v-if="title" class="mask-title">
				{{title}}
				<uni-icons class="close" type="closeempty" size="24" color="#999" @click="close"></uni-icons>
			</view>
			<slot name="body"></slot>
		</view>
	</uni-popup>
</template>

<script>
export default {
    name: 'ComPopup',
    props: {
        show: Boolean, // 是否展示弹窗
        title: String, // 标题
		type: { // 弹窗方向  top-顶部弹出  center-居中弹出  bottom-底部弹出  left-左侧弹出  right-右侧弹出
			type: String,
			default: 'bottom'
		}
    },
    data() { 
        return {
            closed: false
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
        }
    }
}
</script>

<style lang="scss" scoped>
.uni-popup {
	z-index: 999;
}
.mask-body {
    background: white;
    border-radius: 8px 8px 0 0;
	&.brab { // 从顶部弹出border-radius下面为圆角
		border-radius: 0 0 8px 8px;
	}
	&.bratb { // 从中间弹出，为四角圆弧
		width: 660upx;
		margin: 0 auto;
		border-radius: 8px;
	}
	&.bral { // 从右侧弹出，左边为圆角
		width: 660upx;
        height: 100%;
		border-radius: 8px 0 0 8px;
		overflow: auto;
	}
	&.brar { // 从左侧弹出，右边为圆角
		width: 660upx;
        height: 100%;
		border-radius: 0 8px 8px 0;
		overflow: auto;
	}
    .mask-title {
        position: relative;
        height: 132upx;
        padding: 0 30upx;
        line-height: 132upx;
        color: #18202C;
        font-size: 34upx;
        .close {
            position: absolute;
            top: 0;
            right: 60upx;
            height: 50upx;
        }
    }
}
</style>
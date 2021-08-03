<template>
	<uni-popup ref="refPopup" type="bottom" :mask-click="false" @change="changeFn">
		<view class="mask-con">
			<view class="mask-title flex justify_between flex_center">
				<uni-icons class="close" type="closeempty" size="24" color="#999" @click="close"></uni-icons>
				<text>{{title}}</text>
				<button class="public" type="primary" size="mini" @click="publicFn">发布</button>
			</view>
			<view class="mask-body">
				<view class="score-con">
					<uni-rate class="score" size="22" active-color="#cfb787" :value="score" margin="15" />
				</view>
				<textarea class="comment-value" v-model="commentValue" :maxlength="maxLength" auto-blur placeholder="写几句评价吧..." />
				<view class="length">{{leftLength}}/{{maxLength}}</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
    props: {
        show: Boolean, // 是否展示弹窗
        title: { // 标题
			type: String,
			default: '发布评论'
		}
    },
    data() { 
        return {
			maxLength: 300, // 总字数
			commentValue: '',
			score: 0, // 评分
            closed: false
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
		// 发布
		publicFn() {
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
		.score-con {
			margin-bottom: 30upx;
			text-align: center;
			.score {
				display: inline-block;
			}
		}
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
<template>
    <view class="com-tabs">
        <view :class="{'item': true, 'active': activeIndex === index}" v-for="(item, index) in data" :key="index" :style="{width: `${tabItemWidth}%`}" @click="tabClickHandle(index)">
            <text class="text">{{item.title}}</text>
        </view>
		<view class="line" :style="{width: `${tabItemWidth/2}%`, left: `${lineLeft+tabItemWidth/4}%`}"></view>
    </view>
</template>
<script>
export default {
    name: 'ComTabs',
    props: {
		order: { // 是否有序执行，比如当前第一项，必须点击下一步才后可点击第二项
			type: Boolean,
			default: false
		},
        data: {
            type: Array,
            default: () => {
                return [];
            }
        },
    },
    data() { 
        return {
			tabItemWidth: 0, // 每个tab项的宽度
			modeClass: '', // slide-right	由右至左过渡    slide-left	由左至右过渡
            activeIndex: 0, // 当前选中的索引
			maxIndex: 0, // 执行的最大项索引
			lineLeft: 0, // 滑块距离左侧的位置
        }
    },
    mounted() {
        this.tabItemWidth = Math.floor(100 / this.data.length * 100) / 100.00;
    },
	watch: {
		activeIndex(now) {
		    this.lineLeft = this.tabItemWidth * now;
		}
	},
    methods: {
        // tab项点击事件
        tabClickHandle(index) {
			if (this.order && this.maxIndex < index) {
				return;
			}
			this.$emit('item-click', index);
            this.changeTab(index);
        },
		// 手动改变
		changeTab(index) {
			if (this.activeIndex !== index) {
			    this.activeIndex = index;
				if (this.order && this.maxIndex <= index) {
					this.maxIndex = index;
				}
			    this.$emit('change', index, this.data[index]);
			}
		}
    }
}
</script>

<style lang="scss">
.com-tabs {
    position: relative;
	background-color: #fff;
    .item {
        display: inline-block;
        text-align: center;
        font-size: 0;
        .text {
            display: inline-block;
            width: auto;
            height: 80upx;
			line-height: 80upx;
			font-size: 30upx;
        }
        &.active {
            color: $color;
        }
    }
	.line {
	    position: absolute;
	    bottom: 0;
	    height: 3px;
	    background: $color;
		border-radius: 5px;
		transition: all 0.3s ease-out;
	}
}
</style>
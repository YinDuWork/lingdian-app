<template>
	<view class="model-detail">
		<view class="status" :style="{ opacity: afterHeaderOpacity }"></view>
		<view class="header">
			<!-- 头部-默认显示 -->
			<view class="before" :style="{ opacity: 1 - afterHeaderOpacity, zIndex: beforeHeaderzIndex }">
				<view class="back" @click="backFn"><uni-icons type="arrowleft" color="#fff" size="20"></uni-icons></view>
				<view class="middle"></view>
				<view class="icon-btn"></view>
			</view>
			<!-- 头部-滚动渐变显示 -->
			<view class="after" :style="{ opacity: afterHeaderOpacity, zIndex: afterHeaderzIndex }">
				<view class="back" @click="backFn"><uni-icons type="arrowleft" color="#666" size="20"></uni-icons></view>
				<view class="middle">
					<com-tabs ref="refTabs" :data="anchorlist" @item-click="toAnchorFn"></com-tabs>
				</view>
				<view class="icon-btn">
				</view>
			</view>
		</view>
		<!-- 轮播图 -->
		<view class="detail-top">
			<swiper class="images-swiper" :indicator-dots="false" @change="swiperChangeHandle">
				<swiper-item v-for="(item, index) in imgList" :key="index" @click="prviewImage(item, index)">
					<!-- <image :src="base64Pre + item.replace(/[\r\n]/g, '')" /> -->
					<image :src="item.path" />
				</swiper-item>
			</swiper>
			<view v-if="imgList.length > 0" class="indicator">{{activeImgIndex}}/{{imgList.length}}</view>
		</view>
		<view class="detail-bottom">
			<!-- 基本信息 -->
			<view class="tab-item-con base-info flex justify_between flex_end">
				<view>
					<view class="name">{{modelData.name}}<iconfont class="sex" :icon="modelData.sex==1?'men':'women'" color="#999" :size="15"></iconfont></view>
					<uni-rate size="18" active-color="#cfb787" :value="modelData.score" :readonly="true" />
				</view>
				<view class="money">￥{{modelData.money|money}}<text class="unit">/{{modelData.unit}}</text></view>
			</view>
			<!-- 模特详情 -->
			<view class="tab-item-con">
				<view class="item-title">{{tabs[0].title}}</view>
				<view class="flex flex-row">
					<detail-item class="flex1" label="年龄" :val="modelData.age"></detail-item>
					<detail-item class="flex1" label="地区" :val="modelData.area"></detail-item>
				</view>	
				<view class="flex flex-row">
					<detail-item class="flex1" label="国籍" :val="modelData.country"></detail-item>
					<detail-item class="flex1" label="身高" :val="modelData.height"></detail-item>
				</view>	
					{{modelData.weight}}
				<view class="flex flex-row">
					<detail-item class="flex1" label="体重" :val="modelData.weight" unit="kg"></detail-item>
					<detail-item class="flex1" label="三围" :val="modelData.BWH"></detail-item>
				</view>
				<view class="flex flex-row">
					<detail-item class="flex1" label="鞋码" :val="modelData.shoeSize"></detail-item>
					<detail-item class="flex1" label="服装尺码" :val="modelData.shoeSize"></detail-item>
				</view>	
				<view class="flex flex-row">
					<detail-item class="flex1" label="标签" :val="modelData.modelType|joinSplicing('、')"></detail-item>
				</view>	
				<view class="flex flex-row">
					<detail-item class="flex1" label="合作品牌" :val="modelData.cooperation|joinSplicing('、')"></detail-item>
				</view>	
				<view class="flex flex-row">
					<detail-item label="喜好" val="喜欢吃冰淇淋"></detail-item>
				</view>
				<view class="flex flex-row">
					<detail-item label="技能" val="健身、羽毛球"></detail-item>
				</view>
				<view class="flex flex-row">
					<detail-item label="联系电话" val="15562625586" isTel></detail-item>
				</view>
				<view class="flex flex-row">
					<detail-item label="录入人" val="刘珂"></detail-item>
				</view>
				<view class="flex flex-row">
					<detail-item label="录入人电话" val="15562625586" isTel></detail-item>
				</view>
				<view class="flex flex-row">
					<detail-item label="备注" val="备注备注备注备注备注备注备注备注备注备注备注备注备注"></detail-item>
				</view>
				<view class="mt10">
					<view v-for="(item, index) in imgList" :key="index" @click="prviewImage(item, index)">
						<image class="model-card" :src="item.path" mode="widthFix" />
					</view>
				</view>
			</view>
			<!-- 模特视频展示 -->
			<view class="tab-item-con" id="videoShow">
				<view class="item-title">{{tabs[1].title}}</view>
				<view v-for="(item, index) in videoList" :key="index" @click="prviewImage(item, index)">
					<video class="model-card" :src="item.path" :direction="0" :show-play-btn="true" mode="widthFix"></video>
				</view>
			</view>
			<!-- 评价 -->
			<view class="tab-item-con">
				<view class="item-title">{{tabs[2].title}}（{{commentList.length}}）</view>
				<view class="more" @click="showAllComment" v-if="commentList.length">查看全部<uni-icons type="arrowright" size="14" color="#999999"></uni-icons></view>
				<view>
					<comment-item v-for="(row, index) in commentList" :key="index" :data="row"></comment-item>
					<com-nodata v-if="commentList.length==0" noImg notice="暂无评论,快去评论吧..."></com-nodata>
				</view>
			</view>
			
		</view>
		<!-- 底部按钮 -->
		<model-bottom></model-bottom>
	</view>
</template>

<script>
	import comTabs from '@/components/com-tabs/com-tabs.vue'
	import detailItem from '@/components/detail-item/detail-item.vue'
	import commentItem from '@/components/comment-item/comment-item.vue'
	import modelBottom from '../modelBottom/modelBottom.vue'
	import comNodata from '@/components/com-nodata/com-nodata.vue'
	export default {
		components: {
			comTabs,
			detailItem,
			commentItem,
			modelBottom,
			comNodata
		},
		data() {
			return {
				//控制渐变标题栏的参数
				beforeHeaderzIndex: 11,//层级
				afterHeaderzIndex: 10,//层级
				beforeHeaderOpacity: 1,//不透明度
				afterHeaderOpacity: 0,//不透明度
				anchorlist:[
					{title: '模特详情', key: '1', top: 0},
					{title: '视频展示', key: '2', top: 0},
					{title: '评价', key: '3', top: 0}
				],//导航条锚点
				selectAnchor: 0,//选中锚点
				activeImgIndex: 1, // 当前图片索引，从1开始
				base64Pre: 'data:image/png;base64,', // base64图片前缀
				imgList: [],
				videoList: [],
				modelData: {},
				tabs: [ // tabs数据
				    {title: '模特详情', key: '1'},
				    {title: '视频展示', key: '2'},
				    {title: '评价', key: '3'}
				],
				isCollected: false,//收藏
				commentList: [], // 评价列表
			}
		},
		onPageScroll(e) {
			//锚点切换
			this.selectAnchor = e.scrollTop>=this.anchorlist[2].top?2:e.scrollTop>=this.anchorlist[1].top?1:0;
			// 切换选中的tab
			this.$refs.refTabs.changeTab(this.selectAnchor);
			//导航栏渐变
			let tmpY = 375;
			e.scrollTop = e.scrollTop > tmpY ? 375 : e.scrollTop;
			this.afterHeaderOpacity = e.scrollTop * (1 / tmpY);
			this.beforeHeaderOpacity = 1 - this.afterHeaderOpacity;
			//切换层级
			this.beforeHeaderzIndex = e.scrollTop > 0 ? 10 : 11;
			this.afterHeaderzIndex = e.scrollTop > 0 ? 11 : 10;
		},
		onLoad(data) {
			if (data && data.item) {
				this.modelData = JSON.parse(decodeURIComponent(data.item));
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				let _this = this;
				_this.imgList = [
					{ id: 1, path: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ff4b5dbae8d6de2e3e1e0340cf0eaea8e214501fa12b326-jT0e14_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628658241&t=c417316f9c7ff6cc695aac479b4a4743'},
					{ id: 1, path: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F3727a995313deab1924fec1e18325d3a5e25659a9d3c9-D7dw9r_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628651879&t=5112f4b19ac30ad587873749315a9818'},
					{ id: 1, path: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01247a58e1a81da801219c7705bdcd.jpg%403000w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628581302&t=bbb2032ef0b14164d59a456f09212391'},
				];
				_this.videoList = [
					{ id: 1, path: 'https://mp4.vjshi.com/2018-12-28/1083f3db90334f86e3fc3586b4472914.mp4'},
					{ id: 1, path: 'https://mp4.vjshi.com/2018-12-28/1083f3db90334f86e3fc3586b4472914.mp4'},
				];
				_this.commentList = [
					{id: '1', username:"大黑哥",face:"https://ae01.alicdn.com/kf/HTB1fbseTmzqK1RjSZFLq6An2XXaL.jpg",date:'2019-04-21',
						score: 5, content:"模特很好，配合度很高，不是照片杀对手，清纯漂亮"},
					{id: '2', username:"大黑哥",face:"https://ae01.alicdn.com/kf/HTB1fbseTmzqK1RjSZFLq6An2XXaL.jpg",date:'2019-04-21',
						score: 3, content:"模特很好，配合度很高，不是照片杀对手，清纯漂亮"},
					{id: '3', username:"大黑哥",face:"https://ae01.alicdn.com/kf/HTB1fbseTmzqK1RjSZFLq6An2XXaL.jpg",date:'2019-04-21',
						score: 2, content:"好看，可以，不愧是专业的"},
				];
				_this.$nextTick(()=>{
					_this.calcAnchor();//计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确
				})
			},
			// swiper改变
			swiperChangeHandle(e) {
				this.activeImgIndex = e.detail.current + 1;
			},
			// 预览
			prviewImage(img, index) {
				let urls = [];
				this.imgList.forEach(i => {
					urls.push(i)
				})
				uni.previewImage({
					urls: urls,
					current: index
				});
			},
			//跳转锚点
			toAnchorFn(index){
				this.selectAnchor = index;
				uni.pageScrollTo({scrollTop: this.anchorlist[index].top,duration: 200});
			},
			//计算锚点高度
			calcAnchor(){
				let commentsView = uni.createSelectorQuery().select("#videoShow");
				commentsView.boundingClientRect((data) => {
					let statusbarHeight = 0;
					//APP内还要计算状态栏高度
					// #ifdef APP-PLUS
					statusbarHeight = plus.navigator.getStatusbarHeight()
					// #endif
					let headerHeight = uni.upx2px(100);
					let swiperAndBootomHeight = uni.upx2px(580);
					this.anchorlist[1].top = data.top - headerHeight - statusbarHeight + swiperAndBootomHeight;
					this.anchorlist[2].top = data.bottom - headerHeight - statusbarHeight + swiperAndBootomHeight;
				}).exec();
			},
			// 返回
			backFn() {
				uni.navigateBack();
			},
			// 查看更多评论
			showAllComment() {
				uni.navigateTo({
					url: '../commentList/commentList'
				})
			},
		}
	}
</script>

<style lang="scss">
page {
	background-color: #f8f8f8;
}
.icon {
	font-size: 26upx;
}
.status {
	width: 100%;
	height: 0;
	position: fixed;
	z-index: 10;
	top: 0;
	/*  #ifdef  APP-PLUS  */
	height: var(--status-bar-height); //覆盖样式
	/*  #endif  */
	background-color: #f1f1f1;
	transition: opacity 0.05s linear;
}
.header {
	width: 100%;
	height: 100upx;
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	z-index: 10;
	/*  #ifdef  APP-PLUS  */
	top: var(--status-bar-height);
	/*  #endif  */
	.before,
	.after {
		width: 100%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height);
		/*  #endif  */
		transition: opacity 0.05s linear;
		.middle {
			width: 100%;
		}
		.icon-btn {
			width: 125upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
		}
	}
	.after {
		background-color: #FFFFFF;
		.middle {
			width: 92%;
		}
	}
}
.model-detail {
	position: relative;
	.detail-top {
		position: relative;
		height: 480upx;
	}

	.images-swiper,
	image {
		width: 750upx;
		height: 480upx;
	}

	.detail-top .indicator {
		position: absolute;
		right: 20upx;
		bottom: 20upx;
		height: 40upx;
		line-height: 40upx;
		padding: 0 24upx;
		color: #FFFFFF;
		text-align: center;
		font-size: 22upx;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 40px;
		box-sizing: border-box;
	}
	.detail-bottom {
		padding-bottom: 100upx;
		.tab-item-con {
			position: relative;
			margin-bottom: 16upx;
			padding: 20upx;
			background-color: #fff;
			box-sizing: border-box;
			&.base-info {
				.name {
					margin-bottom: 16upx;
					color: $uni-text-color;
					font-size: 36upx;
					font-weight: 700;
				}
				.sex {
					margin-left: 10upx;
					font-weight: 500;
				}
				.money {
					color: $deep-color;
					font-size: 44upx;
					font-weight: 700;
					.unit {
						font-size: 30upx;
						font-weight: 500;
					}
				}
			}
			.item-title {
				margin-bottom: 30upx;
				font-size: 32upx;
				font-weight: 700;
			}
			.more {
				position: absolute;
				top: 24upx;
				right: 20upx;
				color: #999;
				font-size: 26upx;
			}
		}
	}
	.model-card {
		width: 100%;
		height: 500upx;
		margin-bottom: 20upx;
	}
	.line {
		padding: 0 20upx;
	}
}
</style>

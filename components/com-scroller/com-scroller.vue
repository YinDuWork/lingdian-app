<!--弹窗-信息框-->
<template>
	<view>
		<mescroll-uni ref="mescrollRef" :fixed="false" height="100%" @init="mescrollInit" :top="top" :bottom="bottom" :up="upOption" @down="downCallback" @up="upCallback">
			<slot></slot>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		props: {
			fetch: Function, // 请求接口
			listKey: String, // 列表请求返回的字段key
			reload: Boolean,
			top: { // 下拉刷新区域往下偏移的距离
				type: [Number, String],
				default: 0
			},
			bottom: { // 上拉加载区域往上偏移的距离
				type: [Number, String],
				default: 0
			},
			pageSize: { // 一页加载数量
				type: Number,
				default: 10
			},
			queryModel: { // 查询参数
				type: Object,
				default: null
			},
			list: Array, // 列表数据
			emptyTip: { // 无数据提示信息
				type: String,
				default: '暂无数据哦~'
			}
		},
		data() {
			return {
				listData: [], // 列表数据
				mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
				upOption: {
					page: {
					    num: 0, // 当前页 从1开始
					    size: this.pageSize, // 每页数据条数,默认10
					    time: null
					},
					textNoMore: '只有这么多了(-.-)', // 没有更多数据的提示文本
					empty: {
						icon: '/static/img/nodata.png', // 空图片
						tip: this.emptyTip
					}
				},
				status: 'more', // 加载更多状态：more（loading前）、loading（loading中）、noMore（没有更多了）
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				total: 0, // 总数据量
				inited: false, // 是否请求数据
				queryData: this.queryModel
			}
		},
		watch: {
			queryModel: {
				handler(val){
				    this.queryData = Object.assign({}, val);
				},
				deep: true
			}
		},
		methods: {
			// 获取列表数据
			loadData() {
				this.$nextTick(()=>{
					if (this.list) {
						this.listData = this.list;
						this.mescroll.endSuccess();
						this.$emit('loaded', this.listData)
						return;
					}
					this.listData = [];
					this.mescroll.resetUpScroll();
				});
			},
			/*下拉刷新的回调, 有三种处理方式:*/
			downCallback() {
				this.loadData();
			},
			/*上拉加载的回调*/
			upCallback(page) {
				let _this = this;
				if (_this.reload) {
					_this.inited = false;
				}
				// 所有数据加载完成，不再发送请求
				if (_this.inited && _this.total === _this.listData.length) {
					_this.mescroll.endErr();
					return;
				}
				let params = {
					pageSize: page.size,
					pageIndex: page.num
				};
				if (_this.queryData) {
					Object.assign(params, _this.queryData);
				}
				_this.fetch(params).then((res)=>{
					// 建议使用setTimeout,因为this.$nextTick某些情况某些机型不触发
					setTimeout(() => {
						_this.inited = true;
						let list = res.body[_this.listKey]; //真正可以使用的源数据;
						_this.total = res.body.page.total;
						if (page.num == 1) _this.listData = []; //如果是第一页需手动制空列表
						_this.listData = _this.listData.concat(list); //追加新数据
						_this.mescroll.endSuccess(list.length, _this.total > _this.listData.length);
						_this.$emit('loaded', _this.listData, res.body.page, res);
					}, 20);
				}).catch(err=>{
					_this.mescroll.endErr(); //  隐藏下拉刷新和上拉加载的状态, 在联网获取数据失败后调用;mescroll内部会自动恢复原来的页码,时间等变量
				});
			}
		}
	}
</script>

<style lang="scss">
	/deep/ .mescroll-empty {
		padding: 200upx 50upx;
		.empty-icon {
			margin-bottom: 60upx; 
		}
		.empty-tip {
			font-size: 28upx;
		}
	}
</style>
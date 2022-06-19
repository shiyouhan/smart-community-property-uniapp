<template>
	<view>
		<view class="w-100 flex align-center">
			<view v-for="(item, index) in tabBars" 
				class="py-2 width-50 flex align-center justify-center u-rela"
				:key="index"
				:class="tabIndex === index ? 'text-theme line' : ''"
				@tap="changeTab(index)">
				{{item.name}}
			</view>
		</view>
		
		<swiper class="swiper" :current="tabIndex" :disable-touch='true'>
			<swiper-item>
				<scroll-view class="swiper" :scroll-y="true" @scrolltolower='goodsScrollToLower'>
					<divider></divider>
					<goods-list :list="goodsList" @change="onChange"></goods-list>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="swiper" :scroll-y="true"  @scrolltolower='goodScrollToLower'>
					<divider></divider>
					<good-list :list="goodList" @change="onChange"></good-list>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		groundGoods,
		banGoods
	} from '@/api/fleamarket'
	import goodsList from "@/components/common/goods-list.vue"
	import goodList from "@/components/common/good-list.vue"
	export default {
		components: {
			goodsList,
			goodList
		},
		data() {
			return {
				tabIndex: 0,
				// 顶部选项卡
				tabBars: [
					{
						name: "已上架"
					},
					{
						name: "已下架"
					}
				],
				goodsList: [],
				goodList: [],
				pageNum: 1,
				sizeNum: 4,
				more: true
			};
		},
		async onLoad() {
			this.getPosition();
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - uni.upx2px(101);
				}
			});
			setTimeout(function() {
				console.log('开启下拉刷新');
			}, 1000);
			uni.startPullDownRefresh();
			console.log(this.goodsList)
			this.goodsList = await this.load()
			this.goodList = await this.load1()
		},
		// 下拉刷新，要将当前页码重置为1，more属性回归撑true
		onPullDownRefresh() {
			this.pageNum = 1;
			this.more = true;
			// 1秒没下拉复原
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			changeTab(index) {
				if (this.tabIndex === index) {
					return;
				}
				console.log(index)
				this.tabIndex = index
				console.log(this.tabIndex)
			},
			// 获取用户当前定位
			getPosition() {
			    uni.getLocation({
			        type: 'wgs84',
			        success: function(res) {
			            console.log('当前位置的经度：' + res.longitude);
			            console.log('当前位置的纬度：' + res.latitude);
			            let position = res.longitude + '|' + res.latitude;
			            uni.setStorageSync("position", position)
			        }
			    });
			},
			async load(e) {
				let res = await groundGoods({
					page: this.pageNum,
					size: this.sizeNum
				})
				if(!res && res.code !== 200) {
					this.$msg.toast(res.message)
					return []
				}
				return res.data
			},
			async load1(e) {
				let res = await banGoods({
					page: this.pageNum,
					size: this.sizeNum
				})
				if(!res && res.code !== 200) {
					this.$msg.toast(res.message)
					return []
				}
				return res.data
			},
			onChange(id, state) {
				if(state == '下架') {
					for (let i in this.goodsList) {
						if(this.goodsList[i].fleaMarketGoods.id == id) {
							this.goodList.push(this.goodsList[i])
							this.$delete(this.goodsList, i);
							break
						}
					}
				} else {
					for (let i in this.goodList) {
						if(this.goodList[i].fleaMarketGoods.id == id) {
							this.goodsList.push(this.goodList[i])
							this.$delete(this.goodList, i);
							break
						}
					}
				}
			},
			goodsScrollToLower() {
				if (!this.more) {
					uni.showToast({
						title: '已经是底部了',
						duration: 1000
					});
					return false;
				}
				this.pageNum = this.pageNum + 1;
				uni.showLoading({
					title: '加载中'
				});
				let params = {
					page: this.pageNum,
					size: this.sizeNum
				};
				groundGoods(params).then(res => {
					setTimeout(() => {
						uni.hideLoading();
					}, 100);
					this.goodsList = this.goodsList.concat(res.data);
					console.log(this.goodList)
					if (res.data.length < this.sizeNum && this.pageNum > 0) {
						this.more = false;
					}
				});
			},
			goodScrollToLower() {
				if (!this.more) {
					uni.showToast({
						title: '已经是底部了',
						duration: 1000
					});
					return false;
				}
				this.pageNum = this.pageNum + 1;
				uni.showLoading({
					title: '加载中'
				});
				let params = {
					page: this.pageNum,
					size: this.sizeNum
				};
				banGoods(params).then(res => {
					setTimeout(() => {
						uni.hideLoading();
					}, 100);
					this.goodList = this.goodList.concat(res.data);
					console.log(this.goodList)
					if (res.data.length < this.sizeNum && this.pageNum > 0) {
						this.more = false;
					}
				});
			},
		}
	}
</script>

<style lang="scss">
.swiper {
	height: calc(100vh - 80rpx - 80rpx) !important;
}
</style>

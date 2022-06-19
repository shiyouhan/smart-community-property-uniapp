<template>
	<view>
		<view class="w-100 flex align-center">
			<view
				v-for="(item, index) in tabBars"
				class="py-2 width-20 flex align-center justify-center u-rela"
				:key="index"
				:class="tabIndex === index ? 'text-theme line' : ''"
				@tap="changeTab(index)"
			>
				{{ item.name }}
			</view>
		</view>

		<divider></divider>
		<swiper class="swiper" :current="tabIndex" :disable-touch="true">
			<swiper-item v-for="(item, index) in tabBars" :key="index">
				<scroll-view class="swiper swiper-action swiper-scroll" :scroll-y="true" @scrolltolower="loadMore()">
					<statistic-list :list="list" v-if="list.length > 0"></statistic-list>
					<view v-else class="w-100 flex algin-center justify-center">
						<image src="../../static/images/other/null.png" class="tip-image mt-5" />
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import statisticList from '@/components/common/statistic-list.vue';
import { getPurchaseList, getPurchaseListByState } from '@/api/property/index.js';
export default {
	components: {
		statisticList
	},
	data() {
		return {
			tabIndex: 0,
			page: 1,
			size: 10,
			// 顶部选项卡
			tabBars: [
				{
					name: '全部'
				},
				{
					name: '申请中'
				},
				{
					name: '已同意'
				},
				{
					name: '已完成'
				},
				{
					name: '已拒绝'
				}
			],
			list: [],
			more: true
		};
	},
	onLoad() {
		this.purchaseList(this.tabIndex);
		uni.getSystemInfo({
			success: res => {
				this.scrollH = res.windowHeight - uni.upx2px(101);
			}
		});
		uni.startPullDownRefresh();
	},
	onPullDownRefresh() {
		this.page = 1;
		this.more = true;
		this.purchaseList(this.tabIndex);
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	methods: {
		// 切换tab列
		changeTab(index) {
			this.page = 1;
			this.more = true;
			if (this.tabIndex === index) {
				return;
			}
			this.tabIndex = index;
			this.purchaseList(this.tabIndex);
		},
		// 申请记录列表
		purchaseList(index) {
			let param = {
				page: this.page,
				size: this.size
			};
			if (index === 0) {
				getPurchaseList(param).then(res => {
					this.list = res.data.records;
				});
			} else {
				param.state = index - 1;
				getPurchaseListByState(param).then(res => {
					this.list = res.data.records;
				});
			}
		},
		loadMore() {
			if (!this.more) {
				uni.showToast({
					title: '加载完毕',
					duration: 1000
				});
				return false;
			}
			this.page = this.page + 1;
			uni.showLoading({
				title: '加载中'
			});
			if (this.tabIndex === 0) {
				let param = {
					page: this.page,
					size: this.size
				};
				getPurchaseList(param).then(res => {
					setTimeout(() => {
						uni.hideLoading();
					}, 100);
					console.log(res.data);
					console.log(res.data.records);
					this.list = this.list.concat(res.data.records);
					if (res.data.records.length < this.size && this.page > 0) {
						this.more = false;
					}
				});
			} else {
				let param = {
					page: this.page,
					size: this.size
				};
				param.state = this.tabIndex - 1;
				console.log(param.state);
				getPurchaseListByState(param).then(res => {
					setTimeout(() => {
						uni.hideLoading();
					}, 100);
					this.list = this.list.concat(res.data.records);
					if (res.data.records.length < this.size && this.page > 0) {
						this.more = false;
					}
				});
			}
		}
	}
};
</script>

<style lang="scss">
.tip-image {
	width: 300rpx;
	height: 300rpx;
}
.swiper-action {
	touch-action: none;
}
.swiper-scroll {
	height: calc(100vh - 260rpx);
}
</style>

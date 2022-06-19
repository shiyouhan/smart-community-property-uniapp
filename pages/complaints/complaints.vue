<template>
	<view>
		<view class="w-100 flex align-center">
			<view
				v-for="(item, index) in tabBars"
				class="py-2 width-50 flex align-center justify-center u-rela"
				:key="index"
				:class="tabIndex === index ? 'text-theme line' : ''"
				@tap="changeTab(index)"
			>
				{{ item.name }}
			</view>
		</view>
		<swiper class="swiper" :current="tabIndex" :disable-touch="true">
			<swiper-item>
				<scroll-view class="swiper" :scroll-y="true">
					<divider></divider>
					<complaints-list :list="list"></complaints-list>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="swiper" :scroll-y="true">
					<divider></divider>
					<complaints-list :list="list"></complaints-list>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import complaintsList from '@/components/common/complaints-list.vue';
import { getComplainList } from '@/api/property/index.js';
export default {
	components: {
		complaintsList
	},
	data() {
		return {
			page: 1,
			size: 10,
			tabIndex: 0,
			// 顶部选项卡
			tabBars: [
				{
					name: '待回复'
				},
				{
					name: '已回复'
				}
			],
			list: []
		};
	},
	onLoad() {
		this.complainList();
	},
	methods: {
		changeTab(index) {
			if (this.tabIndex === index) {
				return;
			}
			this.tabIndex = index;
		},
		complainList() {
			let param = {
				page: this.page,
				size: this.size
			};
			getComplainList(param).then(res => {
				this.list = res.data.records;
			});
		}
	}
};
</script>

<style lang="scss"></style>

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
				<scroll-view class="swiper" :scroll-y="true">
					<divider></divider>
					<repair-list :list="list"></repair-list>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="swiper" :scroll-y="true">
					<divider></divider>
					<repair-list :list="finishList"></repair-list>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import repairList from "@/components/common/repair-list.vue"
	import { getRepairList } from '@/api/property'
	export default {
		components: {
			repairList
		},
		data() {
			return {
				tabIndex: 0,
				// 顶部选项卡
				tabBars: [
					{
						name: "待处理"
					},
					{
						name: "已完成"
					}
				],
				list: [],
				finishList: [],
				page: 1,
				size: 100
			};
		},
		mounted() {
			this.getRepair()
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
			getRepair() {
				let param = {
					page: this.page,
					size: this.size
				}
				getRepairList(param).then(res => {
					console.log(res)
					let list = []
					let finish = []
					res.data.records.forEach(item => {
						if(item.status == 0) {
							list.push(item)
						} else {
							finish.push(item)
						}
					})
					this.list = list
					this.finishList = finish
				})
			}
		}
	}
</script>

<style lang="scss">

</style>

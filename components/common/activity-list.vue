<template>
	<view>
		<view v-for="(item, index) in data" :key="index">
			<divider></divider>
			<view class="mx-2 bg-white rounded">
				<image :src="item.activeImg" class="w-100 u-h-296 border-txy"></image>
				<view class="flex justify-between px-4 py-2">
					<view class="flex-1">
						<view class="u-font-16 u-p-b-22">{{ item.activeTitle }}</view>
						<view class="text-grey u-font-12">活动时间:{{ item.startTime }}~{{ item.endTime }}</view>
					</view>
					<view class="flex align-center">
						<text class="text-white bg-theme u-h-40 u-font-14 px-2 u-line-22" @click="open()">编辑</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				
			}
		},
		computed: {
			data() {
				return this.list.map(e => {
					e.startTime = this.moment(e.startTime).format("YYYY-MM-DD")
					e.endTime = this.moment(e.endTime).format("YYYY-MM-DD")
					return e
				})
			}
		},
		methods: {
			open() {
				uni.navigateTo({
					url: `../activity-edit/activity-edit`
				})
			}
		}
	}
</script>

<style>
</style>
<template>
	<view>
		<view v-for="(item, index) in list" :key="index">
			<divider></divider>
			<view class="mx-2 bg-white rounded">
				<image :src="item.banner" class="w-100 u-h-300 border-txy"></image>
				<view class="flex justify-end u-p-r-34 u-h-62 align-center">
					<text class="text-white bg-theme u-h-40 u-font-14 px-2 u-line-22" @click="open()">编辑</text>
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
		methods: {
			open() {
				uni.navigateTo({
					url: `../announcement-edit/announcement-edit`
				})
			}
		}
	}
</script>

<style>
</style>
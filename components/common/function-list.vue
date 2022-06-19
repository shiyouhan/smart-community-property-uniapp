<template>
	<uni-grid class="u-m-t-74" :column="4" :showBorder="false" :highlight="false">
		<uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
			<view class="flex flex-column align-center" @click="change(item.page)">
				<image :src="item.img" class="w-56 u-m-b-12"></image>
				<text>{{ item.title }}</text>
			</view>
		</uni-grid-item>
	</uni-grid>
</template>

<script>
	import uniGrid from '@/components/uni/uni-grid/uni-grid.vue'
	import uniGridItem from '@/components/uni/uni-grid-item/uni-grid-item.vue'
	
	export default {
		components: {
			uniGrid,
			uniGridItem
		},
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
			change(page) {
				uni.navigateTo({
					url: page
				})
			}
		}
	}
</script>

<style lang="scss" scope>
	.uni-grid-item {
		height: unset !important;
		margin-bottom: 20rpx;
	}
</style>
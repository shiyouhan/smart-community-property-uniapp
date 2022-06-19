<template>
	<uni-grid :column="2" :showBorder="false" :highlight="false">
		<uni-grid-item v-for="(item, index) in list" :key="item.id"
			class="bg-white rounded width-47 mx-1">
			<view @click="getData(item)">
				<view>
					<image :src="item.fleaMarketGoods.thumbnail" class="w-100 u-h-478 border-txy"></image>
				</view>
				<view class="border-b-2 px-1">
					<view class="content-two">{{ item.fleaMarketGoods.name }}</view>
					<view class="text-danger py-1">{{ item.fleaMarketGoods.price }}</view>
				</view>
			</view>
			<view class="flex align-center justify-between u-p-10">
				<view class="flex align-center">
					<image :src="item.avatar" class="w-32 rounded"></image>
					<view class="u-p-l-10 u-font-14">{{ item.username }}</view>
				</view>
				<view @click="change(item.fleaMarketGoods.id)">
					<text class="text-white bg-theme u-h-40 u-font-16 u-line-20 px-1">下架</text>
				</view>
			</view>
			<divider></divider>
		</uni-grid-item>
	</uni-grid>
</template>

<script>
	import {
		postBan
	} from '@/api/fleamarket'
	import uniGrid from '@/components/uni/uni-grid/uni-grid.vue'
	import uniGridItem from '@/components/common/uni-grid-item.vue'
	
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
				fleaMarketGoods: []
			}
		},
		methods: {
			getData(item) {
				uni.navigateTo({
					url: "../../pages/goods-detail/goods-detail?item=" + JSON.stringify(item)
				})
			},
			change(id) {
				postBan(id).then(res => {
					this.$emit('change', id, '下架')
				})
			}
		}
	}
</script>

<style>
</style>
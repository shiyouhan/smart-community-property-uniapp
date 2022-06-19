<template>
	<view class="flex justify-end">
		<divider></divider>
		<view class="mx-2 bg-white">
			<view class="flex border-b-2 px-2 u-p-t-19">
				<view class="u-p-r-38">
					<image :src="goods.avatar" class="w-66 rounded-66"></image>
				</view>
				<view class="u-font-38">{{ goods.username }}</view>
			</view>
			<view class="u-p-19">
				<view class="u-font-16 u-line-18" v-if="goods.fleaMarketGoods">{{ goods.fleaMarketGoods.name }}</view>
				<view class="u-font-14 u-line-16 font-weight-light py-2" v-if="goods.fleaMarketGoods">{{ goods.fleaMarketGoods.content }}</view>
				<view>
					<image v-if="goods.fleaMarketGoods" :src="goods.fleaMarketGoods.thumbnail" class="w-100" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="position-fixed right-0 bottom-50">
			<view class="w-66 bg-theme justify-center flex align-center rounded-66" @click="onChange">
				<text class="text-white bg-theme" v-if="goods.fleaMarketGoods.state == '审核通过'">下架</text>
				<text class="text-white bg-theme" v-if="goods.fleaMarketGoods.state == '已下架'">上架</text>
			</view>
		</view>
		<divider></divider>
	</view>
</template>

<script>
	import {
		postBan,
		postGround
	} from '@/api/fleamarket'
	export default {
		data() {
			return {
				goods: {},
				id: 0
			};
		},
		onLoad(e) {
			this.goods = JSON.parse(e.item);
			console.log(this.goods)
		},
		methods: {
		    onChange() {
				let pages = getCurrentPages()
				let parent = pages[pages.length - 2]
				const id = this.goods.fleaMarketGoods.id
				
		    	if (this.goods.fleaMarketGoods.state == '审核通过') {
					postBan(id).then(res => {
						if (res.code === 200) {
							this.goods.fleaMarketGoods.state = '已下架'
							parent.$vm.onChange(id, '下架')
						} else {
							this.$msg.toast(res.message)
							return false
						}
					})
				} else {
					postGround(id).then(res => {
						if (res.code === 200) {
							this.goods.fleaMarketGoods.state = '审核通过'
							parent.$vm.onChange(id, '上架')
						} else {
							this.$msg.toast(res.message)
							return false
						}
					})
				}
		    }
		}
	}
</script>

<style lang="scss">

</style>

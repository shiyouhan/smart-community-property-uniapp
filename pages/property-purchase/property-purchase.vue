<template>
	<view>
		<divider></divider>

		<uni-list-item title="采购物品">
			<view class="flex align-center" slot="right">
				<input class="text-grey text-right u-font-14 u-p-r-19" v-model="purchase.name" placeholder="请输入" />
			</view>
		</uni-list-item>
		<uni-list-item title="采购金额">
			<view class="flex align-center" slot="right">
				<input
					class="text-grey text-right u-font-14 u-p-r-19"
					type="number"
					v-model="purchase.price"
					placeholder="请输入"
				/>
			</view>
		</uni-list-item>
		<uni-list-item title="采购数量">
			<view class="flex align-center" slot="right">
				<input
					class="text-grey text-right u-font-14 u-p-r-19"
					type="number"
					v-model="purchase.number"
					placeholder="请输入"
				/>
			</view>
		</uni-list-item>

		<view class="bg-white u-m-19 u-p-19">
			<textarea class="w-100" v-model="purchase.remark" placeholder="请输入备注"></textarea>
		</view>

		<button class=" u-m-t-54" @click="submit" :disabled="status" >
			<text class="btn_content">提出申请</text>
		</button>
	</view>
</template>

<script>
import uniListItem from '@/components/common/uni-list-item.vue';
import { addPurchase } from '@/api/property/index.js';
export default {
	components: {
		uniListItem
	},
	data() {
		return {
			purchase: {
				name: '',
				price: '',
				number: '',
				remark: ''
			},
			status: false
		};
	},
	onNavigationBarButtonTap(e) {
		uni.navigateTo({
			url: '../purchase-statistics/purchase-statistics'
		});
	},
	watch: {
		purchase: {
			handler() {
				if (this.purchase.name != '' && this.purchase.price != '' && this.purchase.number != '') {
					this.status = false;
				} else {
					this.status = true;
				}
			},
			immediate: true,
			deep: true
		}
	},
	onLoad() {},
	methods: {
		submit() {
			addPurchase(this.purchase).then(res => {
				uni.showToast({
					title: res.data
				});
				this.purchase = {
					name: '',
					price: '',
					number: '',
					remark: ''
				};
			});
		}
	}
};
</script>

<style lang="scss" scoped>
button[disabled] {
	background-color: #ffe0b2;
}
</style>

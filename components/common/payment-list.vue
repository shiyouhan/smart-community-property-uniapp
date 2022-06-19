<template>
	<view>
		<view v-for="(item, index) in data" :key="index">
			<view class="mx-2 bg-white">
				<view class="flex justify-between border-b-1 u-p-19">
					<view class="flex">
						<view>{{ item.way }}</view>
						<view>
							<view v-if="item.status == 1" class="text-green">(已缴)</view>
							<view v-else class="text-danger">(未缴)</view>
						</view>
					</view>
					<view v-if="item.status == 1" class="text-green">{{ item.cost }}元</view>
					<view v-else class="text-danger">{{ item.cost }}元</view>
				</view>
				<view class="flex text-grey u-font-14 border-b-1 u-p-b-38 u-p-19">
					<view>手机号</view>
					<view>{{ item.phone }}</view>
					<view>的 维护费</view>
				</view>
				<view class="flex justify-between u-font-14 u-p-19">
					<view>单号: {{ item.orderId }}</view>
					<view class="flex">
						<view>{{ item.username }}</view>
						<view>({{ item.formatPhone }})</view>
					</view>
				</view>
			</view>
			<divider></divider>
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
			// formatPhone() {
			// 	return this.item.phone.substr(0,3) + "****" + this.item.phone.substr(7)
			// },
			data() {
				return this.list.map(e => {
					e.formatPhone = e.phone.substr(0,3) + "****" + e.phone.substr(7)
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
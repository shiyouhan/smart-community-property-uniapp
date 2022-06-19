<template>
	<view>
		<view v-for="(item, index) in list" :key="index">
			<divider></divider>
			<view class="bg-white mx-2 u-p-19 flex flex-column rounded" @click="open(item.id)">
				<view class="flex justify-between">
					<view class="py-1">{{ item.repairTitle }}</view>
					<view>
						<view v-if="item.status == 0" class="text-danger">待处理</view>
						<view v-else class="text-grey">已完成</view>
					</view>
				</view>
				<view class="text-grey u-font-14">{{ item.createTime }}</view>
				<view class="py-2">{{ item.repairContent }}</view>
				<view v-if="item.repairImg.length > 0">
					<view class="">
						<view v-if="item.repairImg.length === 2 || item.repairImg.length === 4" class="wrap1">
							<image v-for="(item1,index) in item.repairImg" :key="index" :src="item1" mode="aspectFill"></image>
						</view>
						<view v-else class="wrap">
							<image v-for="(item1,index) in item.repairImg" :key="index" :src="item1" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view v-else></view>
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
			open(id) {
				uni.navigateTo({
					url: `../repair-detail/repair-detail?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		image {
			width: 200rpx;
			height: 200rpx;
			object-fit: cover;
			border-radius: 3px;
			float: left;
			margin: 5rpx;
		}
	}

	.wrap1 {
		image {
			width: 212rpx;
			height: 212rpx;
			object-fit: cover;
			border-radius: 3px;
			float: left;
			margin: 5rpx;
		}
	}
</style>

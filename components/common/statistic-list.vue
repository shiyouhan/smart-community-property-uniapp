<template>
	<view>
		<view v-for="(item, index) in data" :key="index">
			<view class="bg-white rounded mx-2 flex flex-column p-2">
				<view class="flex justify-between mb-3">
					<view class="subTitle">{{ item.name }}</view>
					<view class="text-theme">
						<view v-if="item.state == 0">申请中</view>
						<view v-else-if="item.state == 1">已同意</view>
						<view v-else-if="item.state == 2">已完成</view>
						<view v-else>已拒绝</view>
					</view>
				</view>
				<view class="flex justify-between ">
					<view class="text-grey" v-if="item.remark.length > 20">{{ item.remark.substring(0, 20) }}……</view>
					<view v-else class="text-grey">{{ item.remark }}</view>
					<view>
						<text class="pr-1">￥</text>
						{{ item.price }}
					</view>
				</view>
				<view class="flex justify-end text-grey mt-1 mb-2">×{{ item.number }}</view>
				<view v-if="item.reason !== ''" class="mb-2">
					<view class="text-danger " v-if="item.reason.length > 20">
						拒绝理由:{{ item.reason.substring(0, 20) }}……
					</view>
					<view v-else class="text-danger">{{ item.reason }}</view>
				</view>
				<view v-else></view>
				<view class="flex justify-between">
					<view>
						<text class="pr-1">合计:</text>
						{{ item.sum }}
					</view>
					<view class="text-grey">{{ item.createTime }}</view>
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
		return {};
	},
	computed: {
		data() {
			return this.list.map(e => {
				e.sum = (e.price * e.number).toFixed(2);
				return e;
			});
		}
	}
};
</script>

<style scoped>
.subTitle {
	font-weight: bold;
}
</style>

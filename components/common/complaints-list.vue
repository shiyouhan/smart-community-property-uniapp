<template>
	<view>
		<view v-for="(item, index) in list" :key="index">
			<view class="m-2 bg-white p-2 rounded flex flex-column " @click="open(item.id)">
				<view class="mb-2">{{ item.complainContent }}</view>
				<view v-if="item.complainImg.length > 0" class="w-100">
					<view v-if="item.complainImg.length === 1">
						<image
							v-for="(img, index1) in item.complainImg"
							:key="index1"
							:src="img.trim()"
							class="touxiang "
						></image>
					</view>
					<view
						v-else-if="item.complainImg.length === 2 || item.complainImg.length === 4"
						class="w-100 flex algin-center justify-around flex-wrap"
					>
						<image
							v-for="(img, index1) in item.complainImg"
							:key="index1"
							:src="img.trim()"
							class="wrap1-image  m-1"
						></image>
					</view>
					<view v-else class="w-100 flex algin-center justify-start flex-wrap">
						<image
							class="wrap-image  m-1"
							v-for="(img, index1) in item.complainImg"
							:key="index1"
							:src="img.trim()"
							mode="aspectFill"
						></image>
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
		return {};
	},
	methods: {
		open(id) {
			uni.navigateTo({
				url: '/pages/complaints-detail/complaints-detail?id=' + id
			});
		}
	}
};
</script>

<style scoped>
.touxiang {
	width: 100%;
	height: 280rpx;
	border-radius: 6rpx;
}

.wrap1-image {
	width: 40%;
	height: 240rpx;
}

.wrap-image {
	width: 30%;
	height: 200rpx;
}
</style>

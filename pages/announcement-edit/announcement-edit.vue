<template>
	<view>
		<view class="mx-2">
			<!-- <image :src="item.imgUrl" class="w-100 u-h-296 border-txy"></image> -->
			<divider></divider>
			<divider></divider>
			<image src="../../static/images/other/bg_3.png" class="w-100 u-h-280 rounded"></image>
			<divider></divider>
			<view class="u-h-140 bg-white rounded">
				<textarea class="u-w-679 u-h-108 u-p-16" v-model="title" placeholder="公告链接(选填)"></textarea>
			</view>
		</view>
		
		<button class="btn_submit u-m-t-60" @click="change">
			<text class="btn_content">修改</text>
		</button>
		
		<button class="btn_submit1 u-m-t-22" @click="onDelete">
			<text class="btn_content">删除</text>
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				single: ''
			};
		},
		methods: {
			onDelete() {
				uni.navigateTo({
					url: '/pages/community-activity/community-activity'
				})
			}
		}
	}
</script>

<style lang="scss">
</style>

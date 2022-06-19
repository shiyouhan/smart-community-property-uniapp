<template>
	<view>
		<view class="mx-2">
			<!-- <image :src="item.imgUrl" class="w-100 u-h-296 border-txy"></image> -->
			<divider></divider>
			<divider></divider>
			<image src="../../static/images/other/bg_3.png" class="w-100 u-h-280 rounded"></image>
			<divider></divider>
			<view class="u-h-140 bg-white rounded">
				<textarea class="u-w-679 u-h-108 u-p-16" v-model="title"></textarea>
			</view>
			<divider></divider>
			<view class="u-h-140 bg-white rounded">
				<textarea class="u-w-679 u-h-108 u-p-16" v-model="title"></textarea>
			</view>
			<divider></divider>
			<divider></divider>
		</view>
		
		<uni-list-item title="开始时间">
			<view class="flex align-center u-m-r-38 u-font-14 text-grey" slot="right">
				<uni-datetime-picker v-model="single" v-if="single != ''">{{single}}</uni-datetime-picker>
				<uni-datetime-picker v-model="single" v-else-if="single == ''">请选择时间</uni-datetime-picker>
			</view>
		</uni-list-item>
		<uni-list-item title="结束时间">
			<view class="flex align-center u-m-r-38 u-font-14 text-grey" slot="right">
				<uni-datetime-picker v-model="single" v-if="single != ''">{{single}}</uni-datetime-picker>
				<uni-datetime-picker v-model="single" v-else-if="single == ''">请选择时间</uni-datetime-picker>
			</view>
		</uni-list-item>
		
		<button class="btn_submit u-m-t-34" @click="change">
			<text class="btn_content">修改</text>
		</button>
		
		<button class="btn_submit1 u-m-t-22" @click="onDelete">
			<text class="btn_content">删除</text>
		</button>
	</view>
</template>

<script>
	import uniListItem from "@/components/common/uni-list-item.vue"
	import uniDatetimePicker from "@/components/uni/uni-datetime-picker/uni-datetime-picker.vue"
	export default {
		components: {
			uniListItem,
			uniDatetimePicker
		},
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

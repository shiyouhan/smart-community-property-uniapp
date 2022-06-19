<template>
	<view>
		<view v-for="(item, index) in list" :key="index">
			<view class="bg-white rounded mx-2 u-h-156 flex flex-column justify-center u-p-22">
				<view class="u-font-16 u-p-b-30">{{ item.title }}</view>
				<view class="u-font-12 text-grey">{{ item.content }}</view>
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
		}
	}
</script>

<style>
</style>
<template>
	<view>
		<activity-list :list="list"></activity-list>
	</view>
</template>

<script>
	import activityList from "@/components/common/activity-list.vue";
	import {
		activeList
	} from "@/api/property/index.js"

	export default {
		components: {
			activityList
		},
		data() {
			return {
				list: []
			};
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '../activity-promulgate/activity-promulgate'
			})
		},
		onShow() {
			this.list = []
			activeList().then(res => {
				this.list = res.data
			})
		}
	}
</script>

<style lang="scss">

</style>

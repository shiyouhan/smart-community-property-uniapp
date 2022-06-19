<template>
	<view><announcement-list :list="list"></announcement-list></view>
</template>

<script>
import announcementList from '@/components/common/announcement-list.vue';
import { publicList } from '@/api/community/index.js';
export default {
	components: {
		announcementList
	},
	data() {
		return {
			list: [],
			index: 1,
			size: 10
		};
	},
	onNavigationBarButtonTap(e) {
		uni.navigateTo({
			url: '../announcement-promulgate/announcement-promulgate'
		});
	},
	onShow() {
		this.list = [];
		let info = uni.getStorageSync('userInfo');
		let data = {
			Index: this.index,
			size: this.size,
			id: info.communityId
		};
		uni.request({
			url: 'http://106.14.169.149:8082/api/public/select',
			data: data,
			header: {
				token: info.token
			}
		}).then(res => {
			this.list = res[1].data.data.map(item => {
				return {
					id: item.id,
					banner: item.banner.substring(1, item.banner.length - 1)
				};
			});
		});
		// publicList(data).then(res => {
		// 	this.list = res.data.map(item => {
		// 		return {
		// 			"id": item.id,
		// 			"banner": item.banner.substring(1, item.banner.length - 1)
		// 		}
		// 	})
		// })
	}
};
</script>

<style lang="scss"></style>

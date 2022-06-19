<template>
	<view>
		<view class="mx-2">
			<!-- <image :src="item.imgUrl" class="w-100 u-h-296 border-txy"></image> -->
			<divider></divider>
			<divider></divider>
			<view class="w-100 u-h-280 rounded bg-white flex justify-center align-center flex-column" @click="upload">
				<view v-if="imgList.length === 0" class="iconfont icon-jiahao1 u-font-102"></view>
				<image v-else :src="imgList[0]" mode=""></image>
			</view>
			<divider></divider>
			<view class="u-h-140 bg-white rounded"><textarea class="u-w-679 u-h-108 u-p-16" v-model="link" placeholder="公告链接(选填)"></textarea></view>
		</view>

		<button class="btn_submit u-m-t-60" @click="submit"><text class="btn_content">发布</text></button>
	</view>
</template>

<script>
import { upload } from '@/api/property/index.js';
import { publicAdd } from '@/api/community/index.js';
export default {
	data() {
		return {
			imgList: [],
			repairImg: [],
			link: ''
		};
	},
	methods: {
		submit() {
			let info = uni.getStorageSync('userInfo');
			let imgs = this.imgList.map((value, index) => {
				return {
					name: 'imgs' + index,
					uri: value
				};
			});
			uni.uploadFile({
				url: 'http://106.14.169.149:8086/api/household/pic/upload',
				files: imgs,
				header: {
					token: this.$store.state.user.token
				},
				success: res => {
					let result = JSON.parse(res.data);
					this.repairImg = result.data;
					let data = {
						img: this.repairImg,
						link: this.link,
						communityid: info.communityId
					};
					uni.request({
						method: 'POST',
						url: 'http://106.14.169.149:8082/api/public/add',
						data: data,
						header: {
							token: info.token
						}
					}).then(res => {
						console.log(res);
						uni.showToast({
							title: res.message
						});
						uni.navigateBack({
							delta: 1
						});
					});
				},
				fail(err) {
					console.log(err);
				}
			});
		},
		upload() {
			uni.chooseImage({
				count: 3, //默认3
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				loop: true,
				success: res => {
					const tempFilePaths = res.tempFilePaths;
					if (res.tempFilePaths.length != 0) {
						let length = res.tempFilePaths.length;
						while (length) {
							this.imgList.push(res.tempFilePaths[length - 1]);
							length = length - 1;
						}
					}
				}
			});
		}
	}
};
</script>

<style lang="scss"></style>

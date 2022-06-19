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
			<view class="u-h-140 bg-white rounded">
				<textarea class="u-w-679 u-h-108 u-p-16" v-model="activeTitle" placeholder="请输入活动标题"></textarea>
			</view>
			<divider></divider>
			<view class="u-h-140 bg-white rounded">
				<textarea class="u-w-679 u-h-108 u-p-16" v-model="noticeUrl" placeholder="请输入公告链接"></textarea>
			</view>
			<divider></divider>
			<divider></divider>
		</view>

		<uni-list-item title="开始时间">
			<view class="flex align-center u-m-r-38 u-font-14 text-grey" slot="right">
				<uni-datetime-picker v-model="startTime" v-if="startTime != ''">{{startTime}}</uni-datetime-picker>
				<uni-datetime-picker v-model="startTime" v-else-if="startTime == ''">请选择时间</uni-datetime-picker>
			</view>
		</uni-list-item>
		<uni-list-item title="结束时间">
			<view class="flex align-center u-m-r-38 u-font-14 text-grey" slot="right">
				<uni-datetime-picker v-model="endTime" v-if="endTime != ''">{{endTime}}</uni-datetime-picker>
				<uni-datetime-picker v-model="endTime" v-else-if="endTime == ''">请选择时间</uni-datetime-picker>
			</view>
		</uni-list-item>

		<button class="btn_submit u-m-t-34" @click="submit">
			<text class="btn_content">发布</text>
		</button>
	</view>
</template>

<script>
	import {
		upload,
		activeAdd
	} from "@/api/property/index.js"

	import uniListItem from "@/components/common/uni-list-item.vue"
	import uniDatetimePicker from "@/components/uni/uni-datetime-picker/uni-datetime-picker.vue"
	export default {
		components: {
			uniListItem,
			uniDatetimePicker
		},
		data() {
			return {
				single: '',
				imgList: [],
				repairImg: [],
				activeTitle: "",
				noticeUrl: "",
				startTime: "",
				endTime: "",
				content: "",
				type: ""
			};
		},
		methods: {
			submit() {
				let info = uni.getStorageSync("userInfo")
				let imgs = this.imgList.map((value, index) => {
					return {
						name: 'imgs' + index,
						uri: value
					}
				});
				uni.uploadFile({
					url: 'http://106.14.169.149:8086/api/household/pic/upload',
					files: imgs,
					header: {
						"token": this.$store.state.user.token,
					},
					success: res => {
						let result = JSON.parse(res.data)
						this.repairImg = result.data
						let data = {
							"img": this.repairImg,
							"activeTitle": this.activeTitle,
							"noticeUrl": this.noticeUrl,
							"startTime": this.startTime + " 00:00:00",
							"endTime": this.endTime + " 00:00:00",
							"content": this.content,
							"type": this.type
						}
						activeAdd(data).then(res => {
							uni.showToast({
								title: res.message
							})
							uni.navigateBack({
								delta: 1
							})
						})
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
							let length = res.tempFilePaths.length
							while (length) {
								this.imgList.push(res.tempFilePaths[length - 1]);
								length = length - 1;
							}
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss">
</style>

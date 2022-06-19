<template>
	<view>
		<divider></divider>
		<view class="mx-2 bg-white u-p-19 rounded">
			<view class="flex justify-between">
				<view class="py-1">{{ repairDetail.repairTitle }}</view>
				<view>
					<view v-if="repairDetail.status == 0" class="text-danger">待处理</view>
					<view v-else class="text-grey">已完成</view>
				</view>
			</view>
			<view class="text-grey u-font-14">{{ repairDetail.createTime }}</view>
			<view class="py-2">{{ repairDetail.repairContent }}</view>
			<view v-if="repairDetail.repairImg.length > 0">
				<view class="">
					<view v-if="repairDetail.repairImg.length === 2 || repairDetail.repairImg.length === 4"
						class="wrap1">
						<image v-for="(item1,index) in repairDetail.repairImg" :key="index" :src="item1" mode="aspectFill"></image>
					</view>
					<view v-else class="wrap">
						<image v-for="(item1,index) in repairDetail.repairImg" :key="index" :src="item1" mode="aspectFill"></image>
					</view>
				</view>
			</view>

			<view class="flex flex-column u-p-t-38" v-show="!repair.resulyTime">
				<view class="flex">
					<view class="u-w-188 text-grey">物业回复:</view>
					<textarea class="ml-2 border rounded w-100 p-1" v-model="repairResult"></textarea>
				</view>
				<view class="u-font-16 justify-end flex u-m-t-19">
					<text class="bg-theme text-white px-4 py-2 rounded-22" @click="reply">回复</text>
				</view>
			</view>
			<view class="flex flex-column bg-hover-light rounded u-p-19" v-show="repair.resulyTime">
				<view class="flex u-font-16 text-grey u-p-b-19 justify-between">
					<view class="u-w-188">物业回复:</view>
					<view>{{ repair.resulyTime }}</view>
				</view>
				<view class="content-two u-font-16 u-line-18">{{ repair.repairResult }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getRepairDetail,
		replyRepair
	} from '@/api/property'
	export default {
		data() {
			return {
				isShow: true,
				id: '',
				repairResult: '',
				repairDetail: {},
				repair: {},
			};
		},
		// computed: {
		// 	data() {
		// 		return this.map(e => {
		// 			const len = e.complainImg.length == 1 ? 306 : (e.complainImg.length == 2 ? 326 : 216)
		// 			e.style = 'height: ' + len + 'rpx;'
		// 			if(e.complainImg.length == 1) {
		// 				e.style = e.style + 'width: 100%;'
		// 			} else {
		// 				e.style = e.style + 'width: ' + len + 'rpx;'
		// 			}
		// 			return e
		// 		})
		// 	}
		// },
		onLoad(option) {
			this.id = option.id
			this.getDetail()
		},
		methods: {
			getDetail() {
				getRepairDetail(this.id).then(res => {
					console.log(res)
					this.repairDetail = res.data
					this.repair = res.data.repairRecord
				})
			},
			reply() {
				if(this.repairResult == '') {
					uni.showToast({
						title: '请输入回复内容',
						icon:'error',
						duration: 2000
					})
					return
				}
				let param = {
					"repairId": this.id,
					"repairResult": this.repairResult
				}
				replyRepair(param).then(res => {
					console.log(res)
					this.repairResult = ''
					uni.showToast({
						title: '回复成功',
						duration: 2000
					})
					this.getDetail()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		image {
			width: 210rpx;
			height: 210rpx;
			object-fit: cover;
			border-radius: 3px;
			margin: 5rpx;
		}
	}

	.wrap1 {
		image {
			width: 222rpx;
			height: 222rpx;
			object-fit: cover;
			border-radius: 3px;
			margin: 5rpx;
		}
	}
</style>

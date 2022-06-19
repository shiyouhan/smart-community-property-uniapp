<template>
	<view>
		<view class="m-2 bg-white p-2 rounded flex flex-column ">
			<view class="mb-2">{{ complaints.complainContent }}</view>
			<view v-if="complaints.complainImg.length > 0" class="w-100">
				<view v-if="complaints.complainImg.length === 1">
					<image
						v-for="(img, index1) in complaints.complainImg"
						:key="index1"
						:src="img.trim()"
						class="touxiang "
					></image>
				</view>
				<view
					v-else-if="complaints.complainImg.length === 2 || complaints.complainImg.length === 4"
					class="w-100 flex algin-center justify-around flex-wrap"
				>
					<image
						v-for="(img, index1) in complaints.complainImg"
						:key="index1"
						:src="img.trim()"
						class="wrap1-image  m-1"
					></image>
				</view>
				<view v-else class="w-100 flex algin-center justify-start flex-wrap">
					<image
						class="wrap-image  m-1"
						v-for="(img, index1) in complaints.complainImg"
						:key="index1"
						:src="img.trim()"
					></image>
				</view>
			</view>

			<view class="flex mt-3">
				<view class="u-w-188">物业回复:</view>
				<textarea
					class="border rounded w-100 p-1"
					v-model="complaints.complainResult.complainResult"
					placeholder="已派人前往处理，请稍等"
					type="text"
					:disabled="complaints.complainResult.complainResult != undefined"
				></textarea>
			</view>

			<button class=" u-m-t-54 w-100 bg-theme" :disabled="complaints.complainResult.complainResult != undefined">
				<text class="btn_content ">回复</text>
			</button>
		</view>
	</view>
</template>

<script>
import { complainDetail } from '@/api/property/index.js';
export default {
	data() {
		return {
			id: '',
			complaints: {}
		};
	},
	onLoad(option) {
		this.id = option.id;
		console.log(this.id);
		this.getData();
	},
	methods: {
		getData() {
			complainDetail(this.id).then(res => {
				this.complaints = res.data;
				console.log(this.complaints.complainImg.length);
			});
		}
	}
};
</script>

<style lang="scss">
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

button[disabled] {
	background-color: #ffe0b2;
}
</style>

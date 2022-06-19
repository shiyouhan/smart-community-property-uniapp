<template>
	<view>
		<swiper :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000" class="u-h-280 u-p-b-28 border-bottom">
			<block v-for="(item, index) in swiper" :key="index">
				<swiper-item class="flex algin-center justify-center">
					<image :src="item.imageUrl" class="width-100 u-h-280 u-m-19 rounded" mode="aspectFill" lazy-load />
				</swiper-item>
			</block>
		</swiper>
		
		<function-list :list="list"></function-list>
	</view>
</template>

<script>
	import { 
		advertisingList
	} from '@/api/index';
	import functionList from "@/components/common/function-list.vue"
	export default {
		components: {
			functionList
		},
		data() {
			return {
				showType: 1,
				swiper: [],
				list: [
					{
						id: 1,
						img: '../../static/images/other/btn_daka.png',
						title: '考勤签到',
						page: '/pages/signin/signin'
					},
					{
						id: 2,
						img: '../../static/images/other/btn_baoxiu.png',
						title: '报修处理',
					    page: '/pages/repair-process/repair-process'
					},
					{
						id: 3,
						img: '../../static/images/other/btn_caigou.png',
						title: '物业采购',
						page: '/pages/property-purchase/property-purchase'
					},
					{
						id: 4,
						img: '../../static/images/other/btn_tousu.png',
						title: '投诉处理',
						page: '/pages/complaints/complaints'
					},
					{
						id: 5,
						img: '../../static/images/other/btn_jiaofei.png',
						title: '物业缴费',
						page: '/pages/property-payment/property-payment'
					},
					{
						id: 6,
						img: '../../static/images/other/btn_jiaoliu.png',
						title: '社区交流',
						page: '/pages/communication/communication'
					},
					{
						id: 7,
						img: '../../static/images/other/btn_post.png',
						title: '小区公告',
						page: '/pages/community-announcement/community-announcement'
					},
					{
						id: 8,
						img: '../../static/images/other/btn_huodong.png',
						title: '小区活动',
						page: '/pages/community-activity/community-activity'
					},
					{
						id: 9,
						img: '../../static/images/other/btn_market.png',
						title: '跳蚤市场',
						page: '/pages/fleamarket/fleamarket'
					}
				]
			}
		},
		onLoad() {
			this.getAdvertise();
		},
		methods: {
			getAdvertise() {
				advertisingList(this.showType).then(res => {
					this.swiper = res.data;
				});
			},
		}
	}
</script>

<style>
	
</style>

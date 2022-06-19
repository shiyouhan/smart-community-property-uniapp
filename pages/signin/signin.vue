<template>
	<view class="px-2">
		<view class="u-h-468 flex flex-column align-center justify-center u-rela">
			<view class="text-white bg-theme w-110 rounded-120 flex justify-center align-center flex-column"
				@click="clock">
				<view v-if="!visible">
					<view>
						<view v-if="isAfternoon == 0">
							<view>上班打卡</view>
						</view>
						<view v-if="isAfternoon == 1">
							<view>下班打卡</view>
						</view>
						<view v-if="isAfternoon == 2">
							<view>已下班</view>
						</view>
					</view>
					<view>{{ nowtime | updatetime }}</view>
				</view>
				<view v-else>
					<view class="p-1 flex justify-center">
						<view class="loader"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="flex border-bottom py-2 align-center">
			<view class="iconfont icon-dingwei text-grey"></view>
			<view class="u-p-l-19">{{ address }}</view>
		</view>
		<view class="flex border-bottom py-2 align-center">
			<view class="iconfont icon-shijian u-font-16 text-secondary"></view>
			<view class="u-p-l-19">今天打卡{{ num }}次</view>
		</view>
		<view v-if="checkList.length != 0" class="flex py-2">
			<view class="iconfont icon-shijian u-font-16 text-secondary"></view>
			<view class="flex flex-column u-p-l-19 u-font-14">
				<view class="text-grey">上班打卡:{{ checkList.onDutyTime }}</view>
				<view class="u-p-t-19">{{ checkList.onDutySite }}</view>
			</view>
		</view>
		<view v-if="checkList.length != 0 && checkList.offDutyTime" class="flex py-2">
			<view class="iconfont icon-shijian u-font-16 text-secondary"></view>
			<view class="flex flex-column u-p-l-19 u-font-14">
				<view class="text-grey">下班打卡:{{ checkList.offDutyTime }}</view>
				<view class="u-p-t-19">{{ checkList.offDutySite }}</view>
			</view>
		</view>
	</view>

</template>

<script>
	import moment from 'moment'
	import 'moment/locale/zh-cn'
	moment.locale('zh-cn')
	import {
		checkOn,
		checkOnList
	} from '@/api/account'
	export default {
		data() {
			return {
				num: 1,
				address: '',
				nowtime: new Date(),
				checkList: {},
				visible: false,
				status: '',
				longitude: '',
				latitude: ''
			};
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '../signin-statistic/signin-statistic'
			})
		},
		computed: {
			clockTime() {
				return this.moment().format("HH:mm")
			},
			isAfternoon() {
				if (this.status == '签到未签退')
					return 1
				else if (this.status == '完成签到流程')
					return 2
				return 0
			}
		},
		mounted() {
			uni.showLoading()
			let _this = this;
			this.timer = setInterval(() => {
				_this.nowtime = new Date();
			}, 1000)
			this.getList()
			uni.getLocation({
				type: 'wgs84',
				geocode: true,
				success: function(res) {
					console.log(res)
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
					uni.request({
						header: {
							"Content-Type": "application/text"
						},
						//注意:这里的key值需要高德地图的 web服务生成的key  只有web服务才有逆地理编码
						url: 'https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=' + res
							.longitude + ',' + res.latitude +
							'&key=17316a4acf55b2a1f1de3946ef7b4b48&radius=1000&extensions=all',
						success(re) {
							if (re.statusCode === 200) {
								_this.address = re.data.regeocode.formatted_address
								console.log("获取中文街道地理位置成功", re.data.regeocode.formatted_address)
								uni.hideLoading()
							} else {
								console.log("获取信息失败，请重试！")
							}
						}
					});
				},
				fail: function(res) {
					console.log(res)
				}
			});
		},
		beforeDestroy() {
			if (this.timer) {
				clearInterval(this.timer);
			}
		},
		filters: {
			updatetime: function(value) {
				return moment(value).format('LTS');
			}
		},
		methods: {
			getList() {
				let _this = this
				checkOnList().then(res => {
					console.log(res)
					if (res.data.checkOnList.length != 0) {
						res.data.checkOnList.forEach(item => {
							let todayDate = new Date().setHours(0, 0, 0,
								0)
							let paramsDate = new Date(item.onDutyTime.substring(0, 10)).setHours(0, 0, 0,
								0);
							let isToday = (todayDate === paramsDate)
							if(isToday) {
								_this.checkList = item
							}
						})
					}
					_this.status = res.data.status
				})
			},
			clock() {
				if (this.isAfternoon == 2) {
					uni.showToast({
						title: '今天已经打过卡了哦',
						icon: 'none',
						duration: 2000
					});
					return
				}
				let param = {
					"status": this.isAfternoon == 0 ? "签到未签退" : '完成签到流程',
					"onDutySite": this.address,
					"onDutyLatitude": this.latitude,
					"onDutyLongitude": this.longitude
				}
				checkOn(param).then(res => {
					console.log(res)
					this.visible = true
					uni.showToast({
						title: '打卡成功',
						icon: 'success',
						duration: 2000
					});
					setTimeout(() => {
						this.visible = false
						this.getList()
					}, 2000)
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f0f1f4;
	}

	// 圆圈
	.loader {
		position: relative;
		width: 110px;
		height: 110px;
		border-radius: 50%;
		border: 4px solid rgba(255, 255, 255, 0.2);
		border-left-color: #fff;
		animation: animation_collect 1s linear 1 both; //infinite永远执行
	}

	// 圆圈动画代码
	@keyframes animation_collect {
		0% {
			transform: rotate(270deg);
			border-left-color: #fff;
		}

		25% {
			border-left-color: #fff;
		}

		50% {
			border-left-color: #fff;
		}

		75% {
			border-left-color: #fff;
		}

		100% {
			border-left-color: rgba(255, 255, 255, 0.2);
			transform: rotate(0deg);
		}
	}

	//对号
	.loader::before {
		position: absolute;
		content: '';
		top: 50%;
		left: 60rpx;
		border: 4px solid #fff;
		border-left-width: 0;
		border-bottom-width: 0;
		transform: scaleX(-1) rotate(135deg);
		transform-origin: left top;
		// 设置动画延迟1s执行，先执行外层圆圈动画 结束后执行该动画
		animation: animation_true 0.5s 1s linear 1 both;
		// 外层执行动画执行时，里面不显示，但是不能使用display:none,所以用opacity代替
		opacity: 0;
	}

	@keyframes animation_true {
		0% {
			opacity: 0;
			width: 0px;
			height: 0px;
		}

		33% {
			opacity: 1;
			width: 20px;
			height: 0px;
		}

		100% {
			opacity: 1;
			width: 20px;
			height: 40px;
		}
	}
</style>

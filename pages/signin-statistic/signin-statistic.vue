<template>
	<view>
		<v-calendar name="calendar" :defaultTime="time" :extraData="extraData" @calendarTap="calendarTap"
			@monthTap="monthTap" />
		<uni-steps :options="list" active-color="#f5820f" :active="active" direction="column" />
	</view>
</template>

<script>
	import vCalendar from "@/components/common/tale-calendar/calendar.vue"
	import uniSteps from "@/components/uni/uni-steps/uni-steps.vue"
	import {
		checkOnList
	} from '@/api/account'
	import {
		getYearYueDay
	} from '@/lib/time.js'
	export default {
		components: {
			vCalendar,
			uniSteps
		},
		data() {
			return {
				time: {
					year: 2022,
					month: 5
				},
				extraData: [],
				month: {
					year: 2022,
					month: 6
				},
				active: 0,
				list: [],
				current: ''
			};
		},
		onLoad() {
			this.onlod()
		},
		methods: {
			onlod() {
				checkOnList().then(res => {
					console.log(res)
					this.list = []
					res.data.checkOnList.forEach(item => {
						console.log(item)
						let param = this.current
						if (this.current == '') {
							param = getYearYueDay().substring(0, 10)
							this.current = param
						}
						let todayDate = new Date(param).setHours(0, 0, 0,
							0)
						let paramsDate = new Date(item.onDutyTime.substring(0, 10)).setHours(0, 0, 0,
							0);
						let isToday = (todayDate === paramsDate)
						if (isToday) {
							let param = {
								title: item.onDutySite,
								desc: `打卡时间：${item.onDutyTime.substring(11,16)}(上班时间09：00)`
							}
							this.list.push(param)
							if (item.offDutyTime) {
								param.desc = `打卡时间：${item.offDutyTime.substring(11,16)}(下班时间09：00)`
								this.list.push(param)
							}
						}
						let date = {
							date: item.onDutyTime.substring(0, 10),
							value: '签到',
							dot: true,
							active: false
						}
						this.extraData.push(date)
					})
				})
			},
			calendarTap(e) {
				let month = `0${e.month+1}`
				let day = `0${e.day}`
				this.current =
					`${e.year}-${month.substring(month.length-2,month.length)}-${day.substring(day.length-2,day.length)}`
					console.log(this.current)
				this.onlod()
			},
			monthTap(val) {
				let {
					year,
					month
				} = val;
				this.month = {
					year: year,
					month: month,
				}
				// 此处获取动态的数据，赋值给extraData
				this.extraData = [{
					date: '2020-11-3',
					value: '签到',
					dot: true,
					active: true
				}];
			},
			change() {
				if (this.active < this.list1.length - 1) {
					this.active += 1
				} else {
					this.active = 0
				}
			}
		}
	}
</script>

<style lang="scss">

</style>

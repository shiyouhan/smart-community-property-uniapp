<template>
	<view>
		<view class="flex u-m-t-19 justify-between mx-2">
			<view class="flex">
				<view class="flex bg-white u-w-180 py-1 align-center justify-center rounded-22 border u-m-l-19">
					<!-- <view>全部</view> -->
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
					</picker>
					<view class="iconfont icon-xiajiantoushixinxiao"></view>
				</view>
				<view class="flex bg-white u-w-240 py-1 align-center justify-center rounded-22 border u-m-l-38">
					<!-- <view>2019年06月</view> -->
					<picker mode="date" :value="date" :start="startDate" :end="endDate" fields="month" @change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
					<view class="iconfont icon-xiajiantoushixinxiao"></view>
				</view>
			</view>
			<view class="flex flex-column u-font-14">
				<view class="u-p-b-10">未缴:{{ costing }}</view>
				<view class="">已缴:{{ costed }}</view>
			</view>
		</view>
		
		<divider></divider>
		
		<payment-list :list="list"></payment-list>
	</view>
</template>

<script>
	import paymentList from "@/components/common/payment-list.vue"
	export default {
		components: {
			paymentList
		},
		data() {
		    const currentDate = this.getDate({
				format: true
			})
			return {
				date: currentDate,
				list: [
					{
						way: '物业费',
						status: 1,
						cost: 0.01,
						phone: '18938647738',
						orderId: 222,
						username: '张三'
					},
					{
						way: '物业费',
						status: 0,
						cost: 0.01,
						phone: '18938647738',
						orderId: 222,
						username: '张三'
					},
					{
						way: '物业费',
						status: 1,
						cost: 0.67,
						phone: '18938647738',
						orderId: 222,
						username: '张三'
					},
					{
						way: '物业费',
						status: 0,
						cost: 0.88,
						phone: '18938647738',
						orderId: 222,
						username: '张三'
					}
				],
				array: ['全部', '已缴', '未缴'],
			    index: 0,
			}
		},
		asyncComputed: {
			costing: {
				get() {
					let sum = 0
					if(this.list) {
						for(let i of this.list) {
							if(i.status == 1)
								sum += i.cost
						}
					}
					return sum
				}
			},
			costed: {
				get() {
					let sum = 0
					if(this.list) {
						for(let i of this.list) {
							if(i.status == 0)
								sum += i.cost
						}
					}
					return sum
				}
			},
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				// let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				// day = day > 9 ? day : '0' + day;
				// return `${year}-${month}-${day}`;
				return `${year}-${month}`;
			},
			bindDateChange: function(e) {
				this.date = e.detail.value
			},
			bindPickerChange: function(e) {
				// console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
			}
		}
	}
</script>

<style lang="scss">

</style>

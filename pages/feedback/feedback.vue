<template>
	<view>
		<divider></divider>
		
		<view class="bg-white p-4">
			<textarea class="x-y-20" v-model="content" placeholder="请您填写遇到的问题与建议，我们会第一时间处理。"></textarea>
		</view>
		
		<divider></divider>
		
		<view class="bg-white">
			<input class="px-4 py-3" v-model="phone" placeholder="手机号码必填"/>
		</view>
		
		<button class="btn_submit u-m-t-56" @tap="submit">
			<text class="btn_content">提交</text>
		</button>
	</view>
</template>

<script>
	import { feedBack } from '@/api/account'
	export default {
		data() {
			return {
				content: '',
				phone: ''
			}
		},
		methods: {
			validatePhone() {
				//手机号正则
				if (this.phone === '') {
					this.$msg.toast('请输入手机号', 'err')
					return false;
				} else {
					var mPattern = /^1[345789]\d{9}$/;
					if (!mPattern.test(this.phone)) {
						this.$msg.toast('请输入正确的手机号', 'err')
						return false;
					}
					return true;
				}
			},
			submit() {
				const data = {
					content: this.content,
					phone: this.phone
				}
				// 验证手机号没通过
				if (!this.validatePhone()) {
					return;
				}
				feedBack(data).then((res) => {
					console.log(res)
					if (res.code === 200) {
						this.$msg.toast('登录成功', 'suc');
						uni.switchTab({
							url: '../my/my'
						})
					} else {
						this.$msg.toast(res.message)
						return false
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>

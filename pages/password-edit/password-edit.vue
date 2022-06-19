<template>
	<view>		
		<view class="rounded bg-white u-h-488 m-16-20-12">
			<view class="pass flex align-center u-h-120 border-b-4">
				<view class="iconfont icon-shouji text-hover-light u-p-l-24 u-p-r-19"></view>
				<input type="phone" v-model="phone" placeholder="请输入手机号" class="w-100"/>
			</view>
			<view class="pass flex align-center u-h-120 border-b-4">
				<view class="iconfont icon-xinfeng text-hover-light u-p-l-24 u-p-r-19"></view>
				<input type="text" class="u-m-r-4 w-100" v-model="verifyCode" placeholder="请输入验证码"/>
				<text class="text-theme u-w-328" :class="limitTime > 0 ? 'disabled' : ''" @click="getCode()">
					{{limitTime > 0 ? limitTime + 's后可重发' : '发送验证码'}}
				</text>
			</view>
			<view class="pass flex align-center u-h-120 border-b-4">
				<view class="iconfont icon-suo text-hover-light u-p-l-24 u-p-r-19"></view>
				<input type="password" v-model="password" placeholder="请输入6-12位密码" class="w-100"/>
			</view>
			<view class="pass flex align-center u-h-120">
				<view class="iconfont icon-suo text-hover-light u-p-l-24 u-p-r-19"></view>
				<input type="password" v-model="rePassword" placeholder="确认密码" class="w-100"/>
			</view>
		</view>
		
		<button class="btn_submit u-m-t-92" @tap="submit">
			<text class="btn_content">提交</text>
		</button>
	</view>
</template>

<script>
	import {
		codeSend,
		resetPassword
	} from '@/api/user'
	
	export default {
		data() {
			return {
				phone: '',
				password: '',
				rePassword: '',
				verifyCode: '',
				limitTime: 0
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
			validatePassword() {
				if (this.password === '') {
					this.$msg.toast('请输入密码', 'err')
					return false;
				} else if (this.rePassword === '') {
					this.$msg.toast('请输入密码', 'err')
					return false;
				} else if (this.rePassword !== this.password) {
					this.$msg.toast('请确保两次密码一致', 'err')
					return false;
				} else { 
					var reg = /^[0-9A-Za-z]{6,12}$/;
					if (!reg.test(this.password) || !reg.test(this.rePassword)) {
						this.$msg.toast('密码必须为6-12位', 'err')
						return false;
					} 
					return true;
				}
			},
			getCode() {
				// 防止重复获取
				if (this.limitTime > 0) {
					return;
				}
				// 验证手机号没通过
				if (!this.validatePhone()) {
					return;
				}
				const data = {
					phone: this.phone
				}
				// 请求验证码接口
				codeSend(data).then((res) => {
					this.$msg.toast('验证码已发送', 'suc');
					console.log(res)
					this.limitTime = 60;
					let timer = setInterval(() => {
						if (this.limitTime >= 1) {
							this.limitTime--;
						} else {
							this.limitTime = 0;
							clearInterval(timer);
						}
					}, 1000);
				})
			},
			submit() {
				const data = {
					phone: this.phone,
					password: this.password,
					rePassword: this.rePassword,
					verifyCode: this.verifyCode
				}
				// 密码验证没通过
				if (!this.validatePassword()) {
					return
				}
				resetPassword(data).then((res) => {
					console.log(res)
					if (res.code === 200) {
						this.$msg.toast('登录成功', 'suc');
						uni.switchTab({
							url: '/pages/my/my'
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

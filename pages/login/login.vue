<template>
	<view>
		<view class="flex algin-center justify-center u-m-b-140">
			<image src="../../static/images/other/icon.png"  
				class="w-66 border-half u-m-t-84 u-m-b-84">
		</view>
		
		<view class="rounded bg-white u-h-244 m-16-20-12">
			<view class="pass flex align-center u-h-120 border-b-4">
				<view class="iconfont icon-shouji text-hover-light u-p-l-24 u-p-r-19"></view>
				<input type="text" v-model="account" placeholder="请输入账号" class="w-100"/>
			</view>
			<view class="pass flex align-center u-h-120">
				<view class="iconfont icon-suo text-hover-light u-p-l-24 u-p-r-19"></view>
				<input type="password" v-model="password" placeholder="请输入密码" class="w-100"/>
			</view>
		</view>
		
		<button class="btn_submit u-m-t-54" @tap="login">
			<text class="btn_content">登录</text>
		</button>
	</view>
</template>

<script>
	import {
		passwordLogin
	} from '@/api/user'
	export default {
		data() {
			return {
				account: '',
				password: ''
			}
		},
		methods: {
			login() {
				const data = {
					account: this.account,
					password: this.password
				}
				console.log(data)
				passwordLogin(data).then((res) => {
					if (res.code === 200) {
						this.$msg.toast('登录成功', 'suc');
						this.$store.commit('user/SET_TOKEN', {
							token: res.data.token
						})
						this.$store.commit('user/SET_USER_INFO', {
							userInfo: res.data
						})
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
.tabbar {
		width: 100%;
		display: flex;
		align-items: center;
	}
	
	.tabbar-item {
		padding: 20rpx 0rpx;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		margin: 0rpx 60rpx;
	}
	.line {
		border-bottom: 4rpx solid $primary;
	}

</style>

<template>
	<view>
		<template v-if="!loginStatus">
			<view class="flex align-center justify-center flex-column u-h-318 bg-grey" @tap="open('login')">
				<image src="/static/images/other/weidenglu.png" class="w-66 rounded">
				<view class="u-font-14 u-p-t-32">请点击登录</view>
			</view>
		</template>
		
		<template v-else>
			<view class="flex align-center justify-center flex-column u-h-318 bg-grey" @tap="open('user-edit')">
				<image :src="user.avatar || ''" class="w-66 rounded">
				<view class="u-font-14 u-p-t-32">{{ user.name || '' }}</view>
			</view>
		</template>
		
		<uni-list-item showExtraIcon title="修改密码" @tap="open('password-edit')">
			<text slot="icon" class="iconfont icon-suo text-orange" />
		</uni-list-item>
		<uni-list-item showExtraIcon title="意见反馈" @tap="open('feedback')">
			<text slot="icon" class="iconfont icon-yijianfankui text-danger u-font-16 u-p-r-6" />
		</uni-list-item>
		
		<button class="btn_submit u-m-t-54" @click="logout">
			<text class="btn_content">退出登录</text>
		</button>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { getUserInfo } from '@/api/user'
	import uniListItem from "@/components/common/uni-list-item.vue"
	export default {
		components: {
			uniListItem
		},
		data() {
			return {
				loginStatus: false 
			};
		},
		onShow() {
			// 从本地缓存读取user,如果为空，loginStatus为false,否则为true，将其信息渲染在页面
			this.token = uni.getStorageSync('token');
			if (Object.keys(this.token).length === 0) {
				this.loginStatus = false;
			} else {
				this.loginStatus = true;
			}
			// console.log(this.token);
			console.log(this.loginStatus);
		},
		computed: {
			...mapState({
				user: state => state.user.userInfo
			})
		},
		onLoad() {
			this.load()
		},
		methods: {
			open(path) {
				uni.navigateTo({
					url: `../${path}/${path}`
				})
			},
			load() {
				getUserInfo().then((res) => {
					if (res.code === 200) {
						this.$store.commit('user/SET_USER_INFO', {
							userInfo: res.data
						})
					} else {
						this.$msg.toast(res.message)
						return false
					}
				})
			},
			// 退出登录
			logout() {
				uni.showModal({
					content: '是否要退出登录',
					success: res => {
						if (res.confirm) {
							uni.clearStorageSync();
							uni.navigateTo({
								url:`../login/login`,
							})
							uni.showToast({
								title: '退出登录成功',
								icon: 'none'
							});
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
</style>

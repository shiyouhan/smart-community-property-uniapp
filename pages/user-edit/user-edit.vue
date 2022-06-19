<template>
	<view>
		<divider></divider>
		<uni-list-item title="头像" @click="changeAvatar">
			<view class="flex align-center text-grey" slot="right">
				<image class="w-36 rounded-circle" :src="(user && user.avatar) || ''" />
			</view>
		</uni-list-item>
		<uni-list-item title="姓名">
			<view class="flex align-center" slot="right">
				<input class="text-grey text-right u-font-12 u-p-r-19" v-model="user.name"/>
			</view>
		</uni-list-item>
		
		<divider></divider>
		<uni-list-item title="部门">
			<view class="flex align-center" slot="right">
				<input class="text-grey text-right u-font-12 u-p-r-19" v-model="user.departmentId"/>
			</view>
		</uni-list-item>
		<uni-list-item showBadge :badgeText="formatPhone" title="手机号">
		</uni-list-item>
	</view>
</template>

<script>
	import {
		personEdit
	} from '@/api/account'
	import {
		getUserInfo
	} from '@/api/user'
	import { mapState } from 'vuex'
	import uniListItem from "@/components/common/uni-list-item.vue"
	export default {
		components: {
			uniListItem
		},
		data() {
			return {
		
			};
		},
		computed: {
			...mapState({
				user: state => state.user.userInfo
			}),
			formatPhone() {
				if(this.user && this.user.phone)
					return this.user.phone.substr(0,3) + "****" + this.user.phone.substr(7)
				return ''
			},
		},
		onNavigationBarButtonTap(e) {
			personEdit(this.user).then((res) => {
				if (res.code === 200) {
					this.$msg.toast('更改成功', 'suc');
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
		},
		onLoad() {
			this.load()
		},
		methods: {
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
			// 选择头像 
			changeAvatar() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: res => {
						// console.log(res.tempFilePaths[0]);
						// 改变响应式数据，实时预览
						let header = {}
						let token = uni.getStorageSync('token')
						if(token) {
							header.token = token
						}
						this.avatar = res.tempFilePaths[0]
						uni.uploadFile({
							url: config.baseUrl + '8081/api/avatar/upload',
							filePath: this.avatar,
							name: 'avatar',
							header: header,
							success: (uploadFileRes) => {
								// 注意这里的返回值是string，需要反序列化
								this.user.avatar = JSON.parse(uploadFileRes.data).data
								// 上传成功后,再调用修改个人信息接口，没有新值的就保留user的原值
							},
						})
					}
				});
			},
			// 提交修改请求
			submit() {
				personEdit(this.user).then((res) => {
					if (res.code === 200) {
						this.$msg.toast('更改成功', 'suc');
						this.$store.commit('user/SET_USER_INFO', {
							userInfo: res.data
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

<style lang="scss">

</style>

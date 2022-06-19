<template>
	<view class="tab-bar-wrap">
		<view class="tab-bar">
			<view :class="{item:true, home:true, active:homeActive}" @click="redirectPage('/pages/index/index')">
				<view class="icon"></view>
				<view class="text">首页</view>
			</view>
			<view :class="{item:true, cart:true, active:cartActive}" @click="redirectPage('/pages/cart/cart')">
				<view class="icon"></view>
				<view class="text">购物车</view>
			</view>
			<view :class="{item:true, my:true, active:myActive}" @click="redirectPage('/pages/my/my')">
				<view class="icon"></view>
				<view class="text">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "uni-tab-bar",
		data() {
			return {
				homeActive: true,
				cartActive: false,
				myActive: false
			}
		},
		props: {
			curRoute: {
				type: String,
				default: ""
			}
		},
		mounted() {
			switch (this.curRoute) {
				case "pages/index/index": //首页
					this.homeActive = true;
					this.cartActive = false;
					this.myActive = false;
					break;
				case "pages/cart/cart": //购物车
					this.homeActive = false;
					this.cartActive = true;
					this.myActive = false;
					break;
				case "pages/my/my": //我的
					this.homeActive = false;
					this.cartActive = false;
					this.myActive = true;
					break;
				default:
					this.homeActive = true;
					this.cartActive = false;
					this.myActive = false;
					break;
			}
		},
		methods: {
			redirectPage(url) {
				uni.redirectTo({
					url
				})
			}
		}
	}
</script>

<style scoped>
	.tab-bar-wrap {
		width: 100%;
		height: 130rpx;
	}

	.tab-bar {
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		border: 1px solid #EFEFEF;
		position: fixed;
		left: 0;
		bottom: 34rpx;
		z-index: 99;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10%;
		box-sizing: border-box;
	}

	.tab-bar .item {
		width: 80rpx;
		height: auto;
	}

	.tab-bar .item .text {
		font-size: 24rpx;
		text-align: center;
	}

	.tab-bar .item.active .text {
		color: #E00023
	}

	.tab-bar .item .icon {
		width: 60rpx;
		height: 60rpx;
		margin: 0 auto;
	}

	.tab-bar .item.home .icon {
		background-image: url("~@/static/images/tabbar/home1.png");
		background-size: 100%;
		background-position: center;
		background-repeat: no-repeat;
	}

	.tab-bar .item.home.active .icon {
		background-image: url("~@/static/images/tabbar/home2.png");
		background-size: 100%;
		background-position: center;
		background-repeat: no-repeat;
	}

	.tab-bar .item.cart .icon {
		background-image: url("~@/static/images/tabbar/cart1.png");
		background-size: 100%;
		background-position: center;
		background-repeat: no-repeat;
	}

	.tab-bar .item.cart.active .icon {
		background-image: url("~@/static/images/tabbar/cart2.png");
		background-size: 100%;
		background-position: center;
		background-repeat: no-repeat;
	}

	.tab-bar .item.my .icon {
		background-image: url("~@/static/images/tabbar/my1.png");
		background-size: 100%;
		background-position: center;
		background-repeat: no-repeat;
	}

	.tab-bar .item.my.active .icon {
		background-image: url("~@/static/images/tabbar/my2.png");
		background-size: 100%;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>

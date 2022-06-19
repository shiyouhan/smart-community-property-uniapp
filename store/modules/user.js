const state = {
	token: uni.getStorageSync('token') ? uni.getStorageSync('token') : "", //登录验证的token
	userInfo: uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : {}, //用户信息
}
const getters = {
	['GET_TOKEN'](state) {
		return state.token
	},
	['GET_USER_INFO'](state) {
		return state.userInfo
	}
}
const mutations = {
	// 设置 token
	['SET_TOKEN'](state, payload) {
		state.token = payload.token
		// 放入缓存
		uni.setStorageSync('token', state.token)
	},
	// 设置用户信息
	['SET_USER_INFO'](state, payload) {
		// 从 payload 中获取userInfo属性，并设置给state中的变量
		state.userInfo = payload.userInfo;
		// 放入缓存
		uni.setStorageSync('userInfo', state.userInfo);
	},
	// 退出登录
	['LOGOUT'](state, payload) {
		state.token = "";
		uni.removeStorageSync('token');
		uni.removeStorageSync('userInfo');
	},
}
const actions = {}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}

import http from "@/lib/http";

const port = "8089/api"

// 账号密码登录
export function passwordLogin(data) {
	return http.post(port + "/property/login", data);
}

// 获取登录用户信息
export function getUserInfo() {
	return http.get(port +"/info");
}

// 验证码发送
export function codeSend(data) {
	return http.get(port +"/code", data);
}

// 重置密码
export function resetPassword(data) {
	return http.post(port +"/password/reset", data);
}

import http from "@/lib/http";

const port = "8081/api"

export function checkOn(param) {
	return http.post(port + '/personal/check/on', param)
}

export function checkOnList() {
	return http.get(port + '/personal/check/on')
}

// 意见反馈
export function feedBack(data) {
	return http.post(port + "/personal/feedback", data)
}

// 修改个人信息
export function personEdit(data) {
	return http.put(port + "/personal", data, 'json');
}
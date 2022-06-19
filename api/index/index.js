import http from "@/lib/http";

const port = "8084/api"


// 广告列表
export function advertisingList(params) {
	return http.get(port + "/index/advertising/" + params);
}
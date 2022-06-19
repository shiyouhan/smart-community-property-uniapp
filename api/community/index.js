import http from "@/lib/http";

const port = "8082/api"

// 根据字段搜索帖子
export function getSearchList(data) {
	return http.get(port + "/community/search", data);
}

// 根据上下架状态查询
export function getList(data){
	return http.get(port + "/community/list", data);
}

// 下架
export function doDown(data){
	return http.post(port + "/community/update", data);
}

// 上架
export function doUp(data){
	return http.post(port + "/community/change", data);
}

// 查询公告
export function publicList(data) {
	return http.get(port + "public/select", data);
}

// 添加公告
export function publicAdd(data) {
	return http.post(port + "public/add", data);
}
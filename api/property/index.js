import http from "@/lib/http";

const port = "8086/api/"

// 社区活动列表
export function activeList(data) {
	return http.get(port + "household/active/list", data);
}

// 发布社区活动
export function activeAdd(data) {
	return http.post(port + "property/active/push", data);
}

// 上传图片
export function upload(data) {
	return http.post(port + "household/pic/upload", data);
}


// 采购记录列表（全部）
export function getPurchaseList(params) {
	return http.get(port + "/property/purchase/list", params);
}
// 采购记录(分类)
export function getPurchaseListByState(params) {
	return http.get(port + "/property/purchase/" + params.state, params);
}
// 物业采购
export function addPurchase(data) {
	return http.post(port + "/property/purchase/add", data)
}

export function getRepairList(param) {
	return http.get(port + '/property/repair/list', param)
}

export function getRepairDetail(id) {
	return http.get(port + '/property/repair/' + id)
}

export function replyRepair(param) {
	return http.post(port + '/property/repair/result', param)
}
// 投诉列表
export function getComplainList(param) {
	return http.get(port + '/property/complain/list', param)
}

// 投诉详情
export function complainDetail(param) {
	return http.get(port + '/property/complain/' + param)
}

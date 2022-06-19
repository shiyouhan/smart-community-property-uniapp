import http from "@/lib/http";

const port = "8083/api"

// 获取上架商品列表
export function groundGoods(data) {
	return http.get(port + "/fleaMarket/groundGoods", data);
}

// 获取下架商品列表
export function banGoods(data) {
	return http.get(port + "/fleaMarket/banGoods", data);
}

//获取跳蚤商品信息
export function getDetail(id){
	return http.get(port + "/fleaMarket/"+id );
}

//管理员下架商品
export function postBan(id){
	return http.post(port + "/fleaMarket/ban/"+id );
}

//下架商品再上架
export function postGround(id){
	return http.post(port + "/fleaMarket/ground/"+id );
}
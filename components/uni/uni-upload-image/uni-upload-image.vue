<template>
    <view class="px-2">
        <view class="uni-uploader" v-if="show">
            <!-- <view class="uni-uploader-head">
                <view class="uni-uploader-title">点击可预览图片</view>
                <view class="uni-uploader-info">{{imageList.length}}/9</view>
            </view> -->
            <view class="uni-uploader-body">
                <view class="uni-uploader__files">
                    <block v-for="(image,index) in imageList" :key="index">
                        <view class="uni-uploader__file relative">
                            <image class="uni-uploader__img rounded" 
                            :src="image" :data-src="image" mode="aspectFill"
                                @tap.stop="previewImage"></image>
                                <view class="bg-neutral opacity-60 absolute top-0 right-0 px-1 rounded"
                                    @tap="deleteImage(index)">
                                    <text class="iconfont icon-shanchu text-blue"></text>
                                </view>
                        </view>
                    </block>
                    <view class="uni-uploader__input-box">
                        <view class="uni-uploader__input" @tap="chooseImage"></view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
    import permision from "@/common/permission.js"
    var sourceType = [
        ['camera'],
        ['album'],
        ['camera', 'album']
    ]
    var sizeType = [
        ['compressed'],
        ['original'],
        ['compressed', 'original']
    ]
    export default {
        props: {
            list: {
                type: Array
            },
            show: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                title: 'choose/previewImage',
                // 图片地址数组
                imageList: [],
                // 文件数组
                fileList: [],
                sourceTypeIndex: 2,
                sourceType: ['拍照', '相册', '拍照或相册'],
                sizeTypeIndex: 2,
                sizeType: ['压缩', '原图', '压缩或原图'],
                countIndex: 8,
                count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
            }
        },
        created() {
            console.log('进入组件');
            this.imageList = this.list;
            console.log(this.list);
        },
        onUnload() {
            this.imageList = [],
            this.fileList = [],
                this.sourceTypeIndex = 2,
                this.sourceType = ['拍照', '相册', '拍照或相册'],
                this.sizeTypeIndex = 2,
                this.sizeType = ['压缩', '原图', '压缩或原图'],
                this.countIndex = 8;
        },
        methods: {
            // 删除图片
            deleteImage(index) {
                uni.showModal({
                    title: '提示',
                    content: '是否要删除该图片？',
                    showCancel: true,
                    cancelText: '不删除',
                    confirmText: '删除',
                    success: (res) => {
                        if (res.confirm) {
                            this.imageList.splice(index, 1);
                            this.$emit('change', this.imageList);
                        }
                    }
                })
            },
            // 选择图片
            chooseImage: async function() {
                // #ifdef APP-PLUS
                // TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
                if (this.sourceTypeIndex !== 2) {
                    let status = await this.checkPermission();
                    if (status !== 1) {
                        return;
                    }
                }
                // #endif

                if (this.imageList.length === 9) {
                    let isContinue = await this.isFullImg();
                    console.log("是否继续?", isContinue);
                    if (!isContinue) {
                        return;
                    }
                }
                uni.chooseImage({
                    sourceType: sourceType[this.sourceTypeIndex],
                    sizeType: sizeType[this.sizeTypeIndex],
                    count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList
                        .length : this.count[this.countIndex],
                    success: (res) => {
                        this.imageList = this.imageList.concat(res.tempFilePaths);
                        this.fileList = this.fileList.concat(res.tempFiles);
                        let uploadFiles = {
                            src: this.imageList,
                            file: this.fileList
                        }
                        // 通知父组件（write页面）
                        this.$emit('change', uploadFiles);
                    },
                    fail: (err) => {
                        console.log("err: ", err);
                        // #ifdef APP-PLUS
                        if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
                            this.checkPermission(err.code);
                        }
                        // #endif
                        // #ifdef MP
                        if (err.errMsg.indexOf('cancel') !== '-1') {
                            return;
                        }
                        uni.getSetting({
                            success: (res) => {
                                let authStatus = false;
                                switch (this.sourceTypeIndex) {
                                    case 0:
                                        authStatus = res.authSetting['scope.camera'];
                                        break;
                                    case 1:
                                        authStatus = res.authSetting['scope.album'];
                                        break;
                                    case 2:
                                        authStatus = res.authSetting['scope.album'] && res
                                            .authSetting['scope.camera'];
                                        break;
                                    default:
                                        break;
                                }
                                if (!authStatus) {
                                    uni.showModal({
                                        title: '授权失败',
                                        content: 'Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
                                        success: (res) => {
                                            if (res.confirm) {
                                                uni.openSetting()
                                            }
                                        }
                                    })
                                }
                            }
                        })
                        // #endif
                    }
                })
            },
            isFullImg: function() {
                return new Promise((res) => {
                    uni.showModal({
                        content: "已经有9张图片了,是否清空现有图片？",
                        success: (e) => {
                            if (e.confirm) {
                                this.imageList = [];
                                this.fileList = [];
                                res(true);
                            } else {
                                res(false)
                            }
                        },
                        fail: () => {
                            res(false)
                        }
                    })
                })
            },
            previewImage: function(e) {
                var current = e.target.dataset.src
                uni.previewImage({
                    current: current,
                    urls: this.imageList
                })
            },
            async checkPermission(code) {
                let type = code ? code - 1 : this.sourceTypeIndex;
                let status = permision.isIOS ? await permision.requestIOS(sourceType[type][0]) :
                    await permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' :
                        'android.permission.READ_EXTERNAL_STORAGE');

                if (status === null || status === 1) {
                    status = 1;
                } else {
                    uni.showModal({
                        content: "没有开启权限",
                        confirmText: "设置",
                        success: function(res) {
                            if (res.confirm) {
                                permision.gotoAppSetting();
                            }
                        }
                    })
                }

                return status;
            }
        }
    }
</script>

<style>
    .cell-pd {
        padding: 22rpx 30rpx;
    }

    .list-pd {
        margin-top: 50rpx;
    }
    
    /* 上传 */
    .uni-uploader {
    	flex: 1;
    	flex-direction: column;
    }
    .uni-uploader-head {
    	display: flex;
    	flex-direction: row;
    	justify-content: space-between;
    }
    .uni-uploader-info {
    	color: #B2B2B2;
    }
    .uni-uploader-body {
    	/* margin-top: 16upx; */
    }
    .uni-uploader__files {
    	display: flex;
    	flex-direction: row;
    	flex-wrap: wrap;
    }
    .uni-uploader__file {
    	margin: 10upx;
    	width: 210upx;
    	height: 210upx;
    }
    .uni-uploader__img {
    	display: block;
    	width: 210upx;
    	height: 210upx;
    }
    .uni-uploader__input-box {
    	position: relative;
    	margin:10upx;
    	width: 208upx;
    	height: 208upx;
    	border: 2upx solid #D9D9D9;
        background-color: #e6e6e6;
    }
    .uni-uploader__input-box:before,
    .uni-uploader__input-box:after {
    	content: " ";
    	position: absolute;
    	top: 50%;
    	left: 50%;
    	-webkit-transform: translate(-50%, -50%);
    	transform: translate(-50%, -50%);
    	background-color: #888888;
    }
    .uni-uploader__input-box:before {
    	width: 12upx;
    	height: 82upx;
    }
    .uni-uploader__input-box:after {
    	width: 82upx;
    	height: 12upx;
    }
    .uni-uploader__input-box:active {
    	border-color: #999999;
    }
    .uni-uploader__input-box:active:before,
    .uni-uploader__input-box:active:after {
    	background-color: #999999;
    }
    .uni-uploader__input {
    	position: absolute;
    	z-index: 1;
    	top: 0;
    	left: 0;
    	width: 100%;
    	height: 100%;
    	opacity: 0;
    }
    
    .uni-uploader__file {
    	margin: 10upx;
    	width: 202upx;
    	height: 202upx;
    }
    .uni-uploader__img {
        display: block;
        width: 202upx;
        height: 202upx;
    }
    
    .uni-uploader__input-box {
    	position: relative;
    	margin:10upx;
    	width: 202upx;
    	height: 202upx;
    	border: none;
        background-color: #e6e6e6;
    }
</style>

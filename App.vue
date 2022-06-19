<script>
    import http from "@/lib/http";
    export default {
        onLaunch: function() {
            plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
                    console.log(JSON.stringify(wgtinfo));
                    // 应用版本号
                    console.log("wgtinfo.version");
                    console.log(wgtinfo.version);
                    let platform = uni.getSystemInfoSync().platform
                    console.log("platform")
                    console.log(platform)
                    this.$http.get("/version?platform=" + platform, "http://106.14.169.149:8081/api").then((
                        res) => {
                            console.log(res)
                            const tourl = res.data.url
                            // 如果当前版本比 最低版本要低 必须强制更新
                            let result1 = versionStringCompare(wgtinfo.version, res.data.minimumVersion);
                            console.log(result1);
                            if (result1 === -1) {
                                uni.showModal({
                                    title: '提示',
                                    content: '新版发布啦, 必须要更新哦！',
                                    showCancel: false,
                                    confirmText: '去更新',
                                    success() {
                                        plus.runtime.openURL(tourl);
                                    }
                                });
                            }
                            // 如果当前版本 是在 最新版本和最低版本 之间 
                            // 先判断 后台是否强制更新
                            // 在提示 可以更新
                            let result2 = versionStringCompare(wgtinfo.version, res.data.latestVersion);
                            console.log(result2);
                            // 重大bug修复
                            if (result2 === -1 && result1 === 1) {
                                if (res.data.forceUpdate === '强制更新') {
                                    uni.showModal({
                                        title: '提示',
                                        content: '新版发布啦, 必须要更新哦！',
                                        showCancel: false,
                                        confirmText: '去更新',
                                        success() {
                                            plus.runtime.openURL(tourl);
                                        }
                                    });
                                } else {
                                    uni.showModal({
                                        title: '提示',
                                        content: res.data.description,
                                        showCancel: true,
                                        confirmText: '去更新',
                                        success() {
                                            plus.runtime.openURL(tourl);
                                        }
                                    });
                                }
                            }
                        })

                }),
                console.log('App Launch')
        },
        onShow: function() {
            console.log('App Show')
        },
        onHide: function() {
            console.log('App Hide')
        }
    }

    export const versionStringCompare = (preVersion = '', lastVersion = '') => {
        var sources = preVersion.split('.');
        var dests = lastVersion.split('.');
        var maxL = Math.max(sources.length, dests.length);
        var result = 0;
        for (let i = 0; i < maxL; i++) {
            let preValue = sources.length > i ? sources[i] : 0;
            let preNum = isNaN(Number(preValue)) ? preValue.charCodeAt() : Number(preValue);
            let lastValue = dests.length > i ? dests[i] : 0;
            let lastNum = isNaN(Number(lastValue)) ? lastValue.charCodeAt() : Number(lastValue);
            if (preNum < lastNum) {
                result = -1;
                break;
            } else if (preNum > lastNum) {
                result = 1;
                break;
            }
        }
        return result;
    }
</script>

<style lang="scss">
    @import "@/common/base.css";
    @import "@/common/common.scss";
    @import "@/common/icon.css";
    @import "@/common/other.scss";


    page {
        background-color: $uni-bg-color-grey;
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .nav {
        width: 100%;
        height: 80rpx;
        background-color: $uni-color-error;
        font-size: 28rpx;
        color: #FFFFFF;
        text-align: center;
        line-height: 80rpx;
    }

    .status_bar {
        height: var(--status-bar-height);
        width: 100%;
        background-color: $uni-color-error;
    }
</style>

<template>
    <view>
        <view class="w-100 flex align-center">
            <view v-for="(item, index) in tabBars" class="py-2 width-50 flex align-center justify-center u-rela mx-8"
                :key="index" :class="tabIndex === index ? 'text-theme line' : ''" @tap="changeTab(index)">
                {{item.name}}
            </view>
        </view>

        <divider></divider>
        <swiper class="swiper" :current="tabIndex" :disable-touch='true'>
            <swiper-item>
                <scroll-view class="swiper" :scroll-y="true" @scrolltolower="loadMore(1)">
                    <communication-list :list="list" @changeStatus="changeStatus"></communication-list>
                </scroll-view>
            </swiper-item>
            <swiper-item>
                <scroll-view class="swiper" :scroll-y="true" @scrolltolower="loadMore(0)">
                    <communication-list :list="list" @changeStatus="changeStatus"></communication-list>
                </scroll-view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
    import communicationList from "@/components/common/communication-list.vue"
    import {
        getList
    } from '@/api/community'
    export default {
        components: {
            communicationList
        },
        data() {
            return {
                tabIndex: 0,
                // 顶部选项卡
                tabBars: [{
                        name: "已上架"
                    },
                    {
                        name: "已下架"
                    }
                ],
                list: [],
                index: 1,
                size: 6,
                status: 1,
                more: true
            };
        },
        onLoad() {
            uni.getSystemInfo({
                success: res => {
                    this.scrollH = res.windowHeight - uni.upx2px(101);
                }
            });
            setTimeout(function() {}, 1000);
            uni.startPullDownRefresh();
            this.loadData();
        },
        onNavigationBarButtonTap(e) {
            uni.navigateTo({
                url: '../search/search'
            })
        },
        // 下拉刷新，要将当前页码重置为1，more属性回归成true
        onPullDownRefresh() {
            this.index = 1;
            this.more = true;
            this.loadData()
            // 1秒没下拉复原
            setTimeout(function() {
                uni.stopPullDownRefresh();
            }, 1000);
        },
        methods: {
            changeTab(index) {
                if (this.tabIndex === index) {
                    return;
                }
                this.tabIndex = index
                this.status = Number(!this.tabIndex)
                // 切换的时候关于分页加载的要初始化
                this.index = 1
                this.more = true
                this.loadData()
            },
            async loadData() {
                let param = {
                    Index: this.index,
                    size: this.size,
                    status: this.status
                }
                const res = await getList(param)
                if (res.code === 200) {
                    res.data = res.data.map((e) => {
                        e.banner = e.banner.substr(1).substring(0, e.banner.length - 2).split(',')[0]
                        e.status = this.status
                        return e
                    })
                    this.list = res.data
                }
            },
            loadMore(e) {
                if (!this.more) {
                    uni.showToast({
                        title: '已经是底部了',
                        duration: 1000
                    });
                    return false;
                }
                this.index = this.index + 1;
                uni.showLoading({
                    title: '加载中'
                });
                let param = {
                    Index: this.index,
                    size: this.size,
                    status: e
                }
                getList(param).then(res => {
                    setTimeout(() => {
                        uni.hideLoading();
                    }, 100);
                    res.data = res.data.map((e) => {
                        e.banner = e.banner.substr(1).substring(0, e.banner.length - 2).split(',')[0]
                        e.status = this.status
                        return e
                    })
                    this.list = this.list.concat(res.data);
                    if (res.data.length < this.size && this.index > 0) {
                        this.more = false;
                    }
                });
            },
            changeStatus(e) {
                if (e.type === '下架') {
                    this.status = 1
                    this.loadData()
                } else if (e.type === '上架') {
                    this.status = 0
                    this.loadData()
                }
            }
        }
    }
</script>

<style lang="scss">

</style>

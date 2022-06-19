<template>
    <view>
        <view v-for="(item, index) in data" :key="index">
            <view class="bg-white flex flex-column mx-2 u-p-19 rounded">
                <view class="flex">
                    <view class="u-p-r-24">
                        <image :src="item.avatar" class="w-44 rounded-44"></image>
                    </view>
                    <view class="u-font-16 flex justify-center flex-column">
                        <view class="u-p-b-12">{{ item.username }}</view>
                        <view class="text-grey u-font-14">{{ item.expiresDays }}天前</view>
                    </view>
                </view>
                <view class="u-font-16 u-p-t-19">{{ item.content }}</view>
                <view class="py-2 w-100 u-h-288 overflow-hidden">
                    <image :src="item.banner" class="w-100" mode="aspectFill" style="margin: 0 auto;"></image>
                </view>
                <view class="flex justify-end mt-2">
                    <view class="flex align-center">
                        <block v-if="item.status === 1">
                            <text class="text-white bg-theme u-h-40 u-font-14 px-2 u-line-22"
                                @tap="changeStatus(item, '下架')">下架</text>
                        </block>
                        <block v-else-if="item.status === 0">
                            <text class="text-white bg-theme u-h-40 u-font-14 px-2 u-line-22"
                                @tap="changeStatus(item, '上架')">上架</text>
                        </block>
                    </view>
                </view>
            </view>
            <divider></divider>
        </view>
    </view>
</template>

<script>
    import {
        doDown,
        doUp
    } from '@/api/community'
    import config from '@/lib/config.js'
    export default {
        props: {
            list: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {}
        },
        computed: {
            data() {
                return this.list.map(e => {
                    e.expiresDays = this.moment().diff(this.moment(e.createTime), 'days')
                    return e
                })
            }
        },
        methods: {
            changeStatus(e, type) {
                let url = ''
                if (e.status === 1) {
                    url = '/community/update'
                    this.sendFormData(e, url, type)
                } else if (e.status === 0) {
                    url = '/community/change'
                    this.sendFormData(e, url, type)
                }
            },
            sendFormData(e, url, type) {
                uni.uploadFile({
                    url: config.baseUrl + '8082/api' + url,
                    files: [],
                    header: {
                        'token': uni.getStorageSync('token'),
                    },
                    formData: {
                        id: e.id
                    },
                    success: (res) => {
                        let info = ''
                        let param = {}
                        if (e.status === 1) {
                            info = '下架成功！'
                        } else if (e.status === 0) {
                            info = '上架成功！'
                        }
                        param = {
                            type
                        }
                        this.$msg.toast(info, 'suc')
                        this.$emit('changeStatus', param)
                    }
                })
            }
        }
    }
</script>

<style>
</style>

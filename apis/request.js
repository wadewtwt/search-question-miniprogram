import store from '../store'

const baseUrl = 'https://soutiapi.xxx.net';

let errModal = false

const request = ({ url, header, method = 'GET', data }) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseUrl + url,
            header: {
                ...{
                    'Authorization': store.getters['token'] || ''
                }, ...header
            },
            method,
            data,
            success: (res) => {
                if (res.data.code == 200) {
                    resolve(res.data)
                } else if (res.data.code == -99) {
                    console.log(store);
                    if (store.getters['token']) {
                        if (errModal) return
                        errModal = true
                        wx.showModal({
                            title: '提示',
                            content: '登录信息已过期，点击确定重新登录',
                            success(res) {
                                if (res.confirm) {
                                    store.commit('user/token', '')

                                    store.commit('user/baseInfo', {
                                        avatar: ""
                                    })
                                    store.commit('user/isLogin', false)
                                    
                                    store.commit('user/details', {})
                                    store.commit('user/isCertified', false)
                                    wx.switchTab({
                                        url: '/pages/personal-center/index'
                                    })
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }
                                wx.clearStorageSync()
                                errModal = false
                            }
                        })
                    } else {
                        if (errModal) return
                        errModal = true
                        wx.showModal({
                            title: '提示',
                            content: '您还未登录，登录并完善个人信息后解锁所有功能',
                            success(res) {
                                if (res.confirm) {
                                    store.commit('user/token', '')

                                    store.commit('user/baseInfo', {
                                        avatar: ""
                                    })
                                    store.commit('user/isLogin', false)
                                    store.commit('user/details', {})
                                    store.commit('user/isCertified', false)
                                    wx.switchTab({
                                        url: '/pages/personal-center/index'
                                    })
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }
                                wx.clearStorageSync()
                                errModal = false
                            }
                        })
                    }

                } else if (res.data.code == 200018) {
                    if (errModal) return
                    errModal = true
                    wx.showModal({
                        title: '提示',
                        content: res.data.msg,
                        success(res) {
                            if (res.confirm) {
                                wx.navigateTo({
                                    url: '/authentication/undone'
                                })
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                            errModal = false
                        }
                    })
                    reject(new Error(res.data.msg || 'Error'))
                } else {
                    reject(new Error(res.data.msg || 'Error'))
                }

            }
        });
    })
}
export default request
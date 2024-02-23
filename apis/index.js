const baseUrl = 'https://soutiapi.xxx.net';
import store from '../store'
import request from './request'

export default {
    // personalCenter() {
    //     return new Promise((resolve, reject) => {
    //         wx.request({
    //             url: baseUrl + '/api/frontend/user/personalCenter',
    //             header: {
    //                 'Authorization': store.getters['token']
    //             },
    //             success: (res) => {
    //                 resolve(res.data)
    //             }
    //         });
    //     })
    // },
    personalCenter() {
        return request({
            url: '/api/frontend/user/personalCenter'
        })
    },
    // personalInfo() {
    //     return new Promise((resolve, reject) => {
    //         wx.request({
    //             url: baseUrl + '/api/frontend/user/personalInfo',
    //             header: {
    //                 'Authorization': store.getters['token']
    //             },
    //             success: (res) => {
    //                 resolve(res.data)
    //             }
    //         });
    //     })
    // },
    personalInfo() {
        return request({
            url: '/api/frontend/user/personalInfo'
        })
    },
    // dictionary(type) {
    //     return new Promise((resolve, reject) => {
    //         wx.request({
    //             url: baseUrl + '/api/frontend/dictionary/info',
    //             header: {
    //                 'Authorization': store.getters['token']
    //             },
    //             method: 'POST',
    //             data: {
    //                 type
    //             },
    //             success: (res) => {
    //                 resolve(res.data)
    //             }
    //         });
    //     })
    // },
    dictionary(type) {
        return request({
            url: '/api/frontend/dictionary/info',
            method: 'POST',
            data: {
                type
            }
        })
    },
    searchCategory(name) {
        return request({
            url: '/api/frontend/dictionary/searchCategory',
            method: 'POST',
            data: {
                name
            }
        })
    },
    // updatePersonalInfo(data) {
    //     return new Promise((resolve, reject) => {
    //         wx.request({
    //             url: baseUrl + '/api/frontend/user/updatePersonalInfo',
    //             header: {
    //                 'Authorization': store.getters['token']
    //             },
    //             method: 'POST',
    //             data,
    //             success: (res) => {
    //                 resolve(res.data)
    //             }
    //         });
    //     })
    // },
    updatePersonalInfo(data) {
        return request({
            url: '/api/frontend/user/updatePersonalInfo',
            method: 'POST',
            data
        })
    },
    searchQuestion(tempFilePath) {
        return new Promise((resolve, reject) => {
            wx.uploadFile({
                url: baseUrl + '/api/frontend/question/searchQuestion',
                header: {
                    'Authorization': store.getters['token']
                },
                filePath: tempFilePath,
                name: 'img_file',
                formData: {
                },
                success(res) {
                    resolve(JSON.parse(res.data))
                }
            })
        })
    },
    // searchQuestionByTxt(data) {
    //     return new Promise((resolve, reject) => {
    //         wx.request({
    //             url: baseUrl + '/api/frontend/question/searchQuestionByTxt',
    //             header: {
    //                 'Authorization': store.getters['token']
    //             },
    //             method: 'POST',
    //             data,
    //             success: (res) => {
    //                 resolve(res.data)
    //             }
    //         });
    //     })
    // },
    searchQuestionByTxt(data) {
        return request({
            url: '/api/frontend/question/searchQuestionByTxt',
            method: 'POST',
            data
        })
    },
    // questionDetail(data) {
    //     return new Promise((resolve, reject) => {
    //         wx.request({
    //             url: baseUrl + '/api/frontend/question/questionDetail',
    //             header: {
    //                 'Authorization': store.getters['token']
    //             },
    //             method: 'POST',
    //             data,
    //             success: (res) => {
    //                 resolve(res.data)
    //             }
    //         });
    //     })
    // },
    questionDetail(data) {
        return request({
            url: '/api/frontend/question/questionDetail',
            method: 'POST',
            data
        })
    },
    // documentList(data) {
    //     return new Promise((resolve, reject) => {
    //         wx.request({
    //             url: baseUrl + '/api/frontend/document/list',
    //             header: {
    //                 'Authorization': store.getters['token']
    //             },
    //             method: 'POST',
    //             data,
    //             success: (res) => {
    //                 resolve(res.data)
    //             }
    //         });
    //     })
    // },
    documentList(data) {
        return request({
            url: '/api/frontend/document/list',
            method: 'POST',
            data
        })
    },
    // listYear(data) {
    //     return new Promise((resolve, reject) => {
    //         wx.request({
    //             url: baseUrl + '/api/frontend/document/listYear',
    //             header: {
    //                 'Authorization': store.getters['token']
    //             },
    //             method: 'POST',
    //             data,
    //             success: (res) => {
    //                 resolve(res.data)
    //             }
    //         });
    //     })
    // },
    listYear(data) {
        return request({
            url: '/api/frontend/document/listYear',
            method: 'POST',
            data
        })
    },
    // /api/frontend/document/collect
    // documentCollect(document_id) {
    //     return new Promise((resolve, reject) => {
    //         wx.request({
    //             url: baseUrl + '/api/frontend/document/collect',
    //             header: {
    //                 'Authorization': store.getters['token']
    //             },
    //             method: 'POST',
    //             data: {
    //                 document_id
    //             },
    //             success: (res) => {
    //                 resolve(res.data)
    //             }
    //         });
    //     })
    // },
    documentCollect(document_id) {
        return request({
            url: '/api/frontend/document/collect',
            method: 'POST',
            data: {
                document_id
            }
        })
    },
    // /api/frontend/question/collect
    // questionCollect(question_id) {
    //     return new Promise((resolve, reject) => {
    //         wx.request({
    //             url: baseUrl + '/api/frontend/question/collect',
    //             header: {
    //                 'Authorization': store.getters['token']
    //             },
    //             method: 'POST',
    //             data: {
    //                 question_id
    //             },
    //             success: (res) => {
    //                 resolve(res.data)
    //             }
    //         });
    //     })
    // },
    questionCollect(question_id) {
        return request({
            url: '/api/frontend/question/collect',
            method: 'POST',
            data: {
                question_id
            }
        })
    },
    // /api/frontend/user/checkIdentity
    // checkIdentity(data) {
    //     return new Promise((resolve, reject) => {
    //         wx.request({
    //             url: baseUrl + '/api/frontend/user/checkIdentity',
    //             header: { 'content-type': 'application/x-www-form-urlencoded' },
    //             method: 'POST',
    //             data: {
    //                 "encryptedData": data.encryptedData,
    //                 "signature": data.signature,
    //                 "rawData": data.rawData,
    //                 "iv": data.iv,
    //                 "code": data.code
    //             },
    //             success: (res) => {
    //                 resolve(res.data)
    //             }
    //         });
    //     })
    // },
    checkIdentity(data) {
        return request({
            url: '/api/frontend/user/checkIdentity',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            data
        })
    },

    // /api/frontend/userScan/scanList
    // scanList(data) {
    //     return new Promise((resolve, reject) => {
    //         wx.request({
    //             url: baseUrl + '/api/frontend/userScan/scanList',
    //             header: {
    //                 'Authorization': store.getters['token']
    //             },
    //             method: 'POST',
    //             data,
    //             success: (res) => {
    //                 resolve(res.data)
    //             }
    //         });
    //     })
    // },
    scanList(data) {
        return request({
            url: '/api/frontend/userScan/scanList',
            method: 'POST',
            data
        })
    },
    // /api/frontend/collect/collectList
    // collectList(data) {
    //     return new Promise((resolve, reject) => {
    //         wx.request({
    //             url: baseUrl + '/api/frontend/collect/collectList',
    //             header: {
    //                 'Authorization': store.getters['token']
    //             },
    //             method: 'POST',
    //             data,
    //             success: (res) => {
    //                 resolve(res.data)
    //             }
    //         });
    //     })
    // },
    collectList(data) {
        return request({
            url: '/api/frontend/collect/collectList',
            method: 'POST',
            data
        })
    },
    // {{host}}/api/frontend/document/geDocumentUrl
    // geDocumentUrl(document_id) {
    //     return new Promise((resolve, reject) => {
    //         wx.request({
    //             url: baseUrl + '/api/frontend/document/geDocumentUrl',
    //             header: {
    //                 'Authorization': store.getters['token']
    //             },
    //             method: 'POST',
    //             data: {
    //                 document_id
    //             },
    //             success: (res) => {
    //                 resolve(res.data)
    //             }
    //         });
    //     })
    // }
    geDocumentUrl(document_id) {
        return request({
            url: '/api/frontend/document/geDocumentUrl',
            method: 'POST',
            data: {
                document_id
            }
        })
    },
    listMyCategory() {
        return request({
            url: '/api/frontend/userCategory/listMyCategory',
            method: 'POST'
        })
    },
    saveMyCategory(ids) {
        return request({
            url: '/api/frontend/userCategory/saveMyCategory',
            method: 'POST',
            data: {
                ids
            }
        })
    },
    shareRecord() {
        return request({
            url: '/api/frontend/user/shareRecord',
            method: 'POST'
        })
    },
    //api/frontend/document/scan
    documentScan(document_id) {
        return request({
            url: '/api/frontend/document/scan',
            method: 'POST',
            data: {
                document_id
            }
        })
    },
    questionFeedback(question_txt) {
        return request({
            url: '/api/frontend/question/feedback',
            method: 'POST',
            data: {
                question_txt
            }
        })
    },
    bannerList() {
        return request({
            url: '/api/frontend/banner/indexList',
            method: 'POST'
        })
    },
    share(data) {
        return request({
            url: '/api/frontend/userShare/share',
            method: 'POST',
            data
        })
    },
    shareSuccess(data){
        return request({
            url: '/api/frontend/userShare/shareSuccess',
            method: 'POST',
            data
        })
    }
}
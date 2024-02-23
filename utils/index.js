import apis from "$apis/index.js";

export function queryParams(data, isPrefix) {
    isPrefix = isPrefix ? isPrefix : false;
    let prefix = isPrefix ? "?" : "";
    let _result = [];
    for (let key in data) {
        let value = data[key];
        // 去掉为空的参数
        if (["", undefined, null].includes(value)) {
            continue;
        }
        if (value.constructor === Array) {
            value.forEach((_value) => {
                _result.push(
                    encodeURIComponent(key) + "[]=" + encodeURIComponent(_value)
                );
            });
        } else {
            _result.push(
                encodeURIComponent(key) + "=" + encodeURIComponent(value)
            );
        }
    }

    return _result.length ? prefix + _result.join("&") : "";
}

export function share(res) {
    console.log(queryParams(res.target.dataset));
    var type = res.target.dataset.type

    if (type) {
        if (type == 'document') {
            const promise = apis.share({
                did: res.target.dataset.id
            }).then(rs => {
                return {
                    title: "快来看看这份paper",
                    path: "/share/view?" + queryParams(res.target.dataset) + '&share_token=' + rs.data.share_token,
                    imageUrl: "/static/img/home_banner.png",
                }
            })
            return {
                title: "快来看看这份paper",
                path: "/share/view?" + queryParams(res.target.dataset),
                imageUrl: "/static/img/home_banner.png",
                promise
            };
        } else if (type == 'question') {
            const promise = apis.share({
                qid: res.target.dataset.id
            }).then(rs => {
                return {
                    title: "快来看看这道题",
                    path: "/share/view?" + queryParams(res.target.dataset) + '&share_token=' + rs.data.share_token,
                    imageUrl: "/static/img/home_banner.png",
                }
            })
            return {
                title: "快来看看这道题",
                path: "/share/view?" + queryParams(res.target.dataset),
                imageUrl: "/static/img/home_banner.png",
                promise
            };
        }
    }

}
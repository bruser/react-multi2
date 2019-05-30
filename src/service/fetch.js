import {
    baseUrl,
    djqUserPubData
} from 'env'
import Promise from 'es6-promise';
Promise.polyfill();
export const fetch = (url = '', data = {}, type = 'GET') => {
    type = type.toUpperCase();
    url = baseUrl + url;
    let token = "";
    if (data.access_token) {
        token = data.access_token;
    }
    return new Promise((resolve, reject) => {
        let headers = { 'Access-Token': token };
        if (type === 'POST') {
            headers['Content-Type'] = 'application/json;charset=utf-8';
            data = JSON.stringify(data);
        }
        $.ajax({
            url: url,
            data: data,
            type: type,
            crossDomain: true,
            headers: headers,
            success: function (result) {
                if (result.code) {
                    if (result.code === 200) {
                        resolve(result.data);
                    } else {
                        reject(result);
                    }
                } else {
                    if (!result.error_code || result.error_code === 'REP000') {
                        resolve(result);
                    } else {
                        reject({ code: 405, data: result });
                    }
                }
            },
            error: function (err) {
                reject(err);
            }
        });
    });
};
export const fileUpload = (url = "", base64Codes = "") => {
    return new Promise((resolve, reject) => {
        let formData = new FormData(document.forms[0]); //这里连带form里的其他参数也一起提交了,如果不需要提交其他参数可以直接FormData无参数的构造函数
        //convertBase64UrlToBlob函数是将base64编码转换为Blob
        formData.append("file", convertBase64UrlToBlob(base64Codes)); //append函数的第一个参数是后台获取数据的参数名,和html标签的input的name属性功能相同
        let xmlHttpReq = null;
        //IE浏览器使用ActiveX
        if (window.ActiveXObject) {
            xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
        //其它浏览器使用window的子对象XMLHttpRequest
        else if (window.XMLHttpRequest) {
            xmlHttpReq = new XMLHttpRequest();
        }
        if (xmlHttpReq !== null) {
            //设置回调，当请求的状态发生变化时，就会被调用
            xmlHttpReq.onreadystatechange = () => {
                //等待上传结果
                // if (xmlHttpReq.readyState == 1) {
                //   filenode.parentNode.style.backgroundImage = "url('/images/bigloader.gif')";
                // }
                // 上传成功，返回的文件名，设置到div的背景中
                if (xmlHttpReq.readyState === 4 && xmlHttpReq.status === 200) {
                    let data = {};
                    try {
                        data = JSON.parse(xmlHttpReq.responseText);
                        if (data.code === 200) {
                            resolve(data.data);
                        }
                    } catch (e) {
                        reject({ code: 407, data: "数据类型出错" });
                        myTips("warning", "图片上传失败")
                    }
                }
            };
            //设置请求（没有真正打开），true：表示异步
            xmlHttpReq.open("POST", baseUrl + url + "?access_token=", true);
            //不要缓存
            //xmlHttpReq.setRequestHeader("If-Modified-Since", "0");
            //提交请求
            xmlHttpReq.send(formData);
            //清除掉，否则下一次选择同样的文件就进入不到onchange函数中了
        }
    });
};
export const fileOSSUpload = (option, base64Codes = "") => {
    return new Promise((resolve, reject) => {
        let formData = new FormData(document.forms[0]); //这里连带form里的其他参数也一起提交了,如果不需要提交其他参数可以直接FormData无参数的构造函数
        //convertBase64UrlToBlob函数是将base64编码转换为Blob
        formData.append('key', option.key);
        formData.append('policy', option.policy);
        formData.append('OSSAccessKeyId', option.OSSAccessKeyId);
        formData.append('success_action_status', option.success_action_status);
        formData.append('signature', option.signature);
        formData.append("file", convertBase64UrlToBlob(base64Codes)); //append函数的第一个参数是后台获取数据的参数名,和html标签的input的name属性功能相同

        let xmlHttpReq = null;
        //IE浏览器使用ActiveX
        if (window.ActiveXObject) {
            xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
        //其它浏览器使用window的子对象XMLHttpRequest
        else if (window.XMLHttpRequest) {
            xmlHttpReq = new XMLHttpRequest();
        }
        if (xmlHttpReq !== null) {
            //设置回调，当请求的状态发生变化时，就会被调用
            xmlHttpReq.onreadystatechange = () => {
                //等待上传结果
                // if (xmlHttpReq.readyState == 1) {
                //   filenode.parentNode.style.backgroundImage = "url('/images/bigloader.gif')";
                // }
                // 上传成功，返回的文件名，设置到div的背景中
                if (xmlHttpReq.readyState === 4 && xmlHttpReq.status === 200) {
                    let data = {};
                    try {
                        data.code = 200;
                        // http://testuserdjqpubdata.oss-cn-hangzhou.aliyuncs.com/user/23558/signage/signage.jpg
                        // data = JSON.parse(xmlHttpReq.responseText);
                        if (xmlHttpReq.statusText == 'OK') {
                            resolve(data);
                        }
                        // if(data.code ===200){
                        //   resolve(data.data);
                        // }
                    } catch (e) {
                        reject({ code: 407, data: "数据类型出错" });
                        approach.myTips("warning", "图片上传失败");
                    }
                }
            };
            //设置请求（没有真正打开），true：表示异步
            xmlHttpReq.open("POST", djqUserPubData, true);
            //不要缓存
            //xmlHttpReq.setRequestHeader("If-Modified-Since", "0");
            //提交请求
            xmlHttpReq.send(formData);
            //清除掉，否则下一次选择同样的文件就进入不到onchange函数中了
        }
    });
};
function convertBase64UrlToBlob(urlData) {
    let bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte
    //处理异常,将ascii码小于0的转换为大于0
    let ab = new ArrayBuffer(bytes.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], { "type": "image/jpeg", "filename": "upload.jpg" });
}

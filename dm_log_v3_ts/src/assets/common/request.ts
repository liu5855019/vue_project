import axios  from "axios";
import * as tools from './tools';

const request = axios.create({
    baseURL: '/api',
    timeout: 5000
});

request.interceptors.request.use((config) => {
    config.headers["x-requestid"] = tools.Random(99999, 9999999);
    return config;
}, (error) => {
    return Promise.reject(error);
});

request.interceptors.response.use((response) => {
    if (response.status == 200) {
        // todo
    }
    return response;
}, (error) => {
    return Promise.reject(error);
});




// LogDota 

// request.get

// /LogDota/GetDeviceList

export function LogDotaGetDeviceList() {
    return request({
        url: "/LogDota/GetDeviceList",
        method: "GET"
    })
}

export function LogDotaGetGroupList(deviceId: string) {
    return request({
        url: "/LogDota/GetGroupListByDeviceId" + "?deviceId=" + deviceId,
        method: "GET"
    })
}


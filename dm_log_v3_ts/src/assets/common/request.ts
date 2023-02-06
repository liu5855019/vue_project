import axios  from "axios";

const request = axios.create({
    baseURL: '/api',
    timeout: 5000
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

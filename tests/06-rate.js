import { check } from "k6";
import http from "k6/http";
import { Rate, Trend } from "k6/metrics";

export let errorRate = new Rate('errors')


var getApiTrend = new Trend ("TREND_Get_Api_Duration");
var getApiTrendWaiting = new Trend ("TREND_Get_Api_Waiting");
var googleGetApiTrend = new Trend ("TREND_Google_Get_Api_Duration");
var googleGetApiTrendWaiting = new Trend ("TREND_Google_Get_Api_Waiting");

export let options = {
    thresholds:{
        errors: ['rate<0.5'] //10% de erro
    }
}

export default function(){
    let res = http.get('https://run.mocky.io/v3/f529e682-98ae-4aae-b8a9-15f15900d0c5');

    console.log(`response body length ${res.body.length} for VU =  ${__VU} ITERA = ${__ITER}`)
     
    const check1 = check(res, {
        'status in code 200': (r) => r.status === 200,
    });

    errorRate.add(!check1);

    const check2 = check(res, {
        'body size is 45 bytes :' : (r) => r.body.length == 45,
    });

    errorRate.add(!check2);

    getApiTrend.add(res.timings.duration)
    getApiTrendWaiting.add(res.timings.waiting)


    const googleResponse = http.get('https://www.google.com/')
    googleGetApiTrend.add(googleResponse.timings.duration)
    gooleGetApiTrendWaiting.add(googleResponse.timings.waiting)

}
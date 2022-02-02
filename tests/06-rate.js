import { check } from "k6";
import http from "k6/http";

export default function(){
    let res = http.get('https://run.mocky.io/v3/f529e682-98ae-4aae-b8a9-15f15900d0c5');
    // let res = http.get('https://webhook.site/aa09534e-ca8d-44dc-af32-035c48831abc');

    console.log(`response body length ${res.body.length} for VU =  ${__VU} ITERA = ${__ITER}`)
     
    check(res, {
        'status in code 200': (r) => r.status === 200,
        'body size is 45 bytes :' : (r) => r.body.length == 45,
    });
}
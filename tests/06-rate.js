import { check } from "k6";
import http from "k6/http";
import { Rate } from "k6/metrics";

export let errorRate = new Rate('errors')

export let options = {
    thresholds:{
        errors: ['rate<0.5'] //10% de erro
    }
}

export default function(){
    let res = http.get('https://run.mocky.io/v3/f529e682-98ae-4aae-b8a9-15f15900d0c5');
    // let res = http.get('https://webhook.site/aa09534e-ca8d-44dc-af32-035c48831abc');

    console.log(`response body length ${res.body.length} for VU =  ${__VU} ITERA = ${__ITER}`)
     
    const check1 = check(res, {
        'status in code 200': (r) => r.status === 200,
    });

    errorRate.add(!check1);

    const check2 = check(res, {
        'body size is 45 bytes :' : (r) => r.body.length == 5,
    });

    errorRate.add(!check2);
}
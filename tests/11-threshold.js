import http from "k6/http";
import { Rate } from "k6/metrics";

const failureRate = new Rate('failed requests')

export let options ={
    threasholds:{
        'failed requests' : ['rate<0.1'],
        'http_req_duration' : ['p(95)<001', 'p(99)<001']
    }
}

export default function() {
    let res= http.get('https://webhook.site/aa09534e-ca8d-44dc-af32-035c48831abc')

    failureRate.add(res.status !== 200)
}
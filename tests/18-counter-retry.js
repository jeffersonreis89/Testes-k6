import { Counter } from "k6/metrics";
import http from "k6/http";
import { sleep } from "k6";

import { Trend } from "k6/metrics";
var retryTrend = new Trend ('GETAPI_MAX_RETRY_TREND')

var retryCounter = new Counter("GetApi_Max_Retry");

export default function () {
    var maxAttemps = 5
  retryCounter.add(1);
  for (var retries = 5; retries > 0; retries++) {
      var numberOfAttempts = maxAttemps - retries + 1
      retryTrend.add(numberOfAttempts)
    const response = http.get(
      "https://run.mocky.io/v3/4b6daa06-74bb-4d34-b297-7eb798e2e95e"
    );
    if (response.status !== 404) {
      retryCounter.add(1);
      console.log(
        `response is not correct ${retries} VU=${__VU} ITER=${__ITER}`
      );

      sleep(1);
    } else {
      retries == 0;
    }
  }
}

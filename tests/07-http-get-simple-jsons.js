import http from "k6/http";
import { check } from "k6";

//https://run.mocky.io/v3/4b6daa06-74bb-4d34-b297-7eb798e2e95e

export default function () {
  var url = "https://run.mocky.io/v3/4b6daa06-74bb-4d34-b297-7eb798e2e95e";
  var headerParam = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = http.get(url, headerParam);

  check(response, {
      'is status is 200 ' : (r) => r.status === 200,
  });

  let body = JSON.parse(response.body)

  console.log(`response body is ${JSON.stringify(body)}`)
  console.log(`Message is ${body.Message}`)

  check(response, {
      'is Message is Sucess ' : (r) => JSON.parse(r.body).Message === "Data fetched successufully"
  })


}

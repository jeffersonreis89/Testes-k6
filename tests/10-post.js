//https://webhook.site/aa09534e-ca8d-44dc-af32-035c48831abc

import http from "k6/http";
import { check } from "k6";

export default function () {
  var url = "https://webhook.site/aa09534e-ca8d-44dc-af32-035c48831abc";
  var params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  var payload = JSON.stringify({
    name: "Jefferson Reis",
    email: "jefferson.reis@justa.com.vc",
    job: "QA",
    location: "SP"
  });

  let response = http.post(url, payload, params);


}

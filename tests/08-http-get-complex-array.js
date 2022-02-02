import http from "k6/http";
import { check } from "k6";

export default function () {
  var url = "https://run.mocky.io/v3/119dc2a6-23f8-4a13-b430-f4aa8510d1f4";
  var headerParam = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = http.get(url, headerParam);

  check(response, {
    "is status is 200 ": (r) => r.status === 200,
  });

  let body = JSON.parse(response.body);

  body.forEach(element => {
    console.log(`{name is ${element.name}`);

    
    element.forEach(elementArray => {
      console.log(`value of property array is ${elementArray}`);
    });
  });
}

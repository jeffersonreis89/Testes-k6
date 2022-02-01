import http from "k6/http";

export const options = {
  stages: [
    { duration: "10s", target: 5 },
    { duration: "20s", target: 3 },
    { duration: '20s', target: 0}
  ],

  vus: 10,
  duration: "1m3s"
};

export default function () {
  http.get("http://www.google.com");
}
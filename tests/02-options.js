import http from "k6/http";

export let options = {
  vus: 10,
  duaration: '10s'
}

export default function () {
  http.get("https://www.google.com/");
}
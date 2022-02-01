import http from "k6/http";

export const options = {
    stages : [
        {duration: 10, target: 2},
        {duration: 15, target: 5},
    ]
}


export default function(){
    http.get('https://run.mocky.io/v3/9a4572b9-2db8-47c4-93a1-ac9b5edeb25b');
}
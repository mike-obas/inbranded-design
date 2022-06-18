import axios from 'axios';
const instance = axios.create({
    baseURL:  "http://localhost:5000/inbranded-design/europe-west2/api"
    //baseURL:  "https://europe-west2-inbranded-design.cloudfunctions.net/api"
});
// Where you would set stuff like your 'Authorization' header, etc ...
//axios.defaults.headers.post['Content-Type'] = 'application/json';
export default instance;
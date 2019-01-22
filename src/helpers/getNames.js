import Axios from "axios";

export default cb => {
    Axios.get('http://localhost:8080/api/stock/names')
        .then(({ data }) => {
            cb(data);
        })
};
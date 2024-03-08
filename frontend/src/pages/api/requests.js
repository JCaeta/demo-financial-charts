import axios from "axios";
import * as https from 'https';

const url = "http://localhost:5000"

export async function getData(){
    const response = await axios.get(url + '/api/get-data');
    return response.data;
}

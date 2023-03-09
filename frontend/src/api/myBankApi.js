import axios from 'axios';
import { BASE_URL } from '../config';

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
}
});
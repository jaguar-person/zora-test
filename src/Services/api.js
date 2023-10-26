import Axios from 'axios';
import { api_url } from '../constant';

const axios = Axios.create({
	baseURL: api_url,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
	},
});

export const axiosPost = async(url, data)  => {
	try {
		const resp = await axios.post(url, data);
		return resp;
	} catch (error) {
		if (error.response.status === 401 || error.response.status === 419 ) {
			localStorage.removeItem('user');
			window.location.href = '/';
		}else{
			return error.response;
		}
	}
}

export const axiosGet = async(param)  => {
	try {
		const resp = await axios.get('', {params: param});
		return resp;
	} catch (error) {
		if (error.response.status === 401 || error.response.status === 419 ) {
			localStorage.removeItem('user');
			window.location.href = '/';
		}else{
			return error.response;
		}
	}
}

export default axios;
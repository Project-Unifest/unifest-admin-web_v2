import axios, { AxiosRequestConfig } from 'axios';

/** Axios Response 데이터 형식
 *  config : 요청에 대한 axios 구성 설정
 *  data 서버가 제공한 응답 데이터
 *  headers : 헤더 정보
 *  request : 요청
 *  status : 응답 HTTP 상태 코드
 *  statusText : 응답 HTTP 상태 메시지
 */

// 본인 서버에서 내려주는 응답 구조
interface APIResponse<T> {
	statusCode: number; // 상태코드 (보인 서버상태코드)
	errorCode: number; // 에러코드 (본인 서버에러코드)
	message: string; // 메시지
	result: T; // 데이터 내용
	timestamp: Date; // 시간
}

export const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_REACT_APP_API_ROOT,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const axiosAuthClient = axios.create({
	baseURL: import.meta.env.VITE_REACT_APP_API_ROOT,
	headers: {
		'Content-Type': 'application/json',
		Authorization: localStorage.getItem('accessToken'),
	},
});

axiosAuthClient.interceptors.response.use(
	(res) => res,
	(err) => {
		if (err.response && err.response.status === 401) {
			window.location.href = '/unifest-admin-web_v2/login';
		}
		return Promise.reject(err);
	},
);
export const getData = async <T>(
	url: string,
	config?: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
	try {
		const response = await axiosClient.get<APIResponse<T>>(url, config);
		return response.data;
	} catch (error) {
		throw error;
	}
};

//TODO: POST 메서드
export const postData = async <T>(
	url: string,
	data?: any,
	config?: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
	try {
		const response = await axiosClient.post<APIResponse<T>>(url, data, config);
		return response.data;
	} catch (error) {
		throw error;
	}
};

//TODO: PUT 메서드
export const putData = async <T>(
	url: string,
	data?: any,
	config?: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
	try {
		const response = await axiosClient.put<APIResponse<T>>(url, data, config);
		return response.data;
	} catch (error) {
		throw error;
	}
};

//TODO: Delete 메서드
export const deleteData = async <T>(
	url: string,
	config?: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
	try {
		const response = await axiosClient.delete<APIResponse<T>>(url, config);
		return response.data;
	} catch (error) {
		throw error;
	}
};

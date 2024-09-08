import { Axios, AxiosResponse } from 'axios';
import { axiosAuthClient } from './axios';

export const getMembers = async (role: string): Promise<AxiosResponse> => {
	try {
		return await axiosAuthClient.get(
			`${import.meta.env.VITE_REACT_APP_API_ROOT}/members`,
			{
				params: { role: role },
			},
		);
	} catch (error) {
		throw new Error('로그인에 실패하였습니다');
	}
};

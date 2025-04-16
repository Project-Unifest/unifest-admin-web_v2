import axios from 'axios';
import { axiosAuthClient } from './axios';

export const getMembers = async (role: string) => {
	axiosAuthClient.interceptors.request.use((config) => {
		const accessToken = localStorage.getItem('accessToken');
		if (accessToken) {
			config.headers.Authorization = accessToken;
		}
		return config;
	});
	try {
		return await axiosAuthClient.get(
			`${import.meta.env.VITE_REACT_APP_API_ROOT}/members`,
			{
				params: { role: role },
			},
		);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return error.response?.status;
		}
		throw new Error('GET /members ERROR');
	}
};

export const patchMember = async (memberId: string, role: string) => {
	try {
		const response = await axiosAuthClient.patch(
			`${import.meta.env.VITE_REACT_APP_API_ROOT}/members/${memberId}`,
			null,
			{
				params: { role: role },
			},
		);
		console.log('Role updated:', response.data);
	} catch (error) {
		console.error('Error updating role:', error);
	}
};

export const getMember = async (id: string) => {
	try {
		return await axiosAuthClient.get(
			`${import.meta.env.VITE_REACT_APP_API_ROOT}/members/${id}`,
		);
	} catch (error) {
		throw new Error('getMember 에러');
	}
};

export const getMembersMy = async () => {
	try {
		return await axiosAuthClient.get(
			`${import.meta.env.VITE_REACT_APP_API_ROOT}/members/my`,
		);
	} catch (error) {
		throw new Error('getMembersMy 에러');
	}
};

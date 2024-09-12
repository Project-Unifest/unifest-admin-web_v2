import { axiosAuthClient } from './axios';

export const getMembers = async (role: string) => {
	try {
		return await axiosAuthClient.get(
			`${import.meta.env.VITE_REACT_APP_API_ROOT}/members`,
			{
				params: { role: role },
			},
		);
	} catch (error) {
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
		throw new Error('로그인에 실패하였습니다');
	}
};

import { axiosAuthClient } from './axios';

export const getBooth = async (id: string) => {
	try {
		return await axiosAuthClient.get(
			`${import.meta.env.VITE_REACT_APP_API_ROOT}/booth/${id}`,
		);
	} catch (error) {
		throw new Error('로그인에 실패하였습니다');
	}
};

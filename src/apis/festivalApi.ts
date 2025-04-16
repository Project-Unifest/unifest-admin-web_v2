import { axiosAuthClient } from './axios';

export const getAllFestivals = async () => {
	try {
		return await axiosAuthClient.get(
			`${import.meta.env.VITE_REACT_APP_API_ROOT}/festival/all`,
		);
	} catch (error) {
		throw new Error('getAllFestivals 에러');
	}
};

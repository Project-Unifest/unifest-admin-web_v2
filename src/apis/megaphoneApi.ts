import { axiosAuthClient } from './axios';

export const postMegaphone = async (content: string) => {
	const data = {
		boothId: 710,
		msgBody: content,
	};
	try {
		return await axiosAuthClient.post(
			`${import.meta.env.VITE_REACT_APP_API_ROOT}/megaphone`,
			data,
		);
	} catch (error) {
		throw new Error('postMessage 에러');
	}
};

import { axiosAuthClient } from './axios';

export const getBooth = async (id: string) => {
	try {
		return await axiosAuthClient.get(
			`${import.meta.env.VITE_REACT_APP_API_ROOT}/api/booths/${id}`,
		);
	} catch (error) {
		throw new Error('getBooth 에러');
	}
};

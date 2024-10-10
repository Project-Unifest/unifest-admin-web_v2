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

export const getAllBooths = async (festivalId: string) => {
	try {
		return await axiosAuthClient.get(
			`${import.meta.env.VITE_REACT_APP_API_ROOT}/api/booths/${festivalId}/booths`,
		);
	} catch (error) {
		throw new Error('getAllBooths 에러');
	}
};

export const giveBooth = async (boothId: number, newId: number) => {
	const data = {
		new: newId,
	};
	try {
		return await axiosAuthClient.post(
			`${import.meta.env.VITE_REACT_APP_API_ROOT}/admin/booth/${boothId}`,
			null,
			{ params: data },
		);
	} catch (error) {
		throw new Error('giveBooth 에러');
	}
};

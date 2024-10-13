import { AxiosResponse } from 'axios';
import { axiosAuthClient } from './axios';
import { Booth } from '@/interfaces/interfaces';

export interface StampBoothsResponse {
	data: {
		code: string;
		data: Booth[];
		message: string;
	};
}
export const patchStampEnabled = async (
	boothId: number,
	stampEnabled: boolean,
): Promise<AxiosResponse> => {
	try {
		return await axiosAuthClient.patch(
			`${import.meta.env.VITE_REACT_APP_API_ROOT}/stamps/${boothId}/stampEnabled`,
			{ stampEnabled: stampEnabled },
		);
	} catch (error) {
		throw new Error('stampEnabled 변경 실패');
	}
};

export const getAllStampBooths = async (
	festivalId: string,
): Promise<StampBoothsResponse> => {
	try {
		return await axiosAuthClient.get(
			`${import.meta.env.VITE_REACT_APP_API_ROOT}/stamps/${festivalId}`,
		);
	} catch (error) {
		throw new Error('get stamp booths 실패');
	}
};

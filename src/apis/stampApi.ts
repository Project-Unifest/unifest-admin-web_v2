export const toggleStampEnabled = async (
	data: LoginData,
): Promise<AxiosResponse> => {
	try {
		return await axiosClient.post(
			`${import.meta.env.VITE_REACT_APP_API_ROOT}/login`,
			{
				email: data.email,
				password: data.pw,
			},
		);
	} catch (error) {
		throw new Error('로그인에 실패하였습니다');
	}
};

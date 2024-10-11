import { getAllBooths } from '@/apis/boothApi';
import BoothComponent from '@/components/BoothComponent';
import { Booth } from '@/interfaces/interfaces';
import { useEffect, useState } from 'react';

const StampSettingPage = () => {
	const [boothList, setBoothList] = useState<Booth[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [chkList, setChkList] = useState<Set<number> | undefined>(new Set());
	// const [isBtnEnabled, setIsBtnEnabled] = useState<boolean>(false);
	useEffect(() => {
		console.log(isLoading, boothList);
	}, [isLoading]);
	useEffect(() => {
		if (boothList.length !== 0) {
			setIsLoading(false);
		}
	}, [boothList]);
	useEffect(() => {
		getAllBooths('2').then((res) => {
			setBoothList([...res.data.data]);
		});
	}, []);
	// useEffect(() => {
	// 	console.log('aaa');
	// 	console.log(chkList);
	// }, [chkList]);

	const onEnrollHandler = () => {};
	const setCheckList = (id: number, isChecked: boolean) => {
		const _arr = new Set(chkList);
		if (isChecked) {
			_arr.add(id);
			setChkList(_arr);
		} else {
			_arr?.delete(id);
			setChkList(_arr);
		}
	};

	return (
		<>
			{isLoading ? (
				<>로딩 중...</>
			) : (
				<>
					{boothList?.map((value) => {
						return (
							<BoothComponent
								key={value.id}
								data={value}
								schoolId="2"
								isButtonEnabled={false}
								setCheckList={setCheckList}
							></BoothComponent>
						);
					})}
				</>
			)}
			<div style={{ margin: '140px' }}></div>
			{chkList?.size === 0 ? (
				<div className="btnDiv4Disabled">등록하기</div>
			) : (
				<div className="btnDiv4" onClick={onEnrollHandler}>
					등록하기
				</div>
			)}
		</>
	);
};

export default StampSettingPage;

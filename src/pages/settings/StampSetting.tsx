import { getAllBooths } from '@/apis/boothApi';
import { getAllStampBooths, patchStampEnabled } from '@/apis/stampApi';
import BoothComponent from '@/components/BoothComponent';
import { Booth } from '@/interfaces/interfaces';
import { useEffect, useState } from 'react';

const StampSettingPage = () => {
	const [boothList, setBoothList] = useState<Booth[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [chkList, setChkList] = useState<Set<number> | undefined>(new Set());

	// const [isBtnEnabled, setIsBtnEnabled] = useState<boolean>(false);
	// useEffect(() => {
	// 	console.log(isLoading, boothList);
	// }, [isLoading]);
	useEffect(() => {
		if (boothList.length !== 0) {
			setIsLoading(false);
		}
	}, [boothList]);
	useEffect(() => {
		//하드코딩
		getAllBooths('2').then((res) => {
			setBoothList([...res.data.data]);
		});
		getAllStampBooths('2').then((res) => {
			const _arr: Set<number> = new Set();
			res.data.data.forEach((value) => {
				_arr.add(value.id);
			});
			setChkList(_arr);
		});
	}, []);

	const onEnrollHandler = () => {
		if (chkList === undefined) {
			alert('chkList undefined. 관계자에 문의바랍니다');
		} else {
			boothList.forEach((value) => {
				patchStampEnabled(value.id, chkList.has(value.id));
			});
		}
	};
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
								chkList={chkList}
								setCheckList={setCheckList}
							></BoothComponent>
						);
					})}
				</>
			)}
			<div style={{ margin: '140px' }}></div>
			<div className="btnDiv4" onClick={onEnrollHandler}>
				등록하기
			</div>
		</>
	);
};

export default StampSettingPage;

import { getAllBooths } from '@/apis/boothApi';
import BoothComponent from '@/components/BoothComponent';
import { Booth } from '@/interfaces/interfaces';
import { useEffect, useState } from 'react';

const StampSettingPage = () => {
	const [boothList, setBoothList] = useState<Booth[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isBtnEnabled, setIsBtnEnabled] = useState<boolean>(false);
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
							></BoothComponent>
						);
					})}
					<div>
						<div className="btnDiv4">등록하기</div>
					</div>
				</>
			)}
		</>
	);
};

export default StampSettingPage;

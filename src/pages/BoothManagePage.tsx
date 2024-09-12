import HeaderText from '@/components/HeaderText';
import MemberComponent from './MemberComponent';
import { useLocation, useParams } from 'react-router-dom';
import '@/styles/BoothManagePage.css';
import { useEffect, useState } from 'react';
import { getMember } from '@/apis/membersApi';
import BoothComponent from '@/components/BoothComponent';
import { Booth } from '@/interfaces/interfaces';

const BoothManagePage = () => {
	const id = useParams().memberId;
	const [boothList, setBoothList] = useState<Booth[]>();

	if (id === undefined) {
		return <div>404 PAGE</div>;
	}

	const [email, setEmail] = useState<string>('');
	const [phoneNum, setPhoneNum] = useState<string>('');
	const [role, setRole] = useState<string>('');
	const [isLoading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setLoading(false);
	}, [boothList]);
	useEffect(() => {
		setLoading(true);
		getMember(id).then((res) => {
			const data = res.data.data;
			setEmail(data.email);
			setPhoneNum(data.phoneNum);
			setRole(data.memberRole);
			setBoothList([...data.booths]);
		});
	}, []);
	return (
		<div className="containerDiv">
			<HeaderText school="건국대학교" title="부스 관리" />
			<div className="memberInfoDiv">
				<MemberComponent
					id={id}
					email={email}
					phoneNum={phoneNum}
					role={role}
					hrEnable={false}
				/>
			</div>
			<div className="searchDiv">
				<div>검색</div>
			</div>
			<div className="boothListDiv">
				<div>등록 부스 총 {boothList?.length}개</div>
				{isLoading || boothList === undefined ? (
					<> 로딩 중 </>
				) : (
					<>
						{boothList.map((value: Booth) => {
							return <BoothComponent data={value}></BoothComponent>;
						})}
					</>
				)}
			</div>
		</div>
	);
};

export default BoothManagePage;

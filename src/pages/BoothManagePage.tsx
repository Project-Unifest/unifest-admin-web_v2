import HeaderText from '@/components/HeaderText';
import MemberComponent from './MemberComponent';
import { useNavigate, useParams } from 'react-router-dom';
import '@/styles/BoothManagePage.css';
import { useEffect, useState } from 'react';
import { getMember } from '@/apis/membersApi';
import BoothComponent from '@/components/BoothComponent';
import { Booth } from '@/interfaces/interfaces';
import Header from '@/components/LogoBar';

const BoothManagePage = () => {
	const id = useParams().memberId;
	const schoolId = useParams().schoolId;
	const navigator = useNavigate();

	if (id === undefined) {
		return <div>404 PAGE</div>;
	}

	const [boothList, setBoothList] = useState<Booth[]>();
	const [email, setEmail] = useState<string>('');
	const [phoneNum, setPhoneNum] = useState<string>('');
	const [role, setRole] = useState<string>('');
	const [isLoading, setLoading] = useState<boolean>(false);
	const [schoolName, setSchoolName] = useState<string | null>();

	useEffect(() => {
		setLoading(false);
	}, [boothList]);
	useEffect(() => {
		setSchoolName(localStorage.getItem('schoolName'));
		setLoading(true);
		getMember(id).then((res) => {
			const data = res.data.data;
			setEmail(data.email);
			setPhoneNum(data.phoneNum);
			setRole(data.memberRole);
			setBoothList([...data.booths]);
		});
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		navigator('/login');
	};
	return (
		<div className="containerDiv">
			<Header onLogout={handleLogout} />
			<HeaderText school={schoolName} title="부스 관리" />
			<div className="memberInfoDiv">
				<MemberComponent
					id={id}
					email={email}
					phoneNum={phoneNum}
					memberRole={role}
					hrEnable={false}
					isOwnerChangePage={false}
				/>
			</div>
			<div className="boothListDiv">
				<div>등록 부스 총 {boothList?.length}개</div>
				{isLoading || boothList === undefined ? (
					<> 로딩 중 </>
				) : (
					<>
						{boothList.map((value: Booth) => {
							return (
								<BoothComponent
									data={value}
									schoolId={schoolId}
								></BoothComponent>
							);
						})}
					</>
				)}
			</div>
		</div>
	);
};

export default BoothManagePage;

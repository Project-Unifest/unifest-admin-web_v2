import HeaderText from '@/components/HeaderText';
import Header from '@/components/LogoBar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '@/styles/SettingPage.css';
import StampSettingPage from './settings/StampSetting';
import StampQRSettingPage from './settings/StampQRSettingPage';
import BoothLocationSettingPage from './settings/BoothLocationSettingPage';

const SettingPage = () => {
	// const tabList = ['스탬프 설정', '스탬프 QR 생성', '부스 위치 수정'];
	const tabList = ['부스 위치 수정'];
	const [schoolName, setSchoolName] = useState<string | null>();
	const [selectedTab, setSelectedTab] = useState<number>(0);

	const navigator = useNavigate();

	const tabContent = (index: number) => {
		switch (index) {
			// case 0:
			// 	return <StampSettingPage />;
			// case 1:
			// 	return <StampQRSettingPage />;
			// case 2:
			// 	return <BoothLocationSettingPage />;
			case 0:
				return <BoothLocationSettingPage />;
			default:
				return <div>문제 발생, 운영자에 문의 바랍니다</div>;
		}
	};
	const handleLogout = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		navigator('/login');
	};

	const onTabClicked = (index: number) => {
		setSelectedTab(index);
	};

	useEffect(() => {
		setSchoolName(localStorage.getItem('schoolName'));
	}, []);
	return (
		<div className="containerDiv">
			<Header onLogout={handleLogout} />
			<div>
				<HeaderText school={schoolName} title="설정 페이지"></HeaderText>
			</div>
			<div className="tabListDiv">
				<div style={{ display: 'flex', flexDirection: 'row', float: 'left' }}>
					{tabList.map((value, index) => {
						return selectedTab === index ? (
							<div key={index} className="tabListDiv2">
								<li
									onClick={() => {
										onTabClicked(index);
									}}
								>
									{value}
								</li>
							</div>
						) : (
							<li
								key={index}
								onClick={() => {
									onTabClicked(index);
								}}
							>
								{value}
							</li>
						);
					})}
				</div>
			</div>
			{tabContent(selectedTab)}
		</div>
	);
};

export default SettingPage;

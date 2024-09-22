import HeaderText from '@/components/HeaderText';
import Header from '@/components/LogoBar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SettingPage = () => {
	const [schoolName, setSchoolName] = useState<string | null>();

	const navigator = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		navigator('/login');
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
		</div>
	);
};

export default SettingPage;

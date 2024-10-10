import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import { postLogin } from '../apis/loginAPI';

const LoginPage = () => {
	const [accessToken, setAccessToken] = useState<string>('');
	const [refreshToken, setRefreshToken] = useState<string>('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isOK, setIsOK] = useState(false);
	const navigator = useNavigate();

	useEffect(() => {
		if (isOK === true && accessToken !== '') {
			//to escape from error
			refreshToken;
			navigator('/');
		}
	}, [isOK]);
	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(typeof event);
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			setIsOK(false);
			postLogin({
				email: email,
				pw: password,
			}).then((res) => {
				if (res.status === 200) {
					console.log(res);
					localStorage.setItem('accessToken', res.headers.authorization);
					localStorage.setItem('refreshToken', res.headers.refreshtoken);
					setAccessToken(res.headers.authorization);
					setRefreshToken(res.headers.refreshtoken);

					setIsOK(true);
				} else if (res.status === 401) {
					alert('아이디 또는 비밀번호가 틀렸습니다');
				} else {
					alert(res.status + '오류 발생, 관계자에 문의바랍니다');
				}
			});
		} catch (error) {
			console.error('Login error:', error);
		}
	};
	return (
		<div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
			<div className="LoginDiv" style={{ width: '580px' }}>
				<div className="LoginTitleDiv">유니페스 총학생회 관리페이지</div>
				<div className="LoginBoldDiv">로그인</div>
				<div>
					<form className="LoginForm" onSubmit={handleSubmit}>
						<div>
							<input
								className="inputIDPW"
								placeholder="아이디를 입력해주세요"
								type="email"
								id="email"
								value={email}
								onChange={handleEmailChange}
							/>
						</div>
						<div>
							<input
								className="inputIDPW"
								placeholder="비밀번호를 입력해주세요"
								type="password"
								id="password"
								value={password}
								onChange={handlePasswordChange}
							/>
						</div>
						<div style={{ display: 'flex', margin: '20px 0px 0px 0px' }}>
							<input className="inputChk" type="checkbox"></input>
							<label>자동 로그인</label>
						</div>
						<div>
							<button className="LoginBtn" type="submit">
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;

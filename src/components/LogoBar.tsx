import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import '../components/LogoBar.style.css';

interface LogoProps {
	onLogout: Function;
}
const Header = (props: LogoProps) => {
	const navigator = useNavigate();
	const onClick = () => {
		navigator('/');
	};
	return (
		<div className="HeaderDiv">
			<img src={Logo} onClick={onClick}></img>
			<button
				className="logoutBtn"
				onClick={() => {
					props.onLogout();
				}}
			>
				로그아웃
			</button>
		</div>
	);
};

export default Header;

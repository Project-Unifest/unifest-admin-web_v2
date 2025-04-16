import { useNavigate } from 'react-router-dom';
import './HeaderText.style.css';
import setting from '@/assets/setting.svg';

interface HeaderTextProps {
	school: string | null | undefined;
	title: string;
}
const HeaderText = ({ school, title }: HeaderTextProps) => {
	const navigator = useNavigate();
	return (
		<div className="HeaderTextDiv">
			<div style={{ display: 'flex' }}>
				<div className="schoolText">{school}</div>
				{/* <div className="schoolText">{props.school}</div> */}
				<div
					style={{
						display: 'flex',
						alignItems: 'flex-end',
						paddingBottom: '4px',
					}}
				>
					<img
						src={setting}
						onClick={() => {
							navigator('/setting');
						}}
					/>
				</div>
			</div>
			<div className="titleText">{title}</div>
		</div>
	);
};

export default HeaderText;

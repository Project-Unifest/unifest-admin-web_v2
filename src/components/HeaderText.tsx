import './HeaderText.style.css';

interface HeaderTextProps {
	school: string | null | undefined;
	title: string;
}
const HeaderText = (props: HeaderTextProps) => {
	return (
		<div className="HeaderTextDiv">
			<div className="schoolText">{props.school}</div>
			<div className="titleText">{props.title}</div>
		</div>
	);
};

export default HeaderText;

import { Booth } from '@/interfaces/interfaces';
import '@/components/BoothComponent.style.css';
import { useNavigate } from 'react-router-dom';

const BoothComponent = ({
	data,
	schoolId,
	isButtonEnabled = true,
}: {
	data: Booth;
	schoolId: string | undefined;
	isButtonEnabled?: boolean;
}) => {
	const navigator = useNavigate();

	const changeOwnerHandler = () => {
		navigator(`/changeowner/${schoolId}/${data.id}`);
	};
	return (
		<div style={{ marginTop: '30px' }}>
			<hr />
			<div
				style={{
					marginTop: '35px',
					display: 'flex',
					flexDirection: 'row',
				}}
			>
				{!isButtonEnabled && (
					<div className="chkBoxDiv">
						<input type="checkbox" className="chkBox"></input>
					</div>
				)}
				<img src={data.thumbnail} width="154px" height="154px"></img>
				<div className="columnFlexDiv">
					<div className="boothName">{data.name}</div>
					<div className="boothDesc">{data.description}</div>
					<div className="boothLocation">{data.location}</div>
				</div>
				{isButtonEnabled && (
					<div style={{ flexGrow: 1 }}>
						<div className="btnDiv3" onClick={changeOwnerHandler}>
							소유자 이전
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default BoothComponent;

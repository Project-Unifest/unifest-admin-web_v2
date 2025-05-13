import { Booth } from '@/interfaces/interfaces';
import '@/components/BoothComponent.style.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import placeholderImg from '@/assets/placeholder.svg';

const BoothComponent = ({
	data,
	schoolId,
	isButtonEnabled = true,
	chkList,
	setCheckList,
}: {
	data: Booth;
	schoolId: string | undefined;
	isButtonEnabled?: boolean;
	chkList?: Set<number> | undefined;
	setCheckList?: Function;
}) => {
	const [checked, setChecked] = useState<boolean>(false);

	useEffect(() => {
		chkList?.has(data.id) && setChecked(true);
	}, [chkList]);
	const navigator = useNavigate();

	const changeOwnerHandler = () => {
		navigator(`/changeowner/${schoolId}/${data.id}`);
	};

	const readBoothHandler = () => {
		//TODO : 부스 열람
		navigator(`/booth-detail/${data.id}`);
	};

	const checkboxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(!checked);
		if (setCheckList !== undefined) {
			setCheckList(data.id, event.target.checked);
		}
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
						<input
							type="checkbox"
							className="chkBox"
							checked={checked}
							onChange={(e) => checkboxHandler(e)}
						></input>
					</div>
				)}
				<img
					src={data.thumbnail === '' ? placeholderImg : data.thumbnail}
					width="154px"
					height="154px"
				></img>
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
						<div className="btnDiv3" onClick={readBoothHandler}>
							부스 정보
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default BoothComponent;

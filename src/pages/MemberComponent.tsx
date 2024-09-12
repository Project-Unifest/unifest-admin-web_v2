import { patchMember } from '@/apis/membersApi';
import '../styles/MemberComponent.style.css';
import { useNavigate } from 'react-router-dom';

const MemberComponent = ({
	id,
	email,
	phoneNum,
	role,
	fetchMembers,
	hrEnable,
}: {
	id: string;
	email: string;
	phoneNum: string;
	role: string;
	fetchMembers?: Function;
	hrEnable?: boolean;
}) => {
	const navigator = useNavigate();
	const GreenUID = () => {
		return (
			<>
				<div className="uid" style={{ background: '#15D055' }}>
					{id}
				</div>
				<div className="status">승인</div>
			</>
		);
	};
	const RedUID = () => {
		return (
			<>
				<div className="uid" style={{ background: '#FF5252' }}>
					{id}
				</div>
				<div className="status">거부</div>
			</>
		);
	};
	const GrayUID = () => {
		return (
			<>
				<div className="uid" style={{ background: '#9C9C9C' }}>
					{id}
				</div>
				<div className="status">대기</div>
			</>
		);
	};

	const changeRoleHandler = (value: string) => {
		if (fetchMembers !== undefined) {
			//value => value of the pressed button
			console;
			patchMember(id, value).then(() => {
				fetchMembers();
			});
		} else {
			patchMember(id, value);
		}
	};

	const clickManageHandler = () => {
		navigator(`/booth/${id}`);
	};

	return (
		<div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					flexDirection: 'column',
				}}
			>
				<div>
					{hrEnable || hrEnable === undefined ? <hr style={{}} /> : <></>}
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						borderRadius: '10px',
					}}
				>
					<div className="uidDiv">
						<div className="uidLabel">UID</div>
						{
							{
								ADMIN: <GreenUID />,
								VERIFIED: <GreenUID />,
								DENIED: <RedUID />,
								PENDING: <GrayUID />,
							}[role]
						}
						{/* <div className="uid">{id}</div> */}
					</div>
					<div style={{ width: '320px' }}>
						<div style={{ display: 'flex' }}>
							<div className="labelDiv">이메일</div>
							<div className="contentDiv">{email}</div>
						</div>
						<div style={{ display: 'flex' }}>
							<div className="labelDiv">전화번호</div>
							<div className="contentDiv">{phoneNum}</div>
						</div>
					</div>
					<div style={{ display: 'flex' }}>
						<div
							className="btnDiv"
							onClick={() => {
								changeRoleHandler('PENDING');
							}}
						>
							<div
								className="circleDiv"
								style={{ backgroundColor: '#9C9C9C' }}
							/>
							<button>대기</button>
						</div>
						<div
							className="btnDiv"
							onClick={() => {
								changeRoleHandler('VERIFIED');
							}}
						>
							<div
								className="circleDiv"
								style={{ backgroundColor: '#15D055' }}
							/>
							<button>승인</button>
						</div>
						<div
							className="btnDiv"
							onClick={() => {
								changeRoleHandler('DENIED');
							}}
						>
							<div
								className="circleDiv"
								style={{ backgroundColor: '#FF5252' }}
							/>
							<button>거부</button>
						</div>
						{hrEnable || hrEnable === undefined ? (
							<div className="btnDiv2" onClick={clickManageHandler}>
								<button>관리</button>
							</div>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MemberComponent;

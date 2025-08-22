import { patchMember } from '@/apis/membersApi';
import '../styles/MemberComponent.style.css';
import { useNavigate } from 'react-router-dom';
import { giveBooth } from '@/apis/boothApi';
import { Booth } from '@/interfaces/interfaces';

const MemberComponent = ({
	id,
	memberRole,
	email,
	phoneNum,
	booths,
	fetchMembers,
	hrEnable,
	schoolId,
	boothId,
	isOwnerChangePage,
}: {
	id: string;
	memberRole: string;
	email: string;
	phoneNum: string;
	booths?: Booth[];
	fetchMembers?: Function;
	hrEnable?: boolean;
	schoolId?: number;
	boothId?: number;
	isOwnerChangePage: boolean;
}) => {
	const navigator = useNavigate();
	// const boothListString =
	// 	booths && booths.map((value) => value.name).join(', ');
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
			patchMember(id, value).then(() => {
				fetchMembers();
			});
		} else {
			patchMember(id, value);
		}
	};
	const clickChangeOwnerHandler = () => {
		if (boothId !== undefined) {
			giveBooth(boothId, parseInt(id));
		} else {
			alert('소유자 이전 중에 문제가 발생했습니다. 운영자에 문의바랍니다');
		}

		navigator(`/`);
	};

	const clickManageHandler = () => {
		navigator(`/booth/${schoolId}/${id}`);
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
				<div>{hrEnable || hrEnable === undefined ? <hr /> : <></>}</div>
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
							}[memberRole]
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
					{isOwnerChangePage ? (
						<div className="btnDiv2" onClick={clickChangeOwnerHandler}>
							<button>결정</button>
						</div>
					) : (
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
								<div
									className="btnDiv2 tooltip-container"
									onClick={clickManageHandler}
								>
									<button>관리</button>
									{/* <div className="tooltip-message">
										{boothListString ?? '생성한 부스 없음'}
									</div> */}
								</div>
							) : (
								<></>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default MemberComponent;

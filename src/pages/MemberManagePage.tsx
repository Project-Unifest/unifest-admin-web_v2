import { useEffect, useState } from 'react';
import MemberTable from '@/pages/MemberTable';
import HeaderText from '@/components/HeaderText';

import '@/styles/MemberManagePage.css';
import Header from '@/components/LogoBar';
import { useNavigate } from 'react-router-dom';
import { getMembers } from '@/apis/membersApi';
import { Member } from '@/interfaces/interfaces';

const MemberManage = () => {
	const navigator = useNavigate();
	const [selectedRole, setSelectedRole] = useState<string | undefined>('');
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(true); //true = Member false = Booth
	const [memberList, setMemberList] = useState<Member[]>();
	const [pendingCnt, setPendingCnt] = useState<number>(0);
	const [verifiedCnt, setVerifiedCnt] = useState<number>(0);
	const [denyCnt, setDenyCnt] = useState<number>(0);

	useEffect(() => {
		fetchMembers();
	}, [selectedRole]);
	useEffect(() => {
		initCount();
	}, [memberList]);
	useEffect(() => {
		fetchMembers();
	}, []);

	const [focus, setFocus] = useState({
		uid: 't',
		email: 't',
		phoneNum: 't',
	});

	const fetchMembers = () => {
		if (selectedRole !== undefined) {
			setLoading(true);
			getMembers(selectedRole).then((res) => {
				if (typeof res !== 'number' && res !== undefined) {
					setMemberList(res.data.data);
					setLoading(false);
				} else {
					console.log(res);
					switch (res) {
						case 403:
							// navigator('/login');
							break;
					}
				}
			});
		}
	};

	const initCount = () => {
		setPendingCnt(0);
		setVerifiedCnt(0);
		setDenyCnt(0);

		countNumbers();
	};

	const addPendingCnt = () => {
		setPendingCnt((pendingCnt) => pendingCnt + 1);
	};
	const addVerifiedCnt = () => {
		setVerifiedCnt((verifiedCnt) => verifiedCnt + 1);
	};
	const addDenyCnt = () => {
		setDenyCnt((denyCnt) => denyCnt + 1);
	};
	const countNumbers = () => {
		memberList?.forEach((value) => {
			switch (value.memberRole.toLowerCase()) {
				case 'pending':
					addPendingCnt();
					break;
				case 'admin':
				case 'verified':
					addVerifiedCnt();
					break;
				case 'denied':
					addDenyCnt();
					break;
			}
		});
	};

	const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedRole(event.target.value);
	};

	const handleUserClick = (uid: string, email: string, phoneNum: string) => {
		setFocus({
			uid: uid,
			email: email,
			phoneNum: phoneNum,
		});
		setPage(false);
	};
	const handleLogout = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		navigator('/login');
	};

	return (
		<div>
			<Header onLogout={handleLogout} />
			<div>
				<HeaderText school="건국대학교" title="운영자 계정 관리"></HeaderText>
				<div className="roleBar">
					<div className="roleDiv">
						<div className="roleLeftDiv">전체 신청 수</div>
						<div className="roleRightDiv1">{memberList?.length}</div>
					</div>
					<div className="roleDiv">
						<div className="roleLeftDiv">신청 대기</div>
						<div className="roleRightDiv2">{pendingCnt}</div>
					</div>
					<div className="roleDiv">
						<div className="roleLeftDiv">신청 승인</div>
						<div className="roleRightDiv3">{verifiedCnt}</div>
					</div>
					<div className="roleDiv">
						<div className="roleLeftDiv">신청 거부</div>
						<div className="roleRightDiv4">{denyCnt}</div>
					</div>
				</div>
				<div className="selectDiv">
					<label className="filterLabel" htmlFor="role">
						필터
					</label>
					<select
						className="filterSelect"
						id="role"
						value={selectedRole}
						onChange={handleRoleChange}
					>
						<option value="">All</option>
						<option value="ADMIN">Admin</option>
						<option value="PENDING">Pending</option>
						<option value="VERIFIED">Verified</option>
						<option value="DENIED">Denied</option>
					</select>
					<MemberTable
						loading={loading}
						setPage={handleUserClick}
						members={memberList}
						fetchMembers={fetchMembers}
					/>
				</div>
			</div>
		</div>
	);
};

export default MemberManage;

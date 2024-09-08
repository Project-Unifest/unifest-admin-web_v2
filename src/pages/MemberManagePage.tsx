import { useEffect, useState } from 'react';
import MemberTable from './MemberTable';
import HeaderText from '../Components/HeaderText';

import '../styles/MemberManagePage.css';
import Header from '../Components/LogoBar';
import { useNavigate } from 'react-router-dom';
import { getMembers } from '@/apis/membersApi';
import { Member } from '@/interfaces/interfaces';

const MemberManage = () => {
	const navigator = useNavigate();
	const [selectedRole, setSelectedRole] = useState<string | undefined>('');
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(true); //true = Member false = Booth
	const [memberList, setMemberList] = useState<Member[]>();

	useEffect(() => {
		console.log(memberList);
	}, [memberList]);
	useEffect(() => {
		fetchMembers();
	}, []);
	const [focus, setFocus] = useState({
		uid: 't',
		email: 't',
		phoneNum: 't',
	});
	const [focusUID, setUID] = useState('');
	const [focusEmail, setEmail] = useState('');
	const [focusPhoneNum, setPhoneNum] = useState('');

	const fetchMembers = () => {
		let _role = selectedRole;
		if (_role === 'All') {
			_role = '';
		}
		if (_role !== undefined) {
			const response = getMembers(_role).then((res) => {
				setMemberList(res.data.data);
			});
		}
	};
	const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedRole(event.target.value);
		fetchMembers();
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
			{page ? (
				<div>
					<HeaderText school="건국대학교" title="운영자 계정 관리"></HeaderText>
					<div className="roleBar">
						<div className="roleDiv">
							<div className="roleLeftDiv">전체 신청 수</div>
							<div className="roleRightDiv1">
								32
								{/* 향후 숫자로 수정 */}
							</div>
						</div>
						<div className="roleDiv">
							<div className="roleLeftDiv">전체 신청 수</div>
							<div className="roleRightDiv2">
								32
								{/* 향후 숫자로 수정 */}
							</div>
						</div>
						<div className="roleDiv">
							<div className="roleLeftDiv">전체 신청 수</div>
							<div className="roleRightDiv3">
								32
								{/* 향후 숫자로 수정 */}
							</div>
						</div>
						<div className="roleDiv">
							<div className="roleLeftDiv">전체 신청 수</div>
							<div className="roleRightDiv4">
								32
								{/* 향후 숫자로 수정 */}
							</div>
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
							role={selectedRole}
							setter={setLoading}
							loading={loading}
							setPage={handleUserClick}
							members={memberList}
						/>
					</div>
				</div>
			) : (
				<div></div>
				// <route path="/booths">
				// 	<div>
				// 		<BoothManage
				// 			id={focus['uid']}
				// 			email={focus['email']}
				// 			phoneNum={focus['phoneNum']}
				// 		></BoothManage>
				// 	</div>
				// </route>
			)}
		</div>
	);
};

export default MemberManage;

import HeaderText from '@/components/HeaderText';
import Header from '@/components/LogoBar';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import '@/styles/SelectOwnerPage.css';
import searchIcon from '@/assets/search.svg';
import { Booth, Member } from '@/interfaces/interfaces';
import { getBooth } from '@/apis/boothApi';
import { getMembers } from '@/apis/membersApi';
import MemberTable from './MemberTable';

const SelectOwnerPage = () => {
	//when user visit site first time.
	let flag = false;

	const [schoolName, setSchoolName] = useState<string | null>();
	const [selectedRole, setSelectedRole] = useState<string | undefined>('');
	const [search, setSearch] = useState<string>();
	const [data, setData] = useState<Booth>();
	const [schoolId, setSchoolId] = useState<string | undefined>();
	const [boothId, setBoothId] = useState<string | undefined>();
	const [memberList, setMemberList] = useState<Member[]>();
	const [searchList, setSearchList] = useState<Member[]>();
	const [loading, setLoading] = useState<boolean>(true);

	const params = useParams();
	const navigator = useNavigate();

	const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedRole(event.target.value);
	};

	const fetchMembers = () => {
		if (selectedRole !== undefined) {
			setLoading(true);
			getMembers(selectedRole).then((res) => {
				if (typeof res !== 'number' && res !== undefined) {
					setMemberList(res.data.data);
					setLoading(false);
				} else {
					switch (res) {
						case 403:
							alert('총학 관리자 계정으로 로그인해야 접속이 가능합니다');
							navigator('/login');
							break;
					}
				}
			});
		}
	};

	useEffect(() => {
		setSearchList(memberList);
	}, [memberList]);

	useEffect(() => {
		if (search !== undefined) {
			setSearchList(
				memberList?.filter((value) => {
					if (
						value.email.toLowerCase().includes(search?.toLowerCase()) ||
						value.phoneNum.toLowerCase().includes(search?.toLowerCase())
					) {
						return true;
					} else {
						return false;
					}
				}),
			);
		}
	}, [search]);

	useEffect(() => {
		if (flag === false) {
			flag = true;
		} else {
			fetchMembers();
		}
	}, [selectedRole]);

	useEffect(() => {
		if (boothId !== undefined) {
			getBooth(boothId).then((res) => {
				setData(res.data.data);
			});
		}
	}, [boothId]);

	useEffect(() => {
		fetchMembers();
		setSchoolName(localStorage.getItem('schoolName'));
		setSchoolId(params.schoolId);
		setBoothId(params.boothId);
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		navigator('/login');
	};
	const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};
	return (
		<div className="containerDiv">
			<Header onLogout={handleLogout} />
			<HeaderText school={schoolName} title="부스 소유자 변경" />
			<div className="boothInfoDiv">
				<div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<img src={data?.thumbnail} width="154px" height="154px"></img>
						<div className="columnFlexDiv">
							<div className="boothName">{data?.name}</div>
							<div className="boothDesc">{data?.description}</div>
							<div className="boothLocation">{data?.location}</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div className="searchContainer">
					<div>
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
					</div>

					<div className="searchDiv">
						<input
							className="inputSearch"
							type="text"
							placeholder="검색하기"
							value={search}
							onChange={onSearchChange}
						></input>
						<div style={{ marginRight: '10px' }}>
							<img src={searchIcon} width="24px" height="24px"></img>
						</div>
					</div>
				</div>
				{schoolId === undefined ? (
					<div>gg</div>
				) : (
					<MemberTable
						loading={loading}
						members={searchList}
						fetchMembers={fetchMembers}
						schoolId={parseInt(schoolId)}
						boothId={parseInt(boothId)}
						isOwnerChangePage={true}
					/>
				)}
			</div>
		</div>
	);
};

export default SelectOwnerPage;

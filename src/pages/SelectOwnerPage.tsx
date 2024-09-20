import HeaderText from '@/components/HeaderText';
import Header from '@/components/LogoBar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '@/styles/SelectOwnerPage.css';
import searchIcon from '@/assets/search.svg';
import { Booth } from '@/interfaces/interfaces';

const SelectOwnerPage = () => {
	const [schoolName, setSchoolName] = useState<string | null>();
	const [selectedRole, setSelectedRole] = useState<string | undefined>('');
	const [search, setSearch] = useState<string>();
	const [data, setData] = useState<Booth>();

	const navigator = useNavigate();
	const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedRole(event.target.value);
	};

	useEffect(() => {
		setSchoolName(localStorage.getItem('schoolName'));
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
				<div style={{ marginTop: '30px' }}>
					<hr />
					<div
						style={{
							marginTop: '35px',
							display: 'flex',
							flexDirection: 'row',
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
			</div>
		</div>
	);
};

export default SelectOwnerPage;

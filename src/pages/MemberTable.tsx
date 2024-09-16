import axios from 'axios';
import { useState, useEffect } from 'react';
import MemberComponent from './MemberComponent';
import '../styles/MemberTable.css';
import { Member } from '@/interfaces/interfaces';

const MemberTable = ({
	loading,
	setPage,
	members,
	fetchMembers,
}: {
	loading: boolean;
	setPage: Function;
	members: Member[] | undefined;
	fetchMembers: Function;
}) => {
	//const [members, setMembers] = useState([]);
	const [selectedMembers, setSelectedMembers] = useState([]);
	const [newRole, setNewRole] = useState('');

	if (loading) {
		return (
			<div
				style={{
					flex: '1',
					display: 'flex',
					justifyContent: 'center',
					alignContent: 'center',
				}}
			>
				로딩 중
			</div>
		);
	}

	if (members === undefined) {
		return <div>No members to show</div>;
	}

	return (
		<div>
			{members.map((value, index) => {
				return (
					<MemberComponent
						key={value.id}
						id={value.id.toString()}
						email={value.email}
						phoneNum={value.phoneNum}
						role={value.memberRole}
						fetchMembers={fetchMembers}
					/>
				);
			})}
		</div>
	);
};

export default MemberTable;

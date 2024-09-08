import axios from 'axios';
import { useState, useEffect } from 'react';
import MemberComponent from './MemberComponent';
import '../styles/MemberTable.css';
import { Member } from '@/interfaces/interfaces';

const MemberTable = ({
	role,
	setter,
	loading,
	setPage,
	members,
}: {
	role: string | undefined;
	setter: React.Dispatch<React.SetStateAction<boolean>>;
	loading: boolean;
	setPage: Function;
	members: Member[] | undefined;
}) => {
	//const [members, setMembers] = useState([]);
	const [selectedMembers, setSelectedMembers] = useState([]);
	const [newRole, setNewRole] = useState('');

	useEffect(() => {
		async function fetchMembers() {
			try {
				const response = await axios.get(`/members`, {
					params: { role: role },
				});
				// await new Promise(r => setTimeout(r, 1000));
				// setMembers([tempDB.data[0],tempDB.data[1]])
				// for (let i=0; i<tempDB.data.length; i++){
				//   setMembers([...members, tempDB.data[i]]);
				// }

				//setMembers(response.data.data);
				setter(false);

				// setLoading(false); // 멤버들을 모두 불러왔음을 표시
			} catch (error) {
				console.error('Error fetching members:', error);
			}
		}
		fetchMembers();
	}, [role]);

	// const handleCheckboxChange = (event, memberId) => {
	// 	if (event.target.checked) {
	// 		setSelectedMembers([...selectedMembers, memberId]);
	// 	} else {
	// 		setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
	// 	}
	// };

	// const handleRoleChange = (event) => {
	// 	setNewRole(event.target.value);
	// };

	// const handleSubmit = async () => {
	// 	if (selectedMembers.length === 0 || newRole === '') {
	// 		alert('Please select members and role');
	// 		return;
	// 	}

	// 	for (const memberId of selectedMembers) {
	// 		await patchMember(memberId, newRole);
	// 	}
	// 	window.location.reload();
	// };

	const patchMember = async (memberId: string, role: string) => {
		try {
			const response = await axios.patch(`/members/${memberId}`, null, {
				params: { role: role },
			});
			console.log('Role updated:', response.data);
		} catch (error) {
			console.error('Error updating role:', error);
		}
	};

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
				{/* <CircularProgress color="inherit" size={120} /> */}
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
						bgColor={'#fff'}
						setPage={setPage}
						hrEnable={true}
					/>
				);
			})}
		</div>
	);
};

export default MemberTable;

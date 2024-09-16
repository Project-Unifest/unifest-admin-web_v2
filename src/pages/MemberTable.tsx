import MemberComponent from './MemberComponent';
import '../styles/MemberTable.css';
import { Member } from '@/interfaces/interfaces';

const MemberTable = ({
	loading,
	members,
	fetchMembers,
}: {
	loading: boolean;
	members: Member[] | undefined;
	fetchMembers: Function;
}) => {
	//const [members, setMembers] = useState([]);

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
			{members.map((value) => {
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

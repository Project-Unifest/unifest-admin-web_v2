import { Booth } from '@/interfaces/interfaces';
import '@/components/BoothComponent.style.css';
const BoothComponent = ({ data }: { data: Booth }) => {
	return (
		<div style={{ marginTop: '30px' }}>
			<hr />
			<div style={{ marginTop: '35px', display: 'flex', flexDirection: 'row' }}>
				<img src={data.thumbnail} width="154px" height="154px"></img>
				<div className="columnFlexDiv">
					<div className="boothName">{data.name}</div>
					<div className="boothDesc">{data.description}</div>
					<div className="boothLocation">{data.location}</div>
				</div>
			</div>
		</div>
	);
};

export default BoothComponent;

import { moveBooth } from '@/apis/boothApi';
import {
	AdvancedMarker,
	InfoWindow,
	Marker,
	useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { useState } from 'react';

const getIconUrl = (category: string) => {
	switch (category) {
		case 'BAR':
			return 'https://unifest-prod-bucket.s3.ap-northeast-2.amazonaws.com/1153fda4-0f4e-443e-833a-e19e463627ad.svg%2Bxml';
		case 'FOOD':
			return 'https://unifest-dev-bucket.s3.ap-northeast-2.amazonaws.com/9cda2ca7-aaf4-4aa2-997c-69274d5c05b5.svg%2Bxml';
		case 'EVENT':
			return 'https://unifest-prod-bucket.s3.ap-northeast-2.amazonaws.com/dbcf244f-32fe-4bd2-be39-1db13f2f7d16.svg%2Bxml';
		case 'NORMAL':
		default:
			return 'https://unifest-prod-bucket.s3.ap-northeast-2.amazonaws.com/951adb8c-ee7f-4db3-9a54-5a9bff50d013.svg%2Bxml';
	}
};

export const BoothMarker = ({
	id,
	markerLat,
	markerLng,
	name,
	desc,
	category,
	img,
	onBoothMove,
}: {
	id: number;
	markerLat: number;
	markerLng: number;
	name: string;
	desc: string;
	category: string;
	img: string;
	onBoothMove: (id: number, lat: number, lng: number) => void;
}) => {
	const [infowindowOpen, setInfowindowOpen] = useState(false);
	const [markerRef, marker] = useAdvancedMarkerRef();

	const icon = getIconUrl(category);

	return (
		<>
			<AdvancedMarker
				ref={markerRef}
				onMouseEnter={() => setInfowindowOpen(true)}
				onMouseLeave={() => setInfowindowOpen(false)}
				onDragEnd={() => {
					const newPosition = marker?.position;
					if (newPosition) {
						// moveBooth 함수 호출
						moveBooth(id, newPosition.lat as number, newPosition.lng as number)
							.then(() => {
								onBoothMove(
									id,
									newPosition.lat as number,
									newPosition.lng as number,
								);
							})
							.catch((error) => {
								console.error('부스 이동 실패:', error); // 원본 에러 정보를 볼 수 있습니다.
								alert(
									'부스 이동 중 에러가 발생하였습니다.\n지속적으로 해당 현상이 발생하는 경우 로그아웃을 하고 시도해보시기 바랍니다.',
								);
							});
					}
				}}
				position={{ lat: markerLat, lng: markerLng }}
				clickable={false}
			>
				<img width={64} height={64} src={icon}></img>
			</AdvancedMarker>
			{infowindowOpen && (
				<InfoWindow anchor={marker} maxWidth={200} headerDisabled={true}>
					<div className="markerInfo">
						<h2>{name}</h2>
						<p
							style={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitLineClamp: 3, // 원하는 줄 수를 설정하세요. 여기서는 3줄로 제한합니다.
								WebkitBoxOrient: 'vertical',
								whiteSpace: 'normal',
							}}
						>
							{desc}
						</p>
					</div>
				</InfoWindow>
			)}
		</>
	);
};

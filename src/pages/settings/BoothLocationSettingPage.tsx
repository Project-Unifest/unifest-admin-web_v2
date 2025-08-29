import { getAllBooths, moveBooth } from '@/apis/boothApi';
import { Booth } from '@/interfaces/interfaces';
import { useEffect, useState } from 'react';

import '@/styles/SettingPage.css';
import { getAllFestivals } from '@/apis/festivalApi';
import {
	APIProvider,
	Map,
	MapMouseEvent,
	Marker,
} from '@vis.gl/react-google-maps';
import { BoothMarker } from '@/components/BoothMarker';

// var mapInstance: naver.maps.Map;
type positionChangeEvent = {
	x: number;
	y: number;
	_lat: number;
	_lng: number;
};

export type Festival = {
	festivalId: number;
	schoolId: number;
	thumbnail: string;
	schoolName: string;
	region: string;
	festivalName: string;
	beginDate: string;
	endDate: string;
	latitude: number;
	longitude: number;
};

let mapInstance: google.maps.Map;

const BoothLocationSettingPage = () => {
	const [boothList, setBoothList] = useState<Booth[]>([]);
	const [lat, setLat] = useState<number>(37.450696);
	const [lng, setLng] = useState<number>(127.128849);
	useEffect(() => {
		//하드 코딩
		getAllBooths(festivalId!).then((res) => {
			setBoothList([...res.data.data]);
		});
		getAllFestivals().then((res) => {
			[...res.data.data].forEach((value: Festival) => {
				festivals.push(value);
				if (value.schoolId === Number(schoolId)) {
					setLat(value.latitude);
					setLng(value.longitude);
					// initMap(value.latitude, value.longitude);
				}
			});
		});
	}, []);

	// @TODO

	const schoolId = localStorage.getItem('schoolId');
	const festivalId = localStorage.getItem('festivalId');
	const festivals: Festival[] = [];
	const onBoothMove = (id: number, lat: number, lng: number) => {
		// `map`을 사용하여 새로운 배열을 생성합니다.
		const updatedBoothList = boothList.map((booth) => {
			// id가 일치하는 부스를 찾습니다.
			if (booth.id === id) {
				// 새로운 lat와 lng를 가진 새 객체를 반환합니다.
				return {
					...booth, // 기존 부스의 나머지 속성들을 복사
					latitude: lat,
					longitude: lng,
				};
			}
			// id가 일치하지 않으면 기존 부스를 그대로 반환합니다.
			return booth;
		});

		// 새롭게 만들어진 배열로 상태를 갱신합니다.
		setBoothList(updatedBoothList);
	};
	return (
		<>
			<APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
				<Map
					mapId={import.meta.env.VITE_MAP_API_KEY}
					style={{ width: '100%', height: '80vh' }}
					defaultCenter={{ lat: lat, lng: lng }}
					defaultZoom={20}
					gestureHandling={'greedy'}
				>
					{boothList?.map((value) => (
						<BoothMarker
							key={value.id}
							id={value.id}
							markerLat={value.latitude}
							markerLng={value.longitude}
							name={value.name}
							desc={value.description}
							category={value.category}
							img={value.thumbnail}
							onBoothMove={onBoothMove}
						/>
					))}
				</Map>
				{/* <div id="map" style={{ width: '100%', height: '100vh' }}></div> */}
			</APIProvider>
		</>
	);
};

export default BoothLocationSettingPage;

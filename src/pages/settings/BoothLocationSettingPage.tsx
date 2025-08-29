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
	const [boothList, setBoothList] = useState<Booth[]>();
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
				console.log(value.schoolId, schoolId);
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
						/>
					))}
				</Map>
				{/* <div id="map" style={{ width: '100%', height: '100vh' }}></div> */}
			</APIProvider>
		</>
	);
};

export default BoothLocationSettingPage;

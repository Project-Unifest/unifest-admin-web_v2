import { getAllBooths, moveBooth } from '@/apis/boothApi';
import { Booth } from '@/interfaces/interfaces';
import { useEffect, useState } from 'react';

import '@/styles/SettingPage.css';
import { getAllFestivals } from '@/apis/festivalApi';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { CustomMarker } from '@/components/CustomMarker';

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

const BoothLocationSettingPage = () => {
	const [boothList, setBoothList] = useState<Booth[]>();
	const [lat, setLat] = useState<number>(37.450696);
	const [lng, setLng] = useState<number>(127.128849);

	const mapInstance = new google.maps.Map(
		document.getElementById('map') as HTMLElement,
		{
			center: { lat: lat, lng: lng },
			zoom: 20,
			gestureHandling: 'greedy',
			disableDefaultUI: true,
		},
	);
	// @TODO
	// const [boothMarkerList, setBoothMarkerList] = useState<naver.maps.Marker[]>();

	const schoolId = localStorage.getItem('schoolId');
	const festivalId = localStorage.getItem('festivalId');
	const festivals: Festival[] = [];

	const map = new // @TODO
	google.maps.useEffect(() => {
		// const _arr: google.maps.Marker[] = [];
		boothList?.forEach((value) => {
			const temp = new google.maps.Marker({
				position: new google.maps.LatLng(value.latitude, value.longitude),
				draggable: true,
			});
			switch (value.category) {
				case 'BAR':
					temp.setIcon(
						'https://unifest-prod-bucket.s3.ap-northeast-2.amazonaws.com/1153fda4-0f4e-443e-833a-e19e463627ad.svg%2Bxml',
					);
					break;
				case 'FOOD':
					temp.setIcon(
						'https://unifest-dev-bucket.s3.ap-northeast-2.amazonaws.com/9cda2ca7-aaf4-4aa2-997c-69274d5c05b5.svg%2Bxml',
					);
					break;
				case 'EVENT':
					temp.setIcon(
						'https://unifest-prod-bucket.s3.ap-northeast-2.amazonaws.com/dbcf244f-32fe-4bd2-be39-1db13f2f7d16.svg%2Bxml',
					);
					break;
				case 'NORMAL':
					temp.setIcon(
						'https://unifest-prod-bucket.s3.ap-northeast-2.amazonaws.com/951adb8c-ee7f-4db3-9a54-5a9bff50d013.svg%2Bxml',
					);
					break;
				default:
					temp.setIcon(
						'https://unifest-prod-bucket.s3.ap-northeast-2.amazonaws.com/951adb8c-ee7f-4db3-9a54-5a9bff50d013.svg%2Bxml',
					);
					break;
			}

			const contentString = [
				`<div className="markerInfo">`,
				`	<h3>${value.name}</h3>`,
				`	<p>${value.description}</p>`,
				`</div>`,
			].join('');
			var infowindow = new google.maps.InfoWindow({
				content: contentString,
			});

			temp.addListener('mouseover', () => {
				infowindow.open(mapInstance, temp);
			});
			google.maps.Event.addListener(temp);
			naver.maps.Event.addListener(temp, 'mouseout', () => {
				if (infowindow.getMap()) {
					infowindow.close();
				}
			});
			naver.maps.Event.addListener(
				temp,
				'position_changed',
				(e: positionChangeEvent) => {
					moveBooth(value.id, e._lat, e._lng);
					if (infowindow.getMap()) {
						infowindow.close();
					}
				},
			);
			_arr?.push(temp);
		});
		setBoothMarkerList(_arr);
		boothMarkerList;
	}, [boothList]);

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
			setBoothMarkerList([]);
		});
	}, []);
	// const initMap = (lat: number, lng: number) => {
	// 	// 추가 옵션 설정
	// 	const mapOptions = {
	// 		zoomControl: true,
	// 		zoomControlOptions: {
	// 			style: naver.maps.ZoomControlStyle.SMALL,
	// 			position: naver.maps.Position.TOP_RIGHT,
	// 		},
	// 		center: new naver.maps.LatLng(lat!, lng!),
	// 		zoom: 17,
	// 	};

	// 	// 지도 초기화 확인
	// 	mapInstance = new naver.maps.Map('map', mapOptions);
	// };
	// return true ? (
	// 	<div id="map" style={{ width: '100%', height: '1000px' }}></div>
	// ) : (
	// 	<></>
	// );
	return (
		<>
			<APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
				<div id="map" style={{ width: '100%', height: '100vh' }}></div>
			</APIProvider>
		</>
	);
};

export default BoothLocationSettingPage;

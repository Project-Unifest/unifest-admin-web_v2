import { getAllBooths, moveBooth } from '@/apis/boothApi';
import { Booth } from '@/interfaces/interfaces';
import { useEffect, useState } from 'react';

import '@/styles/SettingPage.css';
import { getAllFestivals } from '@/apis/festivalApi';

var mapInstance: naver.maps.Map;
type positionChangeEvent = {
	x: number;
	y: number;
	_lat: number;
	_lng: number;
};

type Festival = {
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
	const [boothMarkerList, setBoothMarkerList] = useState<naver.maps.Marker[]>();

	const [lat, setLat] = useState<number>(1);
	const [lng, setLng] = useState<number>(1);
	const schoolId = localStorage.getItem('schoolId');
	const festivals: Festival[] = [];

	useEffect(() => {
		const _arr: naver.maps.Marker[] = [];
		boothList?.forEach((value) => {
			const temp = new naver.maps.Marker({
				position: new naver.maps.LatLng(value.latitude, value.longitude),
				map: mapInstance,
				draggable: true,
			});
			switch (value.category) {
				case 'BAR':
					temp.setIcon(
						'https://unifest-dev-bucket.s3.ap-northeast-2.amazonaws.com/58c972ff-183c-4c6e-adb0-52fe0fadbe4d.svg%2Bxml',
					);
					break;
				case 'FOOD':
					temp.setIcon(
						'https://unifest-dev-bucket.s3.ap-northeast-2.amazonaws.com/9cda2ca7-aaf4-4aa2-997c-69274d5c05b5.svg%2Bxml',
					);
					break;
				case 'EVENT':
					temp.setIcon(
						'https://unifest-dev-bucket.s3.ap-northeast-2.amazonaws.com/a0e6b03c-d2e5-44a0-822b-26c87c98c217.svg%2Bxml',
					);
					break;
				case 'NORMAL':
					temp.setIcon(
						'https://unifest-dev-bucket.s3.ap-northeast-2.amazonaws.com/a092d342-9e06-426b-9d01-59e9ae944fcb.svg%2Bxml',
					);
					break;
				default:
					temp.setIcon(
						'https://unifest-dev-bucket.s3.ap-northeast-2.amazonaws.com/58c972ff-183c-4c6e-adb0-52fe0fadbe4d.svg%2Bxml',
					);
					break;
			}

			const contentString = [
				`<div className="markerInfo">`,
				`	<h3>${value.name}</h3>`,
				`	<p>${value.description}</p>`,
				`</div>`,
			].join('');
			var infowindow = new naver.maps.InfoWindow({
				content: contentString,
			});
			naver.maps.Event.addListener(temp, 'mouseover', () => {
				infowindow.open(mapInstance, temp);
			});
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
		initMap();
		//하드 코딩
		getAllBooths(schoolId!).then((res) => {
			setBoothList([...res.data.data]);
		});
		getAllFestivals().then((res) => {
			[...res.data.data].forEach((value: Festival) => {
				festivals.push(value);
				console.log(value.schoolId, Number(schoolId));
				if (value.schoolId === Number(schoolId)) {
					setLat(value.latitude);
					setLng(value.longitude);
				}
			});
		});
		setBoothMarkerList([]);
	}, []);
	const initMap = () => {
		// 추가 옵션 설정
		const mapOptions = {
			zoomControl: true,
			zoomControlOptions: {
				style: naver.maps.ZoomControlStyle.SMALL,
				position: naver.maps.Position.TOP_RIGHT,
			},
			center: new naver.maps.LatLng(lat!, lng!),
			zoom: 17,
		};

		// 지도 초기화 확인
		mapInstance = new naver.maps.Map('map', mapOptions);
	};
	return true ? (
		<div id="map" style={{ width: '100%', height: '1000px' }}></div>
	) : (
		<></>
	);
};

export default BoothLocationSettingPage;

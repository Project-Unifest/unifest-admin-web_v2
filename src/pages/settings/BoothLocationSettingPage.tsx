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
	const [boothMarkerList, setBoothMarkerList] = useState<naver.maps.Marker[]>();

	const schoolId = localStorage.getItem('schoolId');
	const festivalId = localStorage.getItem('festivalId');
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
					moveBooth(value.id, e._lat, e._lng)
						.then(() => {
							if (infowindow.getMap()) {
								infowindow.close();
							}
						})
						.catch((error) => {
							console.error('부스 이동 실패:', error); // 원본 에러 정보를 볼 수 있습니다.
							alert(
								'부스 이동 중 에러가 발생하였습니다.\n지속적으로 해당 현상이 발생하는 경우 로그아웃을 하고 시도해보시기 바랍니다.',
							);
							window.location.reload();
						});
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
					initMap(value.latitude, value.longitude);
				}
			});
			setBoothMarkerList([]);
		});
	}, []);
	const initMap = (lat: number, lng: number) => {
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

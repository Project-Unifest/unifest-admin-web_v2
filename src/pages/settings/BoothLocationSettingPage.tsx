import { getAllBooths, moveBooth } from '@/apis/boothApi';
import { Booth } from '@/interfaces/interfaces';
import { useEffect, useState } from 'react';

import '@/styles/SettingPage.css';

var mapInstance: naver.maps.Map;
type positionChangeEvent = {
	x: number;
	y: number;
	_lat: number;
	_lng: number;
};
const BoothLocationSettingPage = () => {
	const [boothList, setBoothList] = useState<Booth[]>();
	const [boothMarkerList, setBoothMarkerList] = useState<naver.maps.Marker[]>();

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
					temp.setIcon('src/assets/activity.svg');
					break;
				case 'FOOD':
					temp.setIcon('src/assets/food.svg');
					break;
				case 'EVENT':
					temp.setIcon('src/assets/school.svg');
					break;
				case 'NORMAL':
					temp.setIcon('src/assets/company.svg');
					break;
				default:
					temp.setIcon('src/assets/activity.svg');
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
				borderRadius: 5,
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
		getAllBooths('2').then((res) => {
			setBoothList([...res.data.data]);
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
			center: new naver.maps.LatLng(36.969868, 127.871726),
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

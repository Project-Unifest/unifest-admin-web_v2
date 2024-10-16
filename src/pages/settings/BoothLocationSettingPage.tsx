import { getAllBooths, moveBooth } from '@/apis/boothApi';
import { Booth } from '@/interfaces/interfaces';
import { useEffect, useState } from 'react';

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
				title: value.name,
				draggable: true,
			});
			naver.maps.Event.addListener(
				temp,
				'position_changed',
				(e: positionChangeEvent) => {
					moveBooth(value.id, e._lat, e._lng);
				},
			);
			_arr?.push(temp);
		});
		setBoothMarkerList(_arr);
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

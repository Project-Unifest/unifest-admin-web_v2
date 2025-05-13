import LocationIcon from '@/assets/location.svg';
import PlaceholderImg from '@/assets/placeholder.png';
import { Booth } from '@/interfaces/interfaces';
import { useNavigate, useParams } from 'react-router-dom';
import { getBooth } from '@/apis/boothApi';
import { useEffect, useState } from 'react';
import '@/styles/BoothDetail.style.css';

import BackIcon from '@/assets/back.svg';
const BoothDetailPage = () => {
	const { boothId } = useParams();
	const [boothDetailData, setBoothDetailData] = useState<Booth>();
	const navigator = useNavigate();
	useEffect(() => {
		getBooth(boothId!).then((res) => {
			setBoothDetailData(res.data.data);
		});
	}, []);
	const onClick = () => {
		navigator(-1);
	};
	return (
		<div>
			<div style={{ margin: '10px 0' }}>
				<img height={'20px'} src={BackIcon} onClick={onClick} />
			</div>
			<section className="booth-section">
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<img
						src={boothDetailData?.thumbnail || PlaceholderImg}
						style={{ maxHeight: '720px', width: 'auto' }}
						className="booth-thumbnail"
						alt="booth image"
					/>
				</div>
				<div className="booth-center-wrapper">
					<main className="booth-main">
						<div className="booth-info-container">
							<div className="booth-title-row">
								<h1 className="booth-title">{boothDetailData?.name || ''}</h1>
								<h2 className="booth-warning">
									{boothDetailData?.warning || ''}
								</h2>
							</div>
							<p className="booth-description">
								{boothDetailData?.description || ''}
							</p>
							<div className="booth-location-row">
								<img src={LocationIcon} />
								<p className="booth-location-text">
									{boothDetailData?.location || ''}
								</p>
							</div>
							{/* <Button variant="outline" size="full_sm">
	        위치 확인하기
	      </Button> */}
						</div>

						<div className="booth-menu-section">
							<h1 className="booth-menu-title">메뉴</h1>
							<ul className="booth-menu-list">
								{boothDetailData && boothDetailData.menus.length > 0 ? (
									boothDetailData.menus.map((dt, idx) => (
										<li className="booth-menu-item" key={dt.id + idx}>
											<img
												src={dt.imgUrl}
												width={86}
												height={86}
												className="booth-menu-image"
												alt={`food image ${idx}`}
											/>
											<div className="booth-menu-info">
												<h2 className="booth-menu-name">{dt.name}</h2>
												<h3 className="booth-menu-price">{dt.price}원</h3>
											</div>
										</li>
									))
								) : (
									<div className="booth-empty-menu">
										<p className="booth-empty-text">등록된 메뉴가 없어요</p>
									</div>
								)}
							</ul>
						</div>
					</main>
				</div>
			</section>
		</div>
	);
};

export default BoothDetailPage;

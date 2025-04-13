const FestivalSettingPage = () => {
	return (
		<>
			<div className="festivalSettingContainer">
				<div className="festivalSettingNameDiv">
					<div>축제 이름</div>
					<div>
						<input type="text"></input>
					</div>
				</div>
				<div className="festivalSettingDateDiv">
					<div>축제 시작일</div>
					<div>
						<input type="date"></input>
					</div>
					<div>축제 종료일</div>
					<div>
						<input type="date"></input>
					</div>
				</div>
				<div className="festivalSettingFileDiv">
					<div>축제 썸네일</div>
					<div>
						<input type="file"></input>
					</div>
				</div>
				<div className="festivalSettingBtnDiv">
					<div className="btnDiv5">수정 완료</div>
				</div>
			</div>
		</>
	);
};

export default FestivalSettingPage;

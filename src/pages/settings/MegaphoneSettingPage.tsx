import { useState } from 'react';
import '@/styles/MegaphoneSetting.style.css';
import { postMegaphone } from '@/apis/megaphoneApi';

const MegaphoneSettingPage = () => {
	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const handleButtonClick = () => {
		postMegaphone(inputValue).catch((error) => {
			console.error('공지사항 전파 실패:', error); // 원본 에러 정보를 볼 수 있습니다.
			alert('공지사항 전파 중 문제가 발생했습니다');
		});
	};
	return (
		<div className="input-container">
			<div className="input-wrapper">
				<input
					type="text"
					className="text-input"
					value={inputValue}
					onChange={handleInputChange}
					placeholder="텍스트를 입력하세요..."
				/>
				<button className="submit-button" onClick={handleButtonClick}>
					확인
				</button>
			</div>
		</div>
	);
};

export default MegaphoneSettingPage;

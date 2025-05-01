import { getAllStampBooths } from '@/apis/stampApi';
import { useEffect, useRef, useState } from 'react';
import '@/styles/SettingPage.css';
import downloadIcon from '@/assets/download.svg';
import { QRCodeSVG } from 'qrcode.react';

type StampBoothsQR = {
	name: string;
	id: number;
};
const StampQRSettingPage = () => {
	const [chkList, setChkList] = useState<StampBoothsQR[]>([]);
	const qrList = useRef<(SVGSVGElement | null)[]>([]);
	const festivalId = localStorage.getItem('festivalId');

	useEffect(() => {
		getAllStampBooths(festivalId!).then((res) => {
			const _arr: StampBoothsQR[] = [];
			res.data.data.forEach((value) => {
				_arr.push({
					name: value.name,
					id: value.id,
				});
			});
			setChkList(_arr);
		});
	}, []);

	const downloadData = (url: string, fileName: string) => {
		fetch(url)
			.then((response) => response.blob())
			.then((blob) => {
				const link = document.createElement('a');
				link.href = URL.createObjectURL(blob);
				link.download = fileName;
				link.click();
			})
			.catch(console.error);
	};
	const downloadQRHandler = (
		qrRef: SVGSVGElement | null,
		data: StampBoothsQR,
	) => {
		if (qrRef === null) {
			alert(
				'다운로드 과정에 문제가 발생하였습니다. 유니페스 개발팀에 문의바랍니다',
			);
			return;
		}
		const _qrRef = qrRef;
		_qrRef.setAttribute('width', '1024');
		_qrRef.setAttribute('height', '1024');
		const serializer = new XMLSerializer();
		const url =
			'data:image/svg+xml;charset=utf-8,' +
			encodeURIComponent(
				'<?xml version="1.0" standalone="no"?>' +
					serializer.serializeToString(_qrRef),
			);

		let canvas = document.createElement('canvas');
		canvas.width = 1024;
		canvas.height = 1024;

		let img = new Image();
		let ctx = canvas.getContext('2d');
		img.src = url;
		img.onload = () => {
			ctx?.drawImage(img, 0, 0);
			let pngUrl = canvas.toDataURL('image/png');
			downloadData(pngUrl, data.name + '.png');
		};
		_qrRef.setAttribute('width', '240');
		_qrRef.setAttribute('height', '240');
	};
	const downloadAllQRHandler = () => {
		qrList.current.forEach((value, index) => {
			downloadQRHandler(value, chkList[index]);
		});
	};

	return (
		<>
			<div className="btnDiv5" onClick={downloadAllQRHandler}>
				전체 다운로드
			</div>
			<div className="QRContainer">
				{chkList.map((value, index) => {
					return (
						<div className="QRWrap">
							<QRCodeSVG
								ref={(el) => (qrList.current[index] = el)}
								value={value.id.toString()}
								size={240}
								title={value.id.toString()}
								marginSize={1}
							/>
							<div className="QRComponent">{value.name}</div>
							<div
								className="QRDownload"
								onClick={() => {
									downloadQRHandler(qrList.current[index], value);
								}}
							>
								다운로드
								<img src={downloadIcon}></img>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default StampQRSettingPage;

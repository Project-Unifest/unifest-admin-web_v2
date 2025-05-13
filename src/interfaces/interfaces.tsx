export interface Member {
	id: number;
	email: string;
	booths: Booth[];
	schoolId: number;
	phoneNum: string;
	memberRole: string;
}
export interface Booth {
	id: number;
	name: string;
	category: string;
	description: string;
	thumbnail: string;
	warning: string;
	location: string;
	latitude: number;
	longitude: number;
	menus: Menu[];
	enabled: boolean;
	waitingEnabled: boolean;
	stampEnabled: boolean;
	openTime: string;
	closeTime: string;
}

export interface Menu {
	id: number;
	name: string;
	price: number;
	imgUrl: string;
	menuStatus: string;
}

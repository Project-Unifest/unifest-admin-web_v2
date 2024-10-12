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
	menus: [];
	enabled: boolean;
	waitingEnabled: boolean;
	stampEnabled: boolean;
	openTime: string;
	closeTime: string;
}

export interface userInfo {
	isLogged: boolean;
	accountType?: string;
	userInfo?: {
		name: string;
		preferences: Array<string>;
	};
}

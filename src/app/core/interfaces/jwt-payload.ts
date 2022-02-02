export interface jwtPayload {
	email: string,
	employer?: boolean,
	iat: number,
	exp: number
}

import * as httpResquest from "../utils/httpResquest"

export const getProfile = async () => {
	try {
		const response = await httpResquest.get("/profile")
		return response
	} catch (error) {
		console.log(error)
	}
}

export const updateProfile = async (profile) => {
	try {
		const response = await httpResquest.update("/profile", profile)
		return response
	} catch (error) {
		console.log(error)
	}
}

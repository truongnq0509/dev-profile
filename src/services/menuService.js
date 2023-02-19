import * as httpResquest from "../utils/httpResquest"

export const getAllMenu = async () => {
	try {
		const response = await httpResquest.get("/menu")
		return response
	} catch (error) {
		console.log(error)
	}
}

export const getMenu = async (id) => {
	try {
		const response = await httpResquest.get(`/menu/${id}`)
		return response
	} catch (error) {
		console.log(error)
	}
}

export const addMenu = async (menu) => {
	try {
		const response = await httpResquest.post("/menu", menu)
		return response
	} catch (error) {
		console.log(error)
	}
}

export const deleteMenu = async (id) => {
	try {
		const response = await httpResquest.remove(`/menu/${id}`)
		return response
	} catch (error) {
		console.log(error)
	}
}

export const updateMenu = async (id, menu) => {
	try {
		const response = await httpResquest.update(`/menu/${id}`, menu)
		return response
	} catch (error) {
		console.log(error)
	}
}

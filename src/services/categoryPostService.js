import * as httpResquest from "../utils/httpResquest"

export const getCategoryPosts = async () => {
	try {
		const response = await httpResquest.get("/categoryPosts")
		return response
	} catch (error) {
		console.log(error)
	}
}

export const getCategoryPost = async (id) => {
	try {
		const response = await httpResquest.get(`/categoryPosts/${id}?_embed=posts`)
		return response
	} catch (error) {
		console.log(error)
	}
}

export const addCategoryPost = async (category) => {
	try {
		const response = await httpResquest.post(`/categoryPosts`, category)
		return response
	} catch (error) {
		console.log(error)
	}
}

export const deleteCategoryPost = async (id) => {
	try {
		const response = await httpResquest.remove(`/categoryPosts/${id}`)
		return response
	} catch (error) {
		console.log(error)
	}
}

export const updateCategoryPost = async (id, category) => {
	try {
		const response = await httpResquest.update(`/categoryPosts/${id}`, category)
		return response
	} catch (error) {
		console.log(error)
	}
}

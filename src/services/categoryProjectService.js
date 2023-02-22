import * as httpResquest from "../utils/httpResquest"

export const getCategoryProjects = async () => {
	try {
		const response = await httpResquest.get("/categoryProjects?_embed=projects")
		return response
	} catch (error) {
		console.log(error)
	}
}

export const getCategoryProject = async (id) => {
	try {
		const response = await httpResquest.get(`/categoryProjects/${id}?_embed=projects`)
		return response
	} catch (error) {
		console.log(error)
	}
}

export const addCategoryProject = async (category) => {
	try {
		const response = await httpResquest.post(`/categoryProjects`, category)
		return response
	} catch (error) {
		console.log(error)
	}
}

export const deleteCategoryProject = async (id) => {
	try {
		const response = await httpResquest.remove(`/categoryProjects/${id}`)
		return response
	} catch (error) {
		console.log(error)
	}
}

export const updateCategoryProject = async (id, category) => {
	try {
		const response = await httpResquest.update(`/categoryProjects/${id}`, category)
		return response
	} catch (error) {
		console.log(error)
	}
}

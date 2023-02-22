import * as httpResquest from "../utils/httpResquest"

export const getProjects = async () => {
	try {
		const response = await httpResquest.get("/projects?_expand=categoryProject&_sort=createdAt&_order=desc")
		return response
	} catch (error) {
		console.log(error)
	}
}

export const getProject = async (id) => {
	try {
		const response = await httpResquest.get(`/projects/${id}?_expand=categoryProject`)
		return response
	} catch (error) {
		console.log(error)
	}
}

export const addProject = async (project) => {
	try {
		const response = await httpResquest.post("/projects", project)
		return response
	} catch (error) {
		console.log(error)
	}
}

export const deleteProject = async (id) => {
	try {
		const response = await httpResquest.remove(`/projects/${id}`)
		return response
	} catch (error) {
		console.log(error)
	}
}

export const updateProject = async (id, project) => {
	try {
		const response = await httpResquest.update(`/projects/${id}`, project)
		return response
	} catch (error) {
		console.log(error)
	}
}

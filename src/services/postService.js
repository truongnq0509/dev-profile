import * as httpResquest from "../utils/httpResquest"

export const getPosts = async () => {
	try {
		const response = await httpResquest.get("/posts?_expand=categoryPost&_sort=createdAt&_order=desc")
		return response
	} catch (error) {
		console.log(error)
	}
}

export const getPost = async (id) => {
	try {
		const response = await httpResquest.get(`/posts/${id}?_expand=categoryPost`)
		return response
	} catch (error) {
		console.log(error)
	}
}

export const addPost = async (post) => {
	try {
		const response = await httpResquest.post("/posts", post)
		return response
	} catch (error) {
		console.log(error)
	}
}

export const deletePost = async (id) => {
	try {
		const response = await httpResquest.remove(`/posts/${id}`)
		return response
	} catch (error) {
		console.log(error)
	}
}

export const updatePost = async (id, post) => {
	try {
		const response = await httpResquest.update(`/posts/${id}`, post)
		return response
	} catch (error) {
		console.log(error)
	}
}

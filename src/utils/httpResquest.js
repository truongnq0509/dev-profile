import axios from "axios"

const instance = axios.create({
	baseURL: __ENV__.VITE_API_URL,
})

export const get = async (path, options = {}) => {
	const response = await instance.get(path, options)
	return response.data
}

export const post = async (path, options = {}) => {
	const response = await instance.post(path, options)
	return response.data
}

export const remove = async (path, options = {}) => {
	const response = await instance.delete(path, options)
	return response.data
}

export const update = async (path, options = {}) => {
	const response = await instance.put(path, options)
	return response.data
}

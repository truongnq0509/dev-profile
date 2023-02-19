import axios from "axios"

export const apiUploadImage = async (data) => {
	const response = await axios({
		method: "POST",
		url: `https://api.cloudinary.com/v1_1/${__ENV__.VITE_CLOUDNAME}/image/upload`,
		data,
	})
	return response?.data
}

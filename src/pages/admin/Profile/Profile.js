import classNames from "classnames/bind"
import moment from "moment/moment"
import { v4 as uuidv4 } from "uuid"
import * as Yup from "yup"
import { Button } from "../../../components/Button"
import { Loading } from "../../../components/Loading"
import { ToastMessage } from "../../../components/ToastMessage"
import { html, router, useEffect, useState, useTitle } from "../../../lib"
import { getProfile, updateProfile } from "../../../services/profileService"
import { apiUploadImage } from "../../../services/uploadService"
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "../../../utils/fnc"
import styles from "./Profile.module.scss"

const cx = classNames.bind(styles)

const ProfilePage = () => {
	const [preview, setPreview] = useState("")
	const [isLoading, setIsLoading] = useState(true)
	const [profile, setProfile] = useState({})
	const [errors, setErrors] = useState({
		name: "",
		avatar: "",
		cv: "",
		phone: "",
		email: "",
		brithday: "",
		location: "",
		facebook: "",
		github: "",
		instagram: "",
		introduction: "",
	})
	const [title, setTitle] = useTitle(`Dev ~ CV | Cập Nhật CV`)

	useEffect(() => {
		const fetchApi = async () => {
			const response = await getProfile()
			setProfile(response)
			setPreview(response?.avatar)
			setLocalStorage("PROFILE_UPDATE", response)
			setIsLoading(false)
		}
		fetchApi()
	}, [])

	useEffect(() => {
		const form = document.getElementById("form-add")
		const file = document.getElementById(`${cx("form__image")}`)
		const inputs = document.querySelectorAll(`.${cx("form__input")}`)
		const textarea = document.querySelector(`.${cx("form__textarea")}`)
		const images = new FormData()
		const now = moment()
		let newProfile = {}
		let schema = Yup.object().shape({
			name: Yup.string().required("Trường này không được để trống"),
			avatar: Yup.string().url("Link không hợp lệ !!!").required("Trường này không được để trống"),
			cv: Yup.string().url("Link không hợp lệ !!!").required("Trường này không được để trống"),
			phone: Yup.string()
				.matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ !!!")
				.required("Trường này không được để trống"),
			email: Yup.string().email("Email không hợp lệ !!!").required("Trường này không được để trống"),
			brithday: Yup.string().required("Trường này không được để trống"),
			location: Yup.string().required("Trường này không được để trống"),
			facebook: Yup.string().url("Link không hợp lệ").required("Trường này không được để trống"),
			github: Yup.string().url("Link không hợp lệ").required("Trường này không được để trống"),
			instagram: Yup.string().url("Link không hợp lệ").required("Trường này không được để trống"),
			introduction: Yup.string().required("Trường này không được để trống"),
		})

		// Một ảnh
		file.addEventListener("change", async (e) => {
			const file = e.target.files[0]
			images.append("file", file)
			images.append("upload_preset", __ENV__.VITE_UPLOAD_ASSECTS_NAME)
			setIsLoading(true)
			const image = await apiUploadImage(images)
			setPreview(image.secure_url)
			setIsLoading(false)
		})

		// Handle blur input
		const handleBlur = async (e) => {
			const { name, value } = e.target
			const formData = new FormData(form)

			for (let [key, value] of formData) {
				newProfile[key] = value.trim()
			}

			setLocalStorage("PROFILE_UPDATE", newProfile)

			try {
				await schema.validateAt(name, { [name]: value })
				setErrors({
					...errors,
					[name]: "",
				})
			} catch (error) {
				setErrors({
					...errors,
					[name]: error.message,
				})
			}
		}

		inputs.forEach((input) => {
			input.addEventListener("blur", handleBlur)
		})

		textarea.addEventListener("blur", handleBlur)

		// Submit form
		form.addEventListener("submit", async (e) => {
			e.preventDefault()
			const formData = new FormData(form)

			for (let [key, value] of formData) {
				newProfile[key] = value.trim()
			}

			newProfile = {
				...newProfile,
				avatar: preview,
				currentJobs: profile?.currentJobs,
			}

			// Luu localstorage
			setLocalStorage("PROFILE_UPDATE", newProfile)

			try {
				await schema.validate(newProfile, { abortEarly: false })
				await updateProfile(newProfile)
				removeLocalStorage("PROFILE_UPDATE")
				setTimeout(
					() =>
						ToastMessage({
							title: "Thành Công",
							type: "success",
							content: "Cập nhật CV thành công",
							duration: 1000,
						}),
					500
				)
			} catch (error) {
				const yupErrors = {}
				error.inner.forEach((innerError) => {
					yupErrors[innerError.path] = innerError.message
				})
				setErrors(yupErrors)
			}
		})
	})

	return html`
		<div class="row">
			<div class="col-12">
				<div class="${cx("title")}">
					<h1>Cập Nhật CV</h1>
				</div>
			</div>
		</div>
		<div class="col-12">
			<form id="form-add" action="" class="${cx("form")}" enctype="multipart/form-data">
				<div class="row g-5">
					<div class="col-12 ${cx("form__cover")}">
						<div class="${cx("form__file")}">
							<label for="form__image">
								${!isLoading &&
								!preview &&
								`
							<svg
							width="64px"
							height="64px"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
							<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
							<g id="SVGRepo_iconCarrier">
								<path
									d="M21.6799 16.9599L18.5499 9.64988C17.4899 7.16988 15.5399 7.06988 14.2299 9.42988L12.3399 12.8399C11.3799 14.5699 9.58993 14.7199 8.34993 13.1699L8.12993 12.8899C6.83993 11.2699 5.01993 11.4699 4.08993 13.3199L2.36993 16.7699C1.15993 19.1699 2.90993 21.9999 5.58993 21.9999H18.3499C20.9499 21.9999 22.6999 19.3499 21.6799 16.9599Z"
									stroke="#ffffff"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
								<path
									d="M6.96997 8C8.62682 8 9.96997 6.65685 9.96997 5C9.96997 3.34315 8.62682 2 6.96997 2C5.31312 2 3.96997 3.34315 3.96997 5C3.96997 6.65685 5.31312 8 6.96997 8Z"
									stroke="#ffffff"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
							</g>
							</svg>`}
								${isLoading && Loading({ small: true })} ${preview && `<img src="${preview}" />`}
							</label>
							<input type="file" id="${cx("form__image")}" accept=".png, jpg" />
							${errors?.image && `<span class="${cx("form__mess")}">${errors?.image}</span>`}
						</div>
					</div>
					<div class="col-12 ${cx("form__content")}">
						<div class="row">
							<div class="col-12">
								<div class="row">
									<div class="col-6">
										<input
											class="${cx("form__input")}"
											name="name"
											type="text"
											value="${getLocalStorage("PROFILE_UPDATE")?.name?.trim() || ""}"
										/>
										${errors?.name && `<span class="${cx("form__mess")}">${errors?.name}</span>`}
									</div>
									<div class="col-6">
										<input
											class="${cx("form__input")}"
											name="email"
											type="text"
											value="${getLocalStorage("PROFILE_UPDATE")?.email?.trim() || ""}"
										/>
										${errors?.email && `<span class="${cx("form__mess")}">${errors?.email}</span>`}
									</div>
									<div class="col-6">
										<input
											class="${cx("form__input")}"
											name="phone"
											type="text"
											value="${getLocalStorage("PROFILE_UPDATE")?.phone?.trim() || ""}"
										/>
										${errors?.phone && `<span class="${cx("form__mess")}">${errors?.phone}</span>`}
									</div>
									<div class="col-6">
										<input
											class="${cx("form__input")}"
											name="brithday"
											type="text"
											value="${getLocalStorage("PROFILE_UPDATE")?.brithday?.trim() || ""}"
										/>
										${errors?.brithday &&
										`<span class="${cx("form__mess")}">${errors?.brithday}</span>`}
									</div>
									<div class="col-12">
										<input
											class="${cx("form__input")}"
											name="cv"
											type="text"
											value="${getLocalStorage("PROFILE_UPDATE")?.cv?.trim() || ""}"
										/>
										${errors?.cv && `<span class="${cx("form__mess")}">${errors?.cv}</span>`}
									</div>
									<div class="col-12">
										<input
											class="${cx("form__input")}"
											name="location"
											type="text"
											value="${getLocalStorage("PROFILE_UPDATE")?.location?.trim() || ""}"
										/>
										${errors?.location &&
										`<span class="${cx("form__mess")}">${errors?.location}</span>`}
									</div>

									<div class="col-12">
										<input
											class="${cx("form__input")}"
											name="facebook"
											type="text"
											value="${getLocalStorage("PROFILE_UPDATE")?.facebook?.trim() || ""}"
										/>
										${errors?.facebook &&
										`<span class="${cx("form__mess")}">${errors?.facebook}</span>`}
									</div>
									<div class="col-12">
										<input
											class="${cx("form__input")}"
											name="github"
											type="text"
											value="${getLocalStorage("PROFILE_UPDATE")?.github?.trim() || ""}"
										/>
										${errors?.github &&
										`<span class="${cx("form__mess")}">${errors?.github}</span>`}
									</div>
									<div class="col-12">
										<input
											class="${cx("form__input")}"
											name="instagram"
											type="text"
											value="${getLocalStorage("PROFILE_UPDATE")?.instagram?.trim() || ""}"
										/>
										${errors?.instagram &&
										`<span class="${cx("form__mess")}">${errors?.instagram}</span>`}
									</div>
									<div class="col-12">
										<textarea id="text" name="introduction" class="${cx("form__textarea")}">
${getLocalStorage("PROFILE_UPDATE")?.introduction || ""}</textarea
										>
										${errors?.introduction &&
										`<span class="${cx("form__mess")}">${errors?.introduction}</span>`}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-12 gx-0">${Button({ title: "Cập Nhật CV" })}</div>
				</div>
			</form>
		</div>
	`
}

export default ProfilePage

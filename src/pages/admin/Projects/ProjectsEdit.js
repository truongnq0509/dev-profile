import classNames from "classnames/bind"
import moment from "moment/moment"
import { Button } from "../../../components/Button"
import { Loading } from "../../../components/Loading"
import { html, router, useEffect, useState, useTitle } from "../../../lib"
import { getCategoryProjects as apiGetCategoryProjects } from "../../../services/categoryProjectService"
import { getProject as apiGetProject, updateProject as apiUpdateProject } from "../../../services/projectService"
import { apiUploadImage } from "../../../services/uploadService"
import styles from "./Projects.module.scss"
import { ToastMessage } from "../../../components/ToastMessage"
import * as Yup from "yup"
import { getLocalStorage, setLocalStorage, removeLocalStorage } from "../../../utils/fnc"

const cx = classNames.bind(styles)

const EditProjectsPage = ({ data }) => {
	const [categories, setCategories] = useState([])
	const [project, setProject] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	const [preview, setPreview] = useState({
		image: "",
		gallery: [],
	})
	const [errors, setErrors] = useState({
		id: "",
		name: "",
		description: "",
		technology: "",
		url: "",
		repository: "",
		image: "",
	})
	const [title, setTitle] = useTitle(`Dev ~ Blog | Cập Nhật Sự Án`)
	const { id } = data

	useEffect(() => {
		const fetchApi = async () => {
			const [res1, res2] = await Promise.all([apiGetCategoryProjects(), apiGetProject(id)])
			setCategories(res1)
			setProject(res2)
			setPreview({
				...preview,
				image: res2?.image,
				gallery: res2?.gallery,
			})
			setLocalStorage("PROJECT", res2)
			setIsLoading(false)
		}

		fetchApi()
	}, [])

	useEffect(() => {
		const form = document.getElementById("form-add")
		const files = document.getElementById(`${cx("form__images")}`)
		const file = document.getElementById(`${cx("form__image")}`)
		const btns = document.querySelectorAll(`.${cx("icon")}`)
		const images = new FormData()
		const now = moment()
		let newProject = {
			id,
			createdAt: project?.createdAt,
			updatedAt: now.format(),
		}
		let gallery = []

		// Một ảnh
		file.addEventListener("change", async (e) => {
			const file = e.target.files[0]
			images.append("file", file)
			images.append("upload_preset", __ENV__.VITE_UPLOAD_ASSECTS_NAME)
			setIsLoading(true)
			const image = await apiUploadImage(images)
			setPreview({
				...preview,
				image: image.secure_url,
			})
			setIsLoading(false)
		})

		// Nhiều ảnh
		files.addEventListener("change", async (e) => {
			const files = e.target.files
			for (let file of files) {
				images.append("file", file)
				images.append("upload_preset", __ENV__.VITE_UPLOAD_ASSECTS_NAME)
				setIsLoading(true)
				const image = await apiUploadImage(images)
				gallery.push(image?.secure_url)
			}

			setPreview({
				...preview,
				gallery: [...preview?.gallery, ...gallery],
			})
			setIsLoading(false)
		})

		form.addEventListener("submit", async (e) => {
			e.preventDefault()
			const formData = new FormData(form)
			const schema = Yup.object().shape({
				id: Yup.string().required("Trường này không được để trống"),
				name: Yup.string().required("Trường này không được để trống"),
				description: Yup.string().required("Trường này không được để trống"),
				technology: Yup.string().required("Trường này không được để trống"),
				url: Yup.string().url("Link không hợp lệ !!!").required("Trường này không được để trống"),
				repository: Yup.string().url("Link không hợp lệ !!!").required("Trường này không được để trống"),
				image: Yup.string().required("Trường này không được để trống"),
			})

			for (let [key, value] of formData) {
				newProject = { ...newProject, [key]: value.trim() }
			}

			setLocalStorage("PROJECT", newProject)

			newProject = {
				...newProject,
				image: preview?.image,
				gallery: [...preview?.gallery],
			}

			try {
				await schema.validate(newProject, { abortEarly: false })
				await apiUpdateProject(id, newProject)
				removeLocalStorage("PROJECT")
				router.navigate("/admin/projects")
				setTimeout(() => {
					ToastMessage({
						title: "Thành Công",
						type: "success",
						content: "Chỉnh sửa dự án thành công",
						duration: 1000,
					})
				}, 500)
			} catch (error) {
				const yupErrors = {}
				error.inner.forEach((innerError) => {
					yupErrors[innerError.path] = innerError.message
				})
				setErrors(yupErrors)
			}
		})

		// Xóa ảnh
		for (let btn of btns) {
			const src = btn.dataset.src
			btn.addEventListener("click", () => {
				const newPreview = preview?.gallery.filter((item) => item != src)
				setPreview({
					...preview,
					gallery: [...newPreview],
				})
			})
		}
	})

	return html`
		<div class="row">
			<div class="col-12">
				<div class="${cx("title")}">
					<h1>Cập Nhật Dự Án</h1>
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
								!preview?.image &&
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
								${isLoading && Loading({ small: true })}
								${preview?.image && `<img src="${preview?.image}" />`}
							</label>
							<input type="file" id="${cx("form__image")}" accept=".png, .jpg" />
						</div>
					</div>
					<div class="col-12 ${cx("form__content")}">
						<div class="row">
							<div class="col-12">
								<input
									class="${cx("form__input")}"
									name="name"
									type="text"
									placeholder="Tiêu Đề"
									value="${getLocalStorage("PROJECT")?.name}"
								/>
								${errors?.name && `<span class="${cx("form__mess")}">${errors?.name}</span>`}
							</div>
							<div class="col-12">
								<textarea
									id="text"
									name="description"
									class="${cx("form__textarea")}"
									placeholder="Mô Tả"
								>
${getLocalStorage("PROJECT")?.description}</textarea
								>
								${errors?.description &&
								`<span class="${cx("form__mess")}">${errors?.description}</span>`}
							</div>
							<div class="col-6">
								<input
									class="${cx("form__input")}"
									type="text"
									name="url"
									placeholder="Preview"
									value="${getLocalStorage("PROJECT")?.url}"
								/>
								${errors?.url && `<span class="${cx("form__mess")}">${errors?.url}</span>`}
							</div>
							<div class="col-6">
								<input
									class="${cx("form__input")}"
									type="text"
									name="repository"
									placeholder="Github"
									value="${getLocalStorage("PROJECT")?.repository}"
								/>
								${errors?.repository &&
								`<span class="${cx("form__mess")}">${errors?.repository}</span>`}
							</div>
							<div class="col-6">
								<input
									class="${cx("form__input")}"
									type="text"
									name="technology"
									placeholder="Công Nghệ"
									value="${getLocalStorage("PROJECT")?.technology}"
								/>
								${errors?.technology &&
								`<span class="${cx("form__mess")}">${errors?.technology}</span>`}
							</div>
							<div class="col-6">
								<select
									class="form-select ${cx("form__select")}"
									name="categoryProjectId"
									aria-label="Default select example"
								>
									${categories?.map((category, index) => {
										return `
												<option value="${category.id}" 
												${category?.id == getLocalStorage("PROJECT")?.categoryProjectId ? `selected` : ""} >${category.name}</option>
											`
									})}
								</select>
							</div>
						</div>
					</div>
					<div class="col-12 gx-5 ${cx("form__covers")}">
						<div class="${cx("form__files")}">
							<label for="form__images">
								${!isLoading
									? `
									<svg width="64px" height="64px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>ionicons-v5-e</title><path d="M432,112V96a48.14,48.14,0,0,0-48-48H64A48.14,48.14,0,0,0,16,96V352a48.14,48.14,0,0,0,48,48H80" style="fill:none;stroke:#ffc9c9;stroke-linejoin:round;stroke-width:32px"></path><rect x="96" y="128" width="400" height="336" rx="45.99" ry="45.99" style="fill:none;stroke:#ffc9c9;stroke-linejoin:round;stroke-width:32px"></rect><ellipse cx="372.92" cy="219.64" rx="30.77" ry="30.55" style="fill:none;stroke:#ffc9c9;stroke-miterlimit:10;stroke-width:32px"></ellipse><path d="M342.15,372.17,255,285.78a30.93,30.93,0,0,0-42.18-1.21L96,387.64" style="fill:none;stroke:#ffc9c9;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></path><path d="M265.23,464,383.82,346.27a31,31,0,0,1,41.46-1.87L496,402.91" style="fill:none;stroke:#ffc9c9;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></path></g></svg>
								`
									: Loading({ small: true })}
							</label>
							<input type="file" id="${cx("form__images")}" accept=".png, .jpg" multiple />
						</div>
					</div>
					${preview?.gallery?.length !== 0 &&
					`<div class="col-12">
						<h4>Ảnh đã chọn</h4>
					</div>`}
					${preview?.gallery.map((item) => {
						return `
							<div class="col-2">
								<div class="${cx("preview")}">
									<img
										src="${item}"
									/>
									<span 
										class="${cx("icon")}"
										data-src="${item}"
									>
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
											<path
												d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z"
											></path>
										</svg>
									</span>
								</div>
							</div>
						`
					})}
					<div class="col-12 gx-0">${Button({ title: "Cập Nhật Dự Án" })}</div>
				</div>
			</form>
		</div>
	`
}

export default EditProjectsPage

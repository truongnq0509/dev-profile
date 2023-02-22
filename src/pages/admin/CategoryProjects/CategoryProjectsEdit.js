import { html, router, useEffect, useState, useTitle } from "../../../lib"
import classNames from "classnames/bind"
import styles from "./CategoryProjects.module.scss"
import { Button } from "../../../components/Button"
import {
	getCategoryProject as apiGetCategoryProject,
	updateCategoryProject as apiUpdateCategoryProject,
} from "../../../services/categoryProjectService"
import { getLocalStorage, setLocalStorage, removeLocalStorage } from "../../../utils/fnc"
import * as Yup from "yup"
import { ToastMessage } from "../../../components/ToastMessage"

const cx = classNames.bind(styles)

const EditCategoryPostsPage = ({ data }) => {
	const [category, setCategory] = useState({})
	const [title, setTitle] = useTitle(`Dev ~ Blog | Sửa Dự Án`)
	const [errors, setErrors] = useState({
		id: "",
		name: "",
	})
	const { id } = data

	useEffect(() => {
		const fetchApi = async () => {
			const response = await apiGetCategoryProject(id)
			setCategory(response)
			setLocalStorage("CATEGORY", response)
		}
		fetchApi()
	}, [])

	useEffect(() => {
		const form = document.getElementById("form-add")
		const inputs = document.querySelectorAll(`.${cx("form__input")}`)
		let newCategory = {
			id,
		}
		let schema = Yup.object().shape({
			id: Yup.string().required("Trường này không được để trống"),
			name: Yup.string().required("Trường này không được để trống"),
		})

		// Handle blur input
		const handleBlur = async (e) => {
			const { name, value } = e.target
			const formData = new FormData(form)

			for (let [key, value] of formData) {
				category[key] = value.trim()
			}

			setLocalStorage("CATEGORY", category)

			try {
				await schema.validateAt(name, { [name]: value.trim() })
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

		// Handle submit
		form.addEventListener("submit", async (e) => {
			e.preventDefault()
			const formData = new FormData(form)

			for (let [key, value] of formData) {
				newCategory[key] = value
			}

			setLocalStorage("CATEGORY", newCategory)

			try {
				await schema.validate(newCategory, { abortEarly: false })
				await apiUpdateCategoryProject(id, newCategory)
				removeLocalStorage("CATEGORY")
				router.navigate("/admin/category-projects")
				setTimeout(() => {
					ToastMessage({
						title: "Thành Công",
						type: "success",
						content: "Cập nhật dự án thành công",
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
	})

	return html`
		<div class="row">
			<div class="col-12">
				<div class="${cx("title")}">
					<h1>Sửa Dự Án</h1>
				</div>
			</div>
		</div>
		<div class="col-12">
			<form id="form-add" action="" class="${cx("form")}" enctype="multipart/form-data">
					<div class="col-12">
						<input 
							class="${cx("form__input")}" 
							name="name" 
							value="${getLocalStorage("CATEGORY")?.name}" 
							type="text" 
							placeholder="Loại" 
						/>
						${errors?.name && `<span class="${cx("form__mess")}">${errors?.name}</span>`}
					</div>
					<div class="col-12 gx-0">${Button({ title: "Cập Nhật" })}</div>
				</div>
			</form>
		</div>
	`
}

export default EditCategoryPostsPage

import classNames from "classnames/bind"
import { v4 as uuidv4 } from "uuid"
import * as Yup from "yup"
import { Button } from "../../../components/Button"
import { html, router, useEffect, useState, useTitle } from "../../../lib"
import { addCategoryPost as apiAddCategoryPost } from "../../../services/categoryPostService"
import styles from "./CategoryPosts.module.scss"
import { getLocalStorage, setLocalStorage, removeLocalStorage } from "../../../utils/fnc"
import { ToastMessage } from "../../../components/ToastMessage"

const cx = classNames.bind(styles)

const AddCategoryPostsPage = () => {
	const [errors, setErrors] = useState({
		id: "",
		name: "",
	})
	const [title, setTitle] = useTitle(`Dev ~ Blog | Tạo Danh Mục Bài Viết`)

	useEffect(() => {
		const form = document.getElementById("form-add")
		const inputs = document.querySelectorAll(`.${cx("form__input")}`)
		let category = {
			id: uuidv4(),
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

		// Submit form
		form.addEventListener("submit", async (e) => {
			e.preventDefault()
			const formData = new FormData(form)

			for (let [key, value] of formData) {
				category[key] = value?.trim()
			}

			setLocalStorage("CATEGORY", category)

			try {
				await schema.validate(category, { abortEarly: false })
				await apiAddCategoryPost(category)
				removeLocalStorage("CATEGORY")
				router.navigate("/admin/category-posts")
				setTimeout(() => {
					ToastMessage({
						title: "Thành Công",
						type: "success",
						content: "Đã thêm danh mục thành công",
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
					<h1>Tạo Danh Mục Bài Viết</h1>
				</div>
			</div>
		</div>
		<div class="col-12">
			<form id="form-add" action="" class="${cx("form")}" enctype="multipart/form-data">
					<div class="col-12">
						<input class="${cx("form__input")}" 
						name="name" 
						type="text" 
						placeholder="Danh Mục" 
						value="${getLocalStorage("CATEGORY")?.name || ""}" />
						${errors?.name && `<span class="${cx("form__mess")}">${errors?.name}</span>`}
					</div>
					<div class="col-12 gx-0">${Button({ title: "Tạo Danh Mục" })}</div>
				</div>
			</form>
		</div>
	`
}

export default AddCategoryPostsPage

import { html, router, useEffect, useState, useTitle } from "../../../lib"
import classNames from "classnames/bind"
import styles from "./CategoryProjects.module.scss"
import { Button } from "../../../components/Button"
import {
	getCategoryProject as apiGetCategoryProject,
	updateCategoryProject as apiUpdateCategoryProject,
} from "../../../services/categoryProjectService"

const cx = classNames.bind(styles)

const EditCategoryPostsPage = ({ data }) => {
	const [category, setCategory] = useState({})
	const [title, setTitle] = useTitle(`Dev ~ Blog | Sửa Dự Án`)
	const { id } = data

	useEffect(() => {
		const fetchApi = async () => {
			const response = await apiGetCategoryProject(id)
			setCategory(response)
		}
		fetchApi()
	}, [])

	useEffect(() => {
		const form = document.getElementById("form-add")
		let newCategory = {
			id,
		}

		form.addEventListener("submit", async (e) => {
			e.preventDefault()
			if (form) {
				const formData = new FormData(form)
				for (let [key, value] of formData) {
					newCategory = { ...newCategory, [key]: value }
				}
			}

			await apiUpdateCategoryProject(id, newCategory)
			router.navigate("/admin/category-projects")
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
						<input class="${cx("form__input")}" name="name" value="${category?.name}" type="text" placeholder="Loại" />
					</div>
					<div class="col-12 gx-0">${Button({ title: "Cập Nhật" })}</div>
				</div>
			</form>
		</div>
	`
}

export default EditCategoryPostsPage

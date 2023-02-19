import { html, router, useEffect, useState, useTitle } from "../../../lib"
import classNames from "classnames/bind"
import styles from "./CategoryPosts.module.scss"
import { Button } from "../../../components/Button"
import { v4 as uuidv4 } from "uuid"
import {
	addCategoryPost as apiAddCategoryPost,
	getCategoryPost as apiGetCategoryPost,
	updateCategoryPost as apiUpdateCategoryPost,
} from "../../../services/categoryPostService"

const cx = classNames.bind(styles)

const EditCategoryPostsPage = ({ data }) => {
	const [category, setCategory] = useState({})
	const [title, setTitle] = useTitle(`Dev ~ Blog | Sửa Danh Mục Bài Viết`)
	const { id } = data

	useEffect(() => {
		const fetchApi = async () => {
			const response = await apiGetCategoryPost(id)
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

			await apiUpdateCategoryPost(id, newCategory)
			router.navigate("/admin/category-posts")
		})
	})

	return html`
		<div class="row">
			<div class="col-12">
				<div class="${cx("title")}">
					<h1>Cập Nhật Danh Mục Bài Viết</h1>
				</div>
			</div>
		</div>
		<div class="col-12">
			<form id="form-add" action="" class="${cx("form")}" enctype="multipart/form-data">
					<div class="col-12">
						<input class="${cx("form__input")}" name="name" value="${category?.name}" type="text" placeholder="Danh Mục" />
					</div>
					<div class="col-12 gx-0">${Button({ title: "Cập Nhật Danh Mục" })}</div>
				</div>
			</form>
		</div>
	`
}

export default EditCategoryPostsPage

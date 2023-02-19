import { html, router, useEffect, useTitle } from "../../../lib"
import classNames from "classnames/bind"
import styles from "./CategoryProjects.module.scss"
import { Button } from "../../../components/Button"
import { v4 as uuidv4 } from "uuid"
import { addCategoryProject as apiAddCategoryProject } from "../../../services/categoryProjectService"

const cx = classNames.bind(styles)

const AddCategoryPostsPage = () => {
	const [title, setTitle] = useTitle(`Dev ~ Blog | Tạo Dự Án`)

	useEffect(() => {
		const form = document.getElementById("form-add")
		let category = {
			id: uuidv4(),
		}

		form.addEventListener("submit", async (e) => {
			e.preventDefault()
			if (form) {
				const formData = new FormData(form)
				for (let [key, value] of formData) {
					category = { ...category, [key]: value }
				}
			}

			await apiAddCategoryProject(category)
			router.navigate("/admin/category-projects")
		})
	})

	return html`
		<div class="row">
			<div class="col-12">
				<div class="${cx("title")}">
					<h1>Tạo Dự Án</h1>
				</div>
			</div>
		</div>
		<div class="col-12">
			<form id="form-add" action="" class="${cx("form")}" enctype="multipart/form-data">
					<div class="col-12">
						<input class="${cx("form__input")}" name="name" type="text" placeholder="Loại" />
					</div>
					<div class="col-12 gx-0">${Button({ title: "Tạo" })}</div>
				</div>
			</form>
		</div>
	`
}

export default AddCategoryPostsPage

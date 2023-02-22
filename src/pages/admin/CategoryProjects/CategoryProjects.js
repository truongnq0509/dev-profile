import classNames from "classnames/bind"
import Button from "../../../components/Button/Button"
import { html, router, useEffect, useState, useTitle } from "../../../lib"
import {
	getCategoryProjects as apiGetCategoryProjects,
	deleteCategoryProject as apiDeleteCategoryProjects,
} from "../../../services/categoryProjectService"
import styles from "./CategoryProjects.module.scss"
import { Loading } from "../../../components/Loading"
import { ToastMessage } from "../../../components/ToastMessage"

const cx = classNames.bind(styles)

const CategoryProjects = () => {
	const [categories, setCategories] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [title, setTitle] = useTitle(`Dev ~ Blog | Loại Dự Án`)

	useEffect(() => {
		const fetchApi = async () => {
			const response = await apiGetCategoryProjects()
			setCategories(response)
			setIsLoading(false)
		}
		fetchApi()
	}, [])

	useEffect(() => {
		const deleteBtns = document.querySelectorAll(`.${cx("table__btn--delete")}`)
		const editBtns = document.querySelectorAll(`.${cx("table__btn--edit")}`)

		for (const btn of deleteBtns) {
			const id = btn.dataset.id

			btn.addEventListener("click", async () => {
				const confirm = window.confirm("Bạn có chắc muốn xóa không")

				if (confirm) {
					const newCategories = categories.filter((category) => category.id != id)
					setIsLoading(true)
					await apiDeleteCategoryProjects(id)
					setCategories(newCategories)
					setIsLoading(false)
					ToastMessage({
						title: "Thành Công",
						type: "success",
						content: "Đã xóa dự án thành công",
						duration: 1000,
					})
				} else {
					ToastMessage({
						title: "Thất Bại",
						type: "danger",
						content: "Hành động thực hiện đã thất bại!!!",
						duration: 1000,
					})
				}
			})
		}

		for (const btn of editBtns) {
			const id = btn.dataset.id

			btn.addEventListener("click", async () => {
				router.navigate(`/admin/category-project/${id}/edit`)
			})
		}
	})

	return html`
		<div class="row">
			<div class="col-12">
				<div class="${cx("title")}">
					<h1>Loại Dự Án</h1>
					${Button({
						to: "/#/admin/category-project/add",
						title: "Tạo Dự Án",
					})}
				</div>
			</div>
		</div>
		<div
			class="${cx("overlay", {
				hidden: !isLoading,
			})}"
		>
			${Loading({ small: true })}
		</div>
		<div class="col-12">
			<table class="table align-middle ${cx("table")}">
				<thead>
					<tr>
						<th>ID</th>
						<th>Dự Án</th>
						<th>Số Lượng</th>
						<th class="col-1">Actions</th>
					</tr>
				</thead>
				<tbody>
					${categories.map((category, index) => {
						return `
						<tr>
							<td>
								<div class="${cx("table__text")}">${index + 1}</div>
							</td>
							<td>
								<div class="${cx("table__text")}">${category?.name}</div>
							</td>
							<td>
								<div class="${cx("table__text")}">${category?.projects?.length}</div>
							</td>
							<td class="col-1">
								<div class="${cx("table__btns")}">
									<button class="${cx("table__btn", "table__btn--edit")}" data-id="${category?.id}">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
											<path
												d="M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"
											></path>
										</svg>
									</button>
									<button class="${cx("table__btn", "table__btn--delete")}" data-id="${category?.id}">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
											<path
												d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z"
											></path>
										</svg>
									</button>
								</div>
							</td>
						</tr>`
					})}
				</tbody>
			</table>
		</div>
	`
}

export default CategoryProjects

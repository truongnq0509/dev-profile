import classNames from "classnames/bind"
import Button from "../../../components/Button/Button"
import { html, router, useEffect, useState, useTitle } from "../../../lib"
import { getPosts as apiGetPosts, deletePost as apiDeletoPost } from "../../../services/postService"
import styles from "./Posts.module.scss"
import moment from "moment"
import { Loading } from "../../../components/Loading"
import { ToastMessage } from "../../../components/ToastMessage"

const cx = classNames.bind(styles)

const Posts = () => {
	const [posts, setPosts] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [title, setTitle] = useTitle(`Dev ~ Blog | Tất Cả Bài Viết`)

	useEffect(() => {
		const fetchApi = async () => {
			const response = await apiGetPosts()
			setPosts(response)
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
					const newPosts = posts.filter((post) => post.id !== id)
					setIsLoading(true)
					await apiDeletoPost(id)
					setPosts(newPosts)
					setIsLoading(false)
					ToastMessage({
						title: "Thành Công",
						type: "success",
						content: "Đã xóa bài viết thành công",
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
				router.navigate(`/admin/post/${id}/edit`)
			})
		}
	})

	return html`
		<div class="row">
			<div class="col-12">
				<div class="${cx("title")}">
					<h1>Bài Viết</h1>
					${Button({
						to: "/#/admin/post/add",
						title: "Tạo Bài Viết",
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
						<th>Tiêu Đề</th>
						<th class="col-4">Nội Dung</th>
						<th>Danh Mục</th>
						<th>Ngày Viết</th>
						<th>Cập Nhật</th>
						<th class="col-1">Actions</th>
					</tr>
				</thead>
				<tbody>
					${posts?.map((post, index) => {
						return `
						<tr>
							<td>
								<div class="${cx("table__text")}">${index + 1}</div>
							</td>
							<td>
								<div class="${cx("table__text")}">${post?.title}</div>
							</td>
							<td class="col-4">
								<div class="${cx("table__text")}">${post?.content}</div>
							</td>
							<td>
								<div class="${cx("table__text")}">${post?.categoryPost?.name}</div>
							</td>
							<td>
								<div class="${cx("table__text")}">${moment(post?.createdAt).format("DD/MM/YYYY HH:mm:ss")}</div>
								
							</td>
							<td>
								<div class="${cx("table__text")}">${moment(post?.updatedAt).format("DD/MM/YYYY HH:mm:ss")}</div>
							</td>
							<td class="col-1">
								<div class="${cx("table__btns")}">
									<button class="${cx("table__btn", "table__btn--edit")}" data-id="${post?.id}">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
											<path
												d="M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"
											></path>
										</svg>
									</button>
									<button class="${cx("table__btn", "table__btn--delete")}" data-id="${post?.id}">
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

export default Posts

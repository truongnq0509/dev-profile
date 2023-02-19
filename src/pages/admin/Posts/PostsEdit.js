import { html, router, useState, useEffect, useTitle } from "../../../lib"
import classNames from "classnames/bind"
import styles from "./Posts.module.scss"
import { Button } from "../../../components/Button"
import { Loading } from "../../../components/Loading"
import { v4 as uuidv4 } from "uuid"
import moment from "moment/moment"
import { getCategoryPosts as apiGetCategoryPosts } from "../../../services/categoryPostService"
import { updatePost as apiUpdatePost, getPost as apiGetPost } from "../../../services/postService"
import { apiUploadImage } from "../../../services/uploadService"

const cx = classNames.bind(styles)

const EditPostsPage = ({ data }) => {
	const [categories, setCategories] = useState([])
	const [post, setPost] = useState({})
	const [preview, setPreview] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [title, setTitle] = useTitle(`Dev ~ Blog | Cập Nhật Bài Viết`)
	const { id } = data

	useEffect(() => {
		const fetchApi = async () => {
			const [res1, res2] = await Promise.all([apiGetCategoryPosts(), apiGetPost(id)])
			setCategories(res1)
			setPost(res2)
			setPreview(res2?.images)
			setIsLoading(false)
		}

		fetchApi()
	}, [])

	console.log("rerender")

	useEffect(() => {
		const form = document.getElementById("form-add")
		const file = document.getElementById(`${cx("form__image")}`)
		const btns = document.querySelectorAll(`.${cx("icon")}`)
		const images = new FormData()
		const now = moment()
		let newPost = {
			id,
			createdAt: post?.createdAt,
			updatedAt: now.format(),
		}
		let gallery = []

		file.addEventListener("change", async (e) => {
			const files = e.target.files
			for (let file of files) {
				images.append("file", file)
				images.append("upload_preset", __ENV__.VITE_UPLOAD_ASSECTS_NAME)
				setIsLoading(true)
				const image = await apiUploadImage(images)
				gallery.push(image?.secure_url)
			}

			setPreview([...preview, ...gallery])
			setIsLoading(false)
		})

		form.addEventListener("submit", async (e) => {
			e.preventDefault()
			if (form) {
				const formData = new FormData(form)
				for (let [key, value] of formData) {
					newPost = { ...newPost, [key]: value }
				}
			}

			newPost = {
				...newPost,
				images: [...preview],
			}

			await apiUpdatePost(id, newPost)
			router.navigate("/admin/posts")
		})

		// Xóa ảnh
		for (let btn of btns) {
			const src = btn.dataset.src
			btn.addEventListener("click", () => {
				const newPreview = preview.filter((item) => item != src)
				setPreview(newPreview)
			})
		}
	})

	return html`
		<div class="row">
			<div class="col-12">
				<div class="${cx("title")}">
					<h1>Cập Nhật Bài Viết</h1>
				</div>
			</div>
		</div>
		<div class="col-12">
			<form id="form-add" action="" class="${cx("form")}" enctype="multipart/form-data">
				<div class="row g-5">
					<div
						class="col-12 ${cx("form__cover", {
							hidden: !!preview[0],
						})}"
					>
						<div class="${cx("form__file")}">
							<label for="form__image">
								${!isLoading
									? `
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
									</svg>`
									: Loading({ small: true })}
							</label>
							<input type="file" id="${cx("form__image")}" accept=".png, jpg" multiple />
						</div>
						<img class="${cx("form__preview")}" src="${preview?.[0]}" />
					</div>
					<div class="col-12 ${cx("form__content")}">
						<div class="row">
							<div class="col-12">
								<input
									class="${cx("form__input")}"
									name="title"
									type="text"
									placeholder="Tiêu Đề"
									value="${post?.title}"
								/>
							</div>
							<div class="col-12">
								<textarea
									id="text"
									name="content"
									class="${cx("form__textarea")}"
									placeholder="Nội Dung"
								>
${post?.content}</textarea
								>
							</div>
							<div class="col-6">
								<input
									class="${cx("form__input")}"
									type="text"
									name="authorName"
									placeholder="Tác Giả"
									value="${post?.authorName}"
								/>
							</div>
							<div class="col-6">
								<select
									class="form-select ${cx("form__select")}"
									name="categoryPostId"
									aria-label="Default select example"
								>
									${categories?.map((category, index) => {
										return `
												<option value="${category.id}" 
												${category?.id == post?.categoryPostId ? `selected` : ""} >${category.name}</option>
											`
									})}
								</select>
							</div>
							${preview?.length !== 0 &&
							`<div class="col-12 my-3">
								<h4>Ảnh đã chọn</h4>
							</div>`}
							${preview?.map((item) => {
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
						</div>
					</div>
					<div class="col-12 gx-0">${Button({ title: "Cập Nhật Bài Viết" })}</div>
				</div>
			</form>
		</div>
	`
}

export default EditPostsPage

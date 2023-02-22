import { html, useEffect, useState, router } from "../../../lib"
import classNames from "classnames/bind"
import styles from "./Portfolio.module.scss"
import { getCategoryProjects, getCategoryProject } from "../../../services/categoryProjectService"
import { getProjects } from "../../../services/projectService"
import { useTitle } from "../../../lib"

const cx = classNames.bind(styles)

const PortfolioPage = () => {
	const [categories, setCategories] = useState([])
	const [active, setActive] = useState({
		id: "",
		name: "",
	})
	const [projects, setProjects] = useState([])
	const [title, setTitle] = useTitle("Truong Nguyen | Portfolio")

	useEffect(() => {
		const fetchApi = async () => {
			const [res1, res2] = await Promise.all([getCategoryProjects(), getProjects()])
			setCategories(res1)
			setProjects(res2)
		}
		fetchApi()
	}, [])

	useEffect(() => {
		const cateElement = document.querySelectorAll(`.${cx("category")}`)

		// Category
		cateElement?.forEach((item) => {
			item.addEventListener("click", async (e) => {
				const id = e.target.dataset.id
				const name = e.target.dataset.name

				if (!id) {
					const response = await getProjects()
					setProjects(response)
				} else {
					const response = await getCategoryProject(id)
					setProjects(response?.projects)
				}
				setActive({
					...active,
					id,
					name,
				})
			})
		})
	})

	return html` <div class="${cx("main")}">
		<h1 class="${cx("title")}">Portfolio</h1>
		<div class="row ${cx("content")}">
			<div class="col-12">
				<div class="${cx("categories")}">
					<span
						class="${cx("category", {
							active: !active?.id,
						})}"
						data-id=""
						>All</span
					>
					${categories?.map((category) => {
						return `
							<span class="${cx("category", {
								active: category.id == active?.id,
							})}" data-id="${category?.id}" data-name="${category?.name}">${category?.name}</span>
						`
					})}
				</div>
			</div>
			<div class="col-12">
				<div class="row">
					${projects?.map((project) => {
						return `
							<div class="col-4 py-5">
								<a class="${cx("cart")}" href="#/portfolio/${project?.id}">
									<div class="${cx("cart__img")}">
										<img src="${project?.image}" />
										<div class="${cx("overlay")}"></div>
									</div>
									<div class="${cx("cart__desc")}">
										<h3>${project?.name}</h3>
										<span>${project?.categoryProject?.name || active?.name}</span>
									</div>
								</a>
							</div>
						`
					})}
					${!projects?.length &&
					`
						<div class="${cx("not")}">
							<span>
								<svg
									width="64px"
									height="64px"
									viewBox="0 0 16 16"
									xmlns="http://www.w3.org/2000/svg"
									fill="#000000"
								>
									<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
									<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
									<g id="SVGRepo_iconCarrier">
										<path
											d="m 3 0 c -1.660156 0 -3 1.339844 -3 3 v 7 c 0 1.660156 1.339844 3 3 3 h 10 c 1.660156 0 3 -1.339844 3 -3 v -7 c 0 -1.660156 -1.339844 -3 -3 -3 z m 0 2 h 10 c 0.554688 0 1 0.445312 1 1 v 7 c 0 0.554688 -0.445312 1 -1 1 h -10 c -0.554688 0 -1 -0.445312 -1 -1 v -7 c 0 -0.554688 0.445312 -1 1 -1 z m 3 2 c -0.550781 0 -1 0.449219 -1 1 s 0.449219 1 1 1 s 1 -0.449219 1 -1 s -0.449219 -1 -1 -1 z m 4 0 c -0.550781 0 -1 0.449219 -1 1 s 0.449219 1 1 1 s 1 -0.449219 1 -1 s -0.449219 -1 -1 -1 z m -2 3 c -1.429688 0 -2.75 0.761719 -3.464844 2 c -0.136718 0.238281 -0.054687 0.546875 0.183594 0.683594 c 0.238281 0.136718 0.546875 0.054687 0.683594 -0.183594 c 0.535156 -0.929688 1.523437 -1.5 2.597656 -1.5 s 2.0625 0.570312 2.597656 1.5 c 0.136719 0.238281 0.445313 0.320312 0.683594 0.183594 c 0.238281 -0.136719 0.320312 -0.445313 0.183594 -0.683594 c -0.714844 -1.238281 -2.035156 -2 -3.464844 -2 z m -3 7 c -1.105469 0 -2 0.894531 -2 2 h 10 c 0 -1.105469 -0.894531 -2 -2 -2 z m 0 0"
											fill="#ffc9c9"
										></path>
									</g>
								</svg>
							</span>
							<span>Dự định còn làm tiếp :D</span>
						</div>
						`}
				</div>
			</div>
		</div>
	</div>`
}

export default PortfolioPage

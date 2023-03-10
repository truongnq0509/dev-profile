import { html } from "../../lib"
import classNames from "classnames/bind"
import styles from "./LayoutAdmin.module.scss"
import { GlobalStyles } from "../../components/GlobalStyles"
import { getLocalStorage } from "../../utils/fnc"

const cx = classNames.bind(styles)

const CATEGORY = [
	{
		id: 1,
		title: "Dashboard",
		to: "admin",
		icon: `
		<svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 20H7C5.89543 20 5 19.1046 5 18V10.9199C5 10.336 5.25513 9.78132 5.69842 9.40136L10.6984 5.11564C11.4474 4.47366 12.5526 4.47366 13.3016 5.11564L18.3016 9.40136C18.7449 9.78132 19 10.336 19 10.9199V18C19 19.1046 18.1046 20 17 20H15M9 20V14C9 13.4477 9.44772 13 10 13H14C14.5523 13 15 13.4477 15 14V20M9 20H15" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
		`,
	},
	{
		id: 2,
		title: "Bài Viết",
		to: "admin/posts",
		icon: `
		<svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="4" y="3" width="16" height="18" rx="2" fill="#2A4157" fill-opacity="0.24"></rect> <path d="M8.5 6.5L15.5 6.5" stroke="#ffffff" stroke-linecap="round"></path> <path d="M8.5 9.5L12.5 9.5" stroke="#ffffff" stroke-linecap="round"></path> <path d="M8.5 12.5L14.5 12.5" stroke="#ffffff" stroke-linecap="round"></path> <path d="M4 19C4 17.8954 4.89543 17 6 17H17C17.9319 17 18.3978 17 18.7654 16.8478C19.2554 16.6448 19.6448 16.2554 19.8478 15.7654C20 15.3978 20 14.9319 20 14V17C20 18.8856 20 19.8284 19.4142 20.4142C18.8284 21 17.8856 21 16 21H6C4.89543 21 4 20.1046 4 19Z" fill="#ffffff"></path> </g></svg>
		`,
	},
	{
		id: 3,
		title: "Danh Mục Bài Viết",
		to: "admin/category-posts",
		icon: `
		<svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 12C12 11.4477 12.4477 11 13 11H19C19.5523 11 20 11.4477 20 12V19C20 19.5523 19.5523 20 19 20H13C12.4477 20 12 19.5523 12 19V12Z" stroke="#fff" stroke-width="2" stroke-linecap="round"></path> <path d="M4 5C4 4.44772 4.44772 4 5 4H8C8.55228 4 9 4.44772 9 5V19C9 19.5523 8.55228 20 8 20H5C4.44772 20 4 19.5523 4 19V5Z" stroke="#fff" stroke-width="2" stroke-linecap="round"></path> <path d="M12 5C12 4.44772 12.4477 4 13 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H13C12.4477 8 12 7.55228 12 7V5Z" stroke="#fff" stroke-width="2" stroke-linecap="round"></path> </g></svg>
		`,
	},
	{
		id: 4,
		title: "Dự Án",
		to: "admin/projects",
		icon: `
		<svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 17V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17Z" stroke="#ffffff" stroke-width="1.5"></path> <path d="M6 8H7" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
		`,
	},
	{
		id: 5,
		title: "Loại Dự Án",
		to: "admin/category-projects",
		icon: `
		<svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 12C12 11.4477 12.4477 11 13 11H19C19.5523 11 20 11.4477 20 12V19C20 19.5523 19.5523 20 19 20H13C12.4477 20 12 19.5523 12 19V12Z" stroke="#fff" stroke-width="2" stroke-linecap="round"></path> <path d="M4 5C4 4.44772 4.44772 4 5 4H8C8.55228 4 9 4.44772 9 5V19C9 19.5523 8.55228 20 8 20H5C4.44772 20 4 19.5523 4 19V5Z" stroke="#fff" stroke-width="2" stroke-linecap="round"></path> <path d="M12 5C12 4.44772 12.4477 4 13 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H13C12.4477 8 12 7.55228 12 7V5Z" stroke="#fff" stroke-width="2" stroke-linecap="round"></path> </g></svg>
		`,
	},
	{
		id: 6,
		title: "Profile",
		to: "admin/profile",
		icon: `
		<svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.4399 19.05L15.9599 20.57L18.9999 17.53" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12.16 10.87C12.06 10.86 11.94 10.86 11.83 10.87C9.44997 10.79 7.55997 8.84 7.55997 6.44C7.54997 3.99 9.53997 2 11.99 2C14.44 2 16.43 3.99 16.43 6.44C16.43 8.84 14.53 10.79 12.16 10.87Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11.99 21.8101C10.17 21.8101 8.36004 21.3501 6.98004 20.4301C4.56004 18.8101 4.56004 16.1701 6.98004 14.5601C9.73004 12.7201 14.24 12.7201 16.99 14.5601" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
		`,
	},
]

const LayoutAdmin = (component, router) => {
	const { url } = router

	return GlobalStyles(
		html`<div class="container-fluid">
			<div class="${cx("sidebar")}">
				<div class="${cx("logo")}">
					<h1>Dev Oii Bug</h1>
				</div>
				<nav class="${cx("nav")}">
					<ul>
						${CATEGORY.map((item) => {
							return `
								<li
									class="${cx("nav__item", {
										active: `${url}` === item.to,
									})}"
								>
									<span>
										${item.icon}
									</span>
									<a href="/#/${item.to}" data-navigo> ${item.title} </a>
								</li>
							`
						})}
					</ul>
				</nav>
			</div>
			<main class="${cx("content")}">
				<div class="container-fluid">${component()}</div>
			</main>
		</div>`
	)
}

export default LayoutAdmin

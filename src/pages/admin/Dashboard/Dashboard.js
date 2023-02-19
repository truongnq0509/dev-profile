import { html } from "../../../lib"
import classNames from "classnames/bind"
import styles from "./Dashboard.module.scss"

const cx = classNames.bind(styles)

const DashboardPage = () => {
	return html`
		<div class="row">
			<div class="col-12">
				<div class="${cx("title")}">
					<h1>Dashboard</h1>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-3">
				<div class="${cx("cart")}">
					<h3>Dự Án</h3>
					<div class="${cx("cart__box")}">
						<span>250</span>
						<span>
							<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
								<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
								<g id="SVGRepo_iconCarrier">
									<path
										d="M3 17V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17Z"
										stroke="#ffffff"
										stroke-width="1.5"
									></path>
									<path
										d="M6 8H7"
										stroke="#ffffff"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
								</g>
							</svg>
						</span>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="${cx("cart")}">
					<h3>Dự Án</h3>
					<div class="${cx("cart__box")}">
						<span>250</span>
						<span>
							<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
								<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
								<g id="SVGRepo_iconCarrier">
									<path
										d="M3 17V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17Z"
										stroke="#ffffff"
										stroke-width="1.5"
									></path>
									<path
										d="M6 8H7"
										stroke="#ffffff"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
								</g>
							</svg>
						</span>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="${cx("cart")}">
					<h3>Dự Án</h3>
					<div class="${cx("cart__box")}">
						<span>250</span>
						<span>
							<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
								<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
								<g id="SVGRepo_iconCarrier">
									<path
										d="M3 17V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17Z"
										stroke="#ffffff"
										stroke-width="1.5"
									></path>
									<path
										d="M6 8H7"
										stroke="#ffffff"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
								</g>
							</svg>
						</span>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="${cx("cart")}">
					<h3>Dự Án</h3>
					<div class="${cx("cart__box")}">
						<span>250</span>
						<span>
							<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
								<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
								<g id="SVGRepo_iconCarrier">
									<path
										d="M3 17V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17Z"
										stroke="#ffffff"
										stroke-width="1.5"
									></path>
									<path
										d="M6 8H7"
										stroke="#ffffff"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
								</g>
							</svg>
						</span>
					</div>
				</div>
			</div>
		</div>
	`
}

export default DashboardPage

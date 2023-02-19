import { html } from "../../../lib"
import classNames from "classnames/bind"
import styles from "./About.module.scss"

const cx = classNames.bind(styles)

const CART = [
	{
		title: "Web Design",
		icon: `
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
						d="M2 15.5V2.6C2 2.26863 2.26863 2 2.6 2H21.4C21.7314 2 22 2.26863 22 2.6V15.5M2 15.5V17.4C2 17.7314 2.26863 18 2.6 18H21.4C21.7314 18 22 17.7314 22 17.4V15.5M2 15.5H22M9 22H10.5M10.5 22V18M10.5 22H13.5M13.5 22H15M13.5 22L13.5 18"
						stroke="#ffffff"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path>
				</g>
			</svg>
		`,
		desc: "The most modern and high-quality design made at a professional level.",
	},
	{
		title: "Web Design",
		icon: `
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
						d="M2 15.5V2.6C2 2.26863 2.26863 2 2.6 2H21.4C21.7314 2 22 2.26863 22 2.6V15.5M2 15.5V17.4C2 17.7314 2.26863 18 2.6 18H21.4C21.7314 18 22 17.7314 22 17.4V15.5M2 15.5H22M9 22H10.5M10.5 22V18M10.5 22H13.5M13.5 22H15M13.5 22L13.5 18"
						stroke="#ffffff"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path>
				</g>
			</svg>
		`,
		desc: "The most modern and high-quality design made at a professional level.",
	},
	{
		title: "Web Design",
		icon: `
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
						d="M2 15.5V2.6C2 2.26863 2.26863 2 2.6 2H21.4C21.7314 2 22 2.26863 22 2.6V15.5M2 15.5V17.4C2 17.7314 2.26863 18 2.6 18H21.4C21.7314 18 22 17.7314 22 17.4V15.5M2 15.5H22M9 22H10.5M10.5 22V18M10.5 22H13.5M13.5 22H15M13.5 22L13.5 18"
						stroke="#ffffff"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path>
				</g>
			</svg>
		`,
		desc: "The most modern and high-quality design made at a professional level.",
	},
	{
		title: "Web Design",
		icon: `
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
						d="M2 15.5V2.6C2 2.26863 2.26863 2 2.6 2H21.4C21.7314 2 22 2.26863 22 2.6V15.5M2 15.5V17.4C2 17.7314 2.26863 18 2.6 18H21.4C21.7314 18 22 17.7314 22 17.4V15.5M2 15.5H22M9 22H10.5M10.5 22V18M10.5 22H13.5M13.5 22H15M13.5 22L13.5 18"
						stroke="#ffffff"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path>
				</g>
			</svg>
		`,
		desc: "The most modern and high-quality design made at a professional level.",
	},
]

const AboutPage = () => {
	return html` <div class="${cx("main")}">
		<h1 class="${cx("title")}">About</h1>
		<div class="row ${cx("content")}">
			<div class="col-12 ${cx("text")}">
				<p>
					Tôi là sinh viên đang sinh sống và học tại Hà Nội, chuyên ngành lập trình Web. Tôi thích biến nhưng
					vấn đề phức tạp thành những thiết kế đơn giản và đẹp mắt
				</p>
				<p>
					My job is to build your website so that it is functional and user-friendly but at the same time
					attractive. Moreover, I add personal touch to your product and make sure that is eye-catching and
					easy to use. My aim is to bring across your message and identity in the most creative way. I created
					web design for many famous brand companies.
				</p>
			</div>
			<div class="row ${cx("cart")}">
				<div class="col-12"><h1>What I'm Doing</h1></div>
				${CART.map((item) => {
					return `
						<div class="col-6 py-3">
							<div class="${cx("cart__item")}">
								<div class="${cx("cart__icon")}">${item.icon}</div>
								<div class="${cx("cart__desc")}">
									<h3>${item.title}</h3>
									<p>${item.desc}</p>
								</div>
							</div>
						</div>
					`
				})}
			</div>
		</div>
	</div>`
}

export default AboutPage

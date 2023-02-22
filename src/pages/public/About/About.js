import { html } from "../../../lib"
import classNames from "classnames/bind"
import styles from "./About.module.scss"
import { useTitle } from "../../../lib"
import { getLocalStorage } from "../../../utils/fnc"

const cx = classNames.bind(styles)

const AboutPage = () => {
	const [title, setTitle] = useTitle("Truong Nguyen | About")

	return html` <div class="${cx("main")}">
		<h1 class="${cx("title")}">About</h1>
		<div class="row ${cx("content")}">
			<div class="col-12 ${cx("text")}">
				<p>${getLocalStorage("PROFILE")?.introduction?.replace(/\\n/g, "<ffdfd")}</p>
			</div>
			<div class="row ${cx("cart")}">
				<div class="col-12"><h1>What I'm Doing</h1></div>
				${getLocalStorage("PROFILE")?.currentJobs?.map((item) => {
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

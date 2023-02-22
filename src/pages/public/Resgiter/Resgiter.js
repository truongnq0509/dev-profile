import { html, useTitle } from "../../../lib"
import classNames from "classnames/bind"
import styles from "./Resgiter.module.scss"

const cx = classNames.bind(styles)

const ResgisterPage = () => {
	const [title, setTitle] = useTitle("Truong Nguyen | Sign Up")

	return html`<div class="${cx("wrapper")}">
		<form id="${cx("login-form")}" class="${cx("form")}">
			<div class="row">
				<div class="col-12">
					<h1 class="${cx("title")}">Sign Up</h1>
				</div>
				<div class="col-12">
					<div class="${cx("body")}">
						<div class="row">
							<div class="col-12">
								<input name="email" type="text" placeholder="Email" class="${cx("form__input")}" />
								<span class="${cx("form__mess")}">Trường này không được để trống</span>
							</div>
							<div class="col-12 py-4">
								<input
									name="password"
									type="text"
									placeholder="Password"
									class="${cx("form__input")}"
								/>
							</div>
							<div class="col-12 py-5">
								<button type="submit" class="${cx("form__btn")}">Sign Up</button>
							</div>
						</div>
					</div>
				</div>
				<div class="col-12">
					<span class="${cx("form__text")}">
						Bạn chưa có tài khoản?<a href="/resgiter" class="${cx("form__link")}">Resgiter</a>
					</span>
				</div>
			</div>
		</form>
	</div>`
}

export default ResgisterPage

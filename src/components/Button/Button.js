import { html } from "../../lib"
import classNames from "classnames/bind"
import styles from "./Button.module.scss"

const cx = classNames.bind(styles)

const Button = ({ to = "", title = "Button" }) => {
	let box = to ? "a" : "button"

	return html`
		<${box} ${to ? `href="${to}"` : 'type="submit"'}  class="${cx("button")}">
			<span class="${cx("button__title")}">${title}</span>
		</${box}>
	`
}

export default Button

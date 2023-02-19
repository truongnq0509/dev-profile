import { html } from "../../lib"
import classNames from "classnames/bind"
import styles from "./Skill.module.scss"

const cx = classNames.bind(styles)

const ICON = `
	<svg width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000">
		<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
		<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
		<g id="SVGRepo_iconCarrier">
			<title>nodejs</title>
			<rect width="24" height="24" fill="none"></rect>
			<path
				d="M12,1.85a1.62,1.62,0,0,0-.78.2L3.78,6.35A1.58,1.58,0,0,0,3,7.71v8.58a1.58,1.58,0,0,0,.78,1.36l2,1.12a3.24,3.24,0,0,0,1.71.47,2.07,2.07,0,0,0,2.21-2.33V8.44a.22.22,0,0,0-.22-.22H8.5a.22.22,0,0,0-.23.22v8.47c0,.66-.68,1.31-1.77.76l-2-1.17a.26.26,0,0,1-.11-.21V7.71a.24.24,0,0,1,.11-.21l7.44-4.29a.22.22,0,0,1,.22,0L19.55,7.5a.24.24,0,0,1,.11.21v8.58a.26.26,0,0,1-.11.21l-7.44,4.29a.24.24,0,0,1-.23,0L10,19.65a.26.26,0,0,0-.21,0,4.22,4.22,0,0,1-1.12.51c-.12,0-.31.11.07.32l2.48,1.47a1.55,1.55,0,0,0,1.56,0l7.44-4.29A1.58,1.58,0,0,0,21,16.29V7.71a1.58,1.58,0,0,0-.78-1.36l-7.44-4.3a1.59,1.59,0,0,0-.78-.2M14,8c-2.12,0-3.39.89-3.39,2.39s1.26,2.08,3.3,2.28c2.43.24,2.62.6,2.62,1.08,0,.83-.67,1.18-2.23,1.18-2,0-2.4-.49-2.55-1.47a.23.23,0,0,0-.22-.18h-1a.21.21,0,0,0-.21.22c0,1.24.68,2.74,3.94,2.74,2.35,0,3.7-.93,3.7-2.55s-1.08-2-3.37-2.34-2.54-.46-2.54-1,.2-1,1.91-1c1.5,0,2.09.33,2.32,1.36a.21.21,0,0,0,.21.17h1a.19.19,0,0,0,.15-.07.16.16,0,0,0,.05-.16C17.56,8.82,16.38,8,14,8Z"
			></path>
		</g>
	</svg>
`

const Skill = ({ color = `--text-pink`, icon = ICON, language = "Javascript" }) => {
	return html`<div class="${cx("skill")}" style="--color: ${color}">
		<div class="${cx("base")}"></div>
		<div class="${cx("title")}">${language}</div>
		<div class="${cx("icon")}">${icon}</div>
	</div>`
}

export default Skill

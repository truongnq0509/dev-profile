import styles from "./ToastMessage.module.scss"
import classNames from "classnames/bind"
import "font-awesome/css/font-awesome.min.css"

const cx = classNames.bind(styles)

const ToastMessage = ({ title = "", content = "", type = "info", duration = 3000 }) => {
	const toastBox = document.getElementById("toast")
	if (toastBox) {
		const toast = document.createElement("div")

		// Auto remove toast
		const autoRemove = setTimeout(() => {
			toastBox.removeChild(toast)
		}, duration + 1000)

		toast.onclick = function (e) {
			if (e.target.closest(`.${cx("toast-close")}`)) {
				toastBox.removeChild(toast)
				clearTimeout(autoRemove)
			}
		}

		const icons = {
			success: "fa-solid fa-circle-check",
			danger: "fa-solid fa-circle-exclamation",
			info: "fa-solid fa-circle-info",
			warning: "fa-solid fa-triangle-exclamation",
		}

		const icon = icons[type]
		const delay = (duration / 1000).toFixed(2)
		toast.style.animation = `slideInLeft ease 0.3s, fadeOut ease-in 1s ${delay}s forwards`
		toast.innerHTML = `
				<div class="${cx("toast-icon")}">
					<i class="${icon}"></i>
				</div>
				<div class="${cx("toast-body")}">
					<div class="${cx("toast-title")}">
						${title}
					</div>
					<div class="${cx("toast-content")}">
						${content}
					</div>
				</div>
				<div class="${cx("toast-close")}">
					<i class="fa-solid fa-xmark"></i>
				</div>
			`
		toast.classList.add(`${cx("toast")}`, `${cx(`toast--${type}`)}`)
		toastBox.appendChild(toast)
	}
}

export default ToastMessage

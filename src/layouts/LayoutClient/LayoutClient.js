import { html, useEffect, useState, router } from "../../lib"
import classNames from "classnames/bind"
import styles from "./LayoutClient.module.scss"
import { GlobalStyles } from "../../components/GlobalStyles"
import { getProfile } from "../../services/profileService"
import { getLocalStorage, setLocalStorage } from "../../utils/fnc"
import axios from "axios"

const cx = classNames.bind(styles)

const MENU = [
	{
		title: "About",
		url: "/",
	},
	{
		title: "Resume",
		url: "/resume",
	},
	{
		title: "Portfolio",
		url: "/portfolio",
	},
	{
		title: "Posts",
		url: "/posts",
	},
	{
		title: "Contact",
		url: "/contact",
	},
]

const LayoutClient = (component, param) => {
	const { url } = param
	const [profile, setProfile] = useState(getLocalStorage("PROFILE") || {})

	useEffect(() => {
		const fetchApi = async () => {
			const response = await getProfile()
			setProfile(response)
			setLocalStorage("PROFILE", response)
		}

		if (!getLocalStorage("PROFILE")) fetchApi()
	}, [])

	return GlobalStyles(html`
		<div class="container ${cx("wrapper")}">
			<div class="row gx-5">
				<div class="col-3">
					<div class="${cx("sidebar")}">
						<div class="${cx("info")}">
							<div class="${cx("info__img")}">
								<img src="${profile?.avatar}" />
							</div>
							<h2 class="${cx("info__name")}">${profile?.name}</h2>
							<a
								href="https://www.africau.edu/images/default/sample.pdf"
								download="sample.pdf"
								class="${cx("info__btn")}"
							>
								Download CV
							</a>
						</div>
						<div class="${cx("cart")}">
							<div class="${cx("cart__item")}">
								<span class="${cx("cart__icon")}">
									<svg
										width="64px"
										height="64px"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
										<g
											id="SVGRepo_tracerCarrier"
											stroke-linecap="round"
											stroke-linejoin="round"
										></g>
										<g id="SVGRepo_iconCarrier">
											<g id="style=stroke">
												<g id="email">
													<path
														id="vector (Stroke)"
														fill-rule="evenodd"
														clip-rule="evenodd"
														d="M3.88534 5.2371C3.20538 5.86848 2.75 6.89295 2.75 8.5V15.5C2.75 17.107 3.20538 18.1315 3.88534 18.7629C4.57535 19.4036 5.61497 19.75 7 19.75H17C18.385 19.75 19.4246 19.4036 20.1147 18.7629C20.7946 18.1315 21.25 17.107 21.25 15.5V8.5C21.25 6.89295 20.7946 5.86848 20.1147 5.2371C19.4246 4.59637 18.385 4.25 17 4.25H7C5.61497 4.25 4.57535 4.59637 3.88534 5.2371ZM2.86466 4.1379C3.92465 3.15363 5.38503 2.75 7 2.75H17C18.615 2.75 20.0754 3.15363 21.1353 4.1379C22.2054 5.13152 22.75 6.60705 22.75 8.5V15.5C22.75 17.393 22.2054 18.8685 21.1353 19.8621C20.0754 20.8464 18.615 21.25 17 21.25H7C5.38503 21.25 3.92465 20.8464 2.86466 19.8621C1.79462 18.8685 1.25 17.393 1.25 15.5V8.5C1.25 6.60705 1.79462 5.13152 2.86466 4.1379Z"
														fill="#ffffff"
													></path>
													<path
														id="vector (Stroke)_2"
														fill-rule="evenodd"
														clip-rule="evenodd"
														d="M19.3633 7.31026C19.6166 7.63802 19.5562 8.10904 19.2285 8.3623L13.6814 12.6486C12.691 13.4138 11.3089 13.4138 10.3185 12.6486L4.77144 8.3623C4.44367 8.10904 4.38328 7.63802 4.63655 7.31026C4.88982 6.98249 5.36083 6.9221 5.6886 7.17537L11.2356 11.4616C11.6858 11.8095 12.3141 11.8095 12.7642 11.4616L18.3113 7.17537C18.6391 6.9221 19.1101 6.98249 19.3633 7.31026Z"
														fill="#ffffff"
													></path>
												</g>
											</g>
										</g>
									</svg>
								</span>
								<div class="${cx("cart__name")}">
									<span>Email</span>
									<p>${profile?.email}</p>
								</div>
							</div>
							<div class="${cx("cart__item")}">
								<span class="${cx("cart__icon")}">
									<svg
										width="64px"
										height="64px"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
										<g
											id="SVGRepo_tracerCarrier"
											stroke-linecap="round"
											stroke-linejoin="round"
										></g>
										<g id="SVGRepo_iconCarrier">
											<g id="style=stroke">
												<g id="call">
													<path
														id="vector (Stroke)"
														fill-rule="evenodd"
														clip-rule="evenodd"
														d="M5.59 2.75C5.08187 2.75 4.56293 2.95593 4.03614 3.47449L4.03046 3.48008L4.02467 3.48555C3.56991 3.91456 3.25506 4.38355 3.05792 4.88459L3.05637 4.88855C2.85415 5.39409 2.75 5.94888 2.75 6.54C2.75 7.46267 2.96266 8.45326 3.41075 9.51784C3.86507 10.5871 4.49483 11.6779 5.28758 12.7803C6.0935 13.887 6.99752 14.9469 8.00038 15.9597C9.01353 16.9629 10.0741 17.8675 11.1922 18.6842C12.291 19.4842 13.3917 20.1146 14.484 20.58C15.5587 21.0379 16.5486 21.25 17.45 21.25C18.0548 21.25 18.6064 21.1382 19.1115 20.9277L19.1156 20.926C19.4724 20.7798 19.8037 20.5736 20.1178 20.2981C20.2363 20.1941 20.353 20.0797 20.468 19.9541L20.783 19.5559C20.8817 19.4096 20.9671 19.2579 21.0418 19.0997C21.1653 18.8383 21.22 18.5775 21.22 18.33C21.22 18.1689 21.1879 18.0176 21.1189 17.8418C21.072 17.74 20.9913 17.6362 20.8331 17.5266L20.8258 17.5216L17.5222 15.1761C17.3028 15.0273 17.1216 14.9278 16.966 14.8642C16.8238 14.806 16.7201 14.79 16.64 14.79C16.5438 14.79 16.4472 14.8132 16.32 14.8906L16.2988 14.9035L16.2769 14.9149C16.1389 14.987 15.96 15.1207 15.7403 15.3403L15.7368 15.3438L14.9782 16.0924C14.7355 16.3341 14.4185 16.48 14.04 16.48C13.8919 16.48 13.7163 16.4633 13.5267 16.3922L13.5105 16.3862L13.4946 16.3794C13.4492 16.3599 13.4073 16.3406 13.38 16.328C13.3476 16.3132 13.3366 16.3084 13.3315 16.3064L13.2944 16.2915L13.2591 16.2728C12.8536 16.0582 12.3777 15.7213 11.8355 15.2625L11.8346 15.2617C11.2851 14.7952 10.7507 14.2912 10.2046 13.7553L10.1996 13.7503L10.1946 13.7453C9.66123 13.2016 9.1705 12.6596 8.71287 12.1308L8.70742 12.1245C8.25416 11.5888 7.90702 11.1141 7.69158 10.7191L7.6596 10.6605L7.63858 10.5975C7.63857 10.5975 7.63602 10.5904 7.62302 10.5597C7.62193 10.5571 7.62075 10.5544 7.61951 10.5514C7.60704 10.522 7.58736 10.4756 7.56775 10.4233L7.55275 10.3833L7.54239 10.3419C7.51008 10.2127 7.49 10.081 7.49 9.93C7.49 9.59078 7.6056 9.26699 7.86359 9.00579L8.62454 8.2148L8.62967 8.20967C8.83569 8.00365 8.97896 7.81685 9.06708 7.66096L9.07305 7.6504L9.07935 7.64004C9.15514 7.51553 9.18 7.40903 9.18 7.32C9.18 7.25575 9.16141 7.14722 9.10064 7.00544L9.09574 6.99401C9.03236 6.83908 8.93418 6.66049 8.78135 6.44823L8.7783 6.44399L6.45332 3.16694C6.35577 3.02604 6.23429 2.92955 6.08571 2.86097L6.07541 2.85622C5.9331 2.78791 5.76498 2.75 5.59 2.75ZM2.98958 2.39989C3.74153 1.66198 4.62059 1.25 5.59 1.25C5.97318 1.25 6.36311 1.33138 6.71941 1.5014C7.08755 1.67229 7.42309 1.93393 7.68396 2.30922L10.0003 5.574C10.2053 5.85906 10.3657 6.13796 10.4818 6.42035C10.5997 6.6971 10.68 7.00644 10.68 7.32C10.68 7.70687 10.5673 8.07663 10.367 8.40939C10.1968 8.70784 9.96427 8.99567 9.69563 9.26502L9.00688 9.98096C9.01385 9.99743 9.02321 10.0197 9.03333 10.0455C9.183 10.3079 9.44802 10.6772 9.84989 11.1524C10.29 11.6609 10.7568 12.1761 11.2604 12.6897C11.7923 13.2116 12.2961 13.6858 12.8048 14.1178C13.2858 14.5247 13.6606 14.7841 13.933 14.9322C13.955 14.9417 13.9753 14.9509 13.9918 14.9584L14.6815 14.2778C14.955 14.0046 15.2482 13.7638 15.5612 13.5966C15.8882 13.4019 16.2447 13.29 16.64 13.29C16.9399 13.29 17.2362 13.354 17.534 13.4758C17.8169 13.5916 18.0939 13.7509 18.3717 13.9398L18.378 13.9441L21.6909 16.2961C22.0455 16.5425 22.3234 16.8545 22.4965 17.2479L22.5016 17.2596L22.5064 17.2715C22.6338 17.59 22.72 17.9351 22.72 18.33C22.72 18.8025 22.6147 19.2817 22.3982 19.7403C22.2879 19.9738 22.1587 20.2021 22.0066 20.424C21.8842 20.6025 21.7478 20.7758 21.5957 20.9436C21.4394 21.1159 21.2765 21.277 21.107 21.4257C20.6756 21.8042 20.2043 22.1007 19.6865 22.3131C18.9922 22.6021 18.2445 22.75 17.45 22.75C16.3114 22.75 15.1213 22.4821 13.896 21.96C12.6885 21.4455 11.4895 20.7561 10.3086 19.8963L10.3076 19.8956C9.12671 19.0331 8.00824 18.0786 6.94224 17.0229L6.93709 17.0178C5.88147 15.9519 4.92677 14.8332 4.07368 13.6614L4.07114 13.658C3.22474 12.4813 2.5351 11.293 2.0297 10.1032L2.02877 10.101C1.51719 8.88605 1.25 7.69701 1.25 6.54C1.25 5.77184 1.3856 5.02732 1.66286 4.33342C1.94487 3.61753 2.38783 2.96904 2.98958 2.39989Z"
														fill="#ffffff"
													></path>
												</g>
											</g>
										</g>
									</svg>
								</span>
								<div class="${cx("cart__name")}">
									<span>Phone</span>
									<p>${profile?.phone}</p>
								</div>
							</div>
							<div class="${cx("cart__item")}">
								<span class="${cx("cart__icon")}">
									<svg
										width="64px"
										height="64px"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
										<g
											id="SVGRepo_tracerCarrier"
											stroke-linecap="round"
											stroke-linejoin="round"
										></g>
										<g id="SVGRepo_iconCarrier">
											<g id="style=stroke">
												<g id="calendar-cells">
													<path
														id="rectangle (Stroke)"
														fill-rule="evenodd"
														clip-rule="evenodd"
														d="M1.25 8C1.25 5.37665 3.37665 3.25 6 3.25H18C20.6234 3.25 22.75 5.37665 22.75 8V18C22.75 20.6234 20.6234 22.75 18 22.75H6C3.37665 22.75 1.25 20.6234 1.25 18V8ZM6 4.75C4.20507 4.75 2.75 6.20507 2.75 8V18C2.75 19.7949 4.20507 21.25 6 21.25H18C19.7949 21.25 21.25 19.7949 21.25 18V8C21.25 6.20507 19.7949 4.75 18 4.75H6Z"
														fill="#ffffff"
													></path>
													<rect
														id="vector"
														x="7"
														y="9.5"
														width="2"
														height="2"
														rx="0.5"
														fill="#ffffff"
													></rect>
													<rect
														id="vector_2"
														x="11"
														y="9.5"
														width="2"
														height="2"
														rx="0.5"
														fill="#ffffff"
													></rect>
													<rect
														id="vector_3"
														x="15"
														y="9.5"
														width="2"
														height="2"
														rx="0.5"
														fill="#ffffff"
													></rect>
													<rect
														id="vector_4"
														x="7"
														y="12.5"
														width="2"
														height="2"
														rx="0.5"
														fill="#ffffff"
													></rect>
													<rect
														id="vector_5"
														x="7"
														y="15.5"
														width="2"
														height="2"
														rx="0.5"
														fill="#ffffff"
													></rect>
													<rect
														id="vector_6"
														x="11"
														y="12.5"
														width="2"
														height="2"
														rx="0.5"
														fill="#ffffff"
													></rect>
													<rect
														id="vector_7"
														x="11"
														y="15.5"
														width="2"
														height="2"
														rx="0.5"
														fill="#ffffff"
													></rect>
													<rect
														id="vector_8"
														x="15"
														y="12.5"
														width="2"
														height="2"
														rx="0.5"
														fill="#ffffff"
													></rect>
													<rect
														id="vector_9"
														x="15"
														y="15.5"
														width="2"
														height="2"
														rx="0.5"
														fill="#ffffff"
													></rect>
													<path
														id="line (Stroke)"
														fill-rule="evenodd"
														clip-rule="evenodd"
														d="M8 1.25C8.41421 1.25 8.75 1.58579 8.75 2V5.5C8.75 5.91421 8.41421 6.25 8 6.25C7.58579 6.25 7.25 5.91421 7.25 5.5V2C7.25 1.58579 7.58579 1.25 8 1.25Z"
														fill="#ffffff"
													></path>
													<path
														id="line (Stroke)_2"
														fill-rule="evenodd"
														clip-rule="evenodd"
														d="M16 1.25C16.4142 1.25 16.75 1.58579 16.75 2V5.5C16.75 5.91421 16.4142 6.25 16 6.25C15.5858 6.25 15.25 5.91421 15.25 5.5V2C15.25 1.58579 15.5858 1.25 16 1.25Z"
														fill="#ffffff"
													></path>
												</g>
											</g>
										</g>
									</svg>
								</span>
								<div class="${cx("cart__name")}">
									<span>Brithday</span>
									<p>${profile?.brithday}</p>
								</div>
							</div>
							<div class="${cx("cart__item")}">
								<span class="${cx("cart__icon")}">
									<svg
										width="64px"
										height="64px"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
										<g
											id="SVGRepo_tracerCarrier"
											stroke-linecap="round"
											stroke-linejoin="round"
										></g>
										<g id="SVGRepo_iconCarrier">
											<g id="style=stroke">
												<g id="location">
													<path
														id="ellipse (Stroke)"
														fill-rule="evenodd"
														clip-rule="evenodd"
														d="M12 7.75C11.0335 7.75 10.25 8.5335 10.25 9.5C10.25 10.4665 11.0335 11.25 12 11.25C12.9665 11.25 13.75 10.4665 13.75 9.5C13.75 8.5335 12.9665 7.75 12 7.75ZM8.75 9.5C8.75 7.70507 10.2051 6.25 12 6.25C13.7949 6.25 15.25 7.70507 15.25 9.5C15.25 11.2949 13.7949 12.75 12 12.75C10.2051 12.75 8.75 11.2949 8.75 9.5Z"
														fill="#ffffff"
													></path>
													<path
														id="vector (Stroke)"
														fill-rule="evenodd"
														clip-rule="evenodd"
														d="M19.5736 8.66416C17.8061 0.78438 6.20298 0.776064 4.4263 8.65453C3.92771 10.8772 4.53594 12.9677 5.64581 14.8712C6.7601 16.7823 8.34545 18.4443 9.70294 19.7748C9.70324 19.7751 9.70355 19.7754 9.70385 19.7757L9.98821 20.0525C9.9889 20.0532 9.98959 20.0539 9.99028 20.0545C10.9528 20.9764 11.5456 21.2503 12.0124 21.2449C12.4842 21.2395 13.0841 20.9468 14.0536 20.0027L14.055 20.0014C15.4247 18.6742 17.0789 16.9922 18.2558 15.0403C19.428 13.096 20.0867 10.951 19.5736 8.66419L19.5736 8.66416ZM8.9461 21.1314L8.89129 21.0786L8.89035 21.0777C8.81273 21.0022 8.73386 20.9253 8.65394 20.847C7.2824 19.5028 5.57222 17.723 4.34999 15.6267C3.12314 13.5226 2.35382 11.0399 2.96276 8.32581L2.96293 8.32505C5.09151 -1.11606 18.9197 -1.10423 21.0372 8.33585L20.3054 8.5L21.0372 8.33585C21.6639 11.1291 20.831 13.674 19.5403 15.8147C18.2545 17.9475 16.4747 19.7454 15.0992 21.0782C14.0956 22.0554 13.1259 22.7322 12.0296 22.7448C10.9283 22.7575 9.95462 22.0979 8.95039 21.1356L8.9461 21.1314Z"
														fill="#ffffff"
													></path>
												</g>
											</g>
										</g>
									</svg>
								</span>
								<div class="${cx("cart__name")}">
									<span>Location</span>
									<p>${profile?.location}</p>
								</div>
							</div>
						</div>
						<div class="${cx("media")}">
							<a href="${profile?.facebook}">
								<svg
									width="64px"
									height="64px"
									viewBox="0 0 192 192"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
								>
									<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
									<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
									<g id="SVGRepo_iconCarrier">
										<path
											stroke="#ffffff"
											stroke-linecap="round"
											stroke-width="12"
											d="M96 170c40.869 0 74-33.131 74-74 0-40.87-33.131-74-74-74-40.87 0-74 33.13-74 74 0 40.869 33.13 74 74 74Zm0 0v-62m30-48h-10c-11.046 0-20 8.954-20 20v28m0 0H74m22 0h22"
										></path>
									</g>
								</svg>
							</a>
							<a href="${profile?.github}">
								<svg
									width="64px"
									height="64px"
									viewBox="0 0 192 192"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
								>
									<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
									<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
									<g id="SVGRepo_iconCarrier">
										<path
											stroke="#ffffff"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="12"
											d="M120.755 170c.03-4.669.059-20.874.059-27.29 0-9.272-3.167-15.339-6.719-18.41 22.051-2.464 45.201-10.863 45.201-49.067 0-10.855-3.824-19.735-10.175-26.683 1.017-2.516 4.413-12.63-.987-26.32 0 0-8.296-2.672-27.202 10.204-7.912-2.213-16.371-3.308-24.784-3.352-8.414.044-16.872 1.14-24.785 3.352C52.457 19.558 44.162 22.23 44.162 22.23c-5.4 13.69-2.004 23.804-.987 26.32C36.824 55.498 33 64.378 33 75.233c0 38.204 23.149 46.603 45.2 49.067-3.551 3.071-6.719 9.138-6.719 18.41 0 6.416.03 22.621.059 27.29M27 130c9.939.703 15.67 9.735 15.67 9.735 8.834 15.199 23.178 10.803 28.815 8.265"
										></path>
									</g>
								</svg>
							</a>
							<a href="${profile?.instagram}">
								<svg
									width="64px"
									height="64px"
									viewBox="0 0 192 192"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
								>
									<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
									<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
									<g id="SVGRepo_iconCarrier">
										<path
											stroke="#ffffff"
											stroke-width="12"
											d="M96 162c-14.152 0-24.336-.007-32.276-.777-7.849-.761-12.87-2.223-16.877-4.741a36 36 0 0 1-11.33-11.329c-2.517-4.007-3.98-9.028-4.74-16.877C30.007 120.336 30 110.152 30 96c0-14.152.007-24.336.777-32.276.76-7.849 2.223-12.87 4.74-16.877a36 36 0 0 1 11.33-11.33c4.007-2.517 9.028-3.98 16.877-4.74C71.663 30.007 81.847 30 96 30c14.152 0 24.336.007 32.276.777 7.849.76 12.87 2.223 16.877 4.74a36 36 0 0 1 11.329 11.33c2.518 4.007 3.98 9.028 4.741 16.877.77 7.94.777 18.124.777 32.276 0 14.152-.007 24.336-.777 32.276-.761 7.849-2.223 12.87-4.741 16.877a36 36 0 0 1-11.329 11.329c-4.007 2.518-9.028 3.98-16.877 4.741-7.94.77-18.124.777-32.276.777Z"
										></path>
										<circle cx="96" cy="96" r="30" stroke="#ffffff" stroke-width="12"></circle>
										<circle cx="135" cy="57" r="9" fill="#ffffff"></circle>
									</g>
								</svg>
							</a>
						</div>
					</div>
				</div>
				<div class="col-9">
					<div class="${cx("container")}">
						<nav class="${cx("header")}">
							<ul class="${cx("nav")}">
								${MENU?.map((item) => {
									return html`
										<li
											class="${cx("nav__item", {
												nav__active: `/${url}` == item.url,
											})}"
										>
											<a href="/#${item?.url}">${item?.title}</a>
										</li>
									`
								})}
							</ul>
						</nav>
						${component()}
					</div>
				</div>
			</div>
		</div>
	`)
}

export default LayoutClient

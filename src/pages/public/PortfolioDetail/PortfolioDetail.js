import classNames from "classnames/bind"
import moment from "moment/moment"
import { html, useEffect, useState } from "../../../lib"
import { getProject } from "../../../services/projectService"
import { getCategoryProject } from "../../../services/categoryProjectService"
import styles from "./PortfolioDetail.module.scss"
import { useTitle } from "../../../lib"

const cx = classNames.bind(styles)

const PortfolioDetailPage = ({ data }) => {
	const [project, setProject] = useState({})
	const [projects, setProjects] = useState([])
	const { id } = data
	const [title, setTitle] = useTitle("Truong Nguyen | Portfolio")

	useEffect(() => {
		const fetchApi = async () => {
			const res1 = await getProject(id)
			setProject(res1)
			if (res1) {
				const res2 = await getCategoryProject(res1?.categoryProjectId)
				setProjects(res2?.projects?.filter((item) => item.id != id))
			}
		}
		fetchApi()
	}, [])

	return html` <div class="${cx("main")}">
		<h1 class="${cx("title")}">Portfolio</h1>
		<div class="row ${cx("content")}">
			<div class="col-12">
				<a class="${cx("back")}" href="#/portfolio">
					<svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
						<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							<path
								d="M17 12L8 12"
								stroke="#ffffff"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							></path>
							<path
								d="M11 8L7 12L11 16"
								stroke="#ffffff"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							></path>
						</g>
					</svg>
					<span>Back Portfolio</span>
				</a>
			</div>
			<div class="col-12">
				<div class="${cx("header")}">
					<h1 class="${cx("name")}">${project?.name}</h1>
					<img src="${project?.image}" alt="thumnail" />
					<div class="${cx("overlay")}" style="width: calc(100% + 64px)"></div>
				</div>
				<div class="${cx("body")}">
					<div class="row">
						<div class="col-4">
							<div class="${cx("item")}">
								<div class="${cx("item__left")}">
									<svg
										fill="#ffffff"
										width="64px"
										height="64px"
										viewBox="0 0 64 64"
										version="1.1"
										xmlns="http://www.w3.org/2000/svg"
										xmlns:xlink="http://www.w3.org/1999/xlink"
										xml:space="preserve"
										xmlns:serif="http://www.serif.com/"
										style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
									>
										<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
										<g
											id="SVGRepo_tracerCarrier"
											stroke-linecap="round"
											stroke-linejoin="round"
										></g>
										<g id="SVGRepo_iconCarrier">
											<rect
												id="Icons"
												x="-384"
												y="-320"
												width="1280"
												height="800"
												style="fill:none;"
											></rect>
											<g id="Icons1" serif:id="Icons">
												<g id="Strike"></g>
												<g id="H1"></g>
												<g id="H2"></g>
												<g id="H3"></g>
												<g id="list-ul"></g>
												<g id="hamburger-1"></g>
												<g id="hamburger-2"></g>
												<g id="list-ol"></g>
												<g id="list-task"></g>
												<g id="trash"></g>
												<g id="vertical-menu"></g>
												<g id="horizontal-menu"></g>
												<g id="sidebar-2"></g>
												<g id="Pen"></g>
												<g id="Pen1" serif:id="Pen"></g>
												<g id="clock"></g>
												<g id="external-link"></g>
												<g id="hr"></g>
												<g id="info"></g>
												<g id="warning"></g>
												<g id="plus-circle"></g>
												<g id="minus-circle"></g>
												<g id="vue"></g>
												<g id="cog"></g>
												<g id="logo"></g>
												<g id="radio-check"></g>
												<g id="eye-slash"></g>
												<g id="eye"></g>
												<g id="toggle-off"></g>
												<g id="shredder"></g>
												<g>
													<path
														d="M9.89,30.496c-1.14,1.122 -1.784,2.653 -1.791,4.252c-0.006,1.599 0.627,3.135 1.758,4.266c3.028,3.028 7.071,7.071 10.081,10.082c2.327,2.326 6.093,2.349 8.448,0.051c5.91,-5.768 16.235,-15.846 19.334,-18.871c0.578,-0.564 0.905,-1.338 0.905,-2.146c0,-4.228 0,-17.607 0,-17.607l-17.22,0c-0.788,0 -1.544,0.309 -2.105,0.862c-3.065,3.018 -13.447,13.239 -19.41,19.111Zm34.735,-15.973l0,11.945c0,0.811 -0.329,1.587 -0.91,2.152c-3.069,2.981 -13.093,12.718 -17.485,16.984c-1.161,1.127 -3.012,1.114 -4.157,-0.031c-2.387,-2.386 -6.296,-6.296 -8.709,-8.709c-0.562,-0.562 -0.876,-1.325 -0.872,-2.12c0.003,-0.795 0.324,-1.555 0.892,-2.112c4.455,-4.373 14.545,-14.278 17.573,-17.25c0.561,-0.551 1.316,-0.859 2.102,-0.859c3.202,0 11.566,0 11.566,0Zm-7.907,2.462c-1.751,0.015 -3.45,1.017 -4.266,2.553c-0.708,1.331 -0.75,2.987 -0.118,4.356c0.836,1.812 2.851,3.021 4.882,2.809c2.042,-0.212 3.899,-1.835 4.304,-3.896c0.296,-1.503 -0.162,-3.136 -1.213,-4.251c-0.899,-0.953 -2.18,-1.548 -3.495,-1.57c-0.031,-0.001 -0.062,-0.001 -0.094,-0.001Zm0.008,2.519c1.105,0.007 2.142,0.849 2.343,1.961c0.069,0.384 0.043,0.786 -0.09,1.154c-0.393,1.079 -1.62,1.811 -2.764,1.536c-1.139,-0.274 -1.997,-1.489 -1.802,-2.67c0.177,-1.069 1.146,-1.963 2.27,-1.981c0.014,0 0.029,0 0.043,0Z"
													></path>
													<path
														d="M48.625,13.137l0,4.001l3.362,0l0,11.945c0,0.811 -0.328,1.587 -0.909,2.152c-3.069,2.981 -13.093,12.717 -17.485,16.983c-1.161,1.128 -3.013,1.114 -4.157,-0.03l-0.034,-0.034l-1.016,0.993c-0.663,0.646 -1.437,1.109 -2.259,1.389l1.174,1.174c2.327,2.327 6.093,2.35 8.447,0.051c5.91,-5.768 16.235,-15.845 19.335,-18.87c0.578,-0.565 0.904,-1.339 0.904,-2.147c0,-4.227 0,-17.607 0,-17.607l-7.362,0Z"
													></path>
												</g>
												<g id="spinner--loading--dots-" serif:id="spinner [loading, dots]"></g>
												<g id="react"></g>
												<g id="check-selected"></g>
												<g id="turn-off"></g>
												<g id="code-block"></g>
												<g id="user"></g>
												<g id="coffee-bean"></g>
												<g id="coffee-beans">
													<g id="coffee-bean1" serif:id="coffee-bean"></g>
												</g>
												<g id="coffee-bean-filled"></g>
												<g id="coffee-beans-filled">
													<g id="coffee-bean2" serif:id="coffee-bean"></g>
												</g>
												<g id="clipboard"></g>
												<g id="clipboard-paste"></g>
												<g id="clipboard-copy"></g>
												<g id="Layer1"></g>
											</g>
										</g>
									</svg>
								</div>
								<div class="${cx("item__right")}">
									<h3 class="${cx("item__title")}">Category</h3>
									<span class="${cx("item__desc")}">${project?.categoryProject?.name}</span>
								</div>
							</div>
						</div>
						<div class="col-4">
							<div class="${cx("item")}">
								<div class="${cx("item__left")}">
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
											<path
												d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7"
												stroke="#ffffff"
												stroke-width="2"
												stroke-linecap="round"
											></path>
											<rect x="6" y="12" width="3" height="3" rx="0.5" fill="#ffffff"></rect>
											<rect x="10.5" y="12" width="3" height="3" rx="0.5" fill="#ffffff"></rect>
											<rect x="15" y="12" width="3" height="3" rx="0.5" fill="#ffffff"></rect>
										</g>
									</svg>
								</div>
								<div class="${cx("item__right")}">
									<h3 class="${cx("item__title")}">Date</h3>
									<span class="${cx("item__desc")}"
										>${moment(project?.createAt).format("DD/MM/YYYY")}</span
									>
								</div>
							</div>
						</div>
						<div class="col-4">
							<div class="${cx("item")}">
								<div class="${cx("item__left")}">
									<svg
										fill="#ffffff"
										width="64px"
										height="64px"
										viewBox="0 0 1069 1069"
										style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
										version="1.1"
										xml:space="preserve"
										xmlns="http://www.w3.org/2000/svg"
										xmlns:serif="http://www.serif.com/"
										xmlns:xlink="http://www.w3.org/1999/xlink"
									>
										<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
										<g
											id="SVGRepo_tracerCarrier"
											stroke-linecap="round"
											stroke-linejoin="round"
										></g>
										<g id="SVGRepo_iconCarrier">
											<rect
												height="1066.67"
												id="Chip-set"
												style="fill:none;"
												width="1066.67"
												x="1.397"
												y="0.245"
											></rect>
											<g>
												<path
													d="M688.577,148.161l-279.947,0l-0,-64.765c-0,-17.247 -14.003,-31.25 -31.25,-31.25c-17.248,0 -31.25,14.003 -31.25,31.25l-0,64.768c-52.094,0.29 -101.991,21.109 -138.847,57.966c-33.572,33.572 -53.838,77.963 -57.402,124.974l-65.332,0c-17.247,0 -31.25,14.003 -31.25,31.25c0,17.247 14.003,31.25 31.25,31.25l64.765,0l0,279.948l-64.765,-0c-17.247,-0 -31.25,14.002 -31.25,31.25c0,17.247 14.003,31.25 31.25,31.25l65.332,-0c3.564,47.011 23.83,91.402 57.402,124.974c36.856,36.857 86.753,57.676 138.847,57.965l-0,64.768c-0,17.248 14.002,31.25 31.25,31.25c17.247,0 31.25,-14.002 31.25,-31.25l-0,-64.764l279.947,-0l-0,64.764c-0,17.248 14.003,31.25 31.25,31.25c17.247,0 31.25,-14.002 31.25,-31.25l-0,-66.877c41.818,-6.159 80.852,-25.606 111.102,-55.856c33.572,-33.572 53.837,-77.963 57.401,-124.974l65.332,-0c17.248,-0 31.25,-14.003 31.25,-31.25c0,-17.248 -14.002,-31.25 -31.25,-31.25l-64.765,-0l0,-279.948l64.765,0c17.248,0 31.25,-14.003 31.25,-31.25c0,-17.247 -14.002,-31.25 -31.25,-31.25l-65.332,0c-3.564,-47.011 -23.829,-91.402 -57.401,-124.974c-30.25,-30.25 -69.284,-49.697 -111.102,-55.856l-0,-66.878c-0,-17.247 -14.003,-31.25 -31.25,-31.25c-17.247,0 -31.25,14.003 -31.25,31.25l-0,64.765Zm33.654,708.334l-375,-0c-35.915,-0 -70.359,-14.268 -95.754,-39.663c-25.396,-25.396 -39.663,-59.84 -39.663,-95.754c0,-113.06 0,-261.94 0,-375c0,-35.915 14.267,-70.359 39.663,-95.754c25.395,-25.396 59.839,-39.663 95.754,-39.663l374.999,0c35.915,0 70.359,14.267 95.755,39.663c25.395,25.395 39.662,59.839 39.662,95.754l0,375c0,35.914 -14.267,70.358 -39.662,95.754c-25.396,25.395 -59.84,39.663 -95.754,39.663Zm-364.584,-322.917c0,-0 0,29.825 0,62.5c0.001,63.283 51.301,114.583 114.584,114.583c39.191,0 85.809,0 125,0c63.282,0 114.583,-51.3 114.583,-114.583c0,-39.191 0,-85.809 0,-125c-0,-63.283 -51.301,-114.583 -114.583,-114.583c-32.675,-0 -62.5,-0 -62.5,-0c-17.248,-0 -31.25,14.002 -31.25,31.25c-0,17.247 14.002,31.25 31.25,31.25l62.498,-0c28.767,0 52.084,23.318 52.085,52.081c0,0.003 0,125.002 0,125.002c-0.001,28.765 -23.318,52.082 -52.082,52.083c-0.003,0 -125.001,0 -125.001,0c-28.765,-0.001 -52.083,-23.318 -52.084,-52.081c0,-0.004 0,-62.502 0,-62.502c0,-17.248 -14.002,-31.25 -31.25,-31.25c-17.247,-0 -31.25,14.002 -31.25,31.25Zm385.417,-241.407c18.254,0 33.073,14.82 33.073,33.074c0,18.253 -14.819,33.073 -33.073,33.073c-18.254,-0 -33.073,-14.82 -33.073,-33.073c-0,-18.254 14.819,-33.074 33.073,-33.074Z"
												></path>
												<path
													d="M920.147,346.078c0.001,-52.491 -20.851,-102.832 -57.968,-139.948c-37.117,-37.117 -87.458,-57.969 -139.949,-57.969c-113.059,0 -261.939,0 -374.999,0c-52.491,0 -102.832,20.852 -139.948,57.969c-37.117,37.116 -57.969,87.457 -57.969,139.948c0,113.06 0,261.94 0,375c-0,52.49 20.852,102.831 57.969,139.948c37.116,37.117 87.457,57.969 139.948,57.969c70.055,-0 147.677,-0 201.797,-0c52.491,-0 102.832,-20.852 139.949,-57.969c49.034,-49.034 124.168,-124.168 173.202,-173.202c37.117,-37.117 57.969,-87.458 57.968,-139.949l0,-201.797Zm-62.5,0l0,201.797c0,35.915 -14.267,70.359 -39.662,95.755c-49.035,49.034 -124.168,124.167 -173.202,173.202c-25.396,25.396 -59.84,39.663 -95.755,39.663c-54.12,-0 -131.742,-0 -201.797,-0c-35.915,-0 -70.359,-14.267 -95.754,-39.663c-25.396,-25.396 -39.663,-59.84 -39.663,-95.754c0,-113.06 0,-261.94 0,-375c0,-35.915 14.267,-70.359 39.663,-95.754c25.395,-25.396 59.839,-39.663 95.754,-39.663l374.999,0c35.915,0 70.359,14.267 95.755,39.663c25.395,25.395 39.662,59.839 39.662,95.754Zm-500,250c0.001,63.283 51.301,114.583 114.584,114.583c39.191,0 85.809,0 125,0c63.282,0 114.583,-51.3 114.583,-114.583c0,-39.191 0,-85.809 0,-125c-0,-63.283 -51.301,-114.583 -114.583,-114.583l-125,-0c-63.283,-0 -114.583,51.3 -114.584,114.583l0,125Zm62.5,0.002l0,-125.002c0.001,-28.765 23.319,-52.083 52.082,-52.083c0.003,-0 125.001,-0 125.001,-0c28.766,0 52.083,23.318 52.084,52.081c0,0.003 0,125.002 0,125.002c-0.001,28.765 -23.318,52.082 -52.082,52.083c-0.003,0 -125.001,0 -125.001,0c-28.765,-0.001 -52.083,-23.318 -52.084,-52.081Z"
													style="fill-opacity:0.5;"
												></path>
											</g>
										</g>
									</svg>
								</div>
								<div class="${cx("item__right")}">
									<h3 class="${cx("item__title")}">Technogoly</h3>
									<span class="${cx("item__desc")}">${project?.technology}</span>
								</div>
							</div>
						</div>
						<div class="col-4 py-4">
							<div class="${cx("item")}">
								<div class="${cx("item__left")}">
									<svg
										width="64px"
										height="64px"
										viewBox="0 0 192 192"
										xmlns="http://www.w3.org/2000/svg"
										fill="#ffffff"
									>
										<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
										<g
											id="SVGRepo_tracerCarrier"
											stroke-linecap="round"
											stroke-linejoin="round"
										></g>
										<g id="SVGRepo_iconCarrier">
											<path
												stroke="#000000"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="12"
												d="M120.755 170c.03-4.669.059-20.874.059-27.29 0-9.272-3.167-15.339-6.719-18.41 22.051-2.464 45.201-10.863 45.201-49.067 0-10.855-3.824-19.735-10.175-26.683 1.017-2.516 4.413-12.63-.987-26.32 0 0-8.296-2.672-27.202 10.204-7.912-2.213-16.371-3.308-24.784-3.352-8.414.044-16.872 1.14-24.785 3.352C52.457 19.558 44.162 22.23 44.162 22.23c-5.4 13.69-2.004 23.804-.987 26.32C36.824 55.498 33 64.378 33 75.233c0 38.204 23.149 46.603 45.2 49.067-3.551 3.071-6.719 9.138-6.719 18.41 0 6.416.03 22.621.059 27.29M27 130c9.939.703 15.67 9.735 15.67 9.735 8.834 15.199 23.178 10.803 28.815 8.265"
											></path>
										</g>
									</svg>
								</div>
								<div class="${cx("item__right")}">
									<h3 class="${cx("item__title")}">Github</h3>
									<a class="${cx("item__desc", "item__link")}" href="${project?.repository}"
										>${project?.repository}</a
									>
								</div>
							</div>
						</div>
						<div class="col-4 py-4">
							<div class="${cx("item")}">
								<div class="${cx("item__left")}">
								    <svg fill="#ffffff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="0 0 92 92" enable-background="new 0 0 92 92" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_1239_" d="M91.3,43.8C90.6,42.8,74.4,19,46,19C17.6,19,1.4,42.8,0.7,43.8c-0.9,1.3-0.9,3.1,0,4.5 C1.4,49.2,17.6,73,46,73c28.4,0,44.6-23.8,45.3-24.8C92.2,46.9,92.2,45.1,91.3,43.8z M46,65C26.7,65,13.5,51.4,9,46 c4.5-5.5,17.6-19,37-19c19.3,0,32.5,13.6,37,19C78.4,51.5,65.3,65,46,65z M48.3,29.6c-4.4-0.6-8.7,0.5-12.3,3.2c0,0,0,0,0,0 c-7.3,5.5-8.8,15.9-3.3,23.2c2.7,3.6,6.5,5.8,10.9,6.5c0.8,0.1,1.6,0.2,2.3,0.2c3.6,0,7-1.2,9.9-3.3c7.3-5.5,8.8-15.9,3.3-23.2 C56.6,32.5,52.7,30.2,48.3,29.6z M52.3,54.5c-2.2,1.7-5,2.4-7.8,2c-2.8-0.4-5.3-1.9-7-4.1C34.1,47.7,35,41,39.7,37.5 c2.2-1.7,5-2.4,7.8-2c2.8,0.4,5.3,1.9,7,4.1C57.9,44.3,57,51,52.3,54.5z M51.9,40c0.8,0.7,1.2,1.8,1.2,2.8c0,1-0.4,2.1-1.2,2.8 c-0.7,0.7-1.8,1.2-2.8,1.2c-1.1,0-2.1-0.4-2.8-1.2c-0.8-0.8-1.2-1.8-1.2-2.8c0-1.1,0.4-2.1,1.2-2.8c0.7-0.8,1.8-1.2,2.8-1.2 C50.2,38.9,51.2,39.3,51.9,40z"></path> </g></svg>
								</div>
								<div class="${cx("item__right")}">
									<h3 class="${cx("item__title")}">Github</h3>
									<a class="${cx("item__desc", "item__link")}" href="${project?.url}"
										>${project?.url}</a
									>
								</div>
							</div>
						</div>
						
					</div>
					<div class="row">
						<div class="col-12">
							<p class="${cx("description")}">${project?.description}</p>
						</div>
						<div class="col-12">
							<div class="${cx("slider")}">
								<div class="row">
									${project?.gallery?.map((item) => {
										return `
											<div class="col-3 py-3">
												<div class="${cx("img")}">
													<img
														src="${item}"
													/>
												</div>
											</div>
										`
									})}
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-12">
							<h2 class="${cx("footer")}">Dự Án Liên Quan</h2>
						</div>
						${projects?.map((item) => {
							return `
								<div class="col-4 py-5">
									<a class="${cx("cart")}" href="#/portfolio/${item?.id}">
										<div class="${cx("cart__img")}">
											<img src="${item?.image}" />
											<div class="${cx("overlay")}"></div>
										</div>
										<div class="${cx("cart__desc")}">
											<h3>${item?.name}</h3>
											<span>${project?.categoryProject?.name}</span>
										</div>
									</a>
								</div>
							`
						})}
						${
							!projects?.length &&
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
								<span>Không có dự án nào liên quan cả</span>
							</div>
							`
						}
					</div>
					</div>
				</div>
			</div>
		</div>
	</div>`
}

export default PortfolioDetailPage

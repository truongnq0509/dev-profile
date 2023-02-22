import classNames from "classnames/bind"
import moment from "moment/moment"
import { html, useEffect, useState } from "../../../lib"
import { getPost } from "../../../services/postService"
import { getCategoryPost } from "../../../services/categoryPostService"
import styles from "./PostDetail.module.scss"
import { useTitle } from "../../../lib"

const cx = classNames.bind(styles)

const PostDetailPage = ({ data }) => {
	const [post, setPost] = useState({})
	const [posts, setPosts] = useState([])
	const { id } = data
	const [title, setTitle] = useTitle("Truong Nguyen | Chi Tiết Bài Viết")

	useEffect(() => {
		const fetchApi = async () => {
			const res1 = await getPost(id)
			setPost(res1)
			if (res1) {
				const re2 = await getCategoryPost(res1?.categoryPostId)
				setPosts(re2?.posts?.filter((item) => item.id != id))
			}
		}
		fetchApi()
	}, [])

	return html` <div class="${cx("main")}">
		<h1 class="${cx("title")}">Posts</h1>
		<div class="row ${cx("content")}">
			<div class="col-12">
				<a class="${cx("back")}" href="#/posts">
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
					<span>Back Posts</span>
				</a>
			</div>
			<div class="col-12">
				<div class="${cx("header")}">
					<h1 class="${cx("name")}">${post?.title}</h1>
					<img src="${post?.image}" alt="thumnail" />
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
									<span class="${cx("item__desc")}">${post?.categoryPost?.name}</span>
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
										>${moment(post?.createAt).format("DD/MM/YYYY")}</span
									>
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
												d="M10.56 11.87C9.81832 11.87 9.0933 11.6501 8.47661 11.238C7.85993 10.826 7.37928 10.2403 7.09545 9.55506C6.81162 8.86984 6.73736 8.11584 6.88205 7.38841C7.02675 6.66098 7.3839 5.99279 7.90835 5.46835C8.4328 4.9439 9.10098 4.58675 9.82841 4.44205C10.5558 4.29736 11.3098 4.37162 11.9951 4.65545C12.6803 4.93928 13.266 5.41992 13.678 6.03661C14.0901 6.65329 14.31 7.37832 14.31 8.12C14.3074 9.11375 13.9114 10.066 13.2087 10.7687C12.506 11.4714 11.5538 11.8674 10.56 11.87ZM10.56 5.87C10.115 5.87 9.67998 6.00196 9.30997 6.24919C8.93996 6.49642 8.65157 6.84783 8.48127 7.25896C8.31097 7.67009 8.26642 8.12249 8.35323 8.55895C8.44005 8.99541 8.65434 9.39632 8.96901 9.71099C9.28368 10.0257 9.68459 10.2399 10.121 10.3268C10.5575 10.4136 11.0099 10.369 11.421 10.1987C11.8322 10.0284 12.1836 9.74004 12.4308 9.37003C12.678 9.00002 12.81 8.565 12.81 8.12C12.81 7.52326 12.5729 6.95096 12.151 6.52901C11.729 6.10705 11.1567 5.87 10.56 5.87Z"
												fill="#ffffff"
											></path>
											<path
												d="M3.56 18.87C3.36109 18.87 3.17032 18.791 3.02967 18.6503C2.88902 18.5097 2.81 18.3189 2.81 18.12C2.81 13.37 8.24 13.37 10.56 13.37C11.28 13.37 11.92 13.37 12.5 13.44C12.6973 13.4553 12.8805 13.548 13.0098 13.6979C13.139 13.8477 13.2038 14.0426 13.19 14.24C13.1722 14.4381 13.0773 14.6214 12.9259 14.7504C12.7744 14.8794 12.5785 14.9439 12.38 14.93C11.84 14.93 11.24 14.87 10.56 14.87C5.38 14.87 4.31 16.17 4.31 18.12C4.31134 18.2189 4.29286 18.317 4.25565 18.4086C4.21843 18.5002 4.16324 18.5834 4.09333 18.6533C4.02341 18.7232 3.9402 18.7784 3.84859 18.8156C3.75699 18.8529 3.65886 18.8713 3.56 18.87Z"
												fill="#ffffff"
											></path>
											<path
												d="M12.67 19.63C12.4711 19.6299 12.2805 19.5507 12.14 19.41C12.061 19.3348 12.0002 19.2426 11.9621 19.1404C11.9239 19.0382 11.9096 18.9286 11.92 18.82L12.08 16.9C12.0923 16.7235 12.1667 16.557 12.29 16.43L17.81 10.91C18.1908 10.5572 18.6908 10.3612 19.21 10.3612C19.7291 10.3612 20.2291 10.5572 20.61 10.91C20.7978 11.0993 20.9458 11.3242 21.0454 11.5715C21.145 11.8188 21.1942 12.0835 21.19 12.35C21.1939 12.5958 21.149 12.8398 21.0581 13.0681C20.9671 13.2964 20.8318 13.5044 20.66 13.68L15.14 19.2C15.0176 19.3256 14.8545 19.4035 14.68 19.42L12.74 19.6L12.67 19.63ZM13.55 17.29L13.49 18.05L14.27 17.98L19.6 12.65C19.6629 12.5746 19.6951 12.4782 19.69 12.38C19.6896 12.2408 19.64 12.1062 19.55 12C19.4517 11.927 19.3325 11.8875 19.21 11.8875C19.0875 11.8875 18.9683 11.927 18.87 12L13.55 17.29Z"
												fill="#ffffff"
											></path>
										</g>
									</svg>
								</div>
								<div class="${cx("item__right")}">
									<h3 class="${cx("item__title")}">Author</h3>
									<span class="${cx("item__desc")}">${post?.authorName}</span>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-12">
							<p class="${cx("description")}">${post?.content}</p>
						</div>
						<div class="col-12">
							<div class="${cx("slider")}">
								<div class="row">
									${post?.gallery?.map((item) => {
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
						<h2 class="${cx("footer")}">Bài Viết Liên Quan</h2>
						${posts?.map((item) => {
							return `
								<div class="col-4 py-5">
									<a class="${cx("cart")}" href="#/post/${item?.id}">
										<div class="${cx("cart__img")}">
											<img src="${item?.image}" />
											<div class="${cx("overlay")}"></div>
										</div>
										<div class="${cx("cart__desc")}">
											<h3>${item?.title}</h3>
											<span>${post?.categoryPost?.name}</span>
										</div>
									</a>
								</div>
							`
						})}
						${!posts?.length &&
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
								<span>Dự định còn làm tiếp :D</span>
							</div>
							`}
					</div>
				</div>
			</div>
		</div>
	</div>`
}

export default PostDetailPage

import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.min.css"
import { render, router } from "./lib"
// Client
import { LayoutClient } from "./layouts/LayoutClient"
import { LayoutDefault } from "./layouts/LayoutDefault"
import { HomePage } from "./pages/public/Home"
import { AboutPage } from "./pages/public/About"
import { ResumePage } from "./pages/public/Resume"
import { PortfolioPage } from "./pages/public/Portfolio"
import { PortfolioDetailPage } from "./pages/public/PortfolioDetail"
import { PostPage } from "./pages/public/Post"
import { PostDetailPage } from "./pages/public/PostDetail"
import { LoginPage } from "./pages/public/Login"
import { ResgiterPage } from "./pages/public/Resgiter"
// Admin
import { LayoutAdmin } from "./layouts/LayoutAdmin"
import { DashboardPage } from "./pages/admin/Dashboard"
import { PostsPage, AddPostsPage, EditPostsPage } from "./pages/admin/Posts"
import { CategoryPostsPage, AddCategoryPostsPage, EditCategoryPostsPage } from "./pages/admin/CategoryPosts"
import { ProjectsPage, AddProjectsPage, EditProjectsPage } from "./pages/admin/Projects"
import { CategoryProjectsPage, AddCategoryProjectsPage, EditCategoryProjectsPage } from "./pages/admin/CategoryProjects"
import { ProfilePage } from "./pages/admin/Profile"

const routes = [
	// { path: "/", layout: LayoutClient, component: HomePage },
	{ path: "/", layout: LayoutClient, component: AboutPage },
	{ path: "/resume", layout: LayoutClient, component: ResumePage },
	{ path: "/portfolio", layout: LayoutClient, component: PortfolioPage },
	{ path: "/portfolio/:id", layout: LayoutClient, component: PortfolioDetailPage },
	{ path: "/posts", layout: LayoutClient, component: PostPage },
	{ path: "/post/:id", layout: LayoutClient, component: PostDetailPage },
	{ path: "/admin", layout: LayoutAdmin, component: DashboardPage },
	{ path: "/admin/profile", layout: LayoutAdmin, component: ProfilePage },
	{ path: "/admin/posts", layout: LayoutAdmin, component: PostsPage },
	{ path: "/admin/post/add", layout: LayoutAdmin, component: AddPostsPage },
	{ path: "/admin/post/:id/edit", layout: LayoutAdmin, component: EditPostsPage },
	{ path: "/admin/category-posts", layout: LayoutAdmin, component: CategoryPostsPage },
	{ path: "/admin/category-post/add", layout: LayoutAdmin, component: AddCategoryPostsPage },
	{ path: "/admin/category-post/:id/edit", layout: LayoutAdmin, component: EditCategoryPostsPage },
	{ path: "/admin/projects", layout: LayoutAdmin, component: ProjectsPage },
	{ path: "/admin/project/add", layout: LayoutAdmin, component: AddProjectsPage },
	{ path: "/admin/project/:id/edit", layout: LayoutAdmin, component: EditProjectsPage },
	{ path: "/admin/category-projects", layout: LayoutAdmin, component: CategoryProjectsPage },
	{ path: "/admin/category-project/add", layout: LayoutAdmin, component: AddCategoryProjectsPage },
	{ path: "/admin/category-project/:id/edit", layout: LayoutAdmin, component: EditCategoryProjectsPage },
	{ path: "/login", layout: LayoutDefault, component: LoginPage },
	{ path: "/resgiter", layout: LayoutDefault, component: ResgiterPage },
]

const app = document.querySelector("#app")

routes.forEach(({ path, layout, component }) => {
	router.on(path, (param) => render(() => layout(() => component(param), param), app))
})

router.resolve()

import About from "../pages/about";
import Posts from "../pages/posts";
import PostIdPage from "../pages/postIdPage";
import Login from "../pages/login";

export const privateRoutes = [
    {path:'/about', element: <About/>, exact: true},
    {path:'/posts', element: <Posts/>, exact: true},
    {path:'/posts/:id', element: <PostIdPage/>, exact: true}
]

export const publicRoutes = [
    {path:'/login', element: <Login/>, exact: true},
]
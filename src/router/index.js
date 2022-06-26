import { createRouter, createWebHashHistory } from "vue-router"
import Container from '../views/layout/Container'

const routes = [{
    path: "/",
    name: "Home",
    redirect: '/home',
    component: Container,
    children: [
        {
            path: '/docs',
            name: 'docs',
            component: () => import('../views/Docs.vue'),
            meta: { title: 'docs', keepAlive: true }
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('../views/Index.vue'),
            meta: { title: 'home', keepAlive: true }
        }]
}]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
export default router

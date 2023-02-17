import { useAuthStore } from "@/store/auth-store";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/Layout.vue");

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: "/dashboard",
        component: Layout,
        children: [
            { 
                path: "/dashboard", name: "dashboard", meta: {icon: 'icon'},
                component: () => import("@/views/dashboard/Dashboard.vue")
            },
        ]
    },
    {
        path: '/register', name: 'register',
        meta: {title: 'Register', hidden: true},
        component: () => import('@/views/auth/Register.vue'),
    },    
    {
        path: '/login', name: 'Login', meta: {title: 'Login', hidden: true},
        component: () => import('@/views/auth/Login.vue'),
    },
    {
        path: '/two-factor-challenge', name: 'TwoFactorChallenge', meta: {hidden: true, title: 'TwoFactorChallenge',},
        component: () => import('@/views/auth/TwoFactorChallenge.vue'),
    },    
    {
        path: '/error/403', meta: {hidden: true},
        component: () => import('@/views/error/Error403.vue'),
    },
    {
        path: '/:catchAll(.*)*', meta: {hidden: true},
        component: () => import('@/views/error/Error404.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach(async(to, from, next) => {
    document.title = (to?.meta?.title) ? `${to.meta.title} | Yggdrasil` : `Yggdrasil`
    
    const auth = useAuthStore()
    if(auth?.isLoggedIn){
        if (to.path === "/login") {
            next({ path: "/" });
        }else{  
            //TODO berechtigung prüfen         
            // if(to?.meta?.role){
                // if(await auth.hasRole(to.meta.role)){
                //     next()
                // }else{
                //     next('/error/403')
                // }
            // }else{
                next()
            // }
        }
    }else{
        if (["/login", "/register"].indexOf(to.path) !== -1) {
            next();
        } else {
            next(`/login?redirect=${to.path}`);
        }
    }
});

export default router;
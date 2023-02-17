import { defineStore } from "pinia";
import { UserRegisterType, UserLoginType } from "@/types/auth";
import { loginApi, logoutApi, meApi, registerApi } from "@/api/auth-api";
import { ElMessage } from "element-plus";
import router from "@/router";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        me: null,
    }),
    persist: {
        enabled: true,
    },
    getters: {
        isLoggedIn: (state) => !!state.me,
    },
    actions: {
        async register(data: UserRegisterType) {
            return await registerApi(data)
                .then((res) => {
                    ElMessage({
                        message: "registered",
                        showClose: true,
                    });
                    router.push("/");
                })
                .catch((err) => {
                    console.log("register.registerApi.catch error", err);
                });
        },
        async login(data: UserLoginType) {
            try {
                const res = await loginApi(data);

                if (!res) {
                    return;
                }

                if (res?.two_factor) {
                    router.push({ name: "TwoFactorChallenge" });
                    return;
                }

                await this.updateUserInfo();

                // const redirect = router.currentRoute.value.query.redirect ?? '/'
                // const redirectPath: string = typeof redirect === 'string' ? redirect : redirect[0];
                const redirectPath: string =
                    (router.currentRoute.value.query.redirect as string) ?? "/";

                router.push({ path: redirectPath });
            } catch (error) {
                console.log("authstore:login error: ", error);
            }
        },
        async updateUserInfo() {
            try {
                const res = await meApi();
                this.me = res.data;
            } catch (error) {
                this.me = null;
            }
        },
        async logout() {
            // await logoutApi().then(()=>{
            //     this.me = null;
            //     router.replace("/login");
            // })
            // .catch((err) => {
            //     console.log("logout logoutApi.catch error", err);
            // });      
            await logoutApi()
            this.me = null;
            router.replace("/login");
        },
    },
});

import { useApi } from "@/composables/api";
import { UserLoginType, UserRegisterType } from "@/types/auth";

const web = useApi("web");
const api = useApi();

export const registerApi = (data: UserRegisterType) => {
    return web.post("/register", data);
};

export const loginApi = (
    data: UserLoginType
): Promise<{ two_factor: boolean }> => {
    return web.post("/login", data);
};

export const meApi = () => {
    return api.get("/me");
};

export const logoutApi = () => {
    return web.post("/logout");
}
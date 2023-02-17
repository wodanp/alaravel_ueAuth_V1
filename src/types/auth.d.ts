export type UserRegisterType = {
    name: string
    email: string
    password: string
    password_confirmation: string
}

export type UserLoginType = {
    email: string
    password: string
}
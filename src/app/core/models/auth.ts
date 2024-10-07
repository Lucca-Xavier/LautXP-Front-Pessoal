export interface LoginData {
    email: string | null,
    password: string | null
}
export interface RegisterData {
    email: string | null,
    password: string | null,
    id: number | null,
    userName: string | null,
    confirmPassword: string | null,
    phoneNumber: string | null,
    idTipoUsuario: number | null
}
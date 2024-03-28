import { FC } from "react"
import "./styles.scss"
import userApi from "../../shared/services/user";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../shared/utils/cookies";

const loginSchema = z.object({
    mail: z.string()
        .nonempty({
            message: 'O e-mail é obrigatório',
        })
        .email({
            message: 'Formato de e-mail inválido',
        }),
    password: z.string().nonempty({
        message: 'A senha é obrigatória',
    }).min(6, {
        message: 'A senha precisa ter no mínimo 6 caracteres',
    }),
})

type loginData = z.infer<typeof loginSchema>

interface ILogin { }
const Login: FC<ILogin> = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<loginData>({
        resolver: zodResolver(loginSchema)
    })

    const navigate = useNavigate()

    const handleLogin = (data: loginData) => {
        userApi.login(data.mail, data.password).then((token: any) => {
            userApi.listUser(data.mail, token?.access_token).then((user: any) => {
                if (user?.admin == true) {
                    setCookie('token', JSON.stringify({ token: token?.access_token }), 1)
                    navigate("/usuarios")
                } else {
                    setError('mail', { message: 'Esse usuário não tem permissão para acessa' })
                    setError('password', { message: 'Esse usuário não tem permissão para acessa' })
                }
            })
        }).catch(() => {
            setError('mail', { message: 'E-mail ou a senha estão incorretos' })
            setError('password', { message: 'E-mail ou a senha estão incorretos' })
        })
    };

    return (
        <div className="container-login">
            <img src="https://i.ibb.co/rG1QYdG/fundo-login.png" alt="imagem de fundo" />
            <div className="modal-login">
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="container-input">
                        <label htmlFor="mail">E-mail</label>
                        <input type="email" {...register("mail")} />
                        {errors.mail && <span>{errors.mail.message}</span>}
                    </div>
                    <div className="container-input">
                        <label htmlFor="password">Senha</label>
                        <input type="text" {...register("password")} />
                        {errors.password && <span>{errors.password.message}</span>}
                    </div>
                    <div className="container-input">
                        <button type="submit">Entrar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
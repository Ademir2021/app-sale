import type { UserLogin } from "../../models/userLogin"

import "./styles.css"

type Props = {
    children:UserLogin
    handleLogin:any
    handleChange:any
    msg:string
}


const LoginComponent: React.FC<Props> = (

    {   children,
        handleChange,
        handleLogin,
        msg
    }: Props) => {

    return <>
    <div className="login-wrapper">
        <div className="login-container">
            <h2>Seja bem vindo(a) de volta</h2>
            <p>Entrar na minha conta</p>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={children.login || ''}
                    required
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={children.password || ''}
                    required
                    onChange={handleChange}
                />
                {msg && <p className="msg-red" >{msg}</p>}
                <a className="text-right" href="##">Esqueceu a senha?</a>
                <button type="submit">Entrar</button>
                <a className="text-center" href="##">{"Não tem Login"}</a>
            </form>
        </div>
    </div>
    </>
}

export default LoginComponent;
import type { UserLogin } from "../../models/userLogin"

import "./styles.css"

type Props = {
    children:UserLogin
    handleLogin:any
    handleChange:any
    msg:string
}


const Login: React.FC<Props> = (

    {   children,
        handleChange,
        handleLogin,
        msg
    }: Props) => {

    return <>
    <div>
        <div className="login-container">
            <h2>Login</h2>
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
                {msg && <p>{msg}</p>}
                <button type="submit">Entrar</button>
            </form>
        </div>
        </div>
    </>
}

export default Login;
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import "./styles.css"

const MainLayoutComponent: React.FC = () => {
    const { user, isAuthenticated, logout } = useAuth();

    const logo:any = "vite.svg"

    return <>
        <div>
            <header>
                <nav>
                    <img src={logo}/> |
                    <Link to="/">Início</Link> |
                    <Link to="/about">Sobre</Link> |
                    <Link to="/dashboard">Dashboard</Link>
                    {isAuthenticated ? (
                        <>
                            {' '}| <button onClick={logout}>Sair</button>
                        </>
                    ) :
                        <>
                            {' '}| <a href='/login'>Criar conta</a>
                        </>
                    }
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                {user?.role[0] === 'ROLE_ADMIN'  &&
                    <Link to="/admin">Painel Admin</Link>}
                <p>© 2025 - <a href='##'>Meu Site</a></p>
            </footer>
        </div>
    </>
}

export default MainLayoutComponent
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import "./styles.css"

const MainLayoutComponet: React.FC = () => {
    const { user, isAuthenticated, logout } = useAuth();

    return <>
        <div>
            <header>
                <nav>
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
                {user?.role === 'admin' &&
                    <Link to="/admin">Painel Admin</Link>}
                <p>© 2025 - <a href='##'>Meu Site</a></p>
            </footer>
        </div>
    </>
}

export default MainLayoutComponet
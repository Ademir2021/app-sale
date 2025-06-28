import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DashBoardComponent: React.FC = () => {
  const { user } = useAuth();
    return <div>
        <h2>Bem-vindo ao Dashboard!</h2>
        <p><span>Usuário: </span>{user?.role}</p>
        <p><span>Login: </span>{user?.login}</p>
        <hr/>
        <Link to="/sale">Comprar</Link>
    </div>
}

export default DashBoardComponent;
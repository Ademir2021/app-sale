import { Link } from "react-router-dom";

import "./styles.nav.css"

export function navSale() {

  const uri: string = window.location.pathname;
  const sale = "/sale"
  const address = "/address"
  const person = "/person"
  const pay = '/pay'
  const delivery = "/delivery"
  const uriIsActive = 'uri-is-active'
  const uriIsNoActive = 'uri-is-no-active'


  const nav_ =
    <div className="container-nav">
      <nav>
        <Link className={uri === sale ? uriIsActive : uriIsNoActive}  to={sale}>Comprar</Link>
        <Link className={uri === address ? uriIsActive : uriIsNoActive} to={address}>Dados de Entrega</Link>
        <Link className={uri === person ? uriIsActive : uriIsNoActive} to={person}>Dados do Comprador</Link>
        <Link className={uri === pay ? uriIsActive : uriIsNoActive}  to={pay}>Pagamento</Link>
        <Link className={uri === delivery ? uriIsActive : uriIsNoActive} to={delivery}>Entrega</Link>

      </nav>
    </div>
  return nav_
}
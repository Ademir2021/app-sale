import { Link } from "react-router-dom";

import "./styles.nav.css"

export function navSale() {

  const uri: string = window.location.pathname;
  const sale = "/sale"
  const address = "/address"
  const person = "/person"
  const pay = '/pay'
  const delivery = "/delivery"


  const nav_ =
    <div className="container-nav">
      <nav>
        <Link style={uri !== sale ? { display: "flex" } : { display: "none" }} to={sale}>Comprar</Link>
        <Link style={uri !== address ? { display: "flex" } : { display: "none" }} to={address}>Dados de Entrega</Link>
        <Link style={uri !== person ? { display: "flex" } : { display: "none" }} to={person}>Dados do Comprador</Link>
        <Link style={uri !== pay ? { display: "flex" } : { display: "none" }} to={pay}>Pagamento</Link>
        <Link style={uri !== delivery ? { display: "flex" } : { display: "none" }} to={delivery}>Entrega</Link>

      </nav>
    </div>
  console.log(uri)
  return nav_
}
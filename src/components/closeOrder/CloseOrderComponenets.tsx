import type { Order } from '../../models/orderItems';
import MenuComponent from '../menu/MenuComponent';
import { navSale } from '../sale/navSale';

import './styles.css'

type Props = {
    handleSaleSumbit: React.ReactNode | any
    order: Order
}

const CloseOrderComponent: React.FC<Props> = ({
    handleSaleSumbit,
    order
}: Props) => {

    const navSale_ = navSale()

    const mCloseOrder_ = <MenuComponent
        content={<>
            <span>({"IdCliente:" + order.person.id})</span>
            <span>({"TPedido:" + order.tSale.toFixed(2)})</span>
            <span>({"Desconto:" + order.discount.toFixed(2)})</span>
            <span>({"Total a pagar:" + order.tNote.toFixed(2)})</span>
            <button
                onClick={handleSaleSumbit}>{
                    <img className='img-send-order'
                        src="./imgs/send_order.png"
                        alt='Enviar Pedido'
                    />}</button>
        </>}
    />

    return <>
        <>{navSale_}</>
        <p>{mCloseOrder_}</p>
    </>
}

export default CloseOrderComponent
import type { Item } from "../../models/items"
import type { Order } from "../../models/orderItems"

import "./styles.css"


type Props = {
    items: Item[]
    order:Order
    handleUpItem: Function
    handleDownItem: Function
}

const SaleComponet: React.FC<Props> = ({
    items, order, handleUpItem, handleDownItem
}: Props) => {

    const items_ = <>
        <div className="items-container">
            <h2 className="items-container-h2">Lista de Items</h2>

            <ul className="items-container-ul">
                {items.map((item, index) => (
                    <li className="items-container-li" key={index}>
                        <p><b>Item </b>{item.id} {item.name}</p>
                        <p><b>Marca </b>{item.brand.name}</p>
                        <p><b>Setor </b>{item.sector.name}</p>
                        <p><b>Valor </b>{item.priceMax}</p>
                        <form><input placeholder="Informe a Quantidade" /></form>
                        <button onClick={() => handleUpItem(item)}>Incluir Item</button>
                        <button onClick={() => handleDownItem(item)}>Remover Item</button>
                    </li>))}</ul></div></>
    
    const order_ = <>    {<div>{order.itemSale.map((item, index) => (
      <div key={index}>
        <p >{item.item.id}</p>
        <p >{item.item.name}</p>
        <p >{item.price}</p>
        <p >{item.tItem}</p>
      </div>
    ))}</div>}</>

    return <>
        <h2>Sale</h2>
        <>{items_}</>
        <>{order_}</>
    </>
}

export default SaleComponet
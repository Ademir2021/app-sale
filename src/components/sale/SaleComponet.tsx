import type { Item } from "../../models/items"

import "./styles.css"


type Props = {
    items: Item[]
    handleUpItem:Function
    handleDownItem:Function
}

const SaleComponet: React.FC<Props> = ({
    items, handleUpItem, handleDownItem
}: Props) => {

    const items_ = <>
        <div className="items-container">
            <h2 className="items-container-h2">Lista de Items</h2>

            <ul className="items-container-ul">
                {items.map((item, index) => (
                    <li className="items-container-li" key={index}>
                        <b>Item: </b>{item.id} {item.name}
                        <p>
                            <b>Marca: </b>{item.brand.name}
                            {" "}
                            <b>Setor: </b>{item.sector.name}
                        </p>
                        <p><b>Preco Min</b>: R$ {item.priceMin}
                            {" "}<b>Preco Max</b>: R$ {item.priceMax}</p>
                        <p><b>Imagem: </b>{item.imagem}
                            <br /> <b>Barras: </b>{item.barCode}</p>
                            <button onClick={() => handleUpItem(item)}>Incluir Item</button>
                            <button onClick={() => handleDownItem(item)}>Remover Item</button>
                    </li>))}</ul></div></>

    return <>
        <h2>Sale</h2>
        <>{items_}</>
    </>
}

export default SaleComponet
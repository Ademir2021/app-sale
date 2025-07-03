import type { Item } from "../../models/items"
import type { Order } from "../../models/orderItems"
import { navSale } from "./navSale"
import MenuComponent from "../menu/MenuComponent"
import ListComponent from "../list/ListComponent"

import styles from './Table.module.css'

type Props = {
  items: Item[]
  order: Order
  handleUpItem: Function
  handleDownItem: Function
  decrementItemListStore: Function
  incrementItemListStore: Function
  handleDiscountChange: Function | any
  handleChangeList: Function | any
  showItems: boolean
  handleChangeOrder: Function | any
  showOrder: boolean
  handleSeachItemNome: Function | any
  searchItemName: string
}

const SaleComponent: React.FC<Props> = ({
  items,
  order,
  handleUpItem,
  handleDownItem,
  decrementItemListStore,
  incrementItemListStore,
  handleDiscountChange,
  handleChangeList,
  showItems,
  handleChangeOrder,
  showOrder,
  handleSeachItemNome,
  searchItemName
}: Props) => {

  const nav_ = navSale()

  const isItemsnoOrder = (id: number) => {
    for (let i of order.itemsSale)
      if (i.item.id === id)
        return true
  }

  const tOrder_ = <MenuComponent
    content={<>
      <input
        disabled
        value={"TPedido, R$ " + order.tSale}
      /><input
        type='number'
        // name="discount"
        value={order.discount || ''}
        onChange={handleDiscountChange}
        placeholder="Desconto"
      /><input
        disabled
        value={"TCompra, R$ " + order.tNote}
      />
      <input
        id="input-search-item-nome"
        value={searchItemName || ""}
        onChange={handleSeachItemNome}
        placeholder="Buscar Item"
      />
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={showItems}
          onChange={handleChangeList}
        />{!showItems ? "Mostrar Items" : "Ocultar Items"}
      </label>
      {order.itemsSale.length > 0 &&
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={showOrder}
            onChange={handleChangeOrder}
          />{!showOrder ? "Mostrar Pedido" : "Ocultar Pedido"}
        </label>
      }
    </>}
  />

  const items_ = <ListComponent
    th={<>
      <th>ID</th>
      <th>Nome</th>
      <th>Preço</th>
      <th>Marca</th>
      <th>Setor</th>
      <th>Img</th>
    </>
    }
    tbody={items.map((item, index) => (
      <tr className="custom-tbody" key={index}>
        <th>{item.id}</th>
        <th id="text-left" className={styles.th}>{item.name}</th>
        <th id="text-left" className={styles.th}>{item.priceMax}</th>
        <th id="text-left" className={styles.th}>{item.brand.name}</th>
        <th id="text-left" className={styles.th}>{item.sector.name}</th>
        <th className={styles.th}><a href={item.imagem} target="black"><img src="/imgs/icon_img.png" alt="Mostrar Produto" /></a></th>
        {!isItemsnoOrder(item.id) && <th className={styles.th}><button onClick={() => handleUpItem(item)}><img src='imgs/icon_store.png' alt="Inserir Item" /></button></th>}
        {isItemsnoOrder(item.id) && <> <th className={styles.th}><button onClick={() => handleDownItem(item)}><img src='imgs/icon_trash.png' alt="Remover Item" /></button></th>
          <th className={styles.th}><button onClick={() => decrementItemListStore(item)}><img src='imgs/icon_minus.png' alt="Diminuir Quantidade" /></button></th>
          <th className={styles.th}><button onClick={() => incrementItemListStore(item)}><img src='imgs/icon_plus.png' alt="Aumentar Quantidade" /></button></th></>}
      </tr>))}
  />

  const order_ = <> {<ListComponent
    th={<>
      <th>ID</th>
      <th>Nome</th>
      <th>Quant</th>
      <th>Preço</th>
      <th>Total</th>
    </>}
    tbody={order.itemsSale.map((item, index) => (
      <tr key={index}>
        <th className={styles.th} >{item.item.id}</th>
        <th id="text-left" className={styles.th}>{item.item.name}</th>
        <th className={styles.th}>{item.amount}</th>
        <th id="text-left" className={styles.th}>{item.price}</th>
        <th id="text-left" className={styles.th}>{item.tItem}</th>
      </tr>
    ))}
  />
  }</>
  return <>
    <>{nav_}</>
    <>{tOrder_}</>
    <>{showItems && items_}</>
    <>{showOrder && order.itemsSale.length > 0 && order_}</>
  </>
}

export default SaleComponent
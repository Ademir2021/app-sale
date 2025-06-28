import type { Item } from "../../models/items"
import type { Order } from "../../models/orderItems"

import "./styles.css"
import styles from './Table.module.css'

type Props = {
  items: Item[]
  order: Order
  handleUpItem: Function
  handleDownItem: Function
  decrementItemListStore: Function
  incrementItemListStore: Function
}

const SaleComponent: React.FC<Props> = ({
  items,
  order,
  handleUpItem,
  handleDownItem,
  decrementItemListStore,
  incrementItemListStore
}: Props) => {

  const items_ = <>
    <div className="items-container">
      <div className="items-container-ul">
        <div className="items-container-li">
          <table className="custom-table">
            <thead className="custom-thead">
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Marca</th>
                <th>Setor</th>
                <th>Img</th>
                <th id="text-center">Incluir</th>
                <th id="text-center">Remover</th>
                <th id="text-center">-</th>
                <th id="text-center">+</th>
              </tr>
            </thead>
            <tbody className="custom-tbody">
              {items.map((item, index) => (
                <tr className="custom-tbody" key={index}>
                  <th>{item.id}</th>
                  <th id="text-left" className={styles.th}>{item.name}</th>
                  <th id="text-left" className={styles.th}>{item.priceMax}</th>
                  <th id="text-left" className={styles.th}>{item.brand.name}</th>
                  <th id="text-left" className={styles.th}>{item.sector.name}</th>
                  <th className={styles.th}><a href={item.imagem} target="black">img</a></th>
                  <th className={styles.th}><button onClick={() => handleUpItem(item)}>Inc</button></th>
                  <th className={styles.th}><button onClick={() => handleDownItem(item)}>Rem</button></th>
                  <th className={styles.th}><button onClick={() => decrementItemListStore(item)}>-</button></th>
                  <th className={styles.th}><button onClick={() => incrementItemListStore(item)}>+</button></th>
                </tr>))}</tbody></table></div></div></div></>

  const order_ = <> {
    <div className="items-container">
      <div className="items-container-ul">
        <div className="items-container-li">
          <table className="custom-table">
            <thead className="custom-thead">
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Quant</th>
                <th>Preço</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody className="custom-tbody">
              {order.itemSale.map((item, index) => (
                <tr key={index}>
                  <th className={styles.th} >{item.item.id}</th>
                  <th id="text-left" className={styles.th}>{item.item.name}</th>
                  <th className={styles.th}>{item.amount}</th>
                  <th id="text-left" className={styles.th}>{item.price}</th>
                  <th id="text-left" className={styles.th}>{item.tItem}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  }</>
  return <>
    {/* <h2>Sale</h2> */}
    <>{items_}</>
    <>{order.itemSale.length > 0 && order_}</>
  </>
}

export default SaleComponent
import React, { useEffect, useState } from 'react';
import SaleComponent from '../components/sale/SaleComponent';
import type { Item } from '../models/items';
import api from '../services/api/api';
import type { ItemsSale, Order } from '../models/orderItems';

const Sale: React.FC = () => {
  const [items, setItems] = useState<Item[]>([])
  const [order, setOrder] = useState<Order>({
    person: { id: 1 },
    branch: { id: 1 },
    user: { id: 1 },
    tSale: 0.00,
    tNote: 0.00,
    discount: 2.00,
    itemSale: []
  })

    
  useEffect(() => {
   const storeOrder = localStorage.getItem("sale")
    if (storeOrder)
      setOrder(JSON.parse(storeOrder))
  },[order])

  useEffect(() => {
    api.get<Item[]>("items/items")
      .then(response => {
        setItems(response.data)
      })
  }, [])

  function sumItem(item: ItemsSale) {
    for (let i of order.itemSale)
      if (i.item.id === item.item.id) {
        i.amount = item.amount + item.amount;
        return item.tItem = item.amount * item.price;
      }
  }

  function verifItem(item: ItemsSale) {
    const exists = order.itemSale.some(i => i.item.id === item.item.id);
    if (exists) {
      alert('Este item já foi adicionado à venda!');
      return;
    } else {
      order.itemSale.push(item)
      sumTotalSale()
      setOrder(order)
    }
  }

  function sumTotalSale() {
    order.tSale = 0.00
    for (let i of order.itemSale)
      order.tSale += i.tItem
    order.tNote = order.tSale - order.discount
  }

  const handleUpItem = (item: Item) => {
    const setItemOrder: ItemsSale = {
      item: { id: 0, name: "" },
      amount: 0,
      price: 0.00,
      tItem: 0
    }
    setItemOrder.item.id = item.id
    setItemOrder.item.name = item.name
    setItemOrder.amount = 1
    setItemOrder.price = item.priceMax
    setItemOrder.tItem = setItemOrder.price * setItemOrder.amount
    sumItem(setItemOrder)
    verifItem(setItemOrder)
    localStorage.setItem("sale", JSON.stringify(order))
  };

  const handleDownItem = (item: Item) => {
    const newArray = order.itemSale.filter(obj => obj.item.id !== item.id);
    order.itemSale = newArray
    sumTotalSale()
    localStorage.setItem("sale", JSON.stringify(order))
  };

  function incrementItemListStore(item_: Item) {
        for (let item of order.itemSale) {
            if (item.item.id === item_.id) {
                item.amount += 1
                item.tItem = item.amount * item.price
                sumTotalSale()
                localStorage.setItem("sale", JSON.stringify(order));
            }
        }
    };

    function decrementItemListStore(item_: Item) {
        for (let item of order.itemSale) {
            if (item.item.id === item_.id) {
                item.amount -= 1
                if (item.amount > 0) {
                    item.tItem = item.amount * item.price
                    sumTotalSale()
                    localStorage.setItem("sale", JSON.stringify(order));
                }
            }
        }
    };

  return <>
  <input style={{textAlign:'center'}} disabled value={"R$ "+order.tSale} />
    <SaleComponent
      items={items}
      order={order}
      handleUpItem={handleUpItem}
      handleDownItem={handleDownItem}
      decrementItemListStore={decrementItemListStore}
      incrementItemListStore={incrementItemListStore}
    />
  </>
}
export default Sale;
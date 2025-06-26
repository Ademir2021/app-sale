import React, { useEffect, useState } from 'react';
import SaleComponet from '../components/sale/SaleComponet';
import type { Item } from '../models/items';
import api from '../services/api/api';
import type { ItemsSale, Order } from '../models/orderItems';

const Sale: React.FC = () => {
  const [items, setItems] = useState<Item[]>([])
  const [order, setOrder] = useState<Order>({
    person: { id: 1 },
    branch: { id: 1 },
    user: { id: 1 },
    discount: 0,
    itemSale: []
  })

  useEffect(() => {
    api.get<Item[]>("items/items")
      .then(response => {
        setItems(response.data)
      })
  }, [])

  const handleUpItem = (item: Item) => {

    const getOder: ItemsSale = {
      item: { id: 0 },
      amount: 0,
      price: 0
    }

    for (let i of items)
      if (i.id == item.id)
        getOder.item.id = item.id
    getOder.price = item.priceMax
    getOder.amount += 1
    order.itemSale.push(getOder)

    setOrder(order)
    console.log(order)

  };

  const handleDownItem = (item: Item) => {
    const newArray = order.itemSale.filter(obj => obj.item.id !== item.id);
    order.itemSale = newArray
    console.log(order)
  };

  function handleSubmit() {
    console.log(order)
  }

  return <>
    <SaleComponet
      items={items}
      handleUpItem={handleUpItem}
      handleDownItem={handleDownItem}
    />
    <button onClick={handleSubmit}>Finalizar venda</button>
  </>
}
export default Sale;
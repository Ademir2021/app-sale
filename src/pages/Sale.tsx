import React, { useEffect, useState } from 'react';
import SaleComponet from '../components/sale/SaleComponet';
import type { Item } from '../models/items';
import api from '../services/api/api';

const Sale: React.FC = () => {
  const [items, setItems] = useState<Item[]>([])
  const [orderItems, setOrderItems] = useState<Item[]>([])


  useEffect(() => {
    api.get<Item[]>("items/items")
      .then(response => {
        setItems(response.data)
      })
  }, [])

 const handleUpItem = (item: Item) => {
    for(let i of items)
      if (i.id == item.id)
        orderItems.push(i)
    setOrderItems(orderItems)
    console.log(orderItems)
  };

   const handleDownItem = (item: Item) => {
    const novoArray:Item[] = orderItems.filter(obj => obj.id !== item.id);
    setOrderItems(novoArray)
    console.log(novoArray)
  };
  return <>
    <SaleComponet
    items={items}
    handleUpItem={handleUpItem}
    handleDownItem={handleDownItem}
    />
    </>
}
export default Sale;
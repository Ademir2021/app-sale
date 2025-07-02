import React, { useEffect, useState } from 'react';
import SaleComponent from '../components/sale/SaleComponent';
import type { Item } from '../models/items';
import type { ItemsSale, Order } from '../models/orderItems';
import api from '../services/api/api';
import { useAuth } from '../context/AuthContext';

const Sale: React.FC = () => {

  const { headers } = useAuth();

  const [showItems, setShowItems] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [responseStatus, setResponseStatus] = useState(0)
  const [searchItemName, setSearchItemName] = useState<string>("")
  const [items, setItems] = useState<Item[]>([])
  const [order, setOrder] = useState<Order>({
    person: { id: 1 },
    branch: { id: 1 },
    user: { id: 1 },
    tSale: 0.00,
    tNote: 0.00,
    discount: 0.00,
    itemsSale: []
  })

  const handleChangeList = (e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setShowItems(e.target.checked);
  };

  const handleChangeOrder = (e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setShowOrder(e.target.checked);
  };

  const handleSeachItemNome = (e: { target: { value: any; }; }) => {
    const inputValue = e.target.value;
    setSearchItemName(inputValue)
  }

  const handleDiscountChange = (e: { target: { value: any; }; }) => {
    const inputValue = e.target.value;
    // Converte para número, se possível
    const discountValue = parseFloat(inputValue) || 0;
    // Atualiza o objeto order com o novo desconto e tNote recalculado
    setOrder((prev) => ({
      ...prev,
      discount: discountValue,
      tNote: Math.max(prev.tSale - discountValue, 0), // impede valores negativos
    }));
    //Atualiza desconto no storage
    localStorage.setItem("sale", JSON.stringify(order))
  };

  function getStoreOrder() {
    const storeOrder = localStorage.getItem("sale")
    if (storeOrder)
      setOrder(JSON.parse(storeOrder))
  }

  useEffect(() => {
    getStoreOrder()
  }, [])

  async function getItems() {
    await api.get<Item[]>("items/search_name?name=" + searchItemName, { headers })
      .then(response => {
        setItems(response.data)
        setResponseStatus(response.status)
      })
  }

  useEffect(() => {
    getItems()
  }, [searchItemName])

  async function sendSale() {
    await api.post<Order>("store/sales", order, { headers })
      .then(response => {
        console.log(response.data)
      })
  }

  function sumItem(item: ItemsSale) {
    for (let i of order.itemsSale)
      if (i.item.id === item.item.id) {
        i.amount = item.amount + item.amount;
        return item.tItem = item.amount * item.price;
      }
  }

  function verifItem(item: ItemsSale) {
    const exists = order.itemsSale.some(i => i.item.id === item.item.id);
    if (exists) {
      alert('Este item já foi adicionado à venda!');
      return;
    } else {
      order.itemsSale.push(item)
      sumTotalSale()
      setOrder(order)
    }
  }

  function sumTotalSale() {
    order.tSale = 0.00
    for (let i of order.itemsSale)
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
    getStoreOrder()
  };

  const handleDownItem = (itemToRemove: Item) => {
    const updatedItems = order.itemsSale.filter(({ item }) => item.id !== itemToRemove.id);
    const updatedOrder = { ...order, itemsSale: updatedItems };
    order.itemsSale = updatedItems; // mantém isso se `order` precisa ser mutado
    sumTotalSale();
    localStorage.setItem("sale", JSON.stringify(updatedOrder));
    getStoreOrder();
  };

  function incrementItemListStore(item_: Item) {
    for (let item of order.itemsSale) {
      if (item.item.id === item_.id) {
        item.amount += 1
        item.tItem = item.amount * item.price
        sumTotalSale()
        localStorage.setItem("sale", JSON.stringify(order));
        getStoreOrder()
      }
    }
  };

  function decrementItemListStore(item_: Item) {
    for (let item of order.itemsSale) {
      if (item.item.id === item_.id) {
        item.amount -= 1
        if (item.amount > 0) {
          item.tItem = item.amount * item.price
          sumTotalSale()
          localStorage.setItem("sale", JSON.stringify(order));
          getStoreOrder()
        }
      }
    }
  };

  function handleSaleSumbit() {
    if (order.itemsSale.length > 0) {
      sendSale()
      if (responseStatus === 200) {
        localStorage.removeItem('sale')
        order.itemsSale = []
        console.log(responseStatus)
      }
    } else {
      alert("Nenhum item no pedido")
    }
  }

  return <>
    <SaleComponent
      items={items}
      order={order}
      handleUpItem={handleUpItem}
      handleDownItem={handleDownItem}
      decrementItemListStore={decrementItemListStore}
      incrementItemListStore={incrementItemListStore}
      handleDiscountChange={handleDiscountChange}
      handleChangeList={handleChangeList}
      showItems={showItems}
      handleChangeOrder={handleChangeOrder}
      showOrder={showOrder}
      handleSeachItemNome={handleSeachItemNome}
      searchItemName={searchItemName}
    />
    <br />
    <button onClick={handleSaleSumbit}>Enviar Venda</button>
  </>
}
export default Sale;
import { useEffect, useState } from "react"
import type { Order } from '../models/orderItems';
import CloseOrderComponent from "../components/closeOrder/CloseOrderComponenets"
import { useAuth } from "../context/AuthContext";
import api from "../services/api/api";

const CloseOrder: React.FC = () => {

    const { headers, user } = useAuth();
    const [msg, setMsg] = useState('')
    const [flag, setFlag] = useState(false)
    const [order, setOrder] = useState<Order>({
    person: { id: 0 },
    branch: { id: 1 },
    user: { id: user?.id || 0 },
    tSale: 0,
    tNote: 0,
    discount: 0,
    itemsSale: []
  })

    function getStoreOrder() {
        const storeOrder = localStorage.getItem("sale")
        if (storeOrder)
            setOrder(JSON.parse(storeOrder))
    }

    useEffect(() => {
        getStoreOrder()
    }, [])

    async function sendSale() {
        try {
            await api.post("store/sales", order, { headers })
                .then(response => {
                    if (response.status === 200) {
                        setMsg(response.data)
                        setFlag(true)
                    }
                })
        } catch (error) {
            setMsg("Error: " + error)
        }
    }

    setTimeout(() => {
        setMsg('')
    }, 8000)

    function handleSaleSumbit(e: any) {
        e.preventDefault()
        if (flag === false) {
            if (order) {
                sendSale()
                localStorage.removeItem("sale")
            } else {
                setMsg("Sem Pedido no momento para envio.")
            }
        } else {
            setMsg("Pedido já foi enviado")
        }
    }
    return (
            <CloseOrderComponent
            handleSaleSumbit={handleSaleSumbit}
            order={order}
            msg={msg}
            />
    )
}

export default CloseOrder
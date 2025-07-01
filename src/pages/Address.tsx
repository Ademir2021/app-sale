import { useEffect, useState } from "react";
import AddressComponent from "../components/address/AddressComponent"
import type { TAddress, ResponseAddress } from "../models/address";
import AddressListComponent from "../components/address/AddressListComponent";
import api from "../services/api/api";
import { useAuth } from "../context/AuthContext";


const Address: React.FC = () => {

    const { headers } = useAuth();

    // const [msg, setMsg] = useState('')
    const [addresss, setAddresss] = useState<ResponseAddress[]>([])
    const [address, setAddress] = useState<TAddress>({
        id: 0,
        street: "",
        number: '',
        neighbor: "",
        complement: "",
        person: { id: 0, name: '' },
        zipCode: { id: 0, code: '' }
    })

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setAddress((values: any) => ({ ...values, [name]: value }))
    }

    async function getAddresss() {
        await api.get<ResponseAddress[]>("address/address", headers)
            .then(response => {
                setAddresss(response.data)
                console.log(response.data)
            })
    }

    useEffect(() => {
        getAddresss()
    }, [])

    const handleSubmit = (e: any) => {
        e.preventDefault()
    }

    return <>
        <AddressComponent
            onSubmit={handleSubmit}
            onClick={() => { getAddresss() }}
            handleChange={handleChange}
            msg={'msg'}
        >
            {address}
        </AddressComponent>
        <AddressListComponent
            address={addresss}
        />
    </>
}

export default Address
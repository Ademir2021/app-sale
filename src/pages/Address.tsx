import { useEffect, useState } from "react";
import AddressComponent from "../components/address/AddressComponent"
import type { Address } from "../models/address";
import AddressListComponent from "../components/address/AddressListComponent";
import api from "../services/api/api";
import { useAuth } from "../context/AuthContext";


const Address: React.FC = () => {

    const { headers } = useAuth();

    // const [msg, setMsg] = useState('')
    const [address_, setAddress_] = useState<Address[]>([])
    const [address, setAddress] = useState<Address>({
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

    async function getAddress() {
        await api.get<Address[]>("address/address", headers)
            .then(response => {
                setAddress_(response.data)
                console.log(response.data)
            })
    }

    useEffect(() => {
        getAddress()
    }, [])

    const handleSubmit = (e: any) => {
        e.preventDefault()
    }

    return <>
        <AddressComponent
            onSubmit={handleSubmit}
            onClick={() => { getAddress() }}
            handleChange={handleChange}
            msg={'msg'}
        >
            {address}
        </AddressComponent>
        <AddressListComponent
            address={address_}
        />
    </>
}

export default Address
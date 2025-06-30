import { useState } from "react";
import AddressComponent from "../components/address/AddressComponent"
import type { Address } from "../models/address";

const Address: React.FC = () => {

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

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log(address)
    }

    return <>
        <AddressComponent
            onSubmit={handleSubmit}
            onClick={()=>{}}
            handleChange={handleChange}
        >
            {address}
        </AddressComponent>
    </>
}

export default Address
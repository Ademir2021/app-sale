import { useEffect, useState } from "react";
import AddressComponent from "../components/address/AddressComponent"
import type { TAddress, ResponseAddress } from "../models/address";
import AddressListComponent from "../components/address/AddressListComponent";
import api from "../services/api/api";
import { useAuth } from "../context/AuthContext";
import type { ResponsePerson } from "../models/person";


const Address: React.FC = () => {

    const { headers } = useAuth();

    // const [msg, setMsg] = useState('')
        const [showItems, setShowItems] = useState(false);
    const [persons, setPersons] = useState<ResponsePerson[]>([])
    const [addresss, setAddresss] = useState<ResponseAddress[]>([])
    const [address, setAddress] = useState<TAddress>({
        id: 0,
        street: "",
        number: '',
        neighbor: "",
        complement: "",
        person: { id: 0, name: '' },
        zipCode: { id: 1, code: '' }
    })

     const handleChangeList = (e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setShowItems(e.target.checked);
    };

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setAddress((values: any) => ({ ...values, [name]: value }))
    }

       async function getPersons() {
        await api.get<ResponsePerson[]>("persons/persons", headers)
            .then(response => {
                setPersons(response.data)
            })
    }

    useEffect(() => {
        getPersons()
    }, [])

    async function getAddresss() {
        await api.get<ResponseAddress[]>("address/address", headers)
            .then(response => {
                setAddresss(response.data)
                // console.log(response.data)
            })
    }

    useEffect(() => {
        getAddresss()
    }, [])


    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log("Novo Endereço: ", address)
    }

    return <>
    <p>{JSON.stringify(address)}</p>
        <AddressComponent
            onSubmit={handleSubmit}
            onClick={handleSubmit}
            handleChange={handleChange}
            msg={'msg'}
            handleChangeList={handleChangeList}
            showItems={showItems}
            setAddress={setAddress}
            persons={persons}
        >
            {address}
        </AddressComponent>
        <AddressListComponent
            address={addresss}
            showItems={showItems}
        />
    </>
}

export default Address
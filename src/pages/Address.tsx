import { useEffect, useState } from "react";
import AddressComponent from "../components/address/AddressComponent"
import type { TAddress, ResponseAddress, ResponseZipCode } from "../models/address";
import AddressListComponent from "../components/address/AddressListComponent";
import api from "../services/api/api";
import { useAuth } from "../context/AuthContext";
import type { ResponsePerson } from "../models/person";


const Address: React.FC = () => {

    const { headers } = useAuth();

    const [msg, setMsg] = useState('')
    const [flag, setFlag] = useState(false)
    const [showItems, setShowItems] = useState(false);
    const [zipcodes, setZipCodes] = useState<ResponseZipCode[]>([])
    const [persons, setPersons] = useState<ResponsePerson[]>([])
    const [addresss, setAddresss] = useState<ResponseAddress[]>([])
    const [address, setAddress] = useState<TAddress>({
        id: 0,
        street: "",
        number: '',
        neighbor: "",
        complement: "",
        person: { id: 1, name: '' },
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
            })
    }

    useEffect(() => {
        getAddresss()
    }, [])

    async function getZipcode() {
        await api.get("zipcodes/zipcode", headers)
            .then(response => {
                setZipCodes(response.data)
            })
    }

    useEffect(() => {
        getZipcode()
    }, [])

    setTimeout(() => {
        setMsg('')
    }, 5000)

    async function saveAddress() {
        try {  
            await api.post("address/address", address, { headers })
                .then(response => {
                    if (response.status === 200)
                        setMsg(response.data)
                    setFlag(true)
                })
        } catch (error) {
            setMsg("Error " + error)
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (flag === false) {
            saveAddress()
        } else {
            setMsg("Endereço já foi cadastrado")
        }
    }

    return <>
    {/* <p>{JSON.stringify(address)}</p> */}
        <AddressComponent
            onSubmit={handleSubmit}
            handleChange={handleChange}
            msg={msg}
            handleChangeList={handleChangeList}
            showItems={showItems}
            setAddress={setAddress}
            persons={persons}
            zipcodes={zipcodes}
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
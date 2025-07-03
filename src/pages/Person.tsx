import { useEffect, useState } from "react"
import PersonComponent from "../components/person/PersonComponent"
import type { ResponsePerson, TPerson } from "../models/person"
import api from "../services/api/api"
import { useAuth } from "../context/AuthContext"
import PersonListComponent from "../components/person/PersonListComponent"
import type { Order } from "../models/orderItems"
import type { ResponseAddress } from "../models/address"

const Person: React.FC = () => {

    const { headers, user } = useAuth();

    const [msg, setMsg] = useState('')
    const [flag, setFlag] = useState(false)
    const [showItems, setShowItems] = useState(false);
    const [persons, setPersons] = useState<ResponsePerson[]>([])
    const [addresss, setAddresss] = useState<ResponseAddress[]>([])
    const [person, setPerson] = useState<TPerson>({
        id: 0,
        createdAt: "2025-06-19T08:04:29.243201",
        branch: { id: 1 },
        user: { id: user?.id || 0 },
        name: "",
        dateOfBirth: "2000-01-01",
        gender: 'MASCULINO',
        cpf: "",
        personAddress: [] 
    })

    const handleChangeList = (e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setShowItems(e.target.checked);
    };
    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setPerson((values: any) => ({ ...values, [name]: value }))
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

    const handleUpPerson = (person: TPerson) => {
        const storeOrder = localStorage.getItem("sale")
        if (storeOrder) {
            const order: Order = JSON.parse(storeOrder)
            order.person.id = person.id
            localStorage.setItem("sale", JSON.stringify(order))
        }
    }

    useEffect(() => {
        handleUpPerson(person)
    }, [person])

    setTimeout(() => {
        setMsg('')
    }, 5000)

    async function savePerson() {
        try {
            await api.post("persons/persons", person, { headers })
                .then(response => {
                    if(response.status == 200){
                        setMsg(response.data)
                        setFlag(true)
                    }
                })
        } catch (error) {
            setMsg("Error: " + error)
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if(flag === false){
            savePerson()
        }else{
            setMsg("Cliente já foi cadastrado")
        }
    }
    return <>
        {/* <p>{JSON.stringify(person)}</p>s */}
        <PersonComponent
            handleChange={handleChange}
            onSubmit={handleSubmit}
            msg={msg}
            persons={persons}
            setPerson={setPerson}
            handleChangeList={handleChangeList}
            showItems={showItems}
            addresss={addresss}
        >
            {person}
        </PersonComponent>
        <PersonListComponent
            persons={persons}
            showItems={showItems}
        />
    </>
}

export default Person
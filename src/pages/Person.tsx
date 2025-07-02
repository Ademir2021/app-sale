import { useEffect, useState } from "react"
import PersonComponent from "../components/person/PersonComponent"
import type { ResponsePerson, TPerson } from "../models/person"
import api from "../services/api/api"
import { useAuth } from "../context/AuthContext"
import PersonListComponent from "../components/person/PersonListComponent"
import type { Order } from "../models/orderItems"

const Person: React.FC = () => {

    const { headers, user } = useAuth();

    const [showItems, setShowItems] = useState(false);
    const [persons, setPersons] = useState<ResponsePerson[]>([])
    const [person, setPerson] = useState<TPerson>({
        id: 0,
        createdAt: "2025-06-19T08:04:29.243201",
        branch: { id: 0 },
        user: { id: user?.id || 0 },
        name: "",
        dateOfBirth: "1900-01-01",
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
                console.log(persons)
            })
    }
    useEffect(() => {
        getPersons()
    }, [])

    const handleUpPerson = (person: TPerson) => {
        const storeOrder = localStorage.getItem("sale")
        if (storeOrder) {
            const order: Order = JSON.parse(storeOrder)
            order.person.id = person.id
            localStorage.setItem("sale", JSON.stringify(order))
            console.log(order)
        }
    }

    useEffect(() => {
        handleUpPerson(person)
    }, [person])

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log("Grava um novo Cliente: ", person)
    }
    return <>
        {/* <p>{JSON.stringify(person)}</p> */}
        <PersonComponent
            handleChange={handleChange}
            onSubmit={handleSubmit}
            onClick={handleSubmit}
            msg="xx"
            persons={persons}
            setPerson={setPerson}
            handleChangeList={handleChangeList}
            showItems={showItems}
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
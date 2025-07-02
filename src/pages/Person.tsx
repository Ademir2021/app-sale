import { useEffect, useState } from "react"
import PersonComponent from "../components/person/PersonComponent"
import type { ResponsePerson, TPerson } from "../models/person"
import api from "../services/api/api"
import { useAuth } from "../context/AuthContext"
import PersonListComponent from "../components/person/PersonListComponent"

const Person: React.FC = () => {

    const { headers, user } = useAuth();

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

    const handleSubmit = (e: any) => {
        e.preventDefault()
         getPersons()
    }
    console.log(person)
    return <>
        <p>{JSON.stringify(person)}</p>
        <PersonComponent
            handleChange={handleChange}
            onSubmit={handleSubmit}
            onClick={handleSubmit}
            msg="xx"
            persons={persons}
            setPerson={setPerson}
        >
            {person}
        </PersonComponent>
        <PersonListComponent
        persons={persons}
        />
    </>
}

export default Person
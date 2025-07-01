/**{
    "id":1,
    "createdAt":"2025-06-19T08:04:29.243201",
    "branch":{
        "id":1
    },
    "user": {
    "id": 1
  },
  "name": "Cliente Modelo 4",
  "dateOfBirth": "1995-03-02",
  "gender": "MASCULINO",
  "cpf": "12345678944",
    "personAddress":[
    {
        "idAddrees":2
    },
    {
        "idAddrees":3
    }
    ]
} */

type Branch = {
    id: number
}

type User = {
    id: number
}

export type Gender = "MASCULINO" | "FEMININO"

type PersonAddress = {
    idAddrees: number
}

export type TPerson = {
    id: number
    createdAt: Date | "2025-06-19T08:04:29.243201"
    branch: Branch
    user: User
    name: string
    dateOfBirth: Date | "1900-01-01"
    gender: Gender
    cpf: string
    personAddress: PersonAddress[]
}

export type ResponsePerson = {
    id: number
    createdAt: Date | "2025-06-19T08:04:29.243201"
    branch: Branch
    user: User
    name: string
    dateOfBirth: Date | "1900-01-01"
    gender: Gender
    cpf: string
    personAddress: PersonAddress[]
}
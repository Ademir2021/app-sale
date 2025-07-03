type Person = {
    id: number;
    name: string
}
type ZipCode = {
    id: number;
    code: string;
}

export type ResponseZipCode = {
    id: number;
    code: string;
}

export type TAddress = {
    id: number;
    street: string;
    number: string;
    neighbor: string;
    complement: string
    person: Person
    zipCode: ZipCode
}

type City = {
    id: number;
    name: string
    state: string;
    codeIbge: string
}

type Country = {
    id: number;
    code: string;
    name: string;
}

export type ResponseAddress = {
    id: number;
    street: string;
    number: string;
    neighbor: string;
    complement: string
    person: Person
    zipCode: ZipCode
    city: City
    country: Country
}
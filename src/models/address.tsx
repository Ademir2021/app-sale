type Person = {
    id: number;
    name: string
}
type ZipCode = {
    id: number;
    code: string;
}
export type Address = {
    id: number;
    street: string;
    number:string;
    neighbor: string;
    complement: string
    person: Person
    zipCode: ZipCode
}
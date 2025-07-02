import { useState } from "react";
import type { ResponsePerson, TPerson } from "../../models/person";
import ButtonComponent from "../button/ButtonComponent";
import FormComponents from "../form/FormComponents";
import InputComponent from "../input/InputComponent";
import LabelComponents from "../label/LabelComponent";
import MenuComponent from "../menu/MenuComponent";
import ModalComponent from "../modal/ModalComponent";
import MsgComponent from "../msg/MsgComponent";
import { navSale } from "../sale/navSale"
import SelectComponent from "../select/SelectComponent";

import './styles.css'
import type { ResponseAddress } from "../../models/address";

type Props = {
    handleChange: any
    persons: ResponsePerson[]
    addresss: ResponseAddress[]
    children: TPerson
    onSubmit: React.FormEventHandler<HTMLFormElement>
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    msg: string
    setPerson: Function // Funcão do State
    handleChangeList: Function | any
    showItems: boolean
}

const PersonComponent: React.FC<Props> = ({
    handleChange,
    persons,
    children,
    onSubmit,
    msg,
    setPerson,
    handleChangeList,
    showItems,
    addresss
}: Props) => {

    const nav_ = navSale();

    const options = [
        { value: 'MASCULINO', label: 'Masculino' },
        { value: 'FEMININO', label: 'Feminino' },
    ];

    const [personSelected, setPersonSelected] = useState<ResponsePerson>();
    const [addressSelectd, setAddressSelected] = useState<ResponseAddress>();

    const handleChangePers = (e: any) => {
        const id = parseInt(e.target.value);
        const person = persons.find(c => c.id === id);
        setPersonSelected(person);
        setPerson(person)
    };

    const handleChangeAddr = (e: any) => {
        const id = parseInt(e.target.value);
        const address: any = addresss.find(c => c.id === id);
        setAddressSelected(address);
        setPerson((prev: ResponsePerson) => {
            const existingAddresses = Array.isArray(prev.personAddress) ? prev.personAddress : [];
            const minimalAddress = { id: address.id, street: address.street };
            const alreadyExists = existingAddresses.some((a: any) => a.id === address.id);
            const updatedAddresses = alreadyExists
                ? existingAddresses
                : [...existingAddresses, minimalAddress];
            return {
                ...prev,
                personAddress: updatedAddresses,
            };
        });
    };

    const listAdrr_ = <div className="">
        <h2>Selecione o Endereço:</h2>
        <select onChange={handleChangeAddr}>
            <option value={children.id}>-- Escolha --</option>
            {addresss.map(address => (
                <option key={address.street} value={address.id}>
                    {address.street}
                </option>
            ))}
        </select>
        {addressSelectd && (<><p>Endereço: {addressSelectd.street}(ID: {addressSelectd.id})</p></>)}
    </div>

    const mPersCad_ = <ModalComponent
        title="Cliente"
        btnOpen="+"
        main={<FormComponents
            onSubmit={onSubmit}
            content={<>
                <div className="line">
                    <LabelComponents
                        name="Cliente"
                        input={
                            <InputComponent
                                type="text"
                                placeholder="Seu nome"
                                name="name"
                                onChange={handleChange}
                                value={children.name}
                            />}
                    />
                </div>
                <div className="line">
                    <LabelComponents
                        name="CPF"
                        input={
                            <InputComponent
                                className="input-cpf"
                                type="text"
                                placeholder="CPF"
                                name='cpf'
                                onChange={handleChange}
                                value={children.cpf}
                            />
                        }
                    />
                    <span className="gender-select">Gênero: {children.gender || 'Nenhum'}</span>
                    <SelectComponent
                        label={"Escolha um gênero"}
                        name="gender"
                        options={options}
                        value={options}
                        onChange={handleChange}
                    />
                </div>
                <div className="line">
                    <LabelComponents
                        name="Data de nascimento"
                        input={<InputComponent
                            className="input-date-of-birth"
                            type="date"
                            placeholder="dia/mês/ano"
                            name='dateOfBirth'
                            onChange={handleChange}
                            value={children.dateOfBirth}
                        />}
                    />
                    <>{listAdrr_}</>
                </div>
                <ButtonComponent
                    name="Inserir"
                // onClick={onClick}
                />
                <MsgComponent
                    msg={msg}
                />
            </>}
        />}
    />
    const mPerson_ = <MenuComponent
        content={<>
            <div className="person-select">
                <h2>Selecione o Comprador:</h2>
                <select onChange={handleChangePers}>
                    <option value={children.id || 0}>-- Escolha --</option>
                    {persons.map(person => (
                        <option key={person.id} value={person.id}>
                            {person.name}
                        </option>
                    ))}
                </select>
                {personSelected && (
                    <><p>Cliente: {personSelected.name}(ID: {personSelected.id})</p>
                        <p>CPF: {personSelected.cpf} (ID-End: {personSelected.personAddress.idAddrees})</p></>)}
            </div>
            <div className="btn-add-cad">{mPersCad_}</div>
            <label className="checkbox-label">
                <input
                    type="checkbox"
                    checked={showItems}
                    onChange={handleChangeList}
                />{!showItems ? "Mostrar Cadastro(s)" : "Ocultar Cadastro(s)"}
            </label>
        </>}
    />
    return <>
        <>{nav_}</>
        <>{mPerson_}</>

    </>
}

export default PersonComponent
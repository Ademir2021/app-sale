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

type Props = {
    handleChange: any
    persons: ResponsePerson[]
    children: TPerson
    onSubmit: React.FormEventHandler<HTMLFormElement>
    onClick: React.MouseEventHandler<HTMLButtonElement>
    msg: string
    setPerson: Function // Funcão do State
}

const PersonComponent: React.FC<Props> = ({
    handleChange,
    persons,
    children,
    onSubmit,
    onClick,
    msg,
    setPerson
}: Props) => {

    const nav_ = navSale();

    const options = [
        { value: 'MASCULINO', label: 'Masculino' },
        { value: 'FEMININO', label: 'Feminino' },
    ];

    const [clienteSelecionado, setClienteSelecionado] = useState<TPerson>();

    const handleChange_ = (e: any) => {
        const id = parseInt(e.target.value);
        const cliente = persons.find(c => c.id === id);
        setClienteSelecionado(cliente);
        setPerson(cliente)
        // console.log("Cliente selecionado:", cliente);
    };

    const mPerson_ = <MenuComponent
        content={<>
            <div className="person-select">
                <h2>Selecione um cliente:</h2>
                <select onChange={handleChange_}>
                    <option value={children.id}>-- Escolha --</option>
                    {persons.map(cliente => (
                        <option key={cliente.id} value={cliente.id}>
                            {cliente.name}
                        </option>
                    ))}
                </select>
                {clienteSelecionado && (
                    <><p>Cliente: {clienteSelecionado.name}(ID: {clienteSelecionado.id})</p>
                        <p>CPF: {clienteSelecionado.cpf}</p></>)}
            </div>
        </>}
    />
    return <>
        <>{nav_}</>
        <p>{mPerson_}</p>
        <ModalComponent
            title="Cliente"
            btnOpen="Inserir Novo Cliente"
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
                    <ButtonComponent
                        name="Inserir"
                        onClick={onClick}
                    />
                    <MsgComponent
                        msg={msg}
                    />
                </>}
            />}
        />
    </>
}

export default PersonComponent
import type { TPerson } from "../../models/person";
import ButtonComponent from "../button/ButtonComponent";
import FormComponents from "../form/FormComponents";
import InputComponent from "../input/InputComponent";
import LabelComponents from "../label/LabelComponent";
import ModalComponent from "../modal/ModalComponent";
import MsgComponent from "../msg/MsgComponent";
import { navSale } from "../sale/navSale"
import SelectComponent from "../select/SelectComponent";

import './styles.css'

type Props = {
    handleChange: any
    children: TPerson
    onSubmit: React.FormEventHandler<HTMLFormElement>
    onClick: React.MouseEventHandler<HTMLButtonElement>
    msg: string
}

const PersonComponent: React.FC<Props> = ({
    handleChange,
    children,
    onSubmit,
    onClick,
    msg
}: Props) => {

    const nav_ = navSale();

    const options = [
        { value: 'MASCULINO', label: 'Masculino' },
        { value: 'FEMININO', label: 'Feminino' },
    ];

    return <>
        <>{nav_}</>
        <ModalComponent
            title="Cliente"
            btnOpen="Inserir"
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
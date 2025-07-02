import { useState } from "react"
import type { TAddress } from "../../models/address"
import type { ResponsePerson } from "../../models/person"
import ButtonComponent from "../button/ButtonComponent"
import FormComponents from "../form/FormComponents"
import InputComponent from "../input/InputComponent"
import LabelComponents from "../label/LabelComponent"
import MenuComponent from "../menu/MenuComponent"
import ModalComponent from "../modal/ModalComponent"
import MsgComponent from "../msg/MsgComponent"
import { navSale } from "../sale/navSale"

import './styles.css'

type Props = {
  handleChange: any
  persons: ResponsePerson[]
  children: TAddress
  onSubmit: React.FormEventHandler<HTMLFormElement>
  onClick: React.MouseEventHandler<HTMLButtonElement>
  msg: string
  setAddress: Function // Funcão do State
  handleChangeList: Function | any
  showItems: boolean
}

const AddressComponent: React.FC<Props> = ({
  handleChange,
  persons,
  children,
  onSubmit,
  onClick,
  msg,
  setAddress,
  handleChangeList,
  showItems
}: Props) => {

  const nav_ = navSale()

  const [personSelected, setPersonSelected] = useState<ResponsePerson>();

  const handleChangePers = (e: any) => {
    const id = parseInt(e.target.value);
    const person = persons.find(c => c.id === id);
    setPersonSelected(person);
    setAddress((prev: TAddress) => ({
      ...prev,
      person: {
        ...prev.person,
        id: person?.id || 0 // garante que um ID seja definido
      }
    }));
  };

  const addAddrCad_ = <ModalComponent
    title="Endereços"
    btnOpen="+"
    main={<FormComponents
      onSubmit={onSubmit}
      content={<>
        <div className="line">
          <LabelComponents
            name="Endereço"
            input={
              <InputComponent
                type="text"
                placeholder="Endereço"
                name='street'
                onChange={handleChange}
                value={children.street}
              />}
          />
          <LabelComponents
            name="Número"
            input={
              <InputComponent
                className="input-number"
                type="text"
                placeholder="Número"
                name='number'
                onChange={handleChange}
                value={children.number}
              />
            }
          />
          <LabelComponents
            name="Bairro"
            input={<InputComponent
              className="input-neighbor"
              type="text"
              placeholder="Bairro"
              name='neighbor'
              onChange={handleChange}
              value={children.neighbor}
            />}
          />
        </div>
        <div className="line">
          <LabelComponents
            name="Complemento"
            input={
              <InputComponent
                type="text"
                placeholder="Complemento"
                name='complement'
                onChange={handleChange}
                value={children.complement}
              />
            }
          />
          <LabelComponents
            name="Cep"
            input={
              <InputComponent
                type="text"
                placeholder="Cep"
                name="zipCode"
                onChange={handleChange}
                value={children.zipCode.id}
              />
            }
          />
        </div>
        <div className="line">
          <div className="person-select">
            <h2>Selecione a pessoa:</h2>
            <select onChange={handleChangePers}>
              <option value={children.person.id || 0}>-- Escolha --</option>
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
          {/* <div className="btn-add-cad">{mPersCad_}</div> */}
        </div>
        <ButtonComponent
          name="Inserir"
          onClick={onClick}
        />
        <MsgComponent
          msg={msg}
        />
      </>
      }
    />
    }
  />

  const mAddrCad_ = <MenuComponent
    content={<>
      <div className="btn-add-cad">{addAddrCad_}</div>
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
    <>{mAddrCad_}</>
  </>
}

export default AddressComponent

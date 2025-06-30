import type { Address } from "../../models/address"
import ButtonComponent from "../button/ButtonComponent"
import FormComponents from "../form/FormComponents"
import InputComponent from "../input/InputComponent"
import LabelComponents from "../label/LabelComponent"
import ModalComponent from "../modal/ModalComponent"
import MsgComponent from "../msg/MsgComponent"
import { navSale } from "../sale/navSale"

import './styles.css'

type Props = {
  handleChange: any
  children: Address
  onSubmit: React.FormEventHandler<HTMLFormElement>
  onClick: React.MouseEventHandler<HTMLButtonElement>
  msg:string
}

const AddressComponent: React.FC<Props> = ({
  handleChange,
  children,
  onSubmit,
  onClick,
  msg
}: Props) => {

  const nav_ = navSale()

  return <>
    <>{nav_}</>
    <p>Endereços</p>
    <ModalComponent
      title="Endereços"
      btnOpen="Inserir"
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
                />
              }
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
                  name='zipCode'
                  onChange={handleChange}
                  value={children.zipCode.id}
                />
              }
            />
          </div>
          <div className="line">
            <LabelComponents
              name="Cliente"
              input={
                <InputComponent
                  type="text"
                  placeholder="Cliente"
                  name='person'
                  onChange={handleChange}
                  value={children.person.id}
                />
              }
            />
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
  </>
}

export default AddressComponent

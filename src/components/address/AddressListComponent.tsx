import type { Address } from "../../models/address"
import ListComponent from "../list/ListComponent"

import styles from '../list/Table.module.css'

type Props = {
  address: Address[]
}

const AddressListComponent: React.FC<Props> = ({
  address
}: Props) => {
  return <>
    <ListComponent
      th={<>
        <th>ID</th>
        <th>Nome</th>
        <th>Numero</th>
        <th>Bairro</th>
        <th>Complemento</th>
        <th>CId</th>
        <th>Cliente</th>
        <th>CepId</th>
        <th>Cep</th>

      </>}
      tbody={address.map((addr, index) => (
        <tr key={index}>
          <th className={styles.th}>{addr.id}</th>
          <th className={styles.th}>{addr.street}</th>
          <th className={styles.th}>{addr.number}</th>
          <th className={styles.th}>{addr.neighbor}</th>
          <th className={styles.th}>{addr.complement}</th>
          <th className={styles.th}>{addr.person.id}</th>
          <th className={styles.th}>{addr.person.name}</th>
          <th className={styles.th}>{addr.zipCode.id}</th>
          <th className={styles.th}>{addr.zipCode.code}</th>
        </tr>
      ))}
    />
  </>
}

export default AddressListComponent
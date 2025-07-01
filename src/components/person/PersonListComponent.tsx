import type { ResponsePerson } from "../../models/person"
import ListComponent from "../list/ListComponent"

import styles from '../list/Table.module.css'

type Props = {
    persons: ResponsePerson[]
}

const PersonListComponent: React.FC<Props> = ({
    persons
}) => {
    return <>
        <ListComponent
            th={<>
                <th>ID</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Data nascimento.</th>
                <th>Gênero</th>
                <th>IdUser</th>
                <th>Data de Inclusão</th>
            </>}
            tbody={persons.map((per, index) => (
                <tr key={index}>
                    <th className={styles.th}>{per.id}</th>
                    <th className={styles.th}>{per.name}</th>
                    <th className={styles.th}>{per.cpf}</th>
                    <th className={styles.th}>{per.dateOfBirth.toLocaleString()}</th>
                    <th className={styles.th}>{per.gender}</th>
                    <th className={styles.th}>{per.user.id}</th>
                    <th className={styles.th}>{per.createdAt.toString()}</th>
                </tr>
            ))}
        />
    </>
}

export default PersonListComponent
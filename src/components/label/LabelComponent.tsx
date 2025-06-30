
import './styles.css'

type Props = {
    name: string;
    input: React.ReactNode;
}

const LabelComponents: React.FC<Props> = ({
    name,
    input
}: Props) => {

    return <>
        <label>
            {name}
            {input}
        </label>
    </>
}

export default LabelComponents
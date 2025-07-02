
import './styles.css'

type Props = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    name: string
}

const ButtonComponent: React.FC<Props> = ({
    onClick,
    name
}: Props) => {

    return <>
        <button type="submit" onClick={onClick}>{name}</button>
    </>
}

export default ButtonComponent
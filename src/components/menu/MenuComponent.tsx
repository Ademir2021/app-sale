import './styles.css'

type Props = {
    content: React.ReactNode
}

const MenuComponent: React.FC<Props> = ({
    content
}: Props) => {
    return <>
        <div
            className="order-summary"
        >{content}</div>
    </>
}

export default MenuComponent
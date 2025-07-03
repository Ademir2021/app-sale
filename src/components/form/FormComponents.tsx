
type Props = {
    content: React.ReactNode
    onSubmit: React.FormEventHandler<HTMLFormElement>
    ClassName?: string
}

import './styles.css'

const FormComponents: React.FC<Props> = ({
    content,
    onSubmit,
    ClassName
}: Props) => {
    return <>
        <form onSubmit={onSubmit}
            className="form">
            <div className={ClassName}>
                {content}
            </div>
        </form>
    </>
}

export default FormComponents


import './styles.css'

type Props = {
    type: React.HTMLInputTypeAttribute
    placeholder: string
    name: string
    value: string | number
    onChange: React.ChangeEventHandler<HTMLInputElement>
    className?: string
}

const InputComponent: React.FC<Props> = ({
    type,
    placeholder,
    name,
    value,
    className,
    onChange
}: Props) => {
    return <>
        <input
        className={className}
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            required
            onChange={onChange}
        />
    </>
}

export default InputComponent

import "./styles.css"

type Props = {
  options: any
  value: React.SelectHTMLAttributes<HTMLSelectElement> | string | number | readonly string[] | undefined | any
  onChange: React.SelectHTMLAttributes<HTMLSelectElement> | React.ChangeEventHandler<HTMLSelectElement> | undefined | any
  label: React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> | any
  name: string
}

const SelectComponent: React.FC<Props> = ({ options, value, onChange, label, name }: Props) => {
  return <>
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <select name={name} id={name} value={value} onChange={onChange}>
        <option value="">Selecione...</option>
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  </>
}

export default SelectComponent
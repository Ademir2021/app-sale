
type Props={
    content:React.ReactNode
    onSubmit:React.FormEventHandler<HTMLFormElement> 
}

import './styles.css'

const FormComponents:React.FC<Props> = ({
    content,
    onSubmit
}:Props)=>{
    return<>
    <form onSubmit={onSubmit}
    className="form">{content}</form>
    </>
}

export default FormComponents
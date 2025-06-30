
import './styles.css'

type Props ={
    msg:string
}

const MsgComponent:React.FC<Props> = ({
    msg
}:Props)=>{
    return<>
    <p className='msg'>{msg}</p>
    </>
}

export default MsgComponent
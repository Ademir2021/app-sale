
import './styles.css'
import { useState } from 'react';

type Props = {
    title:string
    btnOpen: React.ReactNode;
    main: React.ReactNode;
}

const ModalComponent: React.FC<Props> = ({
    title,
    btnOpen,
    main
}) => {

    const [status, setStatus] = useState(false)
    const modal = "modal"
    const close = "close"

    return <>
        {/* <p>Componente modal</p> */}
        <button
            onClick={() => { setStatus(true) }}
        >{btnOpen}</button>

        <div className={status === true ? modal : close}>
            <div className="modal-content">
                <button
                    className="close-modal"
                    onClick={() => { setStatus(false) }}
                >&times;</button>
                <h2 className='title'>{title}</h2>
                <>{main}</>
            </div>
        </div>
    </>
}

export default ModalComponent
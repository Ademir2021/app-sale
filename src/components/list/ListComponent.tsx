
import './styles.css'

type Props ={
  th:React.ReactNode
  tbody:any
}

const ListComponent:React.FC<Props> = ({
  th,
  tbody
}:Props)=>{
    return<>
     <div className="container">
      <div className="container-form">
        <div className="container-list">
          <table className="custom-table">
            <thead className="custom-thead">
              <tr>
               <>{th}</>
              </tr>
            </thead>
            <tbody className="custom-tbody">
             {tbody}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
}

export default ListComponent
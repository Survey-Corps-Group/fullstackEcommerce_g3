import { useParams } from "react-router-dom"

const AdminListOrderDetail = () => {
    const {id} = useParams()

    return (
        <p>{id}</p>
    )
}

export default AdminListOrderDetail
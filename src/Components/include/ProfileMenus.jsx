import { Link } from "react-router-dom"
const public_path = process.env.REACT_APP_PUBLIC_URL

const ProfileMenus = () => {

    var path = window.location.pathname
    return (
        <div className="card">

            <div className="card-body">
                <ul className="list-group list-group-flush green-bottom">
                    <li className="list-group-item"><Link className={`text-decoration-none ${path === `${public_path}/profile` ? 'fw-bold text-success' : 'text-dark'}`} to={`${public_path}/profile`}>Dashboard</Link></li>
                    <li className="list-group-item"><Link className={`text-decoration-none ${path === `${public_path}/update-profile` ? 'fw-bold text-success' : 'text-dark'}`} to={`${public_path}/update-profile`}>Update Profile</Link></li>
                    <li className="list-group-item"><Link className={`text-decoration-none ${path === `${public_path}/change-password` ? 'fw-bold text-success' : 'text-dark'}`} to={`${public_path}/change-password`}>Change Password</Link></li>
                    <li className="list-group-item"><Link className={`text-decoration-none ${path === `${public_path}/my-addresses` ? 'fw-bold text-success' : 'text-dark'}`} to={`${public_path}/my-addresses`}>My Address Book</Link></li>
                    <li className="list-group-item"><Link className={`text-decoration-none ${path === `${public_path}/my-orders` ? 'fw-bold text-success' : 'text-dark'}`} to={`${public_path}/my-orders`}>My Orders</Link></li>
                    <li className="list-group-item"><Link className={`text-decoration-none ${path === `${public_path}/my-orders-return` ? 'fw-bold text-success' : 'text-dark'}`} to={`${public_path}/my-orders-return`}>My Return Orders</Link></li>
                    <li className="list-group-item"><Link className={`text-decoration-none ${path === `${public_path}/membership` ? 'fw-bold text-success' : 'text-dark'}`} to={`${public_path}/membership`}>My Membership</Link></li>
                </ul>
            </div>
        </div >
    )
}

export default ProfileMenus
import React from 'react'
import { Link } from 'react-router-dom'
const public_path = process.env.REACT_APP_PUBLIC_URL

const Error404 = () => {
    return (
        <div className="d-flex align-items-center justify-content-center py-7">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-1"> <span className="text-danger">Opps!</span> Page not found.</p>
                <p className="lead">
                    The page you're looking for doesn't exist.
                </p>
                <Link to={`${public_path}/home`} className="btn btn-lg btn-primary">Go Home</Link>
            </div>
        </div>
    )
}

export default Error404
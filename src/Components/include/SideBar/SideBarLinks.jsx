import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const public_path = process.env.REACT_APP_PUBLIC_URL

const SideBarLinks = ({ title = "", list = [], defaultshow = false }) => {
    const [show, setShow] = useState(defaultshow)
    return (
        <li className="my-1">
            <button className={`btn btn-toggle align-items-center rounded text-success fw-bolder ${!show && 'collapsed'}`}
                data-bs-toggle="collapse"
                data-bs-target="#home-collapse"
                onClick={() => { setShow(!show) }}
                aria-expanded={show}>
                {title}
            </button>
            <div className={show ? 'collapse show' : 'collapse'}>
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    {list.map((item, i) => (
                        item?.children.length > 0 ?
                            <SubMenu title={item?.name} list={item?.children} key={i} />
                            :
                            <li key={i}><Link to={`${public_path}/product/${item?.slug}`} className="link-dark rounded">{item?.name}</Link></li>
                    ))}
                </ul>
            </div>
        </li>
    )
}

const SubMenu = ({ title = "", list = [] }) => {
    const [show, setShow] = useState(false)
    return (
        <li>
            <span role='button' className={`link-dark rounded a-link  ${show ? 'a-link-active' : ''}`}
                data-bs-toggle="collapse"
                data-bs-target="#home-collapse"
                onClick={() => { setShow(!show) }}
                aria-expanded={show}>
                {title}
            </span>
            <div className={show ? 'collapse show' : 'collapse'}>
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    {list.map((item, i) => (
                        <li key={i}><Link to={`${public_path}/product/${item?.slug}`} className="link-dark rounded ps-4">{item?.name}</Link></li>
                    ))}
                </ul>
            </div>
        </li>
    )
}

export default SideBarLinks
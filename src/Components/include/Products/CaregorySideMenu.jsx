import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AxiosHelper from '../../../helper/AxiosHelper';
import SideBarLinks from "../SideBar/SideBarLinks";
const public_path = process.env.REACT_APP_PUBLIC_URL

const CaregorySideMenu = () => {

    const [category, setCategory] = useState([])
    useEffect(() => {
        (async () => {
            var { data } = await AxiosHelper.getData(`category`);
            if (data.status === true) {
                const categoryArray = []
                if (data?.data?.categories?.length > 0) {
                    data?.data?.categories?.map((item) => {
                        if (item.id === 4) {
                            const data = [13, 14, 15, 16, 17]

                            const hasMatchingChild = item?.children?.filter(child => data.includes(child.id));
                            categoryArray.push({ ...item, children: hasMatchingChild })
                        } else {
                            categoryArray.push(item)
                        }
                    })
                    setCategory(categoryArray)
                }
            }
            else {
                toast.error(data.message);
            }
        })();
    }, []);

    return (
        <div className="flex-shrink-0 p-2 bg-gray">
            <span className="d-flex align-items-center pt-3 mb-3 link-dark text-decoration-none border-bottom">
                <span className="fs-5 fw-semibold text-uppercase mx-3">Product Categories</span>
            </span>
            <ul className="list-unstyled ps-0">
                {category?.map((item, i) => (
                    item?.children?.length > 0 ?
                        <SideBarLinks title={item?.name} list={item?.children} defaultshow={i === 0} key={i} />
                        :
                        <li key={i}><Link to={`${public_path}/product/${item?.slug}`} className="btn btn-link w-100 text-left text-decoration-none align-items-center rounded text-success fw-bolder px-2">{item?.name}</Link></li>
                ))}
            </ul>
        </div>
    )
}

export default CaregorySideMenu
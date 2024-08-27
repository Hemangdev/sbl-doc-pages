import React from "react";
import BTrimDrop from "../../image/CARE Pack Inner Page - Final.png";
import damiagraForte from "../../image/CARE Pack Inner Page - Final.png";
import { Image } from "react-bootstrap";


const FollowInstagram = () => {
  const Products = [
    {
      title: "B- trim drop (30ml) - 2pcs",
      image: BTrimDrop,
      regularPrice: "430.00",
      slug: "b-trim-drops-combo",
      salePrice: "408",
      productId: "2831"
    },
    {
      title: "Damiagra forte (30ml)- 2 pcs",
      image: damiagraForte,
      regularPrice: "800.00",
      slug: "damiagra-forte-drops-combo",
      salePrice: "760",
      productId: "2832"
    }
  ]

  return (
    <section >
      <div className="container">
        <div className="row">
          <h3>Our Products</h3>
          {
            Products.map((item) => {
              return (
                <div className="col-3">
                  <a href="#">
                    <div class="card">
                      <Image src={item.image} class="card-img-top" alt="..." />
                      <div class="card-body">
                        <h6 class="card-title">Card title</h6>

                      </div>

                    </div>
                  </a>
                </div>
              )
            })
          }

        </div>
      </div>
    </section>
  )
}

export default FollowInstagram
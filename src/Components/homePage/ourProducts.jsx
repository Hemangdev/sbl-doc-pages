import React from "react";
import { Image } from "react-bootstrap";
import image1 from '../../image/Homeopathic medicine.png'
import image2 from '../../image/Ointment.png'
import image3 from '../../image/Personal care.png'
import image4 from '../../image/Herbals.png'
import image5 from '../../image/Eyedrop.png'


const OurProducts = () => {
  const products = [
    { title: 'Homoeopathic Products', imgSrc: image1, redirect: '/product/dilutions' },
    { title: 'Ointments', imgSrc: image2, redirect: '/product/ointments' },
    { title: 'Personal Care', imgSrc: image3, redirect: '/product/skin-care' },
    { title: 'Herbals', imgSrc: image4, redirect: '/product/herbals' },
    { title: 'Eye/Ear Drop', imgSrc: image5, redirect: 'product/eye-ear-drop' },
  ];

  return (
    <section className="our-product-section">
      <div className="container">
        <div className="row">
          <div className="product-heading">
          <h3>Our Products</h3>
          </div>
        </div>

          <div className="row row-cols-1 row-cols-md-4 row-cols-lg-5 row-cols-sm-2 g-4">
          {
            products.map((item) => {
              return (
                <div className="col">
                  <a href={item.redirect}>
                    <div class="card">
                      <Image src={item.imgSrc} class="card-img-top" alt="Product Gallery" />
                      <div class="card-body">
                        <h6 class="card-title">{item.title}</h6>

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

export default OurProducts
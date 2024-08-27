import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Button, Image } from "react-bootstrap";
import AxiosHelper from "../helper/AxiosHelper";
import montanaShampoo from "../image/navratri/Montana-Shampoo-(200ml)-2-packs.png";
import calPhos from "../image/navratri/Cal-phos-6x.png";
import BCPacks from "../image/navratri/BC-21-3-packs.png";
import BTrimDrop from "../image/navratri/B-trim-drop.png";
import tonicardDrop from "../image/navratri/Tonicard-drop-(30ml)-2-pcs.png";
import damiagraForte from "../image/navratri/Damiagra-forte-(30ml)-2pcs.png";
import jaborandiOil from "../image/navratri/Jaborandi-Oil-(200ml)-2pcs.png";
import shampooWithConditioner from "../image/navratri/Shampoo-with-Conditioner-(200ml)-2pcs.png";
import glowingBeautyCream from "../image/navratri/Glowing-beauty cream-(50gm)&Facewash-(200ml).png";
import montanaOilNormal from "../image/navratri/Montana-Oil-Normal-(200ml)-2pcs.png";

const BulkProducts = () => {
	const public_path = process.env.REACT_APP_PUBLIC_URL

	const Products = [
		// {
		// 	title: "Montana Fortified Oil (200ml)- 2 pcs",
		// 	image: montanaFortifiedOil,
		// 	regularPrice: "410.00",
		// 	slug: "arnica-montana-fort-hair-oil-combo",
		// 	salePrice: "389",
		// 	productId: "2830"
		// },
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
		},
		{
			title: "Glowing beauty cream (50gm) & Facewash (200ml)",
			image: glowingBeautyCream,
			regularPrice: "449.00",
			slug: "glowing-beauty-facewash-sunscreen-lotion-spf-30-combo",
			salePrice: "427",
			productId: "2833"
		},
		{
			title: "Shampoo with Conditioner (200ml)- 2pcs",
			image: shampooWithConditioner,
			regularPrice: "360.00",
			slug: "montana-herbal-shampoo-conditioner-combo",
			salePrice: "342",
			productId: "2834"
		},
		{
			title: "Montana Shampoo (200ml) 2 packs",
			slug: "montana-herbal-shampoo-combo",
			image: montanaShampoo,
			regularPrice: "340.00",
			salePrice: "323",
			productId: "2835"
		},
		{
			title: "Tonicard drop (30ml) - 2 pcs",
			image: tonicardDrop,
			regularPrice: "410.00",
			slug: "tonicard-gold-drop-combo",
			salePrice: "389",
			productId: "2836"
		},
		{
			title: "Bio-Combination No.21 COMBO (25GM EACH)",
			image: BCPacks,
			regularPrice: "330.00",
			slug: "bio-combination-21-combo-25gm-each",
			salePrice: "313",
			productId: "2837"
		},
		{
			title: "CALCAREA PHOSPHORICA 6X COMBO (25GM EACH)",
			image: calPhos,
			regularPrice: "330.00",
			slug: "calcarea-phosphorica-6x-combo-25gm-each",
			salePrice: "313",
			productId: "2838"
		},
		// {
		// 	title: "Jaborandi Plus (200ml)- 2 pcs",
		// 	image: jaborandiPlus,
		// 	regularPrice: "600.00",
		// 	slug: "jaborandi-plus-hair-oil-combo-100ml-each",
		// 	salePrice: "570",
		// 	productId: "2839"
		// },

		{
			title: "Jaborandi Oil (200ml) - 2 pcs",
			image: jaborandiOil,
			regularPrice: "540.00",
			slug: "jaborandi-hair-oil-combo-100ml-each",
			salePrice: "513",
			productId: "2840"
		},
		{
			title: "Montana Oil Normal  (200ml) -  2 pcs",
			image: montanaOilNormal,
			regularPrice: "320.00",
			slug: "montana-hair-oil-combo-200ml-each",
			salePrice: "304",
			productId: "2841"
		},
	]

	return (
		<section className="savings-jodi-swiper">
			<div className="container">
				<div className="row">
					<div className="saving-heading">
						<h3>Savings ki Jodi</h3>
					</div>
				</div>

				{Products?.length > 0 &&
					<Swiper
						// install Swiper modules
						modules={[Navigation, Pagination, Autoplay]}
						slidesPerView={4}
						spaceBetween={20}
						navigation={true}
						speed={1000}
						className="mySwiper"

						keyboard={{
							enabled: true
						}}

						autoplay={{
							delay: 4000,
							disableOnInteraction: true
						}}

						breakpoints={{
							350: {
								slidesPerView: 1,
								spaceBetween: 7
							},
							550: {
								slidesPerView: 2,
								spaceBetween: 10
							},
							667: {
								slidesPerView: 2,
								spaceBetween: 10
							},
							992: {
								slidesPerView: 3,
								spaceBetween: 10
							},
							1200: {
								slidesPerView: 4
							}
						}}
					>
						{
							Products.map((item) => {
								return (
									<SwiperSlide>
										<a href={`${public_path}/product-details/${item?.slug}`}>
											<div className="saving-swiper-card">

												<div class="card">
													<div className="saving-card-img">
														<Image
															src={item.image}
															alt=''
															width={320}
															height={150}
															className="img-fluid"
														/>
													</div>
													<div class="card-body">

														<h6>{item.title}</h6>
														<p>Size :-&nbsp; <span class="px-2 py-1 me-1">Combo Pack</span></p>
														<aside className="mb-2"><ins>Price : ₹{item.salePrice}</ins>&nbsp;&nbsp;<del>₹{item.regularPrice}</del></aside>

														<Button type="submit"> Buy Now </Button>

													</div>
												</div>
											</div>

										</a>

									</SwiperSlide>
								)
							})
						}
					</Swiper>
				}
			</div>
		</section>
	)
}

export default BulkProducts
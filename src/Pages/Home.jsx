import { toast } from 'react-toastify'
import CarouselHome from "../Components/CarouselHome";
import SliderBottom from "../Components/SliderBottom";
import ProductList from "../Components/ProductList";
import ProductCategoryHome from "../Components/ProductCategoryHome";
import BlogList from "../Components/BlogList";
import Service from "../Components/Service";
import InstaFollow from "../Components/InstaFollow";
import { useState, useEffect } from "react";
import AxiosHelper from "../helper/AxiosHelper";
import HomeTestimpnial from '../Components/HomeTestimpnial';
import { hideLoader, showLoader } from '../helper/LoaderHelper';
import StickyOrder from './StickyOrder';
import BulkProducts from '../Components/BulkProducts';
import { Image } from 'react-bootstrap';
import dandiySavingtop from "../image/navratri/navratri-dandiya-saving-jodi-left.svg";
import dandiySaving from "../image/navratri/navratri-dandiya-testimpnial-left.svg";
import MetaTags from '../Components/MetaTags';
import SearchByAilment from '../Components/homePage/searchByAilment';
import PopularPick from '../Components/homePage/popularPick';
import OurProducts from '../Components/homePage/ourProducts';
import VideoSection from '../Components/homePage/videoSection';


const Home = () => {

	const [data, setData] = useState({
		banner: [],
		about: [],
		best_seller: [],
		featured_product: [],
		top_blog: [],
		instafeed: [],
		popup_image: ""
	})

	useEffect(() => {
		(async () => {
			showLoader()
			var { data } = await AxiosHelper.getData("home");
			if (data.status === true) {
				setData(data.data)
				hideLoader()
			} else {
				toast.error(data.message);
			}
		})();
	}, []);

	return (
		<>
			<MetaTags data={{ title: 'Buy SBL Homeopathy Medicine & SBL Tonic Online' }} />
			<CarouselHome banner={data?.banner} />
			{/* <SliderBottom /> */}

			<SearchByAilment />
			<BulkProducts />
			<div className='container-fluid bgwhite d-none d-lg-block about-us-section'>
				{/* <div className="decoration-left">
					<Image
						src={dandiySaving}
						alt="" style={{ width: "250px", height: "270px" }}
					/>
				</div>
				<div className="decoration-right">
					<Image
						src={dandiySaving}
						alt="" style={{ width: "250px", height: "270px" }}
					/>
				</div> */}
				{/* <div className='container' dangerouslySetInnerHTML={{ __html: data?.cms?.[1] }}></div> */}
			</div>
			{/* <ProductList best_seller={data?.best_seller} /> */}
			<PopularPick
				best_seller={data?.best_seller}
			/>
				<ProductCategoryHome featured_product={data?.featured_product} />

			{/* <div className='container-fluid bgtheme'>
				<div className='container' dangerouslySetInnerHTML={{ __html: data?.cms?.[2] }}></div>
			</div> */}

			<OurProducts />
			<VideoSection />
			<div className='bloglist'>
				{/* <div className="decoration-left">
					<Image
						src={dandiySavingtop}
						alt="" style={{ width: "250px", height: "270px" }}
					/>
				</div>
				<div className="decoration-right">
					<Image
						src={dandiySavingtop}
						alt="" style={{ width: "250px", height: "270px" }}
					/>
				</div> */}
				<BlogList top_blog={data?.top_blog} />
			</div>

			<div className='home-testimpnial'>
				{/* <div className="decoration-left">
					<Image
						src={dandiySaving}
						alt="" style={{ width: "250px", height: "270px" }}
					/>
				</div>
				<div className="decoration-right">
					<Image
						src={dandiySaving}
						alt="" style={{ width: "250px", height: "270px" }}
					/>
				</div> */}
				<HomeTestimpnial />
			</div>

			{/* <div className='container-fluid' style={{ backgroundColor: "#EFFFE4", paddingTop: "2rem", paddingBottom: "2rem" }}>
				<div className='container' dangerouslySetInnerHTML={{ __html: data?.cms?.[3] }}></div>
			</div> */}

			<InstaFollow />
			<Service feeds={data?.instafeed} />
			{ /* <StickyOrder/> */}
		</>
	);
};

export default Home;

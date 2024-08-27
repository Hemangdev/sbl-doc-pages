import { useLocation, useNavigate, useParams } from 'react-router-dom'
import SubHeader from '../Components/SubHeader'
import { useState } from 'react';
import { useEffect } from 'react';
import AxiosHelper from '../helper/AxiosHelper';
import { toast } from 'react-toastify';
import useCart from '../Hooks/useCart';
import useSetting from "../Hooks/useSetting"
import { strLimit } from '../helper/StringHelper';
import MetaTags from '../Components/MetaTags';
import NewTemplateProduct from '../Components/productPage/new-template';
import CurrentTemplateProduct from '../Components/productPage/current-template';
import SEOHead from '../Components/seo';
const public_path = process.env.REACT_APP_PUBLIC_URL

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const responsive_2 = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const ProductDetails = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const template = searchParams.get('new-template')

  const { slug } = useParams()
  const { addToCart, updateMyCart } = useCart()
  const [postCode, setPostCode] = useState('')
  const [perUnitData, setPerUnitData] = useState({ attribute_int: null, attribute_unit: null })
  const [postCodeMessage, setPostCodeMessage] = useState({ status: true, message: "" })
  const { changeCurrency, ipCheck } = useSetting()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [showReview, setShowReview] = useState(false)
  const [price, setPrice] = useState(0)
  const [specialPrice, setSpecialPrice] = useState(0)
  const [mrp, setMrp] = useState(0)
  const [attr, setAttr] = useState()
  const [selectedAttr, setSelectedAttr] = useState({})
  const [errorMsg, setErrorMsg] = useState("");
  const [isDisabled, setIsDisabled] = useState(false)
  const [data, setData] = useState({
    id: 14,
    model: "",
    sku: "",
    name: "",
    price: 0,
    mrp: 0,
    quantity: 0,
    minimum_qty: 0,
    maximum_qty: 0,
    gst_id: 0,
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
    sort_description: "",
    description: "",
    indication: "",
    ingredient: "",
    dosage: "",
    safety: "",
    product_tag: "",
    product_usage: "",
    product_type: "",
    product_age: "",
    product_ailments: "",
    brand_id: 0,
    product_video: null,
    stock_status: 1,
    sort_order: 1,
    is_feature: 1,
    is_topsell: 1,
    status: 1,
    deleted_at: null,
    created_at: "",
    updated_at: "",
    gst_name: "",
    brand_name: "",
    image: [],
    variants: [],
    variants_attributes: [],
    relatedproducts: [],
    category: {
      name: "",
      description: "",
    }
  })

  const [param, setParam] = useState({
    limit: 12,
    page: 1,
    search: "",
    orderBy: 'products.sort_order',
    sort_order: "asc"
  })

  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    (async () => {
      var { data } = await AxiosHelper.getData(`/productdetail/${slug}`);
      if (data.status === true) {
        data?.data?.variants?.forEach((item, i) => {
          item?.attribute?.forEach((row, j) => {
            j === 0 && setAttr(prev => ({ ...prev, [item?.attr_id]: row?.id }));
          })
        })

        const products = await AxiosHelper.getData("productlists", { ...param, catlist: data?.data?.category?.slug });
        setRelatedProducts(products.data.data.products)
        setData(data?.data)
      } else {
        toast.error(data.message);
        navigate(`${public_path}/product`)
      }
    })();
  }, [slug, navigate]);

  function calculateSavingsPercentage(mrp, salePrice) {
    if (mrp === 0) {
      return 0; // To avoid division by zero
    }
    const savings = mrp - salePrice;
    const savingsPercentage = (savings / mrp) * 100;
    return savingsPercentage.toFixed(2); // To get a percentage with two decimal places
  }


  function matchAttr(selected, attr_val) {
    var arr = attr_val.split(',').sort().map(function (num) {
      return parseInt(num, 10);
    });
    // Create an array of values from the object and sort it
    var values = Object.values(selected).sort();

    // Check if the two arrays are equal (forward order)
    var isMatched = JSON.stringify(values) === JSON.stringify(arr);
    return isMatched;
  }
  useEffect(() => {

    if (data?.variants.length === 0) {
      setMrp(data?.mrp);
      setSpecialPrice(data?.price);
      setPrice(`${changeCurrency(data?.price)}`) // data?.mrp > 0 ? data?.mrp : data?.price
    } else if (data?.variants?.length > 0) {
      var selected = data?.variants_attributes.filter(item => {
        var arr = []
        //return item;
        Object.keys(attr).forEach(key => arr.push(attr[key].toString()));
        return matchAttr(attr, item.attribute_id) && item;
      })[0]

      if (selected === undefined) {
        setIsDisabled(true)
        setSpecialPrice(0);
        setPrice(`<small class='text-danger'>Not available.</small>`)
      }
      else if (selected?.quantity <= 0) {
        setSelectedAttr({ ...selected });
        setIsDisabled(true)
        setMrp(selected?.mrp)
        setSpecialPrice(selected?.price);
        setPrice(selected?.price);
        setErrorMsg("Out of stock");
      }
      else {
        setErrorMsg("");
        setSelectedAttr({ ...selected });
        setIsDisabled(false)
        var int = Math.round((selected?.price / selected?.attribute_int) * 100) / 100
        if (int && !isNaN(int) && int != Infinity) {
          setPerUnitData({ attribute_int: int, attribute_unit: selected?.attribute_unit, mrp: parseFloat(selected.mrp), price: selected.price })
        }
        else {
          setPerUnitData({ attribute_int: null, attribute_unit: null })
        }
        setMrp(selected?.mrp)
        setSpecialPrice(selected?.price);
        setPrice(`${changeCurrency(selected.price)}`)
      }
    }

  }, [attr, data.variants_attributes, data?.mrp, data?.price, data.variants, changeCurrency])


  const addToCartIni = (id, qty) => {
    addToCart(id, qty, JSON.stringify(attr)).then(res => res && updateMyCart())
  }

  const handelQty = (e) => {
    var quantity = selectedAttr?.quantity || 10;
    if (quantity >= 10) {
      quantity = 10;
    }
    if (e === '+') {
      qty < quantity && setQty(qty + 1)
    } else if (e === '-') {
      qty > 1 && setQty(qty - 1)
    } else {
      var val = parseInt(e.target.value);
      if (val >= 1 && val <= 10) setQty(val)

    }
  }

  const changeAttr = (attr_id, id) => {
    setAttr(prev => ({ ...prev, [attr_id]: id }))
  }

  const buyNow = (id) => {
    addToCart(id, qty, JSON.stringify(attr))
    navigate(`${public_path}/cart`)
  }

  const submitPostalCode = async (e) => {
    e.preventDefault();
    if (postCode !== "") {
      var { data } = await AxiosHelper.postData(`/checkdelivery`, { postcode: postCode });
      if (data.message) {
        setPostCodeMessage({ status: data.status, message: data.message });
      }
    }
    else {
      setPostCodeMessage({ status: false, message: "Please provide postal code." });
    }
  }

  return (
    <>
      <SEOHead seo={{ title: data.title, metaDesc: data?.meta_description, image: data.image?.length > 0 ? data.image[0] : '' }} />
      <MetaTags data={{ title: data?.meta_title?.length > 0 ? data?.meta_title : data.name, description: data?.meta_description }} />
      {
        (template === 'true' || data?.extra_data?.new_template === 'new') ?
          <NewTemplateProduct
            data={data}
            setData={setData}
            Review={Review}
            ButtonGroup={ButtonGroup}
            setShowReview={setShowReview}
            submitPostalCode={submitPostalCode}
            buyNow={buyNow}
            responsive={responsive}
            price={price}
            specialPrice={specialPrice}
            mrp={mrp}
            ipCheck={ipCheck}
            perUnitData={perUnitData}
            changeAttr={changeAttr}
            attr={attr}
            handelQty={handelQty}
            qty={qty}
            errorMsg={errorMsg}
            isDisabled={isDisabled}
            addToCartIni={addToCartIni}
            setPostCode={setPostCode}
            setPostCodeMessage={setPostCodeMessage}
            postCodeMessage={postCodeMessage}
            responsive_2={responsive_2}
            showReview={showReview}
            strLimit={strLimit}
            relatedProducts={relatedProducts}
            calculateSavingsPercentage={calculateSavingsPercentage}
          />
          :
          <CurrentTemplateProduct
            data={data}
            Review={Review}
            ButtonGroup={ButtonGroup}
            setShowReview={setShowReview}
            submitPostalCode={submitPostalCode}
            buyNow={buyNow}
            responsive={responsive}
            price={price}
            specialPrice={specialPrice}
            mrp={mrp}
            ipCheck={ipCheck}
            perUnitData={perUnitData}
            changeAttr={changeAttr}
            attr={attr}
            handelQty={handelQty}
            qty={qty}
            errorMsg={errorMsg}
            isDisabled={isDisabled}
            addToCartIni={addToCartIni}
            setPostCode={setPostCode}
            setPostCodeMessage={setPostCodeMessage}
            postCodeMessage={postCodeMessage}
            responsive_2={responsive_2}
            showReview={showReview}
            strLimit={strLimit}
          />
      }
    </>
  )
}

const Review = ({ avg_review = 0, total = 0, showReadReview = () => null }) => {
  avg_review = Math.round(avg_review * 100) / 100
  return (
    <div className='d-flex align-items-center'>
      <span className="d-flex text-blue align-items-center">
        {[1, 2, 3, 4, 5].map((item, i) => (
          <i key={i} className={`mx-1 ${item <= Math.ceil(avg_review) ? 'fa fa-star' : 'fa-regular fa-star'}`} />
        ))}
        {total !== 0 ?
          <span className='text-success mx-2'>{avg_review} ({total})</span>
          :
          <span className='text-success mx-2'>({avg_review}/5)</span>
        }
      </span>
      {total !== 0 && <span role='button' className='my-0 mx-2 text-blue underline' onClick={() => showReadReview(true)}>Read Review</span>}
    </div>
  )
}


const ButtonGroup = ({ next, previous, goToSlide, image = [], ...rest }) => {
  const { carouselState: { currentSlide } } = rest;

  return (
    <div className="carousel-button-group d-flex justify-content-center align-items-center">
      {image?.map((image, i) => (
        <span key={i} className={`btn btn - priamry mx - 1 ${currentSlide === 0 ? 'disable' : ''}`} onClick={() => goToSlide(i + 2)}>
          <img className='img-thumbnail' src={image} alt="" style={{ width: 50, height: 50 }} />
        </span>
      ))}
    </div>
  );
};

export default ProductDetails
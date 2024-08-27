const axios = require("axios");

const API_ENDPOINT = "https://sblglobal.com/admin/api/products";
const API_KEY = "9906bf6e010b9381c6f6084eeda60923b051c75ca0b5ab5b9e79dec5";


// Product details routes
const fetchDynamicProductDetailsRoutes = async () => {
  try {
    const response = await axios.get(API_ENDPOINT, {
      headers: {
        "x-api-key": API_KEY,
      },
    });

    const categories = response?.data?.data?.categories;
    // console.log(JSON.stringify(categories));

    let urls = [];
    categories.forEach((category) => {
      category.product.forEach((product) => {
        const url = `https://sblglobal.com/product-details/${product.slug}`;
        console.log(url)
        urls.push(url);
      });
    });

    return urls;
  } catch (error) {
    console.error("Error fetching dynamic routes:", error);
    return [];
  }
};
// Product category route
const fetchDynamicProductCategoryRoutes = async () => {
  try {
    const response = await axios.get(API_ENDPOINT, {
      headers: {
        "x-api-key": API_KEY,
      },
    });

    const categories = response?.data?.data?.categories;
    // console.log(JSON.stringify(categories));

    let urls = [];
    categories.forEach((category) => {
      category.product.forEach((product) => {
        const url = `https://sblglobal.com/product/${category.slug}`;
        urls.push(url);
      });
    });

    return urls;
  } catch (error) {
    console.error("Error fetching dynamic routes:", error);
    return [];
  }
};

// Blog route
const fetchDynamicBlogsRoutes = async () => {
  try {
    const response = await axios.get("https://sblglobal.com/admin/api/blog", {
      headers: {
        "x-api-key": API_KEY,
      },
    });

    const blogs = response?.data?.data;

    let urls = [];
    blogs.forEach((blog) => {
      console.log(blog);
      const url = `https://sblglobal.com/blogs/${blog.seo_url}`;
      urls.push(url);
    });

    return urls;
  } catch (error) {
    console.error("Error fetching dynamic routes:", error);
    return [];
  }
};
module.exports = {
  fetchDynamicProductDetailsRoutes,
  fetchDynamicProductCategoryRoutes,
  fetchDynamicBlogsRoutes,
};


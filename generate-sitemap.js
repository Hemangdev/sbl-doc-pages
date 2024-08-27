const siteMapGenerator = require("sitemap-generator");
const fs = require("fs");
const path = require("path");
const routes = require("./src/Routes/routes");
const {
  fetchDynamicProductDetailsRoutes,
  fetchDynamicProductCategoryRoutes,
  fetchDynamicBlogsRoutes,
} = require("./FetchDynamicRoutes");

const hostname = "https://sblglobal.com";

const isValidUrl = (urlString) => {
  try {
    new URL(urlString);
    return true;
  } catch (err) {
    return false;
  }
};

const generateSitemap = async () => {
  const dynamicProductDetailRoutes = await fetchDynamicProductDetailsRoutes();
  const dynamicProductCategory = await fetchDynamicProductCategoryRoutes();
  const dynamicBlogsRoutes = await fetchDynamicBlogsRoutes();

  const allRoutes = [
    ...routes,
    ...dynamicProductDetailRoutes,
    ...dynamicProductCategory,
    ...dynamicBlogsRoutes,
  ];

  const generator = siteMapGenerator(hostname, {
    stripQuerystring: false,
  });

  generator.on("done", () => {
    console.log("Sitemap created");

    fs.renameSync(
      path.resolve(__dirname, "sitemap.xml"),
      path.resolve(__dirname, "public", "sitemap.xml")
    );
  });

  allRoutes.forEach((route) => {
    const fullUrl = new URL(route, hostname).href;
    if (isValidUrl(fullUrl)) {
      console.log(`Queuing URL: ${fullUrl}`);
      generator.queueURL(fullUrl);
    } else {
      console.error(`Invalid URL: ${fullUrl}`);
    }
  });

  generator.start();
};

generateSitemap();
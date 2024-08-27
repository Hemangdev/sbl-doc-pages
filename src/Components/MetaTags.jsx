import { useLocation } from 'react-router-dom';
import useSetting from '../Hooks/useSetting';
const metaDescription = document.querySelector('meta[name="description"]');
const metaTitle = document.querySelector('meta[name="title"]');
const metaIcons = document.querySelectorAll('link[meta="icon"]')
const metaKeywords = document.querySelectorAll('link[meta="keywords"]')


const MetaTags = (props) => {
    const params = useLocation()
    const pathName = params?.pathname?.split('/')

    const { application_name, meta_title, meta_keyword, meta_description, path, favicon } = useSetting();
    // meta Title, Description and Keywords
    metaDescription && (metaDescription.content = meta_description)
    metaTitle && (metaTitle.content = meta_title)
    metaKeywords && (metaKeywords.content = meta_keyword)

    // Dymamic meta Icons
    var i = metaIcons.length;
    if (i > 0) {
        while (i--) {
            metaIcons[i].href = path + favicon;
        }
    }

    if (pathName?.length > 0 && pathName[1] === 'product-details' && props?.data?.description?.length > 0) {
        const existingMetaDescription = document.querySelector('meta[name="description"]');
        if (existingMetaDescription) {
          existingMetaDescription.content = props?.data?.description;
        } else {
          const newMetaDescription = document.createElement('meta');
          newMetaDescription.name = 'description';
          newMetaDescription.content = meta_description;
          document.head.appendChild(newMetaDescription);
        }
      }

    // Dynamic Title
    document.title = pathName?.length > 0 && props?.data?.title?.length > 0 ? props?.data?.title + ' - ' + 'SBL Global' : 'SBL Global'

    // document.title = application_name
    return null
}

export default MetaTags
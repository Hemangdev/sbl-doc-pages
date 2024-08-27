import { useContext } from "react";
import { GeneralSettings } from '../Context/GeneralSettingsProvider'
const useSetting = () => {
    return useContext(GeneralSettings);
}

export default useSetting
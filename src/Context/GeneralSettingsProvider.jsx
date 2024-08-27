import React, { useState, useEffect, useCallback, createContext } from "react";
import AxiosHelper from '../helper/AxiosHelper'
const currency_code = localStorage.getItem('currency_code')
var setting = {
    path: "",
    favicon: "",
    logo: "",
    application_name: "",
    copyright: "",
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
    address: "",
    email: "",
    phone: "",
    facebook_link: "",
    twitter_link: "",
    youtube_link: "",
    linkedin_link: "",
    instagram_link: "",
    whatsapp_link: "",
    consultation_message: "",
    consultation_fee_inr: "*",
    consultation_days: "*",
    social_responsibility_policy_pdf: ""

}

export const GeneralSettings = createContext(setting)

const GeneralSettingsProvider = (props) => {
    const [ipCheck, setIpCheck] = useState(false)
    const [generalSetting, setGeneralSetting] = useState(setting)
    const [currencyList, setCurrencyList] = useState([])
    const [department, setDepartment] = useState({})
    const [myCurrency, setMyCurrency] = useState({
        currency_name: "India Rupee",
        currency_code: "INR",
        currency_symbol: "₹",
        currency_rate: 1,
    })

    const [topCats, settopCats] = useState([])
    const getData = useCallback(async () => {
        const { data } = await AxiosHelper.getData(`/setting/1,3`, { id: 28 });
        if (data.status === true) {
            var { currencies, department, ip_check } = data?.data
            setCurrencyList(currencies)
            setDepartment(department)
            setIpCheck(ip_check);
            if (currency_code) {
                let selected = currencies?.find(item => item.currency_code === currency_code);
                if (selected !== undefined) {
                    setMyCurrency(selected)
                }
            }

            setGeneralSetting(data.data.setting)
            settopCats(data.data.top_category)
        }
    }, [])

    useEffect(() => { getData() }, [getData])

    // Update Data while runing
    generalSetting.updateData = getData
    generalSetting.changeCurrency = (val = 0) => {
        return `${myCurrency?.currency_symbol}${Math.round(val * myCurrency?.currency_rate * 100) / 100}`;
    };

    generalSetting.topCats = topCats;
    generalSetting.currencyList = currencyList;
    generalSetting.setMyCurrency = setMyCurrency;
    generalSetting.department = department;
    generalSetting.ipCheck = ipCheck;

    return (
        <GeneralSettings.Provider value={generalSetting}>
            {props.children}
        </GeneralSettings.Provider>
    )
}

export default GeneralSettingsProvider
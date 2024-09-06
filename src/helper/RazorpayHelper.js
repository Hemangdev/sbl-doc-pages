import { toast } from "react-toastify";
import AxiosHelper from "./AxiosHelper";
import { hideLoader, showLoader } from "./LoaderHelper";

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}


const displayRazorpay = async (dataToSend) => {
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return false;
    }

    // creating a new order
    const { data } = await AxiosHelper.postData("/create_order", dataToSend);
    if (!data) {
        alert("Server error. Are you online?");
        return false;
    }

    if (data.status === true) {
        const { amount, currency, sbl_order_id, customer_name, customer_mobile, customer_email, shipping_address_1, shipping_address_2, shipping_city, shipping_state, shipping_country, shipping_postcode, application_name, logo, description, order_id, payment_key } = data.data;

        // Getting the order details back
        const options = {
            key: payment_key, // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: application_name,
            description: description,
            image: logo,
            order_id: order_id,
            handler: async (response) => {
                const dataResponce = {
                    orderCreationId: order_id,
                    sbl_order_id: sbl_order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                showLoader()
                const { data } = await AxiosHelper.postData("/update_payment_status", dataResponce);
                if (data.status) {
                    localStorage.removeItem('session_id')
                    localStorage.removeItem('address')
                    alert('Order Has been Placed successfully.')
                    hideLoader()
                    var url = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + '/sblglobal.com'
                    return window.location.replace(url);
                }
                else {
                    toast.error(data.message)
                    return false;
                }
            },
            prefill: {
                name: customer_name,
                email: customer_email,
                contact: customer_mobile,
            },
            notes: {
                address: `${shipping_address_1}, ${shipping_address_2}, ${shipping_city}, ${shipping_state}, ${shipping_country} ${shipping_postcode}`,
            },
            theme: {
                color: "#61dafb",
            },
            modal: {
                ondismiss: function () {
                    hideLoader()
                    toast.error("Payment Window Closed.");
                }
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.on('payment.failed', function (response) {
            hideLoader()
            toast.error(response.error.description);
        });

        paymentObject.open();
    }
    else {
        toast.error("There is some error.");
        return false;
    }
}


export { loadScript, displayRazorpay }
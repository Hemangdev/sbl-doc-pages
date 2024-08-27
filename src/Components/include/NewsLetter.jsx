import { useState } from 'react'
import { toast } from "react-toastify";
import AxiosHelper from '../../helper/AxiosHelper';
import { isEmailAddress } from '../../helper/StringHelper'

const NewsLetter = () => {

    const [email, setEmail] = useState('')

    const submitEmail = async (e) => {
        e.preventDefault();
        if (isEmailAddress(email)) {
            var { data } = await AxiosHelper.postData(`newsletter`, { email });
            if (data.status === true) {
                setEmail('')
                toast.success(data.message);
            }
            else {
                toast.error(data.message);
            }
        }
        else {
            toast.error("Please enter valid email address..");
        }
    }

    return (
        <form className='d-flex'>
            <input onChange={e => setEmail(e.target.value)} value={email} className="footinputwhite flex-grow-1" type="email" placeholder="Enter your Email.." />
            <button onClick={submitEmail} type="submit" className="footsubmit"> Submit</button>
        </form>
    )
}

export default NewsLetter
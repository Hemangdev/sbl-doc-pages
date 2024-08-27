const CheckAuth = () => {
    var token = localStorage.getItem('token');
    if (token !== null) {
        return true;
    }
    return false;

}

export default CheckAuth
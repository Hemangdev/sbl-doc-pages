const element = document.getElementById("loader");
const showLoader = () => {
    element.classList.remove("d-none");
}

const hideLoader = () => {
    element.classList.add("d-none");
}

const scrollToTop = () => {
    window.scrollTo(0, 150);
}

export { showLoader, hideLoader, scrollToTop };
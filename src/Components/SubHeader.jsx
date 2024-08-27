import { Link } from "react-router-dom";
import backGround from "../image/bb.jpg"

const SubHeader = ({ backgroundImage, main = null, heading = "" }) => {
	return (
		<div className="position-relative">
			<img className="subheader" alt="" src={backgroundImage ? backgroundImage : backGround} />
			<div className="container-fluid overlay">
				<div className="d-flex flex-column h-100 align-items-center justify-content-center">
					<h2 className="text align-self-center">{main ? main : heading}</h2>
					<ul className="breadcrumbs breadcrumbs_type5">
						<li className="breadcrumbs__item">
							<Link to="/" className="breadcrumbs__element">Home</Link>
						</li>
						<li className="breadcrumbs__item breadcrumbs__item_active">
							<span className="breadcrumbs__element">{heading}</span>
						</li>
					</ul>
				</div>


			</div>
		</div>
	);
};

export default SubHeader;

import React, { useState } from 'react';
import StarRating from './startRating';
import AxiosHelper from '../../helper/AxiosHelper';
import { closeModal } from '../../helper/StringHelper';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const ProductRatingComment = ({ productId, setData }) => {
	const { slug } = useParams()

	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');
	const [error, setError] = useState('')
	console.log('productId', productId);
	const handleRatingSelect = (rate) => {
		setRating(rate);
	};

	const handleCommentChange = (e) => {
		setComment(e.target.value);
		setError('')
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (rating > 0 && comment?.length > 0) {
			const { data } = await AxiosHelper.postData('saveproductreview', { product_id: productId, rating: rating, comment: comment })
			if (data?.status) {
				toast.success(data.message)
				var productData = await AxiosHelper.getData(`/productdetail/${slug}`);
				setData(productData.data.data)
				setComment('')
				setRating(0)
				closeModal('productRatingModal')
			}
		} else {
			if (comment?.length === 0) {
				setError('The comment field is required.')
			} else {
				setError('Please provide a rating before submitting.')
			}
		}
	};

	return (
		<form onSubmit={handleSubmit} class="modal fade product-rating-modal" id="productRatingModal" tabindex="-1" aria-labelledby="productRatingModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header py-2">
						<h5 class="modal-title" id="productRatingModalLabel">Product Rating and Comment</h5>
						<button type="button" class="btn-close modal-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div>
							<label className="mb-2">Ratings:</label>
							<StarRating onRatingSelect={handleRatingSelect} setError={setError} setRating={setRating} rating={rating} />
						</div>
						<div className="mt-3">
							<label>Comment:</label>
						</div>
						<div>
							<textarea cols={50}  style={{ width: '100%' }} value={comment} onChange={handleCommentChange} />
						</div>
						{error?.length > 0 && <span className="text-danger">{error}</span>}
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-blue" data-bs-dismiss="modal">Cancel</button>
						<button type="submit" class="btn btn-success">Submit</button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default ProductRatingComment;

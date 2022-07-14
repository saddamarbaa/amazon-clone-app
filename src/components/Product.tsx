import React, { memo, useEffect, useState } from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { useDispatch } from 'react-redux'
import { setAddToBasketState } from '../features/basket/basketSlice'
//  @ts-ignore
import Fade from 'react-reveal/Fade'

import { ProductType } from '../types'
import { getRandomIntNumberBetween, truncate } from '../utils'

const Product = ({
	id,
	title,
	image,
	price,
	category,
	description,
	stock,
}: ProductType) => {
	const [starRating, setStarRating] = useState(3)
	const dispatch = useDispatch()

	const addToBasketHandler = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		event.preventDefault()

		dispatch(
			setAddToBasketState({
				item: {
					id: uuidv4(),
					title: title,
					image: image,
					rating: starRating,
					price: price,
					category: category,
					description: description,
					stock: stock,
				},
			}),
		)
	}

	// call fetchMoviesData()
	useEffect(() => {
		setStarRating(Math.floor(Math.random() * 6))
	}, [id])

	return (
		<Wrapper>
			<Fade bottom>
				<div className="product_container">
					<div className="category__container">{category}</div>
					<div className="inner__container">
						<div className="image__container">
							<LazyLoadImage
								effect="blur"
								placeholderSrc="https://image.tmdb.org/t/p/original/4EYPN5mVIhKLfxGruy7Dy41dTVn.jpg"
								className="product__image"
								src={image}
								alt="demo image"
								height={190}
								// @ts-ignore
								weight={190}
								objectFit="contain"
							/>
						</div>
						<ProductInfo>
							<p className="product__title">{truncate(title, 35)}</p>

							<div className="product__rating">
								{Array(5)
									.fill(5)
									.map(() => (
										<span
											style={{
												color: '#FCDE42',
												fontWeight: 'bold',
												fontSize: '1.5rem',
											}}
											key={uuidv4()}>
											✶
										</span>
									))}{' '}
								<p>
									<span>5.0</span>
									{getRandomIntNumberBetween(1000, 7000)}
								</p>
							</div>

							<p className="description__container">
								{truncate(description, 70)}
							</p>

							<p className="product__price">
								<strong>$ {price}</strong>
								<span className="pl-2 font-semibold">Save 5%</span>
							</p>
							<p className="product__info-stock">
								{stock ? stock : 'In Stock - order soon.'}
							</p>
						</ProductInfo>
						<button onClick={(event) => addToBasketHandler(event)}>
							Add to Basket
						</button>
					</div>
				</div>
			</Fade>
		</Wrapper>
	)
}

export default memo(Product)

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	flex-grow: 1;
	background-color: white;
	margin: 10px;
	max-width: 1500px;
	overflow: hidden;

	@media (max-width: 300px) {
		overflow: auto;
	}

	.product_container {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-height: 530px;
		height: 515px;
		padding: 20px;
		max-width: 340px;
		width: 100%;
		overflow: hidden;
		@media (max-width: 380px) {
			max-height: 560px;
			height: 560px;
		}
	}

	.inner__container {
		max-width: 300px;
		min-width: 300px;

		@media (max-width: 339px) {
			max-width: 250px;
			min-width: 250px;
			padding: 0 10px;
		}
	}

	.category__container {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		font-size: 0.9rem;
		margin-top: -10px;
		margin-bottom: 20px;
		color: grey;
		color: #007185;

		@media (max-width: 400px) {
			padding: 0 10px;
		}

		:hover {
			color: #c7511f !important;
		}
	}

	.image__container {
		display: flex;
		justify-content: center;
		height: 190px;
	}

	img.product__image {
		display: block;
		object-fit: contain;
		height: 100%;
		width: 100%;
	}

	.description__container {
		font-size: 0.9rem;
		max-height: 50px;
		overflow: hidden;
		@media (max-width: 400px) {
			padding: 0 10px;
		}

		:hover {
			color: #c45500 !important;
		}
	}

	button {
		width: 100%;
		display: block;
		cursor: pointer;
		padding: 7px 15px;
		border: 1px solid;
		background: #f0c14b;
		border-color: #a88734 #9c7e31 #846a29;
		color: #111;
		border-radius: 3px;
		cursor: pointer;
		text-align: center;
		transition: 0.4s;
		margin-top: 15px;
		:hover {
			background: #f4d078;
			background: -webkit-linear-gradient(top, #f7dfa5, #f0c14b);
			background: linear-gradient(to bottom, #f7dfa5, #f0c14b);
		}

		@media (max-width: 568px) {
			width: 90%;
		}

		@media (max-width: 400px) {
			margin-left: 10px;
		}
	}
`

const ProductInfo = styled.div`
	min-height: 130px;
	max-height: 250px;
	overflow: hidden;
	padding-top: 15px;

	@media (max-width: 380px) {
		min-height: 190px;
		max-height: 290px;
	}

	.product__title {
		font-size: 1rem;
		width: 100%;
		font-weight: 400;
		line-height: 1.5;
		overflow: hidden;
		max-height: 100px;
		height: 30px;
		min-height: 30px;
		overflow: hidden;
		color: #007185 !important;
		:hover {
			color: #c45500 !important;
		}

		@media (max-width: 400px) {
			height: 130px;
			padding: 10px;
		}
	}

	.product__price {
		margin: 10px 0;
		color: #007185;
		@media (max-width: 400px) {
			padding: 0 10px;
		}

		span {
			margin-left: 10px;
		}
	}

	.product__info-stock {
		font-size: 15px;
		color: #c45500;

		@media (max-width: 400px) {
			padding: 0 10px;
		}

		@media (max-width: 300px) {
			max-height: 20px;
			overflow: hidden;
		}
	}

	.product__rating {
		display: flex;
		align-items: center;
		margin: 13px 0;
		color: #f6991e;
		font-size: 1em;
		font-weight: bold;

		p {
			font-weight: bold;
			color: #007185;
			span {
				margin-left: 10px;
				margin-right: 10px;
				background: #dbeafe;
			}
		}

		@media (max-width: 400px) {
			padding: 0 10px;
		}
	}
`

import React, { memo } from 'react'
import styled from 'styled-components'
import SearchIcon from '@material-ui/icons/Search'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { useAuthState } from 'react-firebase-hooks/auth'
import Advertisement from '../components/Advertisement'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'

import { selectBasket } from '../features/basket/basketSlice'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { useSelector } from 'react-redux'

import { auth, signOut } from '../config/firebase'

const Header = () => {
	const [user] = useAuthState(auth)
	const basket = useSelector(selectBasket)
	const history = useNavigate()

	const userSignedOutHandler = () => {
		// User is signed out(Remove the user from Firebase)
		if (user) {
			signOut(auth)
				.then(() => {
					history('/login')
					// Sign-out successful.
				})
				.catch((error) => {
					// An error happened.
				})
		}
	}

	return (
		<Wrapper>
			<HeadContainer>
				<LogoContainer>
					<Link to="/">
						<img
							src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
							alt="amazon-logo"
						/>
					</Link>
				</LogoContainer>

				<SearchContainer>
					<input type="text" />
					<SearchIcon className="SearchIcon" />
				</SearchContainer>

				<NavContainer>
					<CountryFlagContainer>
						<img
							src="https://pngimg.com/uploads/flags/flags_PNG14592.png"
							alt="usa lag"
						/>
						<ArrowDropDownIcon />
					</CountryFlagContainer>

					<NavOption>
						<span className="firstOption">Delivery to</span>
						<div className="secondOption location">
							<LocationOnIcon />
							Location
						</div>
					</NavOption>
					{/* @ts-ignore */}
					<Link to={!user && '/login'}>
						<NavOption onClick={userSignedOutHandler}>
							<span className="firstOption">
								Hello,{' '}
								{user?.displayName
									? user.displayName
									: user?.email
									? user.email
									: ' Guest'}
							</span>
							<span className="secondOption">
								{user ? ' Sign Out' : ' Sign-In'}
							</span>
						</NavOption>
					</Link>
					<Link to={user ? '/order' : '/login'}>
						<NavOption>
							<span className="firstOption">Return</span>
							<span className="secondOption">& Order</span>
						</NavOption>
					</Link>

					<Link to="/login">
						<NavOption>
							<span className="firstOption">Your</span>
							<span className="secondOption">Prime</span>
						</NavOption>
					</Link>

					<BasketOption
						onClick={() => {
							history('/checkout')
						}}>
						<ShoppingCartIcon
							className="ShoppingCartIcon"
							onClick={() => {
								history('/checkout')
							}}
						/>
						<p> Basket</p>
						<span className="basketCount">{basket.length}</span>
					</BasketOption>
				</NavContainer>

				<NavContainerHidden>
					<NavOption className="FirstHiddenOption">
						<span className="firstOption">Delivery to</span>
						<div className="secondOption location">
							<LocationOnIcon />
							Location
						</div>
					</NavOption>

					{/* @ts-ignore */}
					<Link to={!user && '/login'}>
						<NavOption onClick={userSignedOutHandler}>
							<span className="firstOption">
								{user?.displayName
									? user.displayName
									: user?.email
									? user.email
									: ' Guest'}
							</span>
							<span className="secondOption">
								{user ? ' Sign Out' : ' Sign-In'}
							</span>
						</NavOption>
					</Link>

					<BasketOption
						onClick={() => {
							history('/checkout')
						}}>
						<ShoppingCartIcon
							className="ShoppingCartIcon"
							onClick={() => {
								history('/checkout')
							}}
						/>
						<p> Basket</p>
						<span className="basketCount">{basket.length}</span>
					</BasketOption>
				</NavContainerHidden>
			</HeadContainer>
			<Advertisement />
		</Wrapper>
	)
}

export default memo(Header)

const Wrapper = styled.div`
	width: 100%;
	height: 110px;
	position: sticky;
	top: 0;
	z-index: 100;
	color: white;
	z-index: 100;
`

const HeadContainer = styled.div`
	height: 60px;
	background: #131921;
	display: flex;
	align-items: center;
	color: white;

	margin-right: 10px;
	padding: 0px 10px;
`

const LogoContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100px;
	min-width: 100px;
	margin-right: 20px;
	margin-left: 15px;
	padding: 5px 10px;
	padding-left: 0;
	height: 45px;
	transition: 0.4s;

	&:hover {
		border: 1px solid white;
		box-shadow: 7px -1px 24px 5px rgba(18, 25, 53, 0.75);
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		margin-top: 15px;
	}
`

const SearchContainer = styled.div`
	@media (max-width: 991px) {
		min-width: 100px;
	}

	@media (max-width: 568px) {
		display: none;
	}
	display: flex;
	flex: 1;
	align-items: center;
	border-radius: 24px;
	min-width: 400px;
	border-radius: 5px;
	margin-right: 20px;
	input {
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		border: none;
		width: 100%;
		line-height: 15px;
		padding: 7px 10px 10px 10px;
		height: 38px;
		font-family: inherit;
		font-size: 17px;
		color: #111;
		outline: 0;
		transition: all 0.2s linear;
		:focus {
			border: 2px solid #f0c14b;
		}
	}
	.SearchIcon {
		cursor: pointer;
		height: 38px;
		padding: 5px;
		background: #cd9042;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		transition: 0.4s;
		:focus {
			border: 1px solid #cd9042;
		}
	}
`

const NavContainer = styled.div`
	@media (max-width: 1200px) {
		display: none;
	}
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	min-width: 500px;
	cursor: pointer;
`

const NavOption = styled.div`
	&:hover {
		border: 1px solid white;
	}
	padding: 5px 10px;
	height: 45px;
	display: flex;
	flex-direction: column;
	margin-left: 10px;
	margin-right: 10px;
	color: white;
	transition: 0.4s;
	.firstOption {
		font-size: 12px;
	}
	.secondOption {
		font-size: 14px;
		font-weight: 800;
	}
	.secondOption.location {
		display: flex;
	}
`

const CountryFlagContainer = styled(NavOption)`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 5px 10px;
	height: 45px;
	transition: 0.4s;
	&:hover {
		border: 1px solid white;
		box-shadow: 7px -1px 24px 5px rgba(18, 25, 53, 0.75);
	}
	img {
		width: 30px;
		height: 20px;
	}
`

const BasketOption = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	transition: 0.4s;
	padding: 5px 10px;
	padding-right: 0px;
	height: 45px;
	transition: 0.4s;
	position: relative;

	@media (min-width: 568px) {
		margin-right: 15px;
	}

	.ShoppingCartIcon {
		margin-top: 7px;
	}

	&:hover {
		border: 1px solid white;
		box-shadow: 7px -1px 24px 5px rgba(18, 25, 53, 0.75);
	}

	span {
		position: absolute;
		top: 0;
		left: 15px;
		margin-top: -6px;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 1.1rem;
		width: 1.1rem;
		font-size: 18px;
		border-radius: 50%;
		border: 1px solid #f08804;
		color: black;
		background: #f08804;
	}

	p {
		margin-right: 10px;
		margin-top: 12px;
		font-size: 14px;
		font-weight: 800;
		margin-left: 5px;
	}
`

const NavContainerHidden = styled(NavContainer)`
	.LocationOption {
		border: 1px solid red;
		@media (max-width: 991px) {
		}
	}
	display: none;
	@media (max-width: 1200px) {
		display: flex;
		min-width: 100px;
	}
	@media (max-width: 568px) {
		flex: 1;
		.FirstHiddenOption {
			display: none;
		}
	}
	@media (max-width: 360px) {
		justify-content: space-between;
	}
`

import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
	TextField,
	DialogContent,
	DialogActions,
	Stack,
} from "@mui/material";
import { Modal } from "../../components/Modal";

import { useState, useRef } from "react";
import { Box } from "@mui/system";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React, { useContext } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { useCart } from "react-use-cart";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

export const UserProductCard = ({ item }) => {
	const navigate = useNavigate();
	const { token } = useContext(AuthContext);
	const { category_image, category_name, category_price } = item;
	const { addItem } = useCart();

	const handleAdditem = () => {
		if (token) {
			addItem({ ...item, price: item.product_price });
		} else {
			navigate("/login");
		}
	};
	return (
		<Card sx={{ borderRadius: "10px" }}>
			<Box width='250px' height='340px' marginX='auto'>
				<CardMedia
					width='250'
					height='300'
					image={category_image}
					title={category_name}
					component='img'
				/>
			</Box>
			<CardContent>
				<Typography gutterBottom variant='h5' component='div'>
					{category_name}
				</Typography>
				<Typography gutterBottom variant='body2' component='div'>
					Price: {category_price} $
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					onClick={() => handleAdditem()}
					size='small'
					variant='contained'
					endIcon={<ShoppingCartIcon />}
				>
					Add to cart
				</Button>
			</CardActions>
		</Card>
	);
};

export const AdminProductCard = ({item}) => {
	const { category_image, category_name, category_price, id, category_id } = item;

	const [categoryEditModal, setCategoryEditModal] = useState(false);

	const nameRef = useRef();
	const priceRef = useRef();
	const imageRef = useRef();

	const handleSubmit = (evt) => {
		evt.preventDefault();

		axios
			.put(`http://localhost:8080/products/${id}`, {
				category_name: nameRef.current.value,
				category_price: priceRef.current.value,
				category_image: imageRef.current.value,
				category_id: category_id,
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	const handleDelet = (id) => {
		axios
			.delete(`http://localhost:8080/products/${id}`)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};
	return (
		<>
			<Card sx={{ borderRadius: "10px" }}>
				<Box width='250px' height='340px' marginX='auto'>
					<CardMedia
						width='300'
						height='300'
						image={category_image}
						title={category_name}
						component='img'
					/>
				</Box>
				<CardContent>
					<Typography gutterBottom variant='h5' component='div'>
						{category_name}
					</Typography>
					<Typography gutterBottom variant='body1' component='div'>
						Price: {category_price} $
					</Typography>
				</CardContent>
				<CardActions>
					<Button
						onClick={() => {
							setCategoryEditModal(true);
						}}
						size='small'
						variant='contained'
						color='warning'
						endIcon={<Edit />}
					>
						Edit
					</Button>
					<Button
						onClick={() => handleDelet(id)}
						size='small'
						variant='contained'
						color='error'
						endIcon={<Delete />}
					>
						Delete
					</Button>
				</CardActions>
			</Card>
			<Modal
				modal={categoryEditModal}
				setModal={setCategoryEditModal}
				title='Edit Category'
			>
				<form onSubmit={(evt) => handleSubmit(evt)}>
					<DialogContent dividers>
						<Stack spacing={2}>
							<TextField
								inputRef={nameRef}
								sx={{ width: "400px" }}
								label='Product name...'
							/>
							<TextField
								inputRef={priceRef}
								sx={{ width: "400px" }}
								label='Product price...'
							/>
							<TextField
								inputRef={imageRef}
								sx={{ width: "400px" }}
								label='Product image url...'
							/>
						</Stack>
					</DialogContent>
					<DialogActions>
						<Button type='submit' varyant='contained'>
							Add
						</Button>
					</DialogActions>
				</form>
			</Modal>
		</>
	);
};

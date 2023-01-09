import {
	Button,
	Box,
	Tabs,
	Tab,
	DialogContent,
	TextField,
	DialogActions,
	MenuItem,
	Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Modal } from "../../components/Modal";
import { Stack } from "@mui/system";
import { AdminProductCard } from "../../components/ProductCard/ProductCard";

export function Product() {
	const [value, setValue] = useState(0);
	const [category, setCategory] = useState([]);
	const [product, setProduct] = useState([]);
	const [productModal, setProductModal] = useState(false);

	useEffect(() => {
		axios
			.get("http://localhost:8080/category")
			.then((res) => setCategory(res.data))
			.catch((err) => console.log(err));
	}, []);

	const handleGet = async (id) => {
		axios
			.get("http://localhost:8080/products?category_id=" + id)
			.then((res) => setProduct(res.data))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		handleGet(value);
	}, [value]);

	const handleChange = (evt) => {
		setValue(+evt.target.attributes.tabIndex.nodeValue);
		console.log(+evt.target.attributes.tabIndex.nodeValue);
	};

	const nameRef = useRef();
	const priceRef = useRef();
	const categoryRef = useRef();
	const imageRef = useRef();

	const handleSubmit = (evt) => {
		evt.preventDefault();

		axios
			.post("http://localhost:8080/products", {
				category_name: nameRef.current.value,
				category_price: priceRef.current.value,
				category_image: imageRef.current.value,
				category_id: categoryRef.current.value,
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	return (
		<>
			<Button
				onClick={() => setProductModal(true)}
				sx={{ marginTop: "20px" }}
				bgcolor='primary.dark'
				variant='contained'
				endIcon={<AddIcon />}
			>
				Add Category
			</Button>

			<Box sx={{ width: "100%", marginTop: "20px" }}>
				<Box
					sx={{
						boxShadow:
							"1px 3px 0px -1px rgb(0 0 0 / 20%), 0px 1px 0px 0px rgb(0 0 0 / 14%), 0px 1px 0px 0px rgb(0 0 0 / 12%)",
					}}
				>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label='basic tabs example'
					>
						{category.map((category) => (
							<Tab
								key={category.id}
								value={category.id}
								label={category.category_name}
								tabIndex={category.id}
								simple-tab={category.id}
							/>
						))}
					</Tabs>
				</Box>
				{category.map((item) => {
					return (
						<Box
							key={item.id}
							role='tabpanel'
							hidden={value !== item.id}
							value={value}
							index={item.id}
						>
							<Grid
								container
								spacing={5}
								component='ul'
								sx={{ listStyle: "none", paddingLeft: "0" }}
								marginTop='50px'
							>
								{product.map((item) => (
									<>
										<Grid item xs={3} key={item.id} component='li'>
											<AdminProductCard
												
												item={item}
											/>
										</Grid>
									</>
								))}
							</Grid>
						</Box>
					);
				})}
				<Modal
					title='Add Product'
					modal={productModal}
					setModal={setProductModal}
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
								<TextField
									inputRef={categoryRef}
									sx={{ width: "400px" }}
									label='Product catehandleGetgory...'
									value={value}
									select
								>
									{category.map((item) => {
										return (
											<MenuItem key={item.category_name} value={item.id}>
												{item.category_name}
											</MenuItem>
										);
									})}
								</TextField>
							</Stack>
						</DialogContent>
						<DialogActions>
							<Button type='submit' varyant='contained'>
								Add
							</Button>
						</DialogActions>
					</form>
				</Modal>
			</Box>
		</>
	);
}

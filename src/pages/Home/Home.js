import {
	AppBar,
	Avatar,
	Badge,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Container,
	Drawer,
	IconButton,
	List,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { UserContext } from "../../Context/UserContext";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { UserProductCard } from "../../components/ProductCard/ProductCard";
import { useCart } from "react-use-cart";
import { Stack } from "@mui/system";
import { CartCard } from "../../components/CartCard/CartCard";
import { Modal } from "../../components/Modal";
export const Home = () => {
	const { totalItems, isEmpty, emptyCart, items, cartTotal, id } = useCart();

	// context
	const { user, setUser } = useContext(UserContext);
	const { token, setToken } = useContext(AuthContext);

	// profil avatar
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [orderModal, setOrderModal] = useState(false);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	}; 	

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	// order
	const [state, setState] = useState({ right: false });

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const [products, setProducts] = useState([]);
	useEffect(() => {
		axios
			.get("http://localhost:8080/products")
			.then((res) => setProducts(res.data))
			.catch((err) => console.log(err));
	}, []);

	const handleOrder = () => {
		axios
			.post("http://localhost:8080/orders", {
				user_id: user.id,
				user_name: user.first_name,
				user_email: user.email,
				items: items,
				total_price: cartTotal,
			})
			.then((res) => {
				if (res.status === 201) {
					setOrderModal(false);
					emptyCart(id);
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			{/* header */}
			<AppBar position='static'>
				<Container maxWidth='xl'>
					<Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<Typography>
								<IconButton
									size='large'
									edge='start'
									href='/'
									color='inherit'
									sx={{
										mr: 2,
										":hover": { color: "#fff", backgroundColor: "transparent" },
									}}
								>
									Story
								</IconButton>
							</Typography>

							{token ? (
								""
							) : (
								<Link to='/login'>
									<Typography
										style={{
											color: "#fff",
											textDecorationLine: "none",
											fontWeight: 500,
											fontFamily: "monospace",
										}}
									>
										Login
									</Typography>
								</Link>
							)}
						</Box>

						<Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
							{["right"].map((anchor) => (
								<IconButton key={anchor} sx={{ marginRight: "20px" }}>
									<>
										<Badge badgeContent={totalItems} color='error'>
											<IconButton
												sx={{ bgcolor: "white" }}
												onClick={toggleDrawer(anchor, true)}
											>
												<ShoppingCartIcon color='primary' />
											</IconButton>
											<Drawer
												anchor={anchor}
												open={state[anchor]}
												onClose={toggleDrawer(anchor, false)}
											>
												<Box
													sx={{
														width: "400px",
														height: "100%",
														marginTop: "50px",
													}}
												>
													<Box
														sx={{
															display: "flex",
															flexDirection: "column",
															alignItems: "start",
															height: "100%",
															justifyContent: "space-between",
														}}
													>
														<List
															sx={{
																display: "flex",
																flexDirection: "column",
																alignItems: "center",
																gap: "20px",
																paddingLeft: "15px",
															}}
														>
															{isEmpty ? (
																<Typography>Cart is empty</Typography>
															) : (
																items.map((element, index) => (
																	<CartCard key={index} item={element} />
																))
															)}
															<List
																sx={{
																	width: "100%",
																	maxWidth: 360,
																	bgcolor: "background.paper",
																}}
															></List>
														</List>

														<Box
															sx={{
																display: "flex",
																alignItems: "center",
																justifyContent: "center",
																flexDirection: "row",
																gap: "15px",
																padding: "15px",
															}}
														>
															<Button
																onClick={() => emptyCart()}
																variant='contained'
																color='error'
															>
																Clear cart
															</Button>
															<Button
																onClick={() => setOrderModal(true)}
																variant='contained'
																color='success'
															>
																Order
															</Button>
															<Typography variant='subtitle'>
																Total price $ {cartTotal}
															</Typography>
														</Box>
													</Box>
												</Box>
											</Drawer>
										</Badge>
									</>
								</IconButton>
							))}
							{token ? (
								<Box>
									<Tooltip title='Open settings'>
										<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
											<Avatar
												alt={user ? user?.first_name.toUpperCase() : ""}
												src='/static/iages/avatar/2.jpg'
											/>
										</IconButton>
									</Tooltip>
									<Menu
										sx={{ mt: "45px" }}
										id='menu-appbar'
										anchorEl={anchorElUser}
										anchorOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										keepMounted
										transformOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										open={Boolean(anchorElUser)}
										onClose={handleCloseUserMenu}
									>
										<MenuItem variant='contained' onClick={handleCloseUserMenu}>
											<Button
												onClick={() => {
													if (token) {
														setToken("");
														setUser("");
														emptyCart(id);
													}
												}}
											>
												<Typography textAlign='center'>Log Out</Typography>
											</Button>
										</MenuItem>
									</Menu>
								</Box>
							) : (
								""
							)}
						</Box>
					</Toolbar>
				</Container>
			</AppBar>

			{/* hero */}
			<Box component='section'>
				<Container maxWidth='xl'>
					<List
						sx={{
							display: "flex",
							alignItems: "center",
							marginTop: "50px",
							gap: "50px",
						}}
					>
						{products.map((item) => {
							return <UserProductCard key={item.id} item={item} />;
						})}
					</List>
				</Container>
			</Box>
			<Modal title='Are you sure?' modal={orderModal} setModal={setOrderModal}>
				<Stack direction='row' spacing={3} sx={{ padding: "20px" }}>
					<Button
						onClick={() => handleOrder()}
						variant='contained'
						color='success'
						endIcon={<CheckIcon />}
					>
						Yes
					</Button>
					<Button
						onClick={() => setOrderModal(false)}
						variant='contained'
						color='error'
						endIcon={<CloseIcon />}
					>
						No
					</Button>
				</Stack>
			</Modal>
		</>
	);
};

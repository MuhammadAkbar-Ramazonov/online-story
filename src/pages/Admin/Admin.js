import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import {
	Avatar,
	IconButton,
	List,
	ListItem,
	Menu,
	MenuItem,
	Paper,
	Toolbar,
	Tooltip,
} from "@mui/material";
import { Container } from "@mui/system";
import { Order } from "../Order";
import { Product } from "../Product";
import { Category } from "../Category";

export const Admin = () => {
	// profil
	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const menuItem = [
		{
			path: "order",
			title: "Order",
		},
		{
			path: "product",
			title: "Product",
		},
		{
			path: "category",
			title: "Category",
		},
	];
	return (
		<Box
			sx={{
				flexGrow: 1,
				display: "flex",

				height: "100%",
			}}
		>
			<Paper
				sx={{
					boxShadow:
						"2px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);",
					position: "fixed",
					top: 0,
					bottom: 0,
					left: 0,
					width: "300px",
				}}
			>
				<Typography sx={{ textAlign: "center" }}>
					<IconButton
						size='large'
						edge='start'
						href='/'
						color='inherit'
						sx={{
							":hover": {
								color: "#000",
								backgroundColor: "transparent",
							},
						}}
					>
						Story
					</IconButton>
				</Typography>
				<List>
					{menuItem.map((item) => (
						<ListItem sx={{ justifyContent: "center" }} key={item.path}>
							<NavLink
								className={({ isActive }) =>
									isActive ? " active" : "text-decoration-none text-dark"
								}
								style={{
									textDecorationLine: "none",
									fontSize: "18px",
								}}
								to={item.path}
							>
								{item.title}
							</NavLink>
						</ListItem>
					))}
				</List>
			</Paper>
			<Box sx={{ paddingLeft: "300px", width: "100%" }}>
				<Paper sx={{ paddingLeft: "50px" }}>
					<Container maxWidth='1500'>
						<Toolbar
							disableGutters
							sx={{
								justifyContent: "space-between",
							}}
						>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
								}}
							>
								<Link to='/login'>
									<Typography
										style={{
											color: "#000",
											textDecorationLine: "none",
											fontWeight: 500,
											fontFamily: "monospace",
										}}
									>
										Login
									</Typography>
								</Link>
							</Box>

							<Box sx={{ flexGrow: 0 }}>
								<Tooltip title='Open settings'>
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<Avatar alt={"Admin"} src='/static/iages/avatar/2.jpg' />
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
										<Typography textAlign='center'>Log Out</Typography>
									</MenuItem>
								</Menu>
							</Box>
						</Toolbar>
					</Container>
				</Paper>
				<Container maxWidth='1718px'>
					<Routes>
						<Route path='/' element={<h1>Admin</h1>} />
						<Route path='order' element={<Order />} />
						<Route path='product' element={<Product />} />
						<Route path='category' element={<Category />} />
					</Routes>
				</Container>
			</Box>
		</Box>
	);
};

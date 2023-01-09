import {
	AppBar,
	Box,
	Button,
	Container,
	Link,
	IconButton,
	InputAdornment,
	Paper,
	TextField,
	Toolbar,
	Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack } from "@mui/system";
import { AuthContext } from "../../Context/AuthContext";
import { UserContext } from "../../Context/UserContext";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
export const Login = () => {
	const { setToken } = useContext(AuthContext);
	const { setUser } = useContext(UserContext);
	const [inputType, setInputType] = useState(false);

	const schema = Yup.object({
		email: Yup.string().required("Required").email("Invalid from format"),
		password: Yup.string()
			.required("Required")
			.min(3, "Password don't be small from 3")
			.max(8, "Password don't be large from 8"),
	});
	const navigate = useNavigate();
	const {
		register,
		watch,
		handleSubmit,
		formState,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "all",
		resolver: yupResolver(schema),
	});
	const onSubmit = (data) => {
		axios
			.post(`http://localhost:8080/login`, data)
			.then((data) => {
				if (data.status === 200) {
					setToken(data.data.accessToken);
					setUser(data.data.user);
				}
			})
			.catch((err) => console.log(err));
		navigate("/");
	};

	return (
		<>
			<Paper
				elevation={3}
				sx={{
					width: 500,
					borderRadius: 2,
					marginX: "auto",
					padding: "40px",
					paddingBottom: "190px",
					marginTop: "50px",
				}}
			>
				<Typography variant='h3' component='h2' textAlign='center'>
					Login
				</Typography>
				<Typography variant='body2' marginBottom="20px" textAlign='center'>
					Sizda account yo'qmi?
					<Link component={RouterLink} to="/register" marginLeft="5px">Register</Link>
				</Typography>

				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack spacing={3} marginBottom='20px'>
						<TextField
							type='email'
							label='Email'
							helperText={errors.email?.message}
							{...register("email")}
						/>
						<TextField
							helperText={errors.password?.message}
							{...register("password")}
							type={inputType ? "text" : "password"}
							label='Password'
							InputProps={{
								endAdornment: (
									<InputAdornment
										onClick={() => setInputType(!inputType)}
										position='end'
									>
										<VisibilityIcon />
									</InputAdornment>
								),
							}}
						/>
					</Stack>
					<Button
						disabled={!isValid}
						type='submit'
						sx={{ width: "100%", padding: "10px", maxWidth: "200%" }}
						variant='contained'
					>
						Submit
					</Button>
				</form>
			</Paper>
		</>
	);
};

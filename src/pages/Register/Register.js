import {
	Button,
	InputAdornment,
	MenuItem,
	Paper,
	Stack,
	TextField,
	Link,
	Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { UserContext } from "../../Context/UserContext";

export const Register = () => {
	const { setToken } = useContext(AuthContext);
	const { setUser } = useContext(UserContext);
	const [inputType, setInputType] = useState(false);

	const schema = Yup.object({
		first_name: Yup.string().required("Required"),
		last_name: Yup.string().required("Required"),
		email: Yup.string().required("Required").email("Invalid from format"),
		password: Yup.string()
			.required("Required")
			.min(3, "Password don't be small from 3")
			.max(8, "Password don't be large from 8"),
		gender: Yup.string().required("Required"),
	});

	const {
		register,
		watch,
		handleSubmit,
		formState,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			password: "",
			gender: "",
		},
		mode: "all",
		resolver: yupResolver(schema),
	});
	
	const onSubmit = (data) => {
		axios
			.post(`http://localhost:8080/register`, data)
			.then((data) => {
				if (data.status === 201) {
					setToken(data.data.accessToken);
					setUser(data.data.user);
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<Paper
				elevation={3}
				sx={{
					width: 500,
					borderRadius: 2,
					marginX: "auto",
					padding: "50px",
					marginTop: "50px",
				}}
			>
				<Typography variant='h3' component='h2' textAlign='center' >
					Register
				</Typography>
				<Typography variant='body2' marginBottom='20px' textAlign='center'>
					Sizda account bormi?
					<Link component={RouterLink} to='/login' marginLeft='5px'>
						Login
					</Link>
				</Typography>

				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack spacing={3} marginBottom='20px'>
						<TextField
							label='First Name'
							helperText={errors.first_name?.message}
							{...register("first_name")}
						/>
						<TextField
							label='Last Name'
							helperText={errors.last_name?.message}
							{...register("last_name")}
						/>
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
						<TextField
							label='Geder'
							select
							helperText={errors.gender?.message}
							{...register("gender")}
						>
							<MenuItem value='Male'>Male</MenuItem>
							<MenuItem value='Femali'>Femali</MenuItem>
						</TextField>
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

import {
	Button,
	DialogActions,
	DialogContent,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal } from "../../components/Modal";
import axios from "axios";

export const Category = () => {
	const [category, setCategory] = useState([]);
	const [categoryId, setCategoryId] = useState();
	const [categoryModal, setCategoryModal] = useState(false);
	const [categoryEditModal, setCategoryEditModal] = useState(false);
	const categoryRef = useRef();
	const categoryEditRef = useRef();

	const handleSubmit = (evt) => {
		evt.preventDefault();
		axios
			.post("http://localhost:8080/category", {
				category_name: categoryRef.current.value,
			})
			.then((res) => (res.status === 201 ? setCategoryModal(false) : ""))
			.catch((err) => console.log(err));
	};
	const handleDelet = (id) => {
		axios
			.delete(`http://localhost:8080/category/${id}`)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	const handleEdit = (evt) => {
		evt.preventDefault()
		axios
			.put(`http://localhost:8080/category/${categoryId}`, {
				category_name: categoryEditRef.current.value,
			})
			.then((res) => (res.status === 200 ? setCategoryEditModal(false) : ""))
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		axios
			.get("http://localhost:8080/category")
			.then((res) => setCategory(res.data))
			.catch((err) => console.log(err));
	}, []);
	return (
		<>
			<Button
				onClick={() => setCategoryModal(true)}
				sx={{ marginTop: "50px" }}
				bgcolor='primary.dark'
				variant='contained'
				endIcon={<AddIcon />}
			>
				Add Category
			</Button>

			<TableContainer sx={{ marginTop: "20px" }} component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead bgcolor='primary.dark'>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Category Name</TableCell>
							<TableCell>Category Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{console.log(category)}
						{category.map((category) => (
							<TableRow key={category.id}>
								<TableCell>{category.id}</TableCell>
								<TableCell>{category.category_name}</TableCell>

								<TableCell>
									<IconButton
										onClick={() => {
											setCategoryId(category.id);
											setCategoryEditModal(true);
										}}
									>
										<EditIcon />
									</IconButton>
									<IconButton onClick={() => handleDelet(category.id)}>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<Modal
				modal={categoryEditModal}
				setModal={setCategoryEditModal}
				title='Edit Category'
			>
				<form onSubmit={(evt) => handleEdit(evt)}>
					<DialogContent dividers>
						<TextField
							inputRef={categoryEditRef}
							sx={{ width: "400px" }}
							label='Category name...'
						/>
					</DialogContent>
					<DialogActions>
						<Button type='submit' varyant='contained'>
							Add
						</Button>
					</DialogActions>
				</form>
			</Modal>

			<Modal
				modal={categoryModal}
				setModal={setCategoryModal}
				title='Add Category'
			>
				<form onSubmit={(evt) => handleSubmit(evt)}>
					<DialogContent dividers>
						<TextField
							inputRef={categoryRef}
							sx={{ width: "400px" }}
							label='Category name...'
						/>
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

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import { OrderCard } from "../../components/orderCard/orderCard";
import { Grid } from "@mui/material";

export const Order = () => {
	function Row(props) {
		const { row } = props;
		const [open, setOpen] = React.useState(false);

		return (
			<React.Fragment>
				<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
					<TableCell>
						<IconButton
							aria-label='expand row'
							size='small'
							onClick={() => setOpen(!open)}
						>
							{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
						</IconButton>
					</TableCell>
					<TableCell component='th' scope='row'>
						{row.name}
					</TableCell>
					<TableCell>{row.calories}</TableCell>
					<TableCell>{row.fat}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
						<Collapse in={open} timeout='auto' unmountOnExit>
							<Grid container spacing={3}
								sx={{
									margin: 1,
									display: "flex",
									alignItems: "center",
									flexWrap: "wrap",
								}}
							>
								{row.history.map((item, index) => {
									return <OrderCard  key={index} item={item} />;
								})}
							</Grid>
						</Collapse>
					</TableCell>
				</TableRow>
			</React.Fragment>
		);
	}

	const [order, setOrder] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:8080/orders")
			.then((res) => setOrder(res.data))
			.catch((err) => console.log(err));
	}, []);
	const rows = [];

	order.map((item) => {
		return rows.push({
			calories: item.user_id,
			name: item.user_name,
			fat: item.user_email,
			history: item.items,
		});
	});

	return (
		<TableContainer component={Paper} sx={{ marginTop: "50px", overflowX: "hidden" }}>
			<Table aria-label='collapsible table' >
				<TableHead>
					<TableRow>
						<TableCell />
						<>
							<TableCell>User Id</TableCell>
							<TableCell>User Name</TableCell>
							<TableCell>User Email</TableCell>
						</>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<Row key={row.name} row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

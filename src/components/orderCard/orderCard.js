import {
	Avatar,
	Grid,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

export const OrderCard = ({ item }) => {
	const { category_name, category_price, category_image } = item;
	return (
		<>
			<Grid item xs={4} divider sx={{ display: "inline-block" }}>
				<Stack direction='row' spacing={2} mb='10px'>
					<ListItemAvatar>
						<Avatar alt='Remy Sharp' src={category_image} />
					</ListItemAvatar>
					<ListItemText
						primary={category_name}
						secondary={`$ ${category_price}`}
					/>
				</Stack>
			</Grid>
		</>
	);
};

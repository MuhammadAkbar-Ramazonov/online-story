import {
	Avatar,
	Button,
	Divider,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { useCart } from "react-use-cart";

export const CartCard = ({ item }) => {

  const { updateItemQuantity, removeItem } = useCart();

	const { category_name, category_price, id, quantity } = item;
	return (
		<>
			<ListItem divider sx={{ display: "block" }}>
				<Stack direction='row' spacing={2} mb='10px'>
					<ListItemAvatar>
						<Avatar></Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={category_name}
						secondary={`$ ${category_price}`}
					/>
				</Stack>

				<Box>
					<Stack direction='row' spacing={2}>
						<Button
							onClick={() => updateItemQuantity(id, quantity - 1)}
							variant='contained'
							size='small'
							color='secondary'
						>
							-
						</Button>
						<Typography>{quantity}</Typography>
						<Button
							onClick={() => updateItemQuantity(id, quantity + 1)}
							variant='contained'
							size='small'
							color='secondary'
						>
							+
						</Button>
						<Button
							onClick={() => removeItem(id)}
							variant='contained'
							size='small'
							color='error'
						>
							Remove all
						</Button>
					</Stack>
				</Box>
			</ListItem>
			<Divider variant='inset' component='li' />
		</>
	);
};

import { Dialog, DialogTitle } from "@mui/material";

export const Modal = ({ children, modal, setModal, title }) => {
	return (
		<>
			<Dialog onClose={() => setModal(false)} open={modal}>
				<DialogTitle id='customized-dialog-title'>{title}</DialogTitle>
				{children}
			</Dialog>
		</>
	);
};

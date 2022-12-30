import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

export default function SnackBarSuccess(props) {
    const [isOpen, setIsOpen] = React.useState(true);
    const handleClose = (event) => {
        setIsOpen(false);
    };
    return (
        <div>
            <Snackbar
                open={isOpen}
                onClose={handleClose}
                autoHideDuration={5000}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {props.message}
                </Alert>
            </Snackbar>
        </div>
    );
}

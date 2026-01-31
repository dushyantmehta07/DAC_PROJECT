import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import RegisterUserForm from "./Register";
import { useEffect, useState } from "react";
import LoginUserForm from "./Login";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ handleClose, open }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const isStandalone = !handleClose;
  const handleSnackbarClose = () => setSnackbarOpen(false);
  
  useEffect(() => {
    if (auth.user) {
      if (handleClose) handleClose();
      else navigate("/");
    }
  }, [auth.user, handleClose, navigate]);
  
  useEffect(() => {
    if (auth.user || auth.error) setSnackbarOpen(true);
  }, [auth.user, auth.error]);
  
  const handleCloseModal = () => {
    if (handleClose) handleClose();
    else navigate("/");
  };

  const modalContent = (
    <Box className="rounded-md" sx={style}>
      {location.pathname === "/login" ? <LoginUserForm /> : <RegisterUserForm />}
    </Box>
  );

  if (isStandalone) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        {modalContent}
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            {auth.error ? auth.error : auth.user ? "Success" : ""}
          </Alert>
        </Snackbar>
      </Box>
    );
  }

  return (
    <>
      <Modal open={open} onClose={handleCloseModal} size="large">
        {modalContent}
      </Modal>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {auth.error ? auth.error : auth.user ? "Success" : ""}
        </Alert>
      </Snackbar>
    </>
  );
}

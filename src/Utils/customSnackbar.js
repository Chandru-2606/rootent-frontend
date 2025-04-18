import { useSnackbar } from "notistack";
import Close from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

const useCustomSnackbar = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showSnackbar = (message, variant) => {
    enqueueSnackbar(message || 'Unexpected Error', {
      variant: variant,
      action: (key) => (
        <IconButton size="small" aria-label="close" color="inherit" onClick={() => closeSnackbar(key)}>
          <Close fontSize="small" />
        </IconButton>
      ),
    });
  };
  return showSnackbar;
};

export default useCustomSnackbar;
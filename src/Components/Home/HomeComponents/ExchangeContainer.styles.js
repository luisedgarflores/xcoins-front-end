import { deepPurple } from '../../Utils/colors';
import { makeStyles } from "@material-ui/core";

export const useExchangeContainerStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    background: deepPurple,
    borderRadius: "8px 8px 8px 8px",
  },
}));

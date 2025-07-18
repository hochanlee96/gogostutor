import classes from "./Loading.module.css";
import { ReactComponent as Spinner } from "../../assets/icons/loading.svg";

const LoadingIndicator = ({ color = "#000" }) => (
  <div className={classes.Loading}>
    <Spinner className={classes.Spinner} style={{ fill: color }} />
  </div>
);

export default LoadingIndicator;

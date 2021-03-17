import React from "react";
import { Card, CardBody, CardImg } from "reactstrap";
import "./Product.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/CreateRounded";
import { useHistory } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import API from "../../services/axioshelper";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Product = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const onClickListener = () => {
    console.log(props.product.id);
    history.push("/product/" + props.product.id);
  };

  const onDeleteListener = () => {
    console.log(props.product.id);

    if (
      window.confirm(
        "Are you sure you want to delete " + props.product.name + " ?"
      )
    ) {
      API({
        method: "delete",
        url: `api/product/` + props.product.id,
      })
        .then((res) => {
          alert(props.product.name + " deleted successfully");
          window.location.reload();
        })
        .catch((err) => {
          console.log("CATCH");
          alert(err.response.data.message);
          window.location.reload();
        });
    }
  };

  return (
    <div className="Person">
      <Card className="mb-3">
        <CardBody>
          <CardImg
            top
            width="100%"
            src={
              props.product.images && props.product.images.length > 0
                ? props.product.images[0].documentUrl
                : "https://via.placeholder.com/700x400.png?text=No+Preview+Found"
            }
            style={{ alignSelf: "center", display: "block", margin: "auto" }}
          />

          <h3>Product : {props.product.name}</h3>
          <h4>Brand : {props.product.brand}</h4>
          <h5>Amount : {props.product.amount}</h5>
          <h6>Quantity : {props.product.quantity}</h6>
          <Chip
            size="medium"
            label={props.product.active ? "Active" : "Inactive"}
            color={props.product.active ? "primary" : "default"}
          />

          <Button
            style={{ textAlign: "center", float: "right", marginLeft: 10 }}
            variant="contained"
            color="primary"
            disabled={!props.admin}
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={onClickListener}
          >
            Edit
          </Button>
          <Button
            style={{ textAlign: "center", float: "right", marginLeft: 10 }}
            variant="outlined"
            color="secondary"
            disabled={!props.admin}
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={onDeleteListener}
          >
            Delete
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Product;

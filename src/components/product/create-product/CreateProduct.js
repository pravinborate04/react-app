import React, { Component } from "react";
import API from "../../../services/axioshelper";
import TextField from "@material-ui/core/TextField";
import "../../product/EditProduct.sass";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { isEmail, isEmpty } from "../../../shared/validator";

class CreateProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameError: false,
      brandError: false,
      amountError: false,
      quantityError: false,
      activeError: false,
    };
  }

  componentDidMount() {}

  render() {
    const validate = () => {
      this.setState({
        nameError: isEmpty(this.state.productName),
        brandError: isEmpty(this.state.productBrand),
        amountError: isEmpty(this.state.productAmount),
        quantityError: isEmpty(this.state.productQuantity),
      });
      return !(
        isEmpty(this.state.productName) ||
        isEmpty(this.state.productBrand) ||
        isEmpty(this.state.productAmount) ||
        isEmpty(this.state.productQuantity)
      );
    };

    const onClickListener = () => {
      console.log(validate());

      if (validate()) {
        let data = {
          name: this.state.productName,
          brand: this.state.productBrand,
          amount: this.state.productAmount,
          quantity: this.state.productQuantity,
          active: this.state.productActive,
        };

        API({
          method: "put",
          url: `api/product`,
          data,
        })
          .then((res) => {
            console.log("then");
            alert("Successfully Created");
            this.setState({
              productName: "",
              productBrand: "",
              productAmount: "",
              productQuantity: "",
              productActive: false,
            });
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
      }
    };
    return (
      <div className="EditProduct">
        <h3 style={{ marginBottom: 30 }}>
          {this.props.match.params.id ? "Edit Product" : "Create Product"}
        </h3>
        <TextField
          id="outlined-basic"
          label="Product Name"
          variant="outlined"
          fullWidth
          onChange={(event) => {
            this.setState({
              productName: event.target.value,
              nameError: isEmpty(event.target.value),
            });
          }}
          error={this.state.nameError}
          helperText={this.state.nameError ? "Name is mandatory" : ""}
          value={this.state.productName ? this.state.productName : ""}
          style={{ marginBottom: 15 }}
        />

        <TextField
          id="outlined-basic"
          label="Brand"
          variant="outlined"
          fullWidth
          error={this.state.brandError}
          helperText={this.state.brandError ? "Brand is mandatory" : ""}
          value={this.state.productBrand ? this.state.productBrand : ""}
          style={{ marginBottom: 15 }}
          onChange={(event) => {
            this.setState({
              productBrand: event.target.value,
              brandError: isEmpty(event.target.value),
            });
          }}
        />

        <TextField
          fullWidth
          label="Amount"
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
          variant="outlined"
          autoComplete="off"
          error={this.state.amountError}
          helperText={this.state.amountError ? "Amount is mandatory" : ""}
          value={
            this.state.productAmount && this.state.productAmount
              ? this.state.productAmount
              : ""
          }
          style={{ marginBottom: 15 }}
          onChange={(event) => {
            this.setState({
              productAmount: event.target.value,
              amountError: isEmpty(event.target.value),
            });
          }}
        />

        <TextField
          id="outlined-basic"
          label="Quantity"
          variant="outlined"
          fullWidth
          type="number"
          error={this.state.quantityError}
          helperText={this.state.quantityError ? "Quantity is mandatory" : ""}
          value={this.state.productQuantity ? this.state.productQuantity : ""}
          style={{ marginBottom: 15 }}
          onChange={(event) => {
            this.setState({
              productQuantity: event.target.value,
              quantityError: isEmpty(event.target.value),
            });
          }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={
                this.state.productActive && this.state.productActive
                  ? this.state.productActive
                  : false
              }
              name="checkedB"
              color="primary"
            />
          }
          onChange={(event) => {
            this.setState({
              productActive: event.target.checked,
            });
          }}
          label="Is Active"
        />

        <Button
          style={{ textAlign: "center", float: "right", marginLeft: 10 }}
          variant="contained"
          color="primary"
          onClick={onClickListener}
        >
          {this.props.match.params.id ? "Update" : "Create"}
        </Button>

        <Button
          style={{ textAlign: "center", float: "right", marginLeft: 10 }}
          variant="outlined"
          color="primary"
          onClick={() => {
            this.props.history.push("/home");
          }}
        >
          Back
        </Button>
      </div>
    );
  }
}

export default CreateProduct;

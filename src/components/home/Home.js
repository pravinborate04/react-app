import React, { Component } from "react";
import Product from "../product/Product";
import API from "../../services/axioshelper";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Add";
import "../home/Home.sass";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productList: null,
      filterActive: "All",
      filterBrand: "All",
      uniqueBrand: [],
      brandFiltered: "All",
      isAdmin: localStorage.getItem("role") === "ADMIN" ? true : false,
    };
  }

  callApi = (brand, active) => {
    let url = `api/product`;

    API({
      method: "get",
      url: url,
      params: {
        brand,
        active,
      },
    })
      .then((res) => {
        this.setState({
          productList: res.data,
        });
      })
      .catch((err) => {});
  };

  componentDidMount() {
    this.callApi(undefined, undefined);
    API({
      method: "get",
      url: `api/product`,
    })
      .then((res) => {
        const uniqueBrands = [...new Set(res.data.map((item) => item.brand))];
        this.setState({
          uniqueBrand: uniqueBrands,
        });
      })
      .catch((err) => {});
  }

  render() {
    if (this.state.productList) {
      return (
        <div className="Home">
          <div>
            <h1>Products</h1>
          </div>
          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              Brand
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={this.state.filterBrand}
              onChange={(event) => {
                this.setState({
                  filterBrand: event.target.value,
                });
                this.callApi(
                  event.target.value === "All" ? undefined : event.target.value,
                  this.state.filterActive === "All"
                    ? undefined
                    : this.state.filterActive === "Inactive"
                    ? false
                    : true
                );
              }}
              style={{ marginRight: 30, width: 100 }}
              label="Brand"
            >
              <MenuItem value="All">All</MenuItem>
              {this.state.uniqueBrand.map((data, index) => (
                <MenuItem value={data}>{data}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              Active
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={this.state.filterActive}
              onChange={(event) => {
                this.setState({
                  filterActive: event.target.value,
                });
                console.log(
                  this.state.filterBrand + "  -  " + event.target.value
                );
                this.callApi(
                  this.state.filterBrand === "All"
                    ? undefined
                    : this.state.filterBrand,
                  event.target.value === "All"
                    ? undefined
                    : event.target.value === "Inactive"
                    ? false
                    : true
                );
              }}
              style={{ marginRight: 30, width: 100 }}
              label="Active"
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Active"}>Active</MenuItem>
              <MenuItem value={"Inactive"}>Inactive</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            startIcon={<CreateIcon />}
            style={{ textAlign: "center", float: "right", marginBottom: 10 }}
            onClick={() => {
              this.props.history.push("/create");
            }}
            disabled={!this.state.isAdmin}
          >
            Add Product
          </Button>
          <div>
            {this.state.productList.map((data) => (
              <Product
                product={data}
                props={this.props}
                admin={this.state.isAdmin}
              />
            ))}
          </div>
        </div>
      );
    } else {
      return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
    }
  }
}
export default Home;

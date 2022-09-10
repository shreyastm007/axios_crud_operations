import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import HTTP from "../axiosConfig";

function Products() {
  const [products, setproducts] = useState([]);
  const [showAddModal, setshowAddModal] = useState(false);
  const [showEditModal, setshowEditModal] = useState(false);
  const [selectedProduct, setselectedProduct] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try{
      const response = await HTTP.get("api/products");
      console.log(response.data);
      if (response.data.error) {
        const errMessage = response.data.message;
      } else {
        const fetchedProducts = response.data.products;
        console.log("products", fetchedProducts);
        setproducts(fetchedProducts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateShowAddModal = () => {
    setshowAddModal(true);
  };

  const hideShowModal = () => {
    setshowAddModal(false);
  };

  const hideEditShowModal = () => {
    setshowEditModal(false);
  };

  //delete product
  const deleteProduct = async (productId) => {
    console.log("product id", productId);
    try {
      const response = await axios.delete(
        `https://ty-shop.herokuapp.com/api/products/${productId}`
      );
      if (response.data.error) {
        alert(response.data.message);
      } else {
        fetchProducts();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  //update edit
  const updateTheSelectedProduct = (val) => {
    console.log("selected product", val);
    setshowEditModal(true);
    setselectedProduct(val);
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Product Name</th>
            <th>Product price</th>
            <th>Product Description</th>
            <th>Product image</th>
            <th>
              <button onClick={updateShowAddModal}>ADD</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 &&
            products.map((val) => {
              return (
                <tr key={val._id}>
                  <td>{val._id}</td>
                  <td>{val.productName}</td>
                  <td>{val.productPrice}</td>
                  <td>{val.productDescription}</td>
                  <td>
                    <img
                      width="180px"
                      height="150px"
                      src={val.productImageURL}
                      alt={val.productName}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-primary mb-2"
                      onClick={() => {
                        updateTheSelectedProduct(val);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteProduct(val._id);
                      }}
                      className="btn btn-danger mb-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <AddProduct
        fetchProducts={fetchProducts}
        showAddModal={showAddModal}
        hideShowModal={hideShowModal}
      />

      <EditProduct
        hideEditShowModal={hideEditShowModal}
        showEditModal={showEditModal}
        fetchProducts={fetchProducts}
        selectedProduct={selectedProduct}
      />
    </div>
  );
}

export default Products;

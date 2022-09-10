import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
function EditProduct(props) {
    const [singleProduct, setsingleProduct] = useState({
    productName: "",
    productPrice: "",
    productImageURL: "",
    productDescription: "",
  });

  useEffect(() => {
    setsingleProduct({ ...props.selectedProduct });
  }, [props.selectedProduct]);

  const handleClose = () => {
    props.hideEditShowModal();
  };

  const editProduct = async () => {
    try {
      console.log("single product", singleProduct);
      const response = await axios.put(
        `https://ty-shop.herokuapp.com/api/products/${props.selectedProduct._id}`,
        singleProduct
      );
      console.log("add api response", response);
      if (response.data.error) {
        alert(response.data.message);
      } else {
        //to close the modal
        props.hideEditShowModal();
        //to fetch the products after adding new product
        props.fetchProducts();
        alert(response.data.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleProductChange = (event) => {
    setsingleProduct({
      ...singleProduct,
      [event.target.name]: event.target.value,
    });
  };


  return (
    <>
      <Modal show={props.showEditModal}
       onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label>Product Name</label>
              <input
                value={singleProduct.productName}
                name="productName"
                type="text"
                onChange={handleProductChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label>Product Price</label>
              <input
                value={singleProduct.productPrice}
                name="productPrice"
                type="number"
                onChange={handleProductChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label>Product Description</label>
              <input
                value={singleProduct.productDescription}
                name="productDescription"
                type="text"
                onChange={handleProductChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label>Product Image</label>
              <input
                value={singleProduct.productImageURL}
                name="productImageURL"
                type="text"
                onChange={handleProductChange}
                className="form-control"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" 
          onClick={handleClose}
          >
            Close
          </Button>
          <Button variant="primary" 
          onClick={editProduct}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProduct;
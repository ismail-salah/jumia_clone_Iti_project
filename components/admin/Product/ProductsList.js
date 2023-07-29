import React, { useState, useEffect }  from 'react'
// import styles from './ProductsList.css'
import { Table, Button, Pagination } from "react-bootstrap";
import axiosInstance from "../../axios/axios";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConfirmDeleteModal = ({ id, handleDelete, product }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product <b>{product.name}</b>? This will delete this product permanently. You cannot undo this action.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => { handleDelete(id); handleClose(); }}>
  Delete
</Button>

        </Modal.Footer>
      </Modal>
    </>
  );
};

function ProductsList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersPerPage] = useState(15);
  const navigate = useNavigate();
  

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);
  // }, []);

  const fetchUsers = async () => {
    try {

      const response = await axiosInstance.get(
       `/products?page=${currentPage}&limit=${usersPerPage}`
        );
        setUsers(response.data.Products);
        setTotalUsers(response.data.totalProducts);
      console.log(response.data);

    } catch (error) {
      // Handle error
    }
  };

  const handleEdit = (id) => {
  
    navigate(`/editProduct/${id}`);
  
  };

  const handleDelete = async (id) => {
    try {
       await axiosInstance.delete(`/products/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      console.log(users);
      toast.success('User deleted successfully!');
    } catch (error) {
      // Handle error
    }
  };

  const handleAddUser = async () => {
    navigate(`/addproduct`);
  };

  const currentUsers = users;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1 className="text-center my-4">All Products</h1>
      <Button variant="primary" onClick={handleAddUser}>
      Add product
      </Button>
      <Table striped bordered hover className="w-100">
  <thead>
    <tr>
      <th>#</th>
      <th>Image</th>
      <th>Name</th>
      <th>Price</th>
      <th>Average Rating</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
     {console.log(currentUsers)}
    {
     currentUsers.map((product, index) => (
        <tr key={product.id}>
        <td>{(currentPage - 1) * usersPerPage + index + 1}</td>
        <td><img src={product.imageCover} alt={product.name} width="50" height="50" /></td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>{product.averageRating}</td>
        <td>
          <Button variant="warning" onClick={() => handleEdit(product._id)}>
            Edit
          </Button>{" "}
          <ConfirmDeleteModal id={product.id} handleDelete={handleDelete} product={product} />
        </td>
      </tr>
    ))}
  </tbody>
</Table>

<Pagination>
  {totalUsers > 0 &&
    [...Array(Math.ceil(totalUsers / usersPerPage)).keys()].map(
      (number) => (
        <Pagination.Item
          key={number + 1}
          active={number + 1 === currentPage}
          onClick={() => paginate(number + 1)}
        >
          {number + 1}
        </Pagination.Item>
      )
    )}
</Pagination>
      
    </div>
  );
}

export default ProductsList

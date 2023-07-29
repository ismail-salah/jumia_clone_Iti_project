import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination } from 'react-bootstrap';
import axiosInstance from '../../axios/axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ConfirmDeleteModal = ({ id, handleDelete, user }) => {
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
        <Modal.Body>Are you sure you want to delete this user <b>{user.name}</b>? This will delete this user permanently. You cannot undo this action.</Modal.Body>
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

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersPerPage] = useState(15);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(
        `/users?page=${currentPage}&limit=${usersPerPage}`
      );
      console.log(response.data);
      if (Array.isArray(response.data.data)) {
        setUsers(response.data.data);
        setTotalUsers(response.data.totalUsers);
      } else {
        console.log('Error: response data is not an array');
      }
    } catch (error) {
      // Handle error
    }
  };

  const handleEdit = (id) => {
    navigate(`/edituser/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/users/${id}`);
      // setUsers(users.filter((user) => user.id !== id));
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      console.log(users);
      toast.success('User deleted successfully!');
    } catch (error) {
      // Handle error
    }
  };

  const handleAddUser = async () => {
    navigate(`/adduser`);
  };

  // Get current users
  const currentUsers = users;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1 className="text-center my-4">All Users</h1>
      <Button variant="primary" onClick={handleAddUser}>
        Add User
      </Button>
      <Table striped bordered hover className="w-100">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user._id}>
              <td>{(currentPage - 1) * usersPerPage + index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(user._id)}>
                  Edit
                </Button>{' '}
                <ConfirmDeleteModal id={user._id} handleDelete={handleDelete} user={user} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {[...Array(Math.ceil(totalUsers / usersPerPage)).keys()].map(
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

export default AllUsers;

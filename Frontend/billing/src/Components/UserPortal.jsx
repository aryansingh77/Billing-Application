import React, { useEffect } from 'react';
import "./LoginSignup.css";
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; 
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function UserPortal(props) {

  const [data, setData] = useState([]);
  const location = useLocation();
  const m=location.state.userEmail;
  const navigate = useNavigate();

  useEffect(() => {
    document.title = props.pageTitle;
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/getUserBills/${m}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [props.pageTitle,m]);

  const columns = [
    {
      name: 'Bill Id',
      selector: row => row.billId
    },
    {
      name: 'Bill Title',
      selector: row => row.billTitle
    },
    {
      name: 'User Email',
      selector: row => row.userEmail
    },
    {
      name: 'Bill Amount',
      selector: row => row.billAmount
    },
    {
      name: 'Generated Date',
      selector: row => row.billGenDate
    },
    {
      name: 'Due Date',
      selector: row => row.billDueDate
    },
    {
      name: 'Status',
      selector: row => row.status
    },
    {
      name: 'Pay Bill',
      selector: row => (
        <Button
          variant="success"
          onClick={() => handlePay(row)}
          disabled={row.status !== 'UNPAID'}
        >
          Pay
        </Button>
      ),
    },
  ];

  const handlePay = async (row) => {
    try {
      const token = localStorage.getItem('token');
  
      const response = await axios.put(`http://localhost:5000/api/pay/${row.billId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Update successful:', response.data); 
  
      toast.success('Payment Done!');
  
      const response2 = await axios.get(`http://localhost:5000/api/getUserBills/${m}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setData(response2.data);
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  };

  const handleLogout=()=>{
    const isConfirmed = window.confirm('Are you sure you want to Logout?');
    if (isConfirmed) {
      localStorage.removeItem('token');
      navigate('/');
      toast.success("Logged out successfully");
    } else {
      console.log('Logout canceled');
    }
  };
  

  return (
    <>
      <div className="mainHeading">Billing Application - User Portal</div>
      <Button variant="danger" onClick={() => handleLogout()}>Logout</Button>
      <div className="container">
        <DataTable columns={columns} data={data} fixedHeader></DataTable>
      </div>
    </>
  );
}

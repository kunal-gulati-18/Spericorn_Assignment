import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteItemTable } from '../redux/Actions/userAction'
import { useSelector, useDispatch } from 'react-redux';
import './css/Component2.css';

const Component2 = () => {

  const dispatch = useDispatch();
  var userData = useSelector(state => state.userDetails)

  //used to handle the delete functionality
  const handleDelete = (id) => {


    dispatch(deleteItemTable(id));
    alert('Record Deleted Successfully!!')
  }
  return (
    <>
      {/*Table to display records*/}
      <div className="component2" style={{ overflowX: "auto" }}>
        <table>
          <tr>
            <th>First Name</th>
            <th>Email</th>
            <th>Active/Inactive</th>
            <th>Edit</th>
            <th>Delete</th>


          </tr>

          {
            userData.length > 0 ? (
              userData.map(item => (
                <tr>
                  <td>
                    {item.firstName}
                  </td>
                  <td>
                    {item.email}
                  </td>
                  <td>
                    {item.active}
                  </td>
                  <td>
                    <Link className="edit_style" to={`/edit/${item.id}`}>Edit</Link>
                  </td>
                  <td>
                    <button className="delete_button" onClick={() => { handleDelete(item.id) }}>Delete</button>
                  </td>
                </tr>
              )).reverse()
            )
              : "No records"
          }

        </table>
      </div>
    </>
  )
}

export default Component2;
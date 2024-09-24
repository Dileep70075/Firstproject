// import React, { useState, useEffect } from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Swal from 'sweetalert2'

// const columns = [
//   { id: 'name', label: 'Employee Name', minWidth: 150 },
//   { id: 'email', label: 'Email', minWidth: 130 },

//   { id: 'starting_date', label: 'Leave starting date', minWidth: 120 },
//   { id: 'ending_date', label: 'Leave Ending date', minWidth: 1 },
// ];

// // function createData(name, email, password){
// //   return { name, email, password };
// // }

// export default function Addleave() {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [rows, setRows] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:3001/leave')
//       .then((response) => response.json())
//       .then((data) => {
//         // Check if data is an array or if it's an object with an array property
//         const leaveArray = Array.isArray(data) ? data : data.leave || [];
//         setRows(leaveArray.map((leave=>({...leave,id:leave._id}))));
//         // setRows(leaveArray.map((leave) => createData(leave.name, leave.email, leave.starting_date,leave.ending_date)));
//       })
//       .catch((error) => console.error('Error fetching data:', error));
//   }, []);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const handleDelete=async (index,leaveid)=>{
//     try {
//       console.log("here is id of delete", leaveid);
//       // validate if employee is a non-empty string
//       if(!leaveid || typeof leaveid!=='string'){
//         Swal.fire({
//           icon:"error",
//           title:"Error",
//           text:'invalid_leave_Id'
//         });
//         return;
//       } 
//       // deleting data
//       const response= await fetch(`http://localhost:3001/leave/${leaveid}`,{method:'DELETE',})
//       if(!response.ok){
//         const data = await response.json();
//         Swal.fire({
//           icon:"error",
//           title:"Error",
//           text:data.message || 'failed to delete data'
//         });
//       }
//       //if successfull delete
//       const updateRows=[...rows];
//       updateRows.splice(page*rowsPerPage+index,1);
//       setRows(updateRows);
//       Swal.fire({
//         icon:"success",
//         title:"Success",
//         text:'leave deleted successfully'
//       });
//     } catch (error) {
//       console.error('failed to delete leave',error);
//       Swal.fire({
//         icon:"error",
//         title:"Error",
//         text:'failed to delete'
//       });
//     }

//   }

//   const handleUpdate = (index) => {
//     // Here you can implement the logic to update the leave data
//     // For example, you can show a modal for editing or send a request to the server
//     console.log('Update leave at index:', index);
//   };



//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align="left" // Change alignment as needed
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row, index) => (
//                 <TableRow hover role="checkbox" tabIndex={-1} key={index}>
//                   {columns.map((column) => (
//                     <TableCell key={column.id} align="left">
//                       {row[column.id]}
//                     </TableCell>
//                   ))}
//                   <TableCell>
//                     <DeleteIcon onClick={()=>handleDelete(index,row._id)}/>
//                   </TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }



import { useState } from 'react';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  { id: 'name', label: 'Employee Name', minWidth: 150 },
  { id: 'email', label: 'Email', minWidth: 130 },
  { id: 'starting_date', label: 'Leave starting date', minWidth: 120 },
   { id: 'ending_date', label: 'Leave Ending date', minWidth: 1 },
];
export default function Addleave() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align='left'
                   style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => (
                    
                        <TableCell key={column.id} align="left">
                          {row[column.id]}
                        </TableCell>   
              ))}
              <TableCell>
              {/* <DeleteIcon onClick={()=>handleDelete(index,row._id)}/> */}
              </TableCell>
                  </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

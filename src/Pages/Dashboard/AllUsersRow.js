import { Button, TableCell, TableRow, Typography } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";

const AllUsersRow = ({ user, index, refetch }) => {
  const { _id, email, role } = user;

  const makeAdmin = () => {
    const confirmed = window.confirm("Are you sure you want to the user admin");
    if (!confirmed) {
      return;
    }
    const url = `http://localhost:5001/users/admin/${email}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => {
        if (response.status===403) {
            toast.error("Your don't have permission")
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        if (result.modifiedCount > 0) {
          toast.success("Successfully made an admin");
          refetch();
        }
      });
  };
  const handleUserDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want Delete the user");
    if (!confirmed) {
      return;
    }
    const url = `http://localhost:5001/users/${id}`;
    fetch(url, {
      method: "DELETE",
      headers: { "content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.deletedCount > 0) {
          toast.info("The has been deleted!");
          refetch();
        } else {
          toast.error("Failed to delete!");
        }
      });
  };
  return (
    <TableRow
      key={_id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="center">{index + 1}</TableCell>
      <TableCell align="left">{email}</TableCell>
      <TableCell align="center">
        {role === "admin" ? (
          <Typography variant="button" color="secondary">
            Admin
          </Typography>
        ) : (
          <Button
            onClick={makeAdmin}
            variant="contained"
            color="secondary"
            size="small"
          >
            Make Admin
          </Button>
        )}
      </TableCell>
      <TableCell align="center">
        <Button
          onClick={() => handleUserDelete(_id)}
          variant="outlined"
          size="small"
          color="error"
          disabled={user.paid}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default AllUsersRow;

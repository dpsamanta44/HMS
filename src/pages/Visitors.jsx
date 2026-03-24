import { useState } from "react";
import Layout from "../components/Layout";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";

import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
} from "@mui/material";

const Visitors = () => {
  const { visitors = [], setVisitors, students = [] } = useData();
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    studentName: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleApply = () => {
    if (!form.name || !form.phone || !form.studentName || !form.date) return;

    const newVisitor = {
      ...form,
      status: "Pending",
    };

    setVisitors([...(visitors || []), newVisitor]);

    setForm({
      name: "",
      phone: "",
      studentName: "",
      date: "",
    });
  };

  const handleApprove = (index) => {
    const updated = visitors.map((v, i) =>
      i === index ? { ...v, status: "Approved" } : v
    );
    setVisitors(updated);
  };

  const handleReject = (index) => {
    const updated = visitors.map((v, i) =>
      i === index ? { ...v, status: "Rejected" } : v
    );
    setVisitors(updated);
  };

  return (
    <Layout>
      <Typography variant="h4" fontWeight="bold">
        Visitor Management
      </Typography>

      {/* APPLY FORM (PUBLIC / STUDENT) */}
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="h6">Apply for Visit</Typography>

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField label="Visitor Name" name="name" value={form.name} onChange={handleChange} />
          <TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} />

          <TextField
            select
            label="Student"
            name="studentName"
            value={form.studentName}
            onChange={handleChange}
          >
            {students.map((s, i) => (
              <MenuItem key={i} value={s.name}>
                {s.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          <Button variant="contained" onClick={handleApply}>
            Apply
          </Button>
        </Box>
      </Paper>

      {/* TABLE */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6">Visitor Requests</Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Student</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visitors.map((v, index) => (
              <TableRow key={index}>
                <TableCell>{v.name}</TableCell>
                <TableCell>{v.phone}</TableCell>
                <TableCell>{v.studentName}</TableCell>
                <TableCell>{v.date}</TableCell>

                <TableCell>{v.status}</TableCell>

                <TableCell>
                  {(user?.role === "admin" || user?.role === "staff") &&
                    v.status === "Pending" && (
                      <>
                        <Button onClick={() => handleApprove(index)}>
                          Approve
                        </Button>
                        <Button color="error" onClick={() => handleReject(index)}>
                          Reject
                        </Button>
                      </>
                    )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Layout>
  );
};

export default Visitors;

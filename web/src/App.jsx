import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5000";

function App() {
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    course: "",
    batch: "",
    rollNum: "",
    age: "",
  });

  // Get Students
  const getStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/`);
      setStudents(response.data.message);
    } catch (error) {
      console.log("GET ERROR:", error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  // Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add / Update Student
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `${API_URL}/students/${editingId}`,
          formData
        );

        alert("Student Updated Successfully");
      } else {
        await axios.post(`${API_URL}/student`, formData);

        alert("Student Added Successfully");
      }

      setFormData({
        firstName: "",
        lastName: "",
        course: "",
        batch: "",
        rollNum: "",
        age: "",
      });

      setEditingId(null);
      getStudents();

    } catch (error) {
      console.log("SUBMIT ERROR:", error);
      alert("Something went wrong");
    }
  };

  // Edit Student
  const handleEdit = (student) => {
    setEditingId(student.id);

    setFormData({
      firstName: student.first_name,
      lastName: student.last_name,
      course: student.course,
      batch: student.batch,
      rollNum: student.roll_number,
      age: student.age,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete Student
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/students/${id}`);

      alert("Student Deleted Successfully");

      getStudents();

    } catch (error) {
      console.log("DELETE ERROR:", error);
    }
  };

  // Cancel Edit
  const cancelEdit = () => {
    setEditingId(null);

    setFormData({
      firstName: "",
      lastName: "",
      course: "",
      batch: "",
      rollNum: "",
      age: "",
    });
  };

  return (
    <div className="app">

      <header className="header">
        <div>
          <p className="small-title">STUDENT MANAGEMENT</p>
          <h1>Student Dashboard</h1>
        </div>

        <button className="refresh-btn" onClick={getStudents}>
          ↻ Refresh
        </button>
      </header>

      <main className="container">

        {/* Add Student */}

        <section className="card form-card">

          <div className="section-heading">
            <div className="icon-box">
              {editingId ? "✎" : "+"}
            </div>

            <div>
              <h2>
                {editingId ? "Edit Student" : "Add New Student"}
              </h2>

              <p>
                {editingId
                  ? "Update student information"
                  : "Enter student details below"}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              <div className="input-group">
                <label>First Name</label>

                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Last Name</label>

                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Course</label>

                <input
                  type="text"
                  name="course"
                  placeholder="e.g. Web Development"
                  value={formData.course}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Batch</label>

                <input
                  type="text"
                  name="batch"
                  placeholder="e.g. Batch 12"
                  value={formData.batch}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Roll Number</label>

                <input
                  type="text"
                  name="rollNum"
                  placeholder="Enter roll number"
                  value={formData.rollNum}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Age</label>

                <input
                  type="number"
                  name="age"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="form-actions">

              {editingId && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              )}

              <button type="submit" className="submit-btn">
                {editingId ? "Update Student" : "Add Student"}
              </button>

            </div>

          </form>

        </section>


        {/* Students */}

        <section className="card students-card">

          <div className="table-header">

            <div>
              <h2>All Students</h2>
              <p>Manage your registered students</p>
            </div>

            <div className="student-count">
              {students.length} Students
            </div>

          </div>

          {students.length === 0 ? (

            <div className="empty">
              <div className="empty-icon">◎</div>

              <h3>No Students Found</h3>

              <p>
                Add your first student using the form above.
              </p>
            </div>

          ) : (

            <div className="table-wrapper">

              <table>

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Student</th>
                    <th>Course</th>
                    <th>Batch</th>
                    <th>Roll Number</th>
                    <th>Age</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {students.map((student) => (

                    <tr key={student.id}>

                      <td>
                        #{student.id}
                      </td>

                      <td>
                        <div className="student-info">

                          <div className="avatar">
                            {student.first_name?.charAt(0)}
                            {student.last_name?.charAt(0)}
                          </div>

                          <div>
                            <strong>
                              {student.first_name}{" "}
                              {student.last_name}
                            </strong>

                            <small>Student</small>
                          </div>

                        </div>
                      </td>

                      <td>
                        {student.course}
                      </td>

                      <td>
                        <span className="batch-badge">
                          {student.batch}
                        </span>
                      </td>

                      <td>
                        {student.roll_number}
                      </td>

                      <td>
                        {student.age}
                      </td>

                      <td>

                        <div className="actions">

                          <button
                            className="edit-btn"
                            onClick={() =>
                              handleEdit(student)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(student.id)
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>

      <footer>
        Student Management System • React + Express + PostgreSQL
      </footer>

    </div>
  );
}

export default App;
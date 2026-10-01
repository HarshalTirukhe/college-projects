import { useEffect, useState } from "react";

function App() {
  const [applications, setApplications] = useState([]);

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    status: "Applied",
    appliedDate: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const response = await fetch(
      "http://localhost:5000/api/applications"
    );

    const data = await response.json();

    setApplications(data);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (editingId) {
      await fetch(
        `http://localhost:5000/api/applications/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      setEditingId(null);
    } else {
      await fetch(
        "http://localhost:5000/api/applications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
    }

    resetForm();
    fetchApplications();
  };

  const handleEdit = (application) => {
    setEditingId(application._id);

    setFormData({
      company: application.company,
      position: application.position,
      location: application.location,
      status: application.status,
      appliedDate: application.appliedDate,
    });
  };

  const handleDelete = async (id) => {
    await fetch(
      `http://localhost:5000/api/applications/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchApplications();
  };

  const resetForm = () => {
    setFormData({
      company: "",
      position: "",
      location: "",
      status: "Applied",
      appliedDate: "",
    });
  };

  return (
    <div>
      <h1>Job Application Tracker</h1>

      <h2>{editingId ? "Edit Application" : "Add Application"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
        />

        <input
          name="position"
          placeholder="Position"
          value={formData.position}
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Selected">Selected</option>
        </select>

        <input
          type="date"
          name="appliedDate"
          value={formData.appliedDate}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId ? "Update Application" : "Add Application"}
        </button>

        {editingId && (
          <button type="button" onClick={() => {
            setEditingId(null);
            resetForm();
          }}>
            Cancel
          </button>
        )}
      </form>

      <h2>Applications</h2>

      {applications.map((application) => (
        <div key={application._id}>
          <h3>{application.company}</h3>
          <p>{application.position}</p>
          <p>{application.location}</p>
          <p>{application.status}</p>
          <p>{application.appliedDate}</p>

          <button onClick={() => handleEdit(application)}>
            Edit
          </button>

          <button onClick={() => handleDelete(application._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
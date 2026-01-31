import React, { useEffect, useState } from "react";
import {
  getApplications,
  updateApplicationStatus,
} from "../services/appliedJobs";
import Modal from "../components/Modal";
import "./EmployerApplication.css";

const EmployerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedApp, setSelectedApp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const data = await getApplications();
        const normalizedData = data.map((app) => ({
          ...app,
          status: app.status || "Pending",
        }));
        setApplications(normalizedData);
      } catch (error) {
        console.error("Error loading applications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  const handleViewCv = (application) => {
    console.log("Opening CV for:", application.userGmail);
    setSelectedApp(application);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApp(null);
  };

  const handleStatusUpdate = async (appId, newStatus) => {
    try {
      await updateApplicationStatus(appId, newStatus);

      setApplications((prevApps) =>
        prevApps.map((app) =>
          app.id === appId ? { ...app, status: newStatus } : app,
        ),
      );
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Error updating status");
    }
  };

  if (loading)
    return <div className="employer-container">Loading applications...</div>;

  return (
    <div className="employer-container">
      <h2 className="page-title">Received Applications</h2>

      <table className="app-table">
        <thead>
          <tr>
            <th>Applicant</th>
            <th>Job Title</th>
            <th>Company</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id || Math.random()}>
              <td>
                {app.fullName ? (
                  <div>
                    <div style={{ fontWeight: "bold" }}>{app.fullName}</div>
                    <div style={{ fontSize: "0.85rem", color: "#666" }}>
                      {app.userGmail}
                    </div>
                  </div>
                ) : (
                  app.userGmail
                )}
              </td>
              <td>{app.jobTitle}</td>
              <td>{app.company}</td>

              <td>
                <span className={`status-badge ${app.status.toLowerCase()}`}>
                  {app.status}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    className="action-btn btn-view"
                    onClick={() => handleViewCv(app)}
                  >
                    View CV
                  </button>

                  <button
                    className="action-btn btn-accept"
                    onClick={() => handleStatusUpdate(app.id, "Accepted")}
                    disabled={app.status === "Accepted"}
                  >
                    Accept
                  </button>
                  <button
                    className="action-btn btn-reject"
                    onClick={() => handleStatusUpdate(app.id, "Rejected")}
                    disabled={app.status === "Rejected"}
                  >
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Applicant Details"
      >
        {selectedApp ? (
          <div>
            <div
              style={{
                marginBottom: "20px",
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                <div>
                  <p>
                    <strong>Name:</strong> {selectedApp.fullName || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedApp.userGmail}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedApp.phone || "N/A"}
                  </p>
                </div>
                <div style={{ textAlign: "right", color: "#555" }}>
                  <p>
                    <strong>Job:</strong> {selectedApp.jobTitle}
                  </p>
                  <p>
                    <strong>Applied:</strong>{" "}
                    {selectedApp.appliedAt
                      ? new Date(selectedApp.appliedAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <h3>CV / Cover Letter:</h3>
            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "15px",
                borderRadius: "8px",
                whiteSpace: "pre-wrap",
                minHeight: "150px",
                border: "1px solid #dee2e6",
                maxHeight: "400px",
                overflowY: "auto",
                fontFamily: "monospace",
                fontSize: "14px",
              }}
            >
              {selectedApp.cv
                ? selectedApp.cv
                : "No CV provided for this application."}
            </div>

            <div style={{ marginTop: "20px", textAlign: "right" }}>
              <button
                onClick={closeModal}
                style={{
                  padding: "8px 16px",
                  background: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </div>
  );
};

export default EmployerApplications;

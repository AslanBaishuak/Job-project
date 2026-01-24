import React, { useEffect, useState } from "react";
import { getApplications, updateApplicationStatus } from "../services/appliedJobs";
import "./EmployerApplication.css"; 

const EmployerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const data = await getApplications();
        const normalizedData = data.map(app => ({
          ...app,
          status: app.status || "Pending"
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

  const handleStatusUpdate = async (appId, newStatus) => {
    try {
      await updateApplicationStatus(appId, newStatus);
      
      setApplications((prevApps) =>
        prevApps.map((app) =>
          app.id === appId ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Error updating status");
    }
  };

  if (loading) return <div className="employer-container">Loading applications...</div>;

  return (
    <div className="employer-container">
      <h2 className="page-title">Received Applications</h2>
      
      <table className="app-table">
        <thead>
          <tr>
            <th>Applicant Email</th>
            <th>Job Title</th>
            <th>Company</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id || Math.random()}>
              <td>{app.userGmail}</td>
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
    </div>
  );
};

export default EmployerApplications;
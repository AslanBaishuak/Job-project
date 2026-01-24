import { BASE_URL } from "./api";

// Fetch all applications
export const getApplications = async () => {
    const res = await fetch(BASE_URL + "/appliedJobs", {
        method: "GET", 
        headers: {
            "Content-type": "application/json",
        }
    });

    if (!res.ok) throw new Error("failed to fetch applications");

    return res.json();
}

// Apply to a new job
export const applyToJob = async (applicationData) => {
    const res = await fetch(BASE_URL + "/appliedJobs", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
    }); 
    return res.json();
}

// NEW: Update status (Accept/Reject)
export const updateApplicationStatus = async (id, status) => {
    const res = await fetch(`${BASE_URL}/appliedJobs/${id}`, {
        method: "PATCH", // PATCH updates only the specific fields (status)
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: status }),
    });

    if (!res.ok) throw new Error("Failed to update application status");
    
    return res.json();
};
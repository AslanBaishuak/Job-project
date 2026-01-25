import { BASE_URL } from "./api";

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

export const updateApplicationStatus = async (id, status) => {
    const res = await fetch(`${BASE_URL}/appliedJobs/${id}`, {
        method: "PATCH", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: status }),
    });

    if (!res.ok) throw new Error("Failed to update application status");
    
    return res.json();
};
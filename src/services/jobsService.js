import { BASE_URL } from "./api";

export async function getJobs() {
    const res = await fetch(BASE_URL + "/jobs");
    return res.json();
}

export async function createJob(job) {
    const res = await fetch(BASE_URL + "/jobs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
    }); 
    return res.json();

}

export async function getJobById(id) {
    const res = await fetch(BASE_URL + `/jobs/${id}`);
    return res.json();
}


export async function deleteJob(id) {
    const res = await fetch(BASE_URL + `/jobs/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.json();
}

export async function updateJob(job) {
    const res = await fetch(BASE_URL + `/jobs/${job.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
    });
    return res.json();
}
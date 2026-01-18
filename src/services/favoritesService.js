import { BASE_URL } from "./api";

export async function getFavorite() {
    const res = await fetch(BASE_URL + "/favorites");
    return res.json();
}

export async function addFavorite(job) {
    const res = await fetch(BASE_URL + "/favorites", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
    }); 
    return res.json();
}

export async function removeFavorite(id) {
    const res = await fetch(BASE_URL + `/favorites/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.json();
}
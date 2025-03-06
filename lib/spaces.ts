import axios from "axios";

export async function fetchData() {
    const res = await axios.get("/api/space/fetchSpaces")
    return res.data;
}
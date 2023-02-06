import axios from "axios";
import { API_URL } from "./constants";




const login = async ({ username, password }) => {

    const response = await axios.get(`${API_URL}/users`);
    const user = response.data.find((user) => user.password === password && user.username === username);

    if (user) {
        return user;
    }

    throw new Error('Bad credentials');
}

const getCurrentUser = async (username) => {
    const response = await axios.get(`${API_URL}/users`);
    const user = response.data.find((user) => user.username === username);

    if (user) {
        return user;
    }

    throw new Error('No user found');
}

export { login, getCurrentUser };

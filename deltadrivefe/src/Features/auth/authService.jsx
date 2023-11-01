import axios from "axios";

const loginUser = async (loginDto) => {
    console.log(`${process.env.REACT_APP_API_URL}/api/Passengers/login`);
    console.log(loginDto);
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/Passengers/login`,
            loginDto
        );
        console.log("Posle response-a");
        return res.data;
    } catch (error) {
        console.error("An error occurred:", error);
        throw error; // Rethrow the error to propagate it to the caller
    }
};

const authService = {
    loginUser,
};
export default authService;
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email address is required")
        .email("Email address is not valid"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
});

export function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(loginSchema),
    });
    const navigate = useNavigate();

    const handleLogin = async (data) => {
        console.log(data);
        // reset();
        try {
            const response = await axios.post("https://localhost:7231/api/Passengers/Login", data);
            // console.log("API Response:", response.data);
            console.warn("Token: "+ response.data.token);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("id", response.data.id);
            reset();
            navigate("/");
        } catch (error) {
            console.error("API Error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <div>
                <label className="form_label" id="email">Email</label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    {...register("email")}
                    placeholder="Enter your email address"
                />
                <div style={{ color: "red" }}>{errors.email?.message}</div>
            </div>
            <div>
                <label className="form_label" id="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    {...register("password")}
                    placeholder="Enter your password"
                />
                <div style={{ color: "red" }}>{errors.password?.message}</div>
            </div>
            <div>
                <button type="submit" className="btn btn-dark">Login</button>
            </div>
        </form>
    );
}

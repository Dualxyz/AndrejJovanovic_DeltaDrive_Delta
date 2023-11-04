import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {login} from "../../Service/AuthService";

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
            const response = await login(data);
            reset();
            navigate("/");
            window.location.reload();
        } catch (error) {
            console.error("API Error:", error);
        }
    };

    return (
        <div>
            <section className="text-center text-lg-start">
                <div className="container py-4">
                    <div className="row g-0 align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <div className="card cascading-right" style={{background: "hsla(0, 0%, 100%, 0.55)", backdropFilter: 'blur(30px)'}}>
                                <div className="card-body p-5 shadow-5 text-center">
                                    <h2 className="fw-bold mb-5">Sign In</h2>
                                    <form onSubmit={handleSubmit(handleLogin)} className="login__form">
                                        <div>
                                            <label htmlFor="email" className="form_label">Email</label>
                                            <input type="text" id="email" className="form-control" name="email" placeholder="Enter your email" {...register("email")}/>
                                            {errors.email && <div className="error_message">{errors.email.message}</div>}
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="form_label">Password</label>
                                            <input type="password" id="password" className="form-control" name="password" placeholder="Enter your password" {...register("password")}/>
                                            {errors.password && <div className="error_message">{errors.password.message}</div>}
                                        </div>
                                        <div>
                                            <button type="submit" className="btn btn-dark">Login</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <img src="https://unblast.com/wp-content/uploads/2020/09/Car-Rent-Vector-Illustration.jpg"  style={{width: "100%", maxWidth: '1200px'}}  className="w-100 rounded-4 shadow-4"
                                 alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

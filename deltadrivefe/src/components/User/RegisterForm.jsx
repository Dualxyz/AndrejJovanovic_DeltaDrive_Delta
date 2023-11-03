import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { registerUser } from "../../Service/AuthService";

const registerSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
        .required("Email address is required")
        .email("Email address is not valid"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
    birthday: Yup.date()
        .nullable()
        .typeError("Birthday is required")
        .max(new Date(), "Birthdate must be in the past"),
});

export function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const handleRegister = async (data) => {
        console.log(data);
        // reset();
        try {
            const response = await registerUser(data);
            reset();
        } catch (error) {
            console.error("API Error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleRegister)}>
            <div>
                <label className="form_label" id="firstName">First name</label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    {...register("firstName")}
                    placeholder="Enter your first name"
                />
                <div style={{ color: "red" }}>{errors.firstName?.message}</div>
            </div>
            <div>
                <label className="form_label" id="lastName">Last name</label>
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    {...register("lastName")}
                    placeholder="Enter your last name"
                />
                <div style={{ color: "red" }}>{errors.lastName?.message}</div>
            </div>
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
                <label className="form_label" id="birthday">Birthday</label>
                <input
                    type="date"
                    name="birthday"
                    id="birthday"
                    {...register("birthday")}
                />
                <div style={{ color: "red" }}>{errors.birthday?.message}</div>
            </div>
            <div>
                <button type="submit" className="btn btn-dark">Register</button>
            </div>
        </form>
    );
}

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
        // <form onSubmit={handleSubmit(handleRegister)}>
        //     <div>
        //         <label className="form_label" id="firstName">First name</label>
        //         <input
        //             type="text"
        //             name="firstName"
        //             id="firstName"
        //             {...register("firstName")}
        //             placeholder="Enter your first name"
        //         />
        //         <div style={{ color: "red" }}>{errors.firstName?.message}</div>
        //     </div>
        //     <div>
        //         <label className="form_label" id="lastName">Last name</label>
        //         <input
        //             type="text"
        //             name="lastName"
        //             id="lastName"
        //             {...register("lastName")}
        //             placeholder="Enter your last name"
        //         />
        //         <div style={{ color: "red" }}>{errors.lastName?.message}</div>
        //     </div>
        //     <div>
        //         <label className="form_label" id="email">Email</label>
        //         <input
        //             type="text"
        //             name="email"
        //             id="email"
        //             {...register("email")}
        //             placeholder="Enter your email address"
        //         />
        //         <div style={{ color: "red" }}>{errors.email?.message}</div>
        //     </div>
        //     <div>
        //         <label className="form_label" id="password">Password</label>
        //         <input
        //             type="password"
        //             name="password"
        //             id="password"
        //             {...register("password")}
        //             placeholder="Enter your password"
        //         />
        //         <div style={{ color: "red" }}>{errors.password?.message}</div>
        //     </div>
        //     <div>
        //         <label className="form_label" id="birthday">Birthday</label>
        //         <input
        //             type="date"
        //             name="birthday"
        //             id="birthday"
        //             {...register("birthday")}
        //         />
        //         <div style={{ color: "red" }}>{errors.birthday?.message}</div>
        //     </div>
        //     <div>
        //         <button type="submit" className="btn btn-dark">Register</button>
        //     </div>
        // </form>

        <section className="text-center text-lg-start">
            {/*<style>*/}
            {/*    .cascading-right {*/}
            {/*    margin-right: -50px;*/}
            {/*}*/}
            {/*    @media (max-width: 991.98px) {*/}
            {/*    .cascading-right {*/}
            {/*    margin-right: 0;*/}
            {/*}*/}
            {/*}*/}
            {/*</style>*/}
            <div className="container py-4">
                <div className="row g-0 align-items-center">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <div className="card cascading-right" style={{background: "hsla(0, 0%, 100%, 0.55)", backdropFilter: 'blur(30px)'}}>
                            <div className="card-body p-5 shadow-5 text-center">
                                <h2 className="fw-bold mb-5">Sign Up</h2>
                                <form onSubmit={handleSubmit(handleRegister)}>
                                    <div>
                                        <label className="form_label" id="firstName">First name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            className="form-control"
                                            {...register("firstName")}
                                            placeholder="Enter your first name"
                                        />
                                        <div>{errors.firstName?.message}</div>
                                    </div>
                                    <div>
                                        <label className="form_label" id="lastName">Last name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            className="form-control"
                                            {...register("lastName")}
                                            placeholder="Enter your last name"
                                        />
                                        <div>{errors.lastName?.message}</div>
                                    </div>
                                    <div>
                                        <label className="form_label" id="email">Email</label>
                                        <input
                                            type="text"
                                            name="email"
                                            id="email"
                                            className="form-control"
                                            {...register("email")}
                                            placeholder="Enter your email address"
                                        />
                                        <div>{errors.email?.message}</div>
                                    </div>
                                    <div>
                                        <label className="form_label" id="password">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            className="form-control"
                                            {...register("password")}
                                            placeholder="Enter your password"
                                        />
                                        <div>{errors.password?.message}</div>
                                    </div>
                                    <div>
                                        <label className="form_label" id="birthday">Birthday</label>
                                        <input
                                            type="date"
                                            name="birthday"
                                            id="birthday"
                                            className="form-control"
                                            {...register("birthday")}
                                        />
                                        <div>{errors.birthday?.message}</div>
                                    </div>
                                    <div>
                                        <button type="submit" className="btn btn-dark">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <img src="https://unblast.com/wp-content/uploads/2020/09/Car-Rent-Vector-Illustration.jpg" style={{width: "100%", maxWidth: '1200px'}} className="w-100 rounded-4 shadow-4"
                             alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
}

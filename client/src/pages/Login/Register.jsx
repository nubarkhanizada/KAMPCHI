import "./loginregister.scss";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import services from "../../api/api";
import toast from "react-hot-toast";

const Register = () => {
    const navigate = useNavigate();
    const { handleSubmit, register, formState: { errors } } = useForm();

    const registerHandler = async (customer) => {
        try {
            await services.authAPI.registerCustomer(customer);
            navigate('/auth/login');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error("This email is already registered.");
            } else {
                toast.error("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <div className="container">
            <div className="formSection">
                <div className="loginForm">
                    <div className="createNewUser">REGISTER</div>
                    <form onSubmit={handleSubmit(registerHandler)} autoComplete="on">
                        <input
                            type="text"
                            {...register('fullname', { required: true })}
                            placeholder="Fullname"
                        />
                        {errors.fullname && <p style={{ color: "red", fontSize: "12px" }}>Fullname is required.</p>}

                        <input
                            type="email"
                            {...register('email', {
                                required: "Email is required.",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address."
                                }
                            })}
                            placeholder="Email"
                        />
                        {errors.email && <p style={{ color: "red", fontSize: "12px" }}>{errors.email.message}</p>}

                        <input
                            type="password"
                            {...register('password', {
                                required: 'Password is required.',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters long.'
                                },
                                pattern: {
                                    value: /^(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                                    message: 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and no spaces.'
                                }
                            })}
                            placeholder="Password"
                        />
                        {errors.password && <p style={{ color: "red", fontSize: "12px" }}>{errors.password.message}</p>}
                        
                        <input type="submit" value="REGISTER" />
                        <p className='haveAnAccount'>Have an account?<Link to={'/auth/login'}>Log in</Link></p>
                        <p style={{ fontSize: "12px", fontWeight: "500", marginLeft: "33px", marginTop: "5%" }} ><Link className="business" to={'/business'}>If you want to sell on our site, register as a business partner.</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
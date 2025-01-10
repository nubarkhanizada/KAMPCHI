import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import services from '../../api/api';
import toast from 'react-hot-toast';

const SellerRegister = () => {
    const navigate = useNavigate();
    const { handleSubmit, register, formState: { errors } } = useForm();

    const registerHandler = async (seller) => {
        seller.username = seller.username.toLowerCase();
        try {
            await services.authAPI.registerSeller(seller);
            navigate('/auth/login');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                // Check for specific error messages
                const { error: errorMsg } = error.response.data;
                if (errorMsg === "Email already registered.") {
                    toast.error("This email is already registered.");
                } else if (errorMsg === "Username already taken.") {
                    toast.error("This username is already taken.");
                } else {
                    toast.error("An error occurred. Please try again later.");
                }
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
                            placeholder="Business Name"
                        />
                        {errors.fullname && <p style={{ color: "red", fontSize: "12px" }}>Business Name is required.</p>}

                        <input
                            type="text"
                            {...register('username', {
                                required: true,
                                pattern: {
                                    value: /^[a-zA-Z0-9_.]+$/,
                                    message: "Username is required and must only contain English letters, numbers, underscores (_), and periods (.)."
                                }
                            })}
                            placeholder="Username"
                        />
                        {errors.username && <p style={{ color: "red", fontSize: "12px" }}>{errors.username.message}</p>}

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
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SellerRegister
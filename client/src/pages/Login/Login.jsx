import "./loginregister.scss";
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import services from "../../api/api";
import toast from 'react-hot-toast';
import { UserContext } from "../../contexts/UserContext";

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { setUser, updateToken } = useContext(UserContext);

    // Base64-url decode function
    const base64UrlDecode = (base64Url) => {
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return atob(base64);
    };

    // JWT decode function
    const decodeJWT = (token) => {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid JWT');
        }
        return JSON.parse(base64UrlDecode(parts[1]));
    };

    const loginHandler = async (user) => {
        try {
            const response = await services.authAPI.loginUser(user);

            if (response && response.data && response.data.token) {
                localStorage.setItem("token", response.data.token);
                updateToken(response.data.token);
                const token = localStorage.getItem("token");
                const userData = decodeJWT(token);
                setUser(userData);
                const userRoleId = userData.userRoleId;

                if (userRoleId === 3) {
                    navigate('/business/seller');
                }
                else if (userRoleId === 2) {
                    navigate('/business/guide');
                }
                else if (userRoleId === 1) {
                    navigate('/');
                }

            } else {
                toast.error("Login failed: No data returned from server.");
            }
        }
        catch (error) {
            if (error.response) {
                switch (error.response.status) {
                    case 404:
                        toast.error("User not found.");
                        break;
                    case 401:
                        toast.error("Incorrect password.");
                        break;
                    default:
                        toast.error("Login failed: " + (error.response.data || "An unexpected error occurred."));
                        break;
                }
            } else {
                toast.error("An unexpected error occurred.");
            }
            console.log(error);
        }
    };

    return (
        <div className="container">
            <div className="formSection">
                <div className="loginForm">
                    <div className="createNewUser">LOGIN</div>
                    <form onSubmit={handleSubmit(loginHandler)} autoComplete="on">
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required.' })}
                            placeholder="Email"
                            autoComplete="email"
                        />
                        {errors.email && <p className="error" style={{ color: "red", fontSize: "12px" }}>{errors.email.message}</p>}
                        <input
                            type="password"
                            {...register('password', { required: 'Password is required.' })}
                            placeholder="Password"
                            autoComplete="current-password"
                        />
                        {errors.password && <p className="error" style={{ color: "red", fontSize: "12px" }}>{errors.password.message}</p>}
                        <input type="submit" value="LOG IN" />
                        <p className='haveAnAccount'>Don't have an account?<Link to={'/auth/register'}>Register</Link></p>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Login;

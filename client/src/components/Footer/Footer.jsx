import React, { useState } from 'react'
import "./footer.scss";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import { Link } from "react-router-dom";
import { CiInstagram, CiYoutube, CiLinkedin, CiLocationArrow1, CiPhone, CiMail } from "react-icons/ci";
import { PiWhatsappLogoLight } from "react-icons/pi";
import { HiArrowLongRight } from "react-icons/hi2";

const Footer = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleInputChange = (e) => {
        setEmail(e.target.value);
        setError('');
    };

    const handleButtonClick = () => {
        if (!email) {
            setError('This field cannot be left blank.');
        }
        else if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
        }
        else {
            setError('');
        }
    }

    return (
        <footer>
            <div className="container">
                <div className="footerAll">
                    <div className="footerTop">
                        <div className="vision">
                            <Link className='logo' to={"/"}><Logo /></Link>
                            <p>Explore where nature and camping enthusiasts unite! Find everything you need for an unforgettable outdoor adventure, from top-notch camping gear to exciting tours. This is your ultimate destination.</p>
                            <div className="socialMedia">
                                <h6>Get Social</h6>
                                <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer"><CiInstagram /></a>
                                <a href="https://www.youtube.com/yourprofile" target="_blank" rel="noopener noreferrer"><CiYoutube style={{ fontSize: "px", marginTop: "2.2px" }} /></a>
                                <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer"><CiLinkedin /></a>
                            </div>
                        </div>
                        <div className="contact">
                            <h6>Contact</h6>
                            <a href="https://www.google.com/maps/place/Bak%C4%B1/@40.394737,49.6901489,11z/data=!3m1!4b1!4m6!3m5!1s0x40307d6bd6211cf9:0x343f6b5e7ae56c6b!8m2!3d40.4092617!4d49.8670924!16zL20vMDFnZjU?entry=ttu" rel="noopener noreferrer"><CiLocationArrow1 /><span>Baku, Azerbaijan</span></a>
                            <a href="tel:+994777777777" rel="noopener noreferrer"><CiPhone /><span>+994777777777</span></a>
                            <a href="https://wa.me/+994777777777" rel="noopener noreferrer"><PiWhatsappLogoLight /><span>WhatsApp</span></a>
                            <a href="mailto:support@kampchi.com" rel="noopener noreferrer"><CiMail /><span>support@kampchi.com</span></a>
                        </div>
                        <div className="links">
                            <h6>Links</h6>
                            <Link to={"/"}>Home</Link>
                            <Link to={"/about#about"}>About Us</Link>
                            <Link to={"/blogs"}>Blogs</Link>
                            <Link to={"/about#careers"}>Careers</Link>
                        </div>
                        <div className="support">
                            <h6>Support</h6>
                            <Link to={"/about#team"}>Meet Our Team</Link>
                            <Link to={"/support"}>Item Support</Link>
                            <Link to={"/form"}>Contact Form</Link>
                            <Link to={"/feedback"}>Feedback & Complaints</Link>
                        </div>
                        <div className="newsletter">
                            <h6>Newsletter</h6>
                            <p>Sign up for our newsletter and get every update.</p>
                            <input className={error ? 'invalid' : ''} type="text" name="email" autoComplete="email" placeholder="Your Email" value={email} onChange={handleInputChange} />
                            <button type="button" onClick={handleButtonClick} className={error ? 'invalidButton' : ''} ><HiArrowLongRight /></button>
                            {error &&
                                <p className="error">{error}</p>
                            }
                        </div>
                    </div>
                    <div className="footerBottom">
                        <p>© KAMPCHI | {new Date().getFullYear()}, All Right Reserved</p>
                        <p>Website by <span>Nubar Khanizada</span></p>
                    </div>
                </div>
            </div>
        </footer >
    )
}

export default Footer
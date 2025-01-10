import "./about.scss";
import React, { useEffect } from 'react'
import { ReactComponent as Adventurous } from "../../assets/Values/Adventurous.svg";
import { ReactComponent as Authentic } from "../../assets/Values/Authentic.svg";
import { ReactComponent as Community } from "../../assets/Values/Community.svg";
import { ReactComponent as Responsible } from "../../assets/Values/Responsible.svg";
import { ReactComponent as Visionary } from "../../assets/Values/Visionary.svg";
import { useLocation } from "react-router-dom";

const About = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            document.querySelector(hash).scrollIntoView({ behavior: 'smooth' });
        }
    }, [hash]);
    
    return (
        <div className='aboutPage'>
            <section className='slogan' >
                <h1>DISCOVER YOUR TRAIL TO NATURE</h1>
            </section>
            <div className="container">
                <section className="about" id="about">
                    <div className="aboutPart story">
                        <h3>OUR STORY</h3>
                        <p>KAMPCHI began with a simple idea: to bring together those who share a passion for the outdoors. From our humble beginnings, we have grown into a leading platform for camping enthusiasts, offering not just products but a community and a lifestyle. Our story is one of dedication, growth, and a love for nature that drives us every day.</p>
                    </div>
                    <div className="aboutPart mission">
                        <h3>OUR MISSION</h3>
                        <p>Our mission is to unite campers and nature enthusiasts by providing a platform that offers exceptional camping gear, memorable experiences, and valuable connections. We strive to enhance the outdoor adventure experience with high-quality products and reliable services.</p>
                    </div>
                    <div className="aboutPart vision">
                        <h3>OUR VISION</h3>
                        <p>Our vision is to be the leading destination for camping and outdoor adventure, where every outdoor enthusiast finds everything they need to explore, enjoy, and connect with nature. We aim to create a community where passion for the outdoors thrives and where every journey becomes an unforgettable experience.</p>
                    </div>
                </section>
                <section className="values" >
                    <h3>OUR VALUES</h3>
                    <div className="valuesContainer">
                        <div className="valueContainer">
                            <div className="image">
                                <Authentic />
                            </div>
                            <h4>Authentic</h4>
                            <p>We do what we say and we stay true to ourselves.</p>
                        </div>

                        <div className="valueContainer">
                            <div className="image">
                                <Community />
                            </div>
                            <h4>Community-Driven</h4>
                            <p>We enjoy being outside with family and friends.</p>
                        </div>

                        <div className="valueContainer">
                            <div className="image">
                                <Responsible />
                            </div>
                            <h4>Responsible</h4>
                            <p>We are committed towards respecting nature for future generations.</p>
                        </div>

                        <div className="valueContainer">
                            <div className="image">
                                <Adventurous />
                            </div>
                            <h4>Adventurous</h4>
                            <p>We are passionate and active outdoor lovers.</p>
                        </div>

                        <div className="valueContainer">
                            <div className="image">
                                <Visionary />
                            </div>
                            <h4>Visionary</h4>
                            <p>We constantly explore new solutions to improve the camping experience.</p>
                        </div>
                    </div>
                </section>
                <section className="team" id="team">
                    <h3>OUR TEAM</h3>
                    <div className="teamContainer">
                        <div className="member">
                            <div className="image">
                                <img src="https://img.freepik.com/premium-photo/portrait-hiker-woman-nature-background_622818-1277.jpg" alt="Mariam Sheikhalizadakhangah" />
                            </div>
                            <h4>Mariam Sheikhalizada</h4>
                            <p>CEO & Founder</p>
                        </div>

                        <div className="member">
                            <div className="image">
                                <img src="https://img.freepik.com/premium-photo/photo-beaming-young-man-hiking-enjoying-nature_630290-4278.jpg" alt="Kamran Mammadli" />
                            </div>
                            <h4>Kamran Mammadli</h4>
                            <p>Adventurer, Author, Speaker, Guide</p>
                        </div>

                        <div className="member">
                            <div className="image">
                                <img src="https://img.freepik.com/premium-photo/beautiful-tourist-girl-with-backpack-her-shoulders-fulllength-portrait_465502-3635.jpg" alt="Nigar Rzayeva" />
                            </div>
                            <h4>Nigar Rzayeva</h4>
                            <p>Journalist, Explorer, Writer</p>
                        </div>

                        <div className="member">
                            <div className="image">
                                <img src="https://img.freepik.com/premium-photo/travel-photographer-10_968638-68.jpg?w=360" alt="Kenan Aliyev" />
                            </div>
                            <h4>Kenan Aliyev</h4>
                            <p>Landscape & Travel Photographer</p>
                        </div>

                        <div className="member">
                            <div className="image">
                                <img src="https://img.freepik.com/premium-photo/beautiful-woman-hiking_954932-2094.jpg" alt="Leman Guliyeva" />
                            </div>
                            <h4>Leman Guliyeva</h4>
                            <p>Author, Guide, Content Creator</p>
                        </div>
                    </div>
                </section>
                <section className="careers" id="careers">
                    <h3>CAREERS</h3>
                    <h4>Find Your Opportunity</h4>
                    <p>We are looking forward to receivbing your application. If the current job offers don't include a suitable position for you, why not send us a specualtive application.</p>
                    <a href="/jobs">FIND YOUR JOB WITH US</a>
                </section>
                <section className="contact" id="contact">
                    <h3>CONTACT</h3>
                    <p>Do you have any questions about job vacancies, application processes, speculative applications or other topics? Please feel free to contact our HR specialists:</p>
                    <h4>HR Specialists</h4>
                    <a href="mailto:recruiting@kampchi.com" rel="noopener noreferrer">recruiting@kampchi.com</a>
                </section>
            </div>
        </div>
    )
}

export default About
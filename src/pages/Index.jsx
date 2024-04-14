import { useEffect } from "react";
import "../cdn/css/index.css";
import { Link } from "react-router-dom";

export default function Index() {
    useEffect(() => {
        function handleScroll() {
            document.querySelectorAll(".fade-up").forEach(element => {
                if (element.getBoundingClientRect().top < window.innerHeight) {
                    element.classList.add('active');
                } else {
                    element.classList.remove('active');
                }
            });
            document.querySelectorAll(".fade-down").forEach(element => {
                if (element.getBoundingClientRect().top < window.innerHeight) {
                    element.classList.add('active');
                } else {
                    element.classList.remove('active');
                }
            });
        }
        handleScroll();
        document.querySelector("#root").addEventListener('scroll', handleScroll);
    }, []);
    return (
    <>
        <section className="pres column" id="0">
            <img src="/cdn/img/Logo/RedEye.png" alt="icon"></img>
            <h2>RedEye</h2>
            <p style={{width: "80%", textAlign: "center"}}>A simple and intuitive multifunction bot that is fully customizable. This bot is 100% free, you don't have to pay anything!</p>
            <div style={{width: "50%", display: "flex", alignItems: "center", justifyContent: "space-evenly"}}>
                <Link to="/invite" id="add"></Link>
                <Link to="/control" id="manage" style={{display: "none"}}></Link>
                <Link to="/docs" id="docs"></Link>
            </div>
        </section>
        <section className="fade-up space" id="1">
            <h3>An advanced ticketing and leveling system</h3>
            <img src="/cdn/img/redeyes_level_image.png" alt="" id="level"></img>
        </section>
        <section className="fade-up space" id="2">
            <img src="https://koya.gg/_next/image?url=%2Fassets%2Fimg%2Ffeatures%2Fgreetings.png&w=1920&q=100" alt=""></img>
            <h3>Perform complex moderation tasks easily with RedEye bot's numerous commands</h3>
        </section>
        <section className="fade-up space" id="3">
            <h3>Search Roblox, GitHub and +15 other platforms in just a few clicks</h3>
            <img src="https://koya.gg/_next/image?url=%2Fassets%2Fimg%2Ffeatures%2Fgreetings.png&w=1920&q=100" alt=""></img>
        </section>
        <section className="fade-up space" id="4">
            <img src="/cdn/img/redeyes_welcom_image.png" id="welcome" alt=""></img>
            <h3>Welcome a new member with welcome images sent to the room you want</h3>
        </section>
        <section className="fade-up space" id="5">
            <h3>Get member information (avatar, banner...) with intuitive and short commands</h3>
            <img src="https://koya.gg/_next/image?url=%2Fassets%2Fimg%2Ffeatures%2Fgreetings.png&w=1920&q=100" alt=""></img>
        </section>
        <section className="fade-up space" id="6">
            <img src="https://koya.gg/_next/image?url=%2Fassets%2Fimg%2Ffeatures%2Fgreetings.png&w=1920&q=100" alt=""></img>
            <h3>Play mini games with your members</h3>
        </section>
        <section className="fade-up space" id="7">
            <h3>+30 commands, an advanced leveling and ticketing system, attentive staff and constant updates make it a latest generation bot</h3>
        </section>
        <footer className="fade-up space">
            <h5>
                Made by 
                <a href="https://sleezzi.fr/" rel="noreferrer" target="_blank" style={{position: "relative"}}>
                    🔧 Sleezzi
                    <aria-label>Sleezzi is a French developer, he knows how to use all languages but is particularly comfortable with JavaScript.</aria-label>
                </a>
            </h5>
            <h5>Powered by 
                <a href="https://nodejs.org/" id="nodejs" className="icon" rel="noreferrer" target="_blank">
                    Node.js
                    <aria-label>Node.js is an open-source execution environment that allows you to create all kinds of applications and tools.</aria-label>
                </a>, 
                <a href="https://discord.js.org/" id="discordjs" className="icon" rel="noreferrer" target="_blank">
                    Discord.js
                    <aria-label>Discord.js is a Node.js library used to run our bot. It works with JavaScript.</aria-label>
                </a>, 
                <a href="https://firebase.google.com/" id="firebase" className="icon" rel="noreferrer" target="_blank">
                    Firebase
                    <aria-label>Firebase's Realtime Database allows us to save our users' data such as member levels or tickets.</aria-label>
                </a>, 
                <a href="https://bot-hosting.net/?aff=542703093981380628" id="bot-hosting" rel="noreferrer" className="icon" target="_blank">
                    Bot-Hosting
                    <aria-label>Bot-Hosting hosts our bot, the link used is a "sponsorship" link when you click on it and register with it, virtual coins are given to us, it allows us to pay for hosting.</aria-label>
                </a> & 
                <a href="https://github.com/" id="github" className="icon" rel="noreferrer" target="_blank">
                    GitHub
                    <aria-label>Github is used for hosting this site and to facilitate RedEye development.</aria-label>
                </a>
            </h5>
        </footer>
    </>)
}
import React from 'react';
import chatIcon from '../../assets/img/icon-chat.webp';
import moneyIcon from '../../assets/img/icon-money.webp';
import securityIcon from '../../assets/img/icon-security.webp';
import './Home.css';

const subtitles = [
  "No fees.",
  "No minimum deposit.",
  "High interest rates."
];

const features = [
  {
    icon: chatIcon,
    title: "You are our #1 priority",
    description: "Need to talk to a representative? You can get in touch through our 24/7 chat or a phone call.",
    alt: "Chat Icon"
  },
  {
    icon: moneyIcon,
    title: "More savings means higher rates",
    description: "The more you save with us, the higher your interest rate will be!",
    alt: "Money Icon"
  },
  {
    icon: securityIcon,
    title: "Security you can trust",
    description: "We use top of the line encryption to make sure your data and money are always safe.",
    alt: "Security Icon"
  }
];

const Home = () => {
  return (
    <main>
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          {subtitles.map((text, index) => (
            <p key={index} className="subtitle">{text}</p>
          ))}
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {features.map((feature, index) => (
          <div key={index} className="feature-item">
            <img src={feature.icon} alt={feature.alt} className="feature-icon" />
            <h3 className="feature-item-title">{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Home;
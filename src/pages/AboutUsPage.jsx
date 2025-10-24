import React from 'react';

function AboutUsPage() {
  return (
    <div className="py-20 px-6 sm:px-10 md:px-20 bg-gradient-to-b from-black via-[#1a0000] to-[#2b0000] text-gray-300 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-black text-center uppercase mb-16 tracking-wide text-white">
          About <span className="text-red-500">Us</span>
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-6">
          <p className="text-xl leading-relaxed">
            Welcome to GamePatty, an independent game studio where passion, creativity, and technology converge. We are a small, dedicated team of developers, artists, and storytellers committed to crafting unique and immersive gaming experiences.
          </p>
          
          <h2>Our Mission</h2>
          <p>Our mission is simple: to create games that we love to play and that resonate with players worldwide. We focus on building cinematic worlds, engaging narratives, and innovative gameplay that leaves a lasting impression.</p>
          
          <h2>Meet the Team</h2>
          <p>We believe that great games are made by great people. (You can add team member bios here).</p>
          <ul>
            <li><strong>Jane Doe:</strong> Founder & Creative Director</li>
            <li><strong>John Smith:</strong> Lead Developer</li>
            <li><strong>Alex Chen:</strong> Art Director</li>
          </ul>

          <h2>Get in Touch</h2>
          <p>We're always excited to hear from our community, fellow developers, and potential partners. Whether you have a question about our games or just want to say hi, feel free to reach out.</p>
          <p>
            Visit our <a href="/contact" className="text-red-400 hover:text-red-300">Contact Page</a> or email us at 
            <a href="mailto:hello@gamepatty.com" className="text-red-400 hover:text-red-300"> hello@gamepatty.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
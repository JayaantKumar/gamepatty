import React from 'react';

function CookiePolicyPage() {
  return (
    <div className="py-20 px-6 sm:px-10 md:px-20 bg-gradient-to-b from-black via-[#1a0000] to-[#2b0000] text-gray-300 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-black text-center uppercase mb-16 tracking-wide text-white">
          Cookie <span className="text-red-500">Policy</span>
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-6">
          <p><strong>Last Updated: October 24, 2025</strong></p>
          
          <p>Our website, GamePatty, uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site.</p>
          
          <h2>1. What Are Cookies?</h2>
          <p>A cookie is a small file of letters and numbers that we store on your browser or the hard drive of your computer if you agree. Cookies contain information that is transferred to your computer's hard drive.</p>
          
          <h2>2. Types of Cookies We Use</h2>
          <ul>
            <li><strong>Strictly Necessary Cookies:</strong> These are cookies that are required for the operation of our website.</li>
            <li><strong>Analytical/Performance Cookies:</strong> They allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it.</li>
            <li><strong>Functionality Cookies:</strong> These are used to recognize you when you return to our website.</li>
          </ul>

          <h2>3. How to Block Cookies</h2>
          <p>You can block cookies by activating the setting on your browser that allows you to refuse the setting of all or some cookies. However, if you use your browser settings to block all cookies (including essential cookies) you may not be able to access all or parts of our site.</p>

          <h2>4. Contact Us</h2>
          <p>If you have questions or comments about this Cookie Policy, please contact us at:</p>
          <p>
            GamePatty<br/>
            <a href="mailto:cookies@gamepatty.com" className="text-red-400 hover:text-red-300">cookies@gamepatty.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CookiePolicyPage;
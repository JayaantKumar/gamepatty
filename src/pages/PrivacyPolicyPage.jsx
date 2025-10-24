import React from 'react';

function PrivacyPolicyPage() {
  return (
    <div className="py-20 px-6 sm:px-10 md:px-20 bg-gradient-to-b from-black via-[#1a0000] to-[#2b0000] text-gray-300 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-black text-center uppercase mb-16 tracking-wide text-white">
          Privacy <span className="text-red-500">Policy</span>
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-6">
          <p><strong>Last Updated: October 24, 2025</strong></p>
          
          <p>Welcome to GamePatty. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
          
          <h2>1. Information We Collect</h2>
          <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
          <ul>
            <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and demographic information, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards.</li>
            <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
          </ul>

          <h2>2. Use of Your Information</h2>
          <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
          <ul>
            <li>Create and manage your account.</li>
            <li>Email you regarding your account or order.</li>
            <li>Send you a newsletter.</li>
          </ul>

          <h2>3. Disclosure of Your Information</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

          <h2>4. Contact Us</h2>
          <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
          <p>
            GamePatty<br/>
            123 Gaming Street, Metropolis, 10001<br/>
            <a href="mailto:privacy@gamepatty.com" className="text-red-400 hover:text-red-300">privacy@gamepatty.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
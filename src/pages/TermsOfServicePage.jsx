import React from 'react';

function TermsOfServicePage() {
  return (
    <div className="py-20 px-6 sm:px-10 md:px-20 bg-gradient-to-b from-black via-[#1a0000] to-[#2b0000] text-gray-300 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-black text-center uppercase mb-16 tracking-wide text-white">
          Terms of <span className="text-red-500">Service</span>
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-6">
          <p><strong>Last Updated: October 24, 2025</strong></p>
          
          <h2>1. Agreement to Terms</h2>
          <p>By accessing or using our website, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.</p>
          
          <h2>2. Intellectual Property</h2>
          <p>The Service and its original content, features, and functionality are and will remain the exclusive property of GamePatty and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of GamePatty.</p>
          
          <h2>3. Links to Other Web Sites</h2>
          <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by GamePatty. GamePatty has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services.</p>
          
          <h2>4. Termination</h2>
          <p>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

          <h2>5. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p>
            GamePatty<br/>
            <a href="mailto:terms@gamepatty.com" className="text-red-400 hover:text-red-300">terms@gamepatty.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsOfServicePage;
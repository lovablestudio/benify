
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  const { language } = useLanguage();
  
  return (
    <div className={`${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      <NavBar />
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose max-w-none">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Benify's services, you agree to be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use our services.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">2. Description of Service</h2>
          <p>
            Benify provides an employee benefits platform that allows companies to offer flexible 
            benefits to their employees. Our services include but are not limited to benefit management, 
            administration, and disbursement of benefit allowances.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">3. User Accounts</h2>
          <p>
            To access certain features of our service, you may be required to register for an account. 
            You are responsible for maintaining the confidentiality of your account information and for 
            all activities that occur under your account. You agree to:
          </p>
          <ul className="list-disc ml-6 my-4">
            <li>Provide accurate and complete information when creating your account.</li>
            <li>Update your information to keep it accurate and current.</li>
            <li>Ensure your password remains confidential and secure.</li>
            <li>Notify us immediately of any unauthorized use of your account.</li>
          </ul>
          
          <h2 className="text-xl font-bold mt-8 mb-4">4. User Conduct</h2>
          <p>
            When using our services, you agree not to:
          </p>
          <ul className="list-disc ml-6 my-4">
            <li>Violate any applicable laws or regulations.</li>
            <li>Infringe on the rights of others, including intellectual property rights.</li>
            <li>Submit false or misleading information.</li>
            <li>Upload or transmit viruses or any other malicious code.</li>
            <li>Attempt to gain unauthorized access to our systems or networks.</li>
            <li>Interfere with or disrupt the integrity or performance of the service.</li>
          </ul>
          
          <h2 className="text-xl font-bold mt-8 mb-4">5. Intellectual Property</h2>
          <p>
            All content, features, and functionality of our service, including but not limited to text, 
            graphics, logos, icons, and software, are owned by Benify and are protected by intellectual 
            property laws. You may not copy, modify, distribute, sell, or lease any part of our services 
            without our explicit permission.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">6. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Benify shall not be liable for any indirect, incidental, 
            special, consequential, or punitive damages, resulting from your use or inability to use the service, 
            or for the cost of procurement of substitute services.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">7. Modification of Terms</h2>
          <p>
            Benify reserves the right to modify these Terms of Service at any time. We will notify users 
            of any significant changes. Your continued use of our services after such modifications constitutes 
            your acceptance of the updated terms.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">8. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your account and access to our services at our 
            discretion, without notice, for conduct that we believe violates these Terms of Service or 
            is harmful to other users, us, or third parties, or for any other reason.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">9. Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of Saudi Arabia, 
            without regard to its conflict of law provisions.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">10. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <p className="mt-2">
            <strong>Email:</strong> info@ben-ify.com<br />
            <strong>Phone:</strong> +966 40 890 5709
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;

import { useEffect } from "react";

const EmailVerifiedRedirect = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.close();
    }, 3000); // Closes window after 3 seconds

    return () => clearTimeout(timer); // Cleanup in case component unmounts
  }, []);
  return (
    <div>
      <h1>Email verified!</h1>
      <p>This window will close in 3 seconds</p>
    </div>
  );
};

export default EmailVerifiedRedirect;

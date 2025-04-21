import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

function ErrorFallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Delay navigation to let the error boundary fully unmount children
    const timer = setTimeout(() => {
      navigate("/error");
    }, 0);

    return () => clearTimeout(timer);
  }, [navigate]);

  return null; // Keeps UI clean while redirecting
}

export default function AppWithErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        console.error("Error caught by boundary:", error, info);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

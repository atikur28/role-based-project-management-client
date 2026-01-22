import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
}

const Toast = ({ message, type = "success" }: ToastProps) => {
  const [visible, setVisible] = useState(true);

  const duration = 4000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`${bgColor} text-white p-3 rounded shadow fixed top-4 right-4 z-50`}
    >
      {message}
    </div>
  );
};

export default Toast;

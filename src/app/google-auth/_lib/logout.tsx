"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { FC, useState } from "react";

const Logout: FC = () => {
  const { token } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await axios
      .post("/api/auth/google/logout", null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <Button variant="secondary" onClick={handleLogout} disabled={isLoading}>
      {isLoading && <Loader2 className="animate-spin" />}
      Logout
    </Button>
  );
};

export default Logout;

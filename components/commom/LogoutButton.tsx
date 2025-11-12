"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth.client";

export function LogoutButton({ className }: { className?: string }) {
  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/authentication";
  };

  return (
    <Button variant="destructive" onClick={handleLogout} className={className}>
      Sair
    </Button>
  );
}

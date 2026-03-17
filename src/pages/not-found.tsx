import { ShieldAlert } from "lucide-react";
import { Link } from "wouter";
import { GlowingButton } from "@/components/ui/glowing-button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md text-center">
        <div className="w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-10 h-10 text-destructive" />
        </div>
        <h1 className="text-4xl font-display font-bold mb-4">404 - Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you are looking for has been blocked by our security filters (just kidding, it doesn't exist).
        </p>
        <Link href="/">
          <GlowingButton>Return Home</GlowingButton>
        </Link>
      </div>
    </div>
  );
}

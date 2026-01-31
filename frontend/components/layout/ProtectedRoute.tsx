"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login"); // Redirect to login if not authenticated
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-void flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-nebula-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Render children only if authenticated
    return user ? <>{children}</> : null;
}

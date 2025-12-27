"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const userId = localStorage.getItem("ID_User");
        const user = localStorage.getItem("user");

        if (!userId && !user) {
            router.push("/login");
        } else {
            router.push("/learn");
        }
    }, [router]);

    return null; // Hoặc có thể return loading spinner
}

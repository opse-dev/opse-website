import AdminLayout from "../../components/AdminLayout";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Dashboard() {
    const
        [loading, setLoading] = useState(true),
        [user, setUser] = useState(null),
        {data: session, status} = useSession();

    useEffect(() => {
        if (!session && status != "loading") signIn('discord');
        else if (status != "loading") {
            setLoading(false);
            setUser(session.user);
        }
    })

    if (loading) {
        return (
            <h2> Loading ... </h2>
        );
    }

    return (
        <AdminLayout>
            <h1> Welcome {user?.name} </h1>
            <button onClick={signOut}>Sign Out</button>
        </AdminLayout>
    );
}
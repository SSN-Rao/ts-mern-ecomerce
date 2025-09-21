import { useContext } from "react";
import type { ReactNode } from "react";
import { Store } from "../Store";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ children }: { children?: ReactNode }) {
    const {
        state: { userInfo },
    } = useContext(Store);
    if (userInfo) {
        return children ? <>{children}</> : <Outlet />;
    } else {
        return <Navigate to="/signin" />;
    }
}
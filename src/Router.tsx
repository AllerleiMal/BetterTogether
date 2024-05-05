import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import RoomListPage from "./pages/RoomListPage";
import RoomPage from "./pages/RoomPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ErrorHandler from "./components/ErrorHandler/ErrorHandler";
import MediaPage from "./pages/MediaPage";
import Root from "./Root";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorHandler />,
        children: [
            {
                path: "/",
                element: <HomePage />,
                errorElement: <ErrorHandler />
            },
            {
                path: "/home",
                element: <HomePage />,
                errorElement: <ErrorHandler />
            },
            {
                path: "/catalog",
                element: <CatalogPage />,
                errorElement: <ErrorHandler />
            },
            {
                path: "/catalog/:id",
                element: <MediaPage />,
                errorElement: <ErrorHandler />
            },
            {
                path: "/rooms",
                element: <RoomListPage />,
                errorElement: <ErrorHandler />
            },
            {
                path: "/rooms/:id",
                element: <RoomPage />,
                errorElement: <ErrorHandler />
            },
            {
                path: "/profile/:id",
                element: <ProfilePage />,
                errorElement: <ErrorHandler />
            },
            {
                path: "/login",
                element: <LoginPage />,
                errorElement: <ErrorHandler />
            },
            {
                path: "/register",
                element: <RegisterPage />,
                errorElement: <ErrorHandler />
            },
            {
                path: "*",
                element: <NotFoundPage />,
                errorElement: <ErrorHandler />
            }
        ]
    }
]);

const AppRouter = () => {
    return (
        <RouterProvider router={router} />
    );
}

export default AppRouter;
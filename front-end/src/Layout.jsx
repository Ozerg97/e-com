import Footer from "./Layouts/Footer";
import NavBar from "./Layouts/Navbar";
import { Outlet } from "react-router-dom";


function Layout() {
    return (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>


    );
}

export default Layout;
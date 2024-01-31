import { Outlet } from "react-router-dom";
import Nav from "./nav/Nav";
import Footer from "./footer/footer";
import Logo from "./header/header";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Logo />
        <Nav />
      </header>
      
      <main className="flex-grow">
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

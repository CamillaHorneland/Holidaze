import { Outlet } from "react-router-dom";
import Nav from "./nav/Nav";
import Footer from "./footer/footer";
import Logo from "./header/header";

export default function Layout() {
  return (
    <div>
      <header>
        <Logo />
        <Nav />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

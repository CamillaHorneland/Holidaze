import { Outlet } from "react-router-dom";
import Nav from "./nav/Nav";
import Footer from "./footer/footer";

export default function Layout() {
  return (
    <div>
      <header>
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

import { Outlet } from "react-router-dom";
import Nav from "./nav/Nav";

export default function Layout() {
  return (
    <div>
      <header>
        <Nav />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
}

import {  Route, Routes } from "react-router-dom";
import { UserProvider } from './hooks/type/UserContext';
import HomePage from "./pages/HomePage";
import VenuesPage from "./pages/VenuesPage";
import VenuesSpecificPage from "./pages/VenuesSpecificPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import BookingsPage from "./pages/BookingsPage";
import YourVenuesPage from "./pages/YourVenuesPage";
import AddVenuePage from "./pages/AddVenuePage";
import EditYourVenuePage from "./pages/EditYourVenuePage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./components/layout/Layout";


function App() {
    return (
   
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="venues" element={<VenuesPage />} />
            <Route path="venuesspecific/:id" element={<VenuesSpecificPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route  exact path="profile/:name" element={<ProfilePage />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="yourvenues" element={<YourVenuesPage />} />
            <Route path="addvenue" element={<AddVenuePage />} />
            <Route path="edityourvenue/:id" element={<EditYourVenuePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </UserProvider>
    
  );
}

export default App;

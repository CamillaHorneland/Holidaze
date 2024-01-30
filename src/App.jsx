import {  Route, Routes } from "react-router-dom";
import { UserProvider } from './components/type/UserContext';
import HomePage from "./pages/HomePage";
import VenuesPage from "./pages/VenuesPage";
import VenuesSpecificPage from "./pages/VenuesSpecificPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import BookingPage from "./pages/BookingsPage";
import BookingSuccessPage from "./pages/BookingSuccessPage";
import YourVenuesPage from "./pages/YourVenuesPage";
import VenueManagerSpecificPage from "./pages/VenueManagerSpecificPage";
import AddVenuePage from "./pages/AddVenuePage";
import VenueManagerDeleteEditPage from "./pages/VenueManagerDeleteEditPage";
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
            <Route path="profile" element={<ProfilePage />} />
            <Route path="booking" element={<BookingPage />} />
            <Route path="bookingsuccess" element={<BookingSuccessPage />} />
            <Route path="yourvenues" element={<YourVenuesPage />} />
            <Route path="venuemanagerspecific/:id" element={<VenueManagerSpecificPage />} />
            <Route path="addvenue" element={<AddVenuePage />} />
            <Route path="venuemanageredit" element={<VenueManagerDeleteEditPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </UserProvider>
    
  );
}

export default App;

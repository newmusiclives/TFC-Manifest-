import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Discover from './pages/Discover'
import HowItWorks from './pages/HowItWorks'
import FanHowItWorks from './pages/FanHowItWorks'
import VenueServices from './pages/VenueServices'
import Venues from './pages/Venues'
import AffiliateProgram from './pages/AffiliateProgram'
import ArtistProfile from './pages/ArtistProfile'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ArtistSignup from './pages/ArtistSignup'
import Dashboard from './pages/Dashboard'
import UploadMusic from './pages/UploadMusic'
import ManageShows from './pages/ManageShows'
import Shows from './pages/Shows'
import Settings from './pages/Settings'
import Pricing from './pages/Pricing'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './pages/NotFound'
import EmbeddedSubmissionForm from './pages/EmbeddedSubmissionForm'
import MusicianProfile from './pages/MusicianProfile'

const router = (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="discover" element={<Discover />} />
      <Route path="how-it-works" element={<HowItWorks />} />
      <Route path="fan-how-it-works" element={<FanHowItWorks />} />
      <Route path="venues" element={<Venues />} />
      <Route path="venue-services" element={<VenueServices />} />
      <Route path="affiliate" element={<AffiliateProgram />} />
      <Route path="affiliate-program" element={<AffiliateProgram />} />
      <Route path="artist/:id" element={<ArtistProfile />} />
      <Route path="musician/:id" element={<MusicianProfile />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="artist-signup" element={<ArtistSignup />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="embed/:id" element={<EmbeddedSubmissionForm />} />
      
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="upload" element={<UploadMusic />} />
        <Route path="manage-shows" element={<ManageShows />} />
        <Route path="shows" element={<Shows />} />
        <Route path="settings" element={<Settings />} />
        <Route path="admin" element={<AdminDashboard />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default router;

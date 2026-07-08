import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '../layouts/Layout';
import Events from '../pages/Events';
import EventDetail from '../pages/EventDetail';
import CreateEvent from '../pages/CreateEvent';
import MyEvents from '../pages/MyEvents';
import MyTickets from '../pages/MyTickets';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/events/new" element={
            <ProtectedRoute role="ORGANISER">
              <CreateEvent />
            </ProtectedRoute>
          } />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/my-events" element={
            <ProtectedRoute role="ORGANISER">
              <MyEvents />
            </ProtectedRoute>
          } />
          <Route path="/my-tickets" element={
            <ProtectedRoute>
              <MyTickets />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRoutes;

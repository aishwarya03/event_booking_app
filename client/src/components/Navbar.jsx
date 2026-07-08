import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import Button from './Button';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="flex items-center justify-between border-b p-4">
      <Link to="/" className="text-xl font-bold">
        EventHub
      </Link>

      <div className="flex items-center gap-4 text-sm">
        <Link to="/" className="hover:text-blue-600">
          Events
        </Link>

        {user?.role === 'ORGANISER' && (
          <>
            <Link to="/my-events" className="hover:text-blue-600">
              My Events
            </Link>
            <Link to="/events/new" className="hover:text-blue-600">
              Create Event
            </Link>
          </>
        )}

        {user?.role === 'ATTENDEE' && (
          <Link to="/my-tickets" className="hover:text-blue-600">
            My Tickets
          </Link>
        )}

        {user ? (
          <>
            <span className="text-gray-500">{user.name}</span>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-600">
              Login
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Card from '../components/Card';
import { getMyBookings } from '../api/bookings';

const formatDate = (value) =>
  new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

const MyTickets = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getMyBookings();
        setBookings(response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Tickets</h1>

      {loading && <p className="text-gray-500">Loading...</p>}

      {!loading && bookings.length === 0 && (
        <p className="text-gray-500">You haven't booked any tickets yet.</p>
      )}

      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card key={booking.id} className="space-y-1">
            <Link
              to={`/events/${booking.ticketTier.event.id}`}
              className="text-lg font-semibold hover:underline"
            >
              {booking.ticketTier.event.title}
            </Link>
            <p className="text-sm text-gray-500">
              {formatDate(booking.ticketTier.event.startsAt)} · {booking.ticketTier.event.location}
            </p>
            <p className="text-sm">
              {booking.quantity} × {booking.ticketTier.name} — ${booking.totalPrice.toFixed(2)}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyTickets;

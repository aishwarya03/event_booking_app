import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Card from '../components/Card';
import Button from '../components/Button';
import { getMyEvents } from '../api/events';

const formatDate = (value) =>
  new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getMyEvents();
        setEvents(response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Events</h1>
        <Link to="/events/new">
          <Button>Create Event</Button>
        </Link>
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}

      {!loading && events.length === 0 && (
        <p className="text-gray-500">You haven't created any events yet.</p>
      )}

      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id} className="space-y-2">
            <Link to={`/events/${event.id}`} className="text-lg font-semibold hover:underline">
              {event.title}
            </Link>
            <p className="text-sm text-gray-500">{formatDate(event.startsAt)} · {event.location}</p>

            <div className="grid grid-cols-2 gap-2 pt-2 sm:grid-cols-3">
              {event.ticketTiers.map((tier) => (
                <div key={tier.id} className="rounded-md border border-gray-200 p-2 text-sm">
                  <p className="font-medium">{tier.name}</p>
                  <p className="text-gray-500">
                    {tier.totalQuantity - tier.remainingQuantity} / {tier.totalQuantity} sold
                  </p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;

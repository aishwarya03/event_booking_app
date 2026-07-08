import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Calendar, MapPin } from 'lucide-react';

import Card from '../components/Card';
import Button from '../components/Button';
import { getEvent } from '../api/events';
import { createBooking } from '../api/bookings';
import { useAuth } from '../hooks/useAuth';

const formatDate = (value) =>
  new Date(value).toLocaleString(undefined, {
    dateStyle: 'full',
    timeStyle: 'short',
  });

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [buyingId, setBuyingId] = useState(null);

  const fetchEvent = async () => {
    try {
      const response = await getEvent(id);
      setEvent(response.data);
    } catch {
      toast.error('Event not found');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleBuy = async (tierId) => {
    if (!token) {
      navigate('/login');
      return;
    }

    const quantity = Number(quantities[tierId] || 1);
    setBuyingId(tierId);

    try {
      await createBooking({ ticketTierId: tierId, quantity });
      toast.success('Ticket booked!');
      await fetchEvent();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setBuyingId(null);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading event...</p>;
  }

  if (!event) {
    return null;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{event.title}</h1>
        <div className="space-y-1 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <Calendar size={16} /> {formatDate(event.startsAt)}
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={16} /> {event.location}
          </p>
        </div>
        <p className="pt-2 text-gray-700">{event.description}</p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Tickets</h2>

        {event.ticketTiers.map((tier) => (
          <Card key={tier.id} className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium">{tier.name}</p>
              <p className="text-sm text-gray-500">
                ${tier.price.toFixed(2)} · {tier.remainingQuantity} left
              </p>
            </div>

            {tier.remainingQuantity === 0 ? (
              <span className="rounded bg-red-100 px-3 py-2 text-sm font-medium text-red-700">
                Sold out
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max={tier.remainingQuantity}
                  value={quantities[tier.id] || 1}
                  onChange={(e) =>
                    setQuantities({ ...quantities, [tier.id]: e.target.value })
                  }
                  className="w-16 rounded-md border border-gray-300 px-2 py-1 text-center"
                />
                <Button
                  onClick={() => handleBuy(tier.id)}
                  disabled={buyingId === tier.id}
                >
                  {buyingId === tier.id ? 'Booking...' : 'Buy'}
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      {user?.role === 'ORGANISER' && user.id === event.organiserId && (
        <p className="text-sm text-gray-500">You organise this event.</p>
      )}
    </div>
  );
};

export default EventDetail;

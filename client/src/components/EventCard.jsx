import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';

import Card from './Card';

const formatDate = (value) =>
  new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

const EventCard = ({ event }) => {
  const lowestPrice = event.ticketTiers.length
    ? Math.min(...event.ticketTiers.map((tier) => tier.price))
    : null;

  const soldOut = event.ticketTiers.every((tier) => tier.remainingQuantity === 0);

  return (
    <Link to={`/events/${event.id}`}>
      <Card className="h-full space-y-3 transition-shadow hover:shadow-md">
        <h3 className="text-lg font-semibold">{event.title}</h3>

        <div className="space-y-1 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <Calendar size={16} /> {formatDate(event.startsAt)}
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={16} /> {event.location}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="font-medium">
            {lowestPrice === null ? '—' : `From $${lowestPrice.toFixed(2)}`}
          </span>
          {soldOut && (
            <span className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
              Sold out
            </span>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default EventCard;

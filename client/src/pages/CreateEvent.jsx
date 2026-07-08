import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Plus, Trash2 } from 'lucide-react';

import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { createEvent } from '../api/events';

const emptyTier = { name: '', price: '', totalQuantity: '' };

const CreateEvent = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    startsAt: '',
  });
  const [tiers, setTiers] = useState([{ ...emptyTier }]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTierChange = (index, field, value) => {
    const next = [...tiers];
    next[index] = { ...next[index], [field]: value };
    setTiers(next);
  };

  const addTier = () => setTiers([...tiers, { ...emptyTier }]);

  const removeTier = (index) => {
    setTiers(tiers.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createEvent({
        ...form,
        ticketTiers: tiers.map((tier) => ({
          name: tier.name,
          price: Number(tier.price),
          totalQuantity: Number(tier.totalQuantity),
        })),
      });
      toast.success('Event created!');
      navigate('/my-events');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Card className="space-y-4">
        <h1 className="text-2xl font-bold">Create an event</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="title"
            placeholder="Event title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            rows={3}
            required
          />
          <Input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
          />
          <Input
            type="datetime-local"
            name="startsAt"
            value={form.startsAt}
            onChange={handleChange}
            required
          />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Ticket tiers</h2>
              <Button type="button" variant="secondary" onClick={addTier}>
                <span className="flex items-center gap-1">
                  <Plus size={16} /> Add tier
                </span>
              </Button>
            </div>

            {tiers.map((tier, index) => (
              <div key={index} className="flex items-end gap-2">
                <Input
                  placeholder="Name (e.g. General)"
                  value={tier.name}
                  onChange={(e) => handleTierChange(index, 'name', e.target.value)}
                  required
                />
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Price"
                  value={tier.price}
                  onChange={(e) => handleTierChange(index, 'price', e.target.value)}
                  required
                />
                <Input
                  type="number"
                  min="1"
                  placeholder="Quantity"
                  value={tier.totalQuantity}
                  onChange={(e) =>
                    handleTierChange(index, 'totalQuantity', e.target.value)
                  }
                  required
                />
                {tiers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTier(index)}
                    className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating...' : 'Create event'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CreateEvent;

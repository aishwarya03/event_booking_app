import prisma from '../prisma/client.js';

const eventInclude = { ticketTiers: true };

export const listEvents = async () => {
  return prisma.event.findMany({
    include: eventInclude,
    orderBy: { startsAt: 'asc' },
  });
};

export const listEventsByOrganiser = async (organiserId) => {
  return prisma.event.findMany({
    where: { organiserId },
    include: eventInclude,
    orderBy: { startsAt: 'asc' },
  });
};

export const getEventById = async (id) => {
  const event = await prisma.event.findUnique({
    where: { id },
    include: eventInclude,
  });

  if (!event) {
    const error = new Error('Event not found.');
    error.statusCode = 404;
    throw error;
  }

  return event;
};

const assertOwnsEvent = async (id, organiserId) => {
  const event = await prisma.event.findUnique({ where: { id } });

  if (!event) {
    const error = new Error('Event not found.');
    error.statusCode = 404;
    throw error;
  }

  if (event.organiserId !== organiserId) {
    const error = new Error('You do not own this event.');
    error.statusCode = 403;
    throw error;
  }

  return event;
};

export const createEvent = async (organiserId, data) => {
  return prisma.event.create({
    data: {
      title: data.title,
      description: data.description,
      location: data.location,
      startsAt: data.startsAt,
      organiserId,
      ticketTiers: {
        create: data.ticketTiers.map((tier) => ({
          name: tier.name,
          price: tier.price,
          totalQuantity: tier.totalQuantity,
          remainingQuantity: tier.totalQuantity,
        })),
      },
    },
    include: eventInclude,
  });
};

export const updateEvent = async (id, organiserId, data) => {
  await assertOwnsEvent(id, organiserId);

  return prisma.event.update({
    where: { id },
    data,
    include: eventInclude,
  });
};

export const deleteEvent = async (id, organiserId) => {
  await assertOwnsEvent(id, organiserId);

  await prisma.event.delete({ where: { id } });
};

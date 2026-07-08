import prisma from '../prisma/client.js';

export const createBooking = async (userId, { ticketTierId, quantity }) => {
  return prisma.$transaction(async (tx) => {
    const tier = await tx.ticketTier.findUnique({ where: { id: ticketTierId } });

    if (!tier) {
      const error = new Error('Ticket tier not found.');
      error.statusCode = 404;
      throw error;
    }

    const decremented = await tx.ticketTier.updateMany({
      where: { id: ticketTierId, remainingQuantity: { gte: quantity } },
      data: { remainingQuantity: { decrement: quantity } },
    });

    if (decremented.count === 0) {
      const error = new Error('Not enough tickets remaining.');
      error.statusCode = 409;
      throw error;
    }

    return tx.booking.create({
      data: {
        userId,
        ticketTierId,
        quantity,
        totalPrice: tier.price * quantity,
      },
      include: {
        ticketTier: { include: { event: true } },
      },
    });
  });
};

export const listBookingsForUser = async (userId) => {
  return prisma.booking.findMany({
    where: { userId },
    include: {
      ticketTier: { include: { event: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
};

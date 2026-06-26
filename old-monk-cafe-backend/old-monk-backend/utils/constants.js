module.exports = {
  ROLES: {
    CUSTOMER: 'customer',
    STAFF: 'staff',
    ADMIN: 'admin',
  },
  ORDER_STATUS: {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    PREPARING: 'preparing',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
  },
  ORDER_TYPE: {
    DINE_IN: 'dine_in',
    TAKEAWAY: 'takeaway',
    DELIVERY: 'delivery',
  },
  PAYMENT_STATUS: {
    PENDING: 'pending',
    PAID: 'paid',
    FAILED: 'failed',
    REFUNDED: 'refunded',
  },
  PAYMENT_METHOD: {
    COD: 'cod',
    RAZORPAY: 'razorpay',
  },
  RESERVATION_STATUS: {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    REJECTED: 'rejected',
    CANCELLED: 'cancelled',
    COMPLETED: 'completed',
  },
  CONTACT_STATUS: {
    NEW: 'new',
    IN_PROGRESS: 'in_progress',
    RESOLVED: 'resolved',
  },
  GALLERY_CATEGORIES: [
    'interior',
    'coffee',
    'mocktails',
    'food',
    'momos',
    'seating',
    'night-ambience',
    'presentation',
    'events',
  ],
};

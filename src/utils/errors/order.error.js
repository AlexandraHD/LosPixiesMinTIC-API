class OrderError extends Error {
  constructor(message) {
    super(message);
    this.name = 'OrderError';
  }
}

module.exports = OrderError;

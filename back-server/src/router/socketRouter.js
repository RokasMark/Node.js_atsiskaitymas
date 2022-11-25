module.exports = (io) => {
  io.on('connect', (socket) => {
    socket.on('newBid', (data) => {
      console.log('data ===', data);
      io.emit('bidData', data);
    });
  });
};

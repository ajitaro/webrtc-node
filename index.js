const express = require('express')
const http = require('http')
const cors = require('cors')
const app = express()
app.use(cors())
const server = http.createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost'
  }
})

const host = 'localhost' //'http://192.168.1.103'
const port = 3000

io.on('connection', socket => {
  console.log('Connected! Socket ID: ', socket.id)

  socket.on('message', (message) => {
    console.log('Received message: ', message)
    socket.broadcast.emit('message', message)
  })

  socket.on('disconnect', () => {
    console.log('Disconnected! Socket ID: ', socket.id)
  })

  // socket.on('disconnect', () => {
  //   socket.broadcast.emit('callEnded')
  // })

  // socket.on('callUser', (data) => {
  //   io.to(data.userToCall).emit('callUser', { signal: data.signalData, from: data.from, name: data.name })
  // })

  // socket.on('answerCall', (data) =>
  //   io.to(data.to).emit('callAccepted', data.signal))
})

function error (err, req, res, next) {
  res.status(500)
  res.send('Internal Server Error')
}

app.use(error)

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

server.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);

})
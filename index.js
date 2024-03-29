const express = require('express')
const http = require('http')
const cors = require('cors')
const app = express()
app.use(cors())
const server = http.createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: 'https://ajitaro-webrtc-react.vercel.app'
  }
})

const host = 'webrtc-node-lime.vercel.app' //'http://192.168.1.103'
const PORT = process.env.PORT || 3000

// https://webrtc-node-lime.vercel.app

app.get('/', (req, res) => {
  res.write(`<h1>Socket IO Start on Port : ${PORT}</h1>`)
  res.end()
})

io.on('connection', socket => {
  console.log('Connected! Socket ID: ', socket.id)

  socket.on('message', (message) => {
    io.emit('message', message)
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

server.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`)
})
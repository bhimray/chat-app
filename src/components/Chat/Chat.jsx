import React, { useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import { useLocation } from 'react-router'

const Chat = () => {
  const location = useLocation()
  console.log(location)
  const ENDPOINT = 'http://localhost:5000';
  useEffect(()=>{
    const data = queryString.parse(location.search)
    const name= data.name;
    const room= data.room;
    console.log('data', data.room)
    const socket = io(ENDPOINT)
    console.log(socket)
    socket.emit('join', {name, room})
  }, [ENDPOINT, location])

  return (
    <div>
    Chat
    </div>
  )
}

export default Chat
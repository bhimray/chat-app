import React, { useEffect ,useState} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import { useLocation } from 'react-router'
import './Chat.css'
let i=0;
let j=0;
let k=0;
const ENDPOINT = 'http://localhost:5000';
console.log("component called")
let socketID;
let socket;
const Chat = () => {
  const location = useLocation()
  console.log("this is search params", location)

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  
  useEffect(()=>{
    k= k+1;
    console.log("k", k)
    const data = queryString.parse(location.search)
    const name= data.name;
    const room= data.room;
    socket = io(ENDPOINT);
    console.log('socket id while joining', socket.id)
    console.log('data', data.room)
    console.log("this is socket", socket)
    console.log("joining the user. Sending login details")
    socket.emit('join', {name, room}, ({error})=>{
      console.log('Joining error', error)
    })
    return()=>{
      console.log('disconnection')
      socket.emit('disconnection');
      socket.off();
    }
  }, [ENDPOINT, location])
  
  useEffect(()=>{
    i= i+1;
    console.log("i", i)
    console.log('chat will receive the message from socket.....current messages is', messages, typeof(messages))
    console.log(message, typeof(message), 'message of setMessage')
    socket.on('message', (message)=>{
      j=j+1;
      console.log("j", j)
      socketID= socket.id
      console.log('after joined', socket.id)
      console.log("chat received the socket message", message)
      setMessages([...messages, message])
      console.log('messages array is here after adding', messages)
  })
  }, [])

  const sendMessage=(event)=>{
    
    event.preventDefault();
    console.log("checking if there is message (in sendMessage) before sending in socket", message)
    let socketId = socketID;
    // console.log('sendMessage and socket-id is', socket.id)
    if (message !== null){
      console.log('this is message to be sent in socket', message)
      socket.emit('sendMessage', {message, socketId}, ()=>setMessage(''))
      console.log('message sent to the socket')
    }
  }

  console.log("both message and messges", message);
  console.log(messages)

  return (
    <div className='outerContainer'>
      <div className='container'>
        <input 
        onChange={(event)=>setMessage(event.target.value)} 
        onKeyPress={(event)=>event.key==='Enter' ? sendMessage(event): null}  
        type="text" value={message}/>
      </div>
    </div>
  )
}

export default Chat
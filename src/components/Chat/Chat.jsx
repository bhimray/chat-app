import React, { useEffect ,useState} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import { useLocation } from 'react-router'

const Chat = () => {
  const location = useLocation()
  console.log(location)
  const ENDPOINT = 'http://localhost:5000';

  const [Message, addMessage] = useState([]);
  const [Comment, sendComment] = useState('');

  let socket;

  useEffect(()=>{
    const data = queryString.parse(location.search)
    const name= data.name;
    const room= data.room;
    console.log('data', data.room)
    socket = io(ENDPOINT)
    console.log(socket)
    socket.emit('join', {name, room}, ({error})=>{
      // console.log('event', error)
    })
    return()=>{
      socket.emit('disconnection');
      socket.off();
    }
  }, [ENDPOINT, location])

  useEffect(()=>{
    socket.on('message', (message)=>{
      addMessage([...Message, message]);
    })
  }, []);

  const oneMoreComment=(message)=>{
    console.log(message, 'oneMoreComment message')
    if (message){
      socket.emit('sendMessage', message, ()=>{addMessage('')})
    }
  }
  return (
    <div>
      <div className='message'>message</div>
      <div>
        <input 
        onChange={(event)=>addMessage(event.target.value)} 
        onKeyPress={(event)=>event.key==='Enter' ? oneMoreComment(event): null}  
        type="text" value={Message}/></div>
    </div>
  )
}

export default Chat
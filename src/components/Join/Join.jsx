import React from 'react'
import { Link } from 'react-router-dom';
import './Join.css'
const Join = () => {
  const [name, setName] = React.useState();
  const [room, setRoom] = React.useState();
  console.log('room', room)
  return (
    <div className='joinOuterContainer'>
      <div className='joinInnerContainer'>
        <div className='heading'>Join</div>
        <div><input palceholder='Name' className='joinInput' onChange={(event)=>setName(event.target.value)} type="text" /></div>
        <div><input placeholder='Room' className='joinInput' onChange={(event)=>setRoom(event.target.value)}  type="text" /></div>
        <Link onClick={event=>(!name|| !room) ? event.preventDefault(): null} to={`/chat?name=${name}&room=${room}`}>
            <button className='button mt-20' type='submit'>Sign in</button>
        </Link>
      </div>
    </div>
  )
}

export default Join
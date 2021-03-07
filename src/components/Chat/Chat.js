
import { useEffect, useState } from 'react';
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'
import InfoBar from '../InfoBar/InforBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import { useHistory } from 'react-router';
import TextContainer from '../TextContainer/TextContainer';
const ENDPOINT = 'https://react-chat-app-ki.herokuapp.com/';
let socket;

const Chat = ({location}) => {
    let history = useHistory();
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([]);


    useEffect(()=>{
        const {name,room} = queryString.parse(location.search);
        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);
        
        socket.emit('join',{name,room},(error)=>{
            if(error){
                alert(error);
                return history.push('/');
            }
        });

        return ()=>{
            socket.emit('disconnect');
            socket.off();
        }

    },[ENDPOINT,location.search])

    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages([...messages,message]);
        });
        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });
    },[messages]);

    const sendMessage =(event)=>{
        event.preventDefault();
        if(message){
            socket.emit('sendMessage',message,()=>setMessage(''));
        }
    }
    console.log(message,messages);
    return ( 
       
            <div className="outerContainer">
                <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                 <Input setMessage={setMessage} sendMessage={sendMessage} message={message} />
                </div>
                <TextContainer users={users}/>
            </div>
        
     );
}
 
export default Chat; 
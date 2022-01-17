import React,{useState,useEffect} from 'react'
import './Chat.css'
import { Avatar,IconButton } from '@material-ui/core' 
import { AttachFile,MoreVert ,SearchOutlined,Mic,InsertEmoticon } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import db from './firebase'

const Chat = () => {

    const [input,setInput] = useState('');
    const [seed,setSeed] = useState('');
    const {roomId} = useParams();
    const [roomName,setRoomName] = useState("");

    useEffect(()=>{
        if(roomId){
            db.collection('rooms')
            .doc(roomId)
            .onSnapshot(snapshot => setRoomName(snapshot.data().name));
            setSeed(Math.floor(Math.random()*5000))
        }
    },[roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, []);

    function sendMessage(e){
        e.preventDefault()
        console.log('you typed ' + input);
        setInput('')
    }
    return (
        <div className='chat'>
                <div className="chat__header">
                    <Avatar src={`https://avatars.dicebear.com/api/adventurer/${seed}.svg`}/>

                    <div className="chat__headerInfo">
                        <h3>{roomName}</h3>
                        <p>Last Seen at ...</p>
                    </div>

                    <div className="chat__headerRight">
                        <IconButton>
                            <AttachFile />
                        </IconButton>
                        <IconButton>
                            <MoreVert />
                        </IconButton>  
                        <IconButton>
                            <SearchOutlined />
                       </IconButton>
                    </div>
                    
                </div>
                <div className="chat__body" id="style-2">
                      <p className={`chat__message ${true &&"chat__receiver"}`}>
                          <span className="chat__name">Heet Mistry</span>
                          Hellllo WhatsApp Here
                          <span className="chat__timeStamp">12:00</span>
                      </p>
                      <p className="chat__message">
                          <span className="chat__name">Heet Mistry</span>
                          Hellllo WhatsApp Here
                          <span className="chat__timeStamp">12:00</span>
                      </p>
                      <p className="chat__message">
                          <span className="chat__name">Heet Mistry</span>
                          Hellllo WhatsApp Here
                          <span className="chat__timeStamp">12:00</span>
                      </p>
                </div>
                <div className="chat__footer">
                    <InsertEmoticon />
                    <form onSubmit={sendMessage}>
                        <input value={input} type="text" onChange={e=>setInput(e.target.value)} placeholder='Type your Message here'/>
                        
                    </form>
                    <Mic />
                </div>
        </div>
    )
}

export default Chat

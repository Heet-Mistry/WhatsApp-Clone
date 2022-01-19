import React,{useState,useEffect} from 'react'
import './Chat.css'
import { Avatar,IconButton } from '@material-ui/core' 
import {Delete, AttachFile,MoreVert ,Mic,InsertEmoticon } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import db from './firebase'
import firebase from 'firebase/compat/app'
import { useStateValue } from './StateProvider';
import { Link,Redirect } from 'react-router-dom';

// import { mdiDelete } from '@mdi/js';
//import RestoreFromTrash from "@bit/mui-org.material-ui-icons.restore-from-trash";
//import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Chat = () => {

    const [input,setInput] = useState('');
    const [seed,setSeed] = useState('');
    const {roomId} = useParams();
    const [roomName,setRoomName] = useState("");
    const [messages,setMessages] = useState([]);
    
    const [{user},dispatch] = useStateValue();

    useEffect(()=>{
        if(roomId){
            db.collection('rooms')
            .doc(roomId)
            .onSnapshot(snapshot => setRoomName(snapshot.data().name));
            setSeed(Math.floor(Math.random()*5000))
            
            db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timestamp','asc')
            .onSnapshot((snapshot)=>{
                setMessages(snapshot.docs.map((doc)=>
                doc.data()))
            });
        }
    },[roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, []);

    function sendMessage(e){

        e.preventDefault()

        db.collection('rooms').doc(roomId).collection('messages').add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput('')
    }

    async function deleteMessage(timestamp){
        
        var msgID=2;
        await db.collection('rooms').doc(roomId).collection('messages').where("timestamp","==",timestamp).get().then((query)=>{
                query.forEach((data)=>{
                    msgID=data.id;
                });
        });
        
        //console.log(msgID);
        
        await db.collection('rooms').doc(roomId).collection('messages').doc(msgID.toString()).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    async function deleteRoom(){
    
        await db.collection('rooms').doc(roomId).delete().then(() => {
            console.log("Room successfully deleted!");
        }).catch((error) => {
            console.error("Error removing Room: ", error);
        });
        
        setRoomName("");
        setMessages([]);

        window.location.href="/rooms";
    }
    
    return (
        <div className='chat'>
                <div className="chat__header">
                    <Avatar src={`https://avatars.dicebear.com/api/adventurer/${seed}.svg`}/>

                    <div className="chat__headerInfo">
                        <h3>{roomName}</h3>
                        
                        <p>Last Seen{" "}{ new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
                    </div>

                    <div className="chat__headerRight">
                        <IconButton>
                            <AttachFile />
                        </IconButton>
                        <IconButton>
                            <MoreVert />
                        </IconButton>  
                        <IconButton onClick={deleteRoom}>
                            <Delete />
                       </IconButton>
                    </div>
                    
                </div>

                <div className="chat__body" id="style-2">
                      {
                         messages.map(message=>{
                          
                          //console.log(message.timestamp)

                          return <p key={message.timestamp} className={`chat__message ${message.name===user.displayName &&"chat__receiver"}`}>
                          <span className="chat__name">{message.name}</span>
                          <span className='chat__message__content'>{message.message}</span>
                          <span className="chat__timeStamp">{
                              new Date(message.timestamp?.toDate()).toUTCString()
                          }</span>

                          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                          <a href='#' onClick={()=>{deleteMessage(message.timestamp)}} className="delete-btn material-icons blue-color"> restore_from_trash</a>
                         </p>
                         })
                      
                      }
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

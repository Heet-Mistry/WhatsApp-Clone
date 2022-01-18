import React, { useState,useEffect } from 'react'
import './Sidebar.css'
import {Avatar,IconButton} from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ChatIcon from '@material-ui/icons/Chat'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import SidebarChat from './SidebarChat'
import db from './firebase'
import {useStateValue} from './StateProvider'

const Sidebar = () => {

    const [roomsss,setRooms]=useState([]);
    // eslint-disable-next-line no-unused-vars
    const [{user},dispatch] = useStateValue();

    useEffect(()=>{
        const unsubscribe=db.collection('rooms').onSnapshot(snapshot=>(setRooms(snapshot.docs.map(doc=>({
            id:doc.id,
            data:doc.data(),
        })))));

        return ()=>{
            unsubscribe();
        };
        
    },[]);

    //console.log(roomsss);

    return (
        <div className='sidebar'>
                <div className="sidebar__header">
                    <Avatar src={user?.photoURL} />
                    <div className="sidebar__headerRight">
                       <IconButton>
                            <DonutLargeIcon />
                        </IconButton>
                        <IconButton>
                            <ChatIcon />
                        </IconButton>  
                        <IconButton>
                            <MoreVertIcon />
                       </IconButton>
                    </div>
                </div>

                <div className="sidebar__search">
                        <div className="sidebar__searchContainer">
                            <SearchOutlined />
                            <input type="text" placeholder='Search for new  chat'/> 
                        </div> 
                </div>

                <div className="sidebar__chats" id='style-2'>
                    <SidebarChat addNewChat />
                    {roomsss.map(room=>(
                        <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                    ))}
                </div>
        </div>
    )
}

export default Sidebar

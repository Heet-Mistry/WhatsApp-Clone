import React from 'react'
import './Chat.css'
import { Avatar,IconButton } from '@material-ui/core' 
import {Delete, AttachFile,MoreVert ,Mic,InsertEmoticon } from '@material-ui/icons';


const Chattemp = () => {

 
    return (
        <div className='chat'>
                <div className="chat__header">
                    <Avatar />

                    <div className="chat__headerInfo">
                        <h3>Create a new room</h3>
                        
                        <p>Last Seen</p>
                    </div>

                    <div className="chat__headerRight">
                        <IconButton>
                            <AttachFile />
                        </IconButton>
                        <IconButton>
                            <MoreVert />
                        </IconButton>  
                        <IconButton >
                            <Delete />
                       </IconButton>
                    </div>
                    
                </div>

                <div className="chat__body" id="style-2">
                      {
                      
                      }
                </div>

                <div className="chat__footer">
                    <InsertEmoticon />
                    <Mic />
                </div>
        </div>
    )
}

export default Chattemp

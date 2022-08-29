
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { HeaderTabsColored } from './Header';
import profileImage from "./Images/Profiles/profileImage.jpg";
import { HeaderTabsProps } from "../types/HeaderProps";



const EventDetail: React.FC = () => {
    const HeaderProps: HeaderTabsProps = {
        name: "Yoshifumi Matsumoto",
        ProfileImage: profileImage,
      };

    const eventContent = 
    {
        
    }

  const { id } = useParams();
  const [post, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${id}`)
    .then(res => {
        setPosts(res.data)
    })
}, [])


  return (
    <div>
        <HeaderTabsColored {...HeaderProps} />
        <h1>イベント詳細 {id}</h1>
    </div>
  )
}

export default EventDetail
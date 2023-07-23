// import { FaAddressBook, FaAirbnb } from "react-icons/fa";
import { useState } from 'react'
import './Drawer.css';
// import { AiFillAccountBook } from "react-icons/ai";

const Drawer = () => {
    
    return (
        <div style={{width: "15%", height:"100%", float:'left', marginRight:'10px'}}>
            <ul className='side-bar'>
                <li>Note</li>
                <li>Photos</li>
                <li>Videos</li>
                <li>Archives</li>
                <li>Trash</li>
            </ul>
        </div>
    )
};

export default Drawer
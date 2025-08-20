import React, {useState} from 'react';
import { itemData } from '../data';

const ItemsDisplay = () => {
    const [items, setItems] = useState(itemData);

   
  return (
    <div className="itemSection">
        {items.map((item) => {
            return (
                <div className="gallery" >
                    <img src={item.item_img} alt={item.item_img} />
                    
                </div>
            )
        })} 

    </div>
  )
}

export default ItemsDisplay
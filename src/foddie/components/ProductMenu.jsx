import React, {useState, useEffect} from 'react';
import {API_URL} from '../api';
import { useParams } from 'react-router-dom';
import TopBar from './TopBar'; // Assuming you have a TopBar component   

const ProductMenu = () => {
    const [products, setProducts] = useState([]);

    const { firmId,firmName } = useParams(); // Get the firmId from the URL parameters
    console.log("Firm Name:", firmName);

    useEffect(() => {
        const producthandler = async () => {
            try {
                const response = await fetch(`${API_URL}/product/${firmId}/products`);
                
                const data = await response.json();
                setProducts(data.products);
                console.log("Products for firm:", data);
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);    
            }
        };
        producthandler();   
    }, [firmId]);


  return (
    <>
    <TopBar />
       <section className='productSection'>
        <h3>{firmName}</h3>
        {products.map((item) => {
            return (
                <div className="productBox" key={item._id}>
                  <div>
                    <div><strong>{item.productName}</strong></div>
                    <div>₹{item.price}</div>
                    <div>{item.description}</div>
                  </div>
                  <div className="productGroup">
                        <img src={`${API_URL}/uploads/${item.image}`} alt={item.firmName} />
                        <div className="addButton">ADD</div>
                    </div>
                </div>
            )
        })}
    </section>
    </>
  )
}

export default ProductMenu
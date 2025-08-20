import React,{useState, useEffect} from 'react';
import { API_URL } from '../api';  
import { FaRegArrowAltCircleRight } from "react-icons/fa"; 
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { MagnifyingGlass } from 'react-loader-spinner';

const Chains = () => {
    const [vendorData, setVendorData] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [loading, setLoading] = useState(true);
    

    const vendorFirmHandler = async () => {
        try {
            const response = await fetch(`${API_URL}/vendor/all-vendors`);
            const data = await response.json();
            setVendorData(data);
            console.log(data);
            setLoading(false);
        } catch (error) {
            alert("Error fetching vendor data");
            console.error("Error fetching vendor data:", error);
            setLoading(true);
        }
    }

useEffect(() => {
    vendorFirmHandler();
}, []);

const handleScroll = (direction) => {
       const gallery = document.getElementById('chainGallery');
       const scrollAmount = 500;
       if (direction === 'left') {
           gallery.scrollTo({
               left: scrollPosition - scrollAmount,
                behavior: 'smooth'
              });
       } else if (direction === 'right') {
           gallery.scrollTo({
               left: scrollPosition + scrollAmount,
                behavior: 'smooth'
              });
       }

    }

  return (
    <div className='mediaChainSection'>
       <div className="loaderSection">
        {loading && <>
          <div className="loader">
            Your 🥣 is Loading
          </div>
           <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="magnifying-glass-loading"
                wrapperStyle={{}}
                wrapperClass="Magnifying-glass-wrapper"
                glassColor='#c0efff'
                color='#e15b64'
            />
        </>
           
        }
       </div>
       <div className="btnSection">
        <button onClick={() => handleScroll("left")}>
            <FaRegArrowAltCircleLeft className='btnIcons'/>
        </button>
        <button onClick={() => handleScroll("right")}>
            <FaRegArrowAltCircleRight className='btnIcons'/>
        </button>
       </div>
      <h3>Top Restaurants in Visakhapatnam</h3>
      <section className='chainSection' id='chainGallery' onScroll={(e) => setScrollPosition(e.target.scrollLeft)} >
        
        {vendorData.vendors && vendorData.vendors.map((vendor) => {
            return (
                <div className="vendorBox" key={vendor._id}>
                   {vendor.firm.map((item) => {
                    return (<>
                        <div className="vendorItem" key={item._id}>
                            
                            {item.firmName}
                            
                        </div>
                        <div className="firmImage">
                            <img src={`${API_URL}/uploads/${item.image}`} alt={item.firmName} />
                        </div>
                        </>
                    )
                   })}
                </div>
            )
        }
        )}
    </section>
    </div>
  )
}

export default Chains
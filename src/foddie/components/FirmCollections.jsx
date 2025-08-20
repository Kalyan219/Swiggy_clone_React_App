import React, {useState, useEffect} from 'react'
import { API_URL } from '../api';
import { Link } from 'react-router-dom';

const FirmCollections = () => {
    const [firmData, setFirmData] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('All');
    const [activeCategory, setActiveCategory] = useState('all');

    const FirmDataHandler = async () => {
        try {
            const response = await fetch(`${API_URL}/vendor/all-vendors`);
            const data = await response.json(); 
            setFirmData(data.vendors);
            console.log("new firm Data", data);  
        } catch (error) {
            alert("Error fetching firm data");
            console.error("Error fetching firm data:", error);
        }
    }
    useEffect(() => {
        FirmDataHandler();
    }, []);

    const handleRegionFilter = (region,category) => {
        setSelectedRegion(region);
        setActiveCategory(category);
    }


  return (
    <>
      <h3>Restaurants with online food delivery in Visakhapatnam</h3>
      <div className="filterButtons">
        <button onClick={() => handleRegionFilter('All','all')} className={activeCategory === 'all' ? 'activeButton' : ''}>
           All
        </button>
        <button onClick={() => handleRegionFilter('South-Indian','south-indian')} className={activeCategory === 'south-indian' ? 'activeButton' : ''}>
           South-Indian
        </button>
        <button onClick={() => handleRegionFilter('North-Indian','north-indian')} className={activeCategory === 'north-indian' ? 'activeButton' : ''}>
           North-Indian
        </button>
        <button onClick={() => handleRegionFilter('Chinese','chinese')} className={activeCategory === 'chinese' ? 'activeButton' : ''}>
           Chinese
        </button>
        <button onClick={() => handleRegionFilter('Bakery', 'bakery')} className={activeCategory === 'bakery' ? 'activeButton' : ''}>
          Bakery
        </button>
      </div>
      <section className="firmSection">
        {firmData.map((vendor) => {
            return  vendor.firm.map((item) => {
                if (selectedRegion === 'All' || 
                    item.region.includes(selectedRegion.toLocaleLowerCase())
                ){
                        return (
                            <Link to= {`/products/${item._id}/${item.firmName}`} className='link' >
                                <div className="firmGroupBox" key={item._id}>
                                <div className="firmGroup">
                                    <img src={`${API_URL}/uploads/${item.image}`} alt={item.firmName} />
                                    <div className="firmOffer">
                                        {`${item.offer} off above 199`}
                                    </div>
                                </div>
                                <div className="firmDetails">
                                    <strong>
                                      {item.firmName}
                                    </strong>
                                    <div className="firmArea">{item.region.join(", ")}</div>
                                    <div className="firmArea">{item.area}</div>                                 
                                </div>  
                            </div>
                            </Link>
                        )
                    }
                
                })
            // eslint-disable-next-line no-unreachable
            return null; // Return null if no items match the filter
                
            
        })}
      </section>
    </>
  );
};

export default FirmCollections
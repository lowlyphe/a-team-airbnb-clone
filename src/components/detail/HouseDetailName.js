const HouseDetailName = ({house}) => {
    
    return (
        <h1 className="house-detail-name">{house.streetaddress} at {house.city} | Luxury {house.home_type} | Pool</h1>
    )
}

export default HouseDetailName;
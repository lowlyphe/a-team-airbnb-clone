import HouseDetailReview from "./HouseDetailReview";
import Rate from "./Rate";

const HouseDetailSub = ({ house }) => {
  return (
    <div className="house-detail-sub">
      <div className="house-detail-rating">
        <span>★ </span>
        <span>{Rate} ·</span>
        <span className="house-detail-review-button">
          <button type="button"> {HouseDetailReview} reviews</button>
          <span>· </span>
          <span className="house-detail-medal">
            <span>♟ </span>
          </span>
          <span className="house-detail-medal-title">Superhost </span>
          <span>· </span>
          <a
            href="https://www.airbnb.com/s/Belton--Texas--United-States/homes?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&flexible_trip_lengths%5B%5D=one_week&search_type=autocomplete_click&query=Belton%2C%20TX&date_picker_type=calendar&source=structured_search_input_header&price_filter_input_type=0&place_id=ChIJRXpxaQ1ARYYRcP8Fy5TVOHE"
            class="_1sikdxcl"
          >
            {house.city}, {house.state}, {house.country}
          </a>
        </span>
      </div>
    </div>
  );
};

export default HouseDetailSub;

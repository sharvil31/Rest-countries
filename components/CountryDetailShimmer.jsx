import "../CountryDetailShimmer.css";

const CountryDetailShimmer = () => {
  return (
    <div className="country-container shimmer">
      <div className="country-details-container">
        <div className="country-img"></div>
        <div className="country-info-container">
          <div className="country-name"></div>
          <div className="country-text-info">
            {Array.from({ length: 9 }).map((el, index) => {
              return (
                <div key={index} className="info-text"></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>

  );
};

export default CountryDetailShimmer;

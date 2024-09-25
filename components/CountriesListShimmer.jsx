import "../CountriesListShimmer.css";


const CountriesListShimmer = () => {
  return (
    <div className="countries-container">
      {Array.from({ length: 12 }).map((el, index) => {
        return <div key={index} className="country-card shimmer-card">
           <div className="flag-container"></div>
            <div className="card-text">
              <h3 className="card-title"></h3>
              <p></p>
              <p></p>
              <p></p>
            </div>
        </div>;
      })}
    </div>
  );
};

export default CountriesListShimmer;

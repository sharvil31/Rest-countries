import { Link } from "react-router-dom";

const CountryCard = ({name, flag, population, region, capital, data}) => {
  return (
    
    <Link to={`${name}`} className="country-card" state={data}>
       <div className='flag-container'>
        <img src={flag} alt={name + ' Flag'} />
      </div>
      <div className="country-info">
        <h3 className="country-name">{name}</h3>
        <p>
          <b>Population: </b>{population.toLocaleString('en-IN')}
        </p>
        <p>
          <b>Region: </b>{region}
        </p>
        <p>
          <b>Capital: </b>{capital}
        </p>
      </div>
    </Link>
  );
};

export default CountryCard;

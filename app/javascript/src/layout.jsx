import React, { useState } from 'react';

const Layout = (props) => {
  const [language, setLanguage] = useState('English');

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand text-danger" href="/">Airbnb</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
            </ul>
            <form className="d-flex me-3">
              <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Search" 
                aria-label="Search" 
              />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <div className="dropdown me-3">
              <button 
                className="btn btn-secondary dropdown-toggle" 
                type="button" 
                id="dropdownMenuButton" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                Language: {language}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><button className="dropdown-item" value="English" onClick={handleLanguageChange}>English</button></li>
                <li><button className="dropdown-item" value="Spanish" onClick={handleLanguageChange}>Spanish</button></li>
                <li><button className="dropdown-item" value="French" onClick={handleLanguageChange}>French</button></li>
                <li><button className="dropdown-item" value="German" onClick={handleLanguageChange}>German</button></li>
                <li><button className="dropdown-item" value="Chinese" onClick={handleLanguageChange}>Chinese</button></li>
                <li><button className="dropdown-item" value="Japanese" onClick={handleLanguageChange}>Japanese</button></li>
                <li><button className="dropdown-item" value="Italian" onClick={handleLanguageChange}>Italian</button></li>
                <li><button className="dropdown-item" value="Portuguese" onClick={handleLanguageChange}>Portuguese</button></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {props.children}
      <footer className="p-3 bg-light">
        <div>
          <p className="me-3 mb-0 text-secondary"></p>
          <ul className="list-unstyled">
            <li><a href="https://www.airbnb.com/help/article/1391/what-is-airbnb" target="_blank" rel="noopener noreferrer">What is Airbnb?</a></li>
            <li><a href="https://www.airbnb.com/help/article/1648/how-do-i-use-airbnb" target="_blank" rel="noopener noreferrer">How to Use Airbnb</a></li>
            <li><a href="https://www.airbnb.com/help/article/1858/airbnb-hosting" target="_blank" rel="noopener noreferrer">Become an Airbnb Host</a></li>
            <li><a href="https://www.airbnb.com/s/all" target="_blank" rel="noopener noreferrer">Explore Airbnb Listings</a></li>
            <li><a href="https://www.airbnb.com/help/article/1020/airbnb-experiences" target="_blank" rel="noopener noreferrer">Airbnb Experiences</a></li>
            <li><a href="https://www.airbnb.com/rooms" target="_blank" rel="noopener noreferrer">Find Unique Stays</a></li>
          </ul>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Layout;
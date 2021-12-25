import './App.css';
import React from 'react';
import axios from 'axios';
import {useState} from 'react'

function App() {
  const URL = 'http://localhost/imdb/';
  const [topresults, setTopresults] = useState([]);
  const [tarantinomovies, setTarantinomovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [actors, setActors] = useState([]);
  const [topgenres, setTopgenres] = useState([]);
  const [genresearch, setGenresearch] = useState("");

  console.log(actors)

  // Hakee 10 suosituinta elokuvaa tietokannasta
  function showTop(e) {
    e.preventDefault();
    axios.get(URL + 'top.php')
    .then((response) => {
      const json = response.data;
      setTopresults(json);
    }).catch (error => {
      if(error.response === undefined) {
        alert(error);
      } else {
        alert(error.response.data.error);
      }
    })
  }

  // Hakee Quentin Tarantinon ohjaamat elokuvat tietokannasta
  function showTarantino(e) {
    e.preventDefault();
    axios.get(URL + 'tarantino.php')
    .then((response) => {
      const json = response.data;
      setTarantinomovies(json);
    }).catch (error => {
      if(error.response === undefined) {
        alert(error);
      } else {
        alert(error.response.data.error);
      }
    })
  }

  // Hakee näyttelijöitä ja kuinka monessa elokuvassa ovat näytelleet tietokannasta
  function showActors(e) {
    e.preventDefault();
    axios.get(URL + 'search.php/' + searchTerm)
    .then((response) => {
      const json = response.data;
      setActors(json);
    }).catch (error => {
      if(error.response === undefined) {
        alert(error);
      } else {
        alert(error.response.data.error);
      }
    })
  }

  function showGenres(e) {
    e.preventDefault();
    axios.get(URL + 'genre.php/' + genresearch)
    .then((response) => {
      const json = response.data;
      setTopgenres(json);
    }).catch (error => {
      if(error.response === undefined) {
        alert(error);
      } else {
        alert(error.response.data.error);
      }
    })
  }

  return (
    <div className="container">
      <h1>Tietokantaohjelmointi harjoitus</h1>
      <div className="row">
      <h3>Näytä TOP 10 suosituimmat elokuvat</h3>
      <button onClick={showTop}>Näytä</button>
        <ul>
          {topresults.map(result => ( 
            <li>Elokuva: {result.primary_title} Arvosana: {result.average_rating}</li>
          ))}
        </ul>
      </div>
      <div className="row">
      <h3>Quentin Tarantino ohjaamat elokuvat</h3>
      <button onClick={showTarantino}>Näytä</button>
        <ul>
          {tarantinomovies.map(result => ( 
            <li>{result.primary_title}</li>
          ))}
        </ul>
      </div>
      <div className="row">
        <h3>Hae näyttelijöitä ja kuinka monessa elokuvassa he ovat näytelleet</h3>
        <form>
          <input placeholder="Hae näyttelijän nimellä" onChange={e => setSearchTerm(e.target.value)}/>
          <button onClick={showActors}>Hae</button>
        </form>
        <ul>
          {actors.map(result => ( 
            <li>Näyttelijä: {result.name_} Elokuvien määrä: {result.number_of_films}</li>
          ))}
        </ul>
      </div>
      <div className="row">
        <h3>Hae parhaimmat elokuvat genren perusteella</h3>
        <select onChange={e => setGenresearch(e.target.value)}>
          <option value="Action">Toiminta</option>
          <option value="Adventure">Seikkailu</option>
          <option value="Animation">Animaatio</option>
          <option value="Comedy">Komedia</option>
          <option value="Documentary">Dokumentti</option>
          <option value="Drama">Draama</option>
          <option value="Family">Koko perhe</option>
          <option value="Fantasy">Fantasia</option>
          <option value="Horror">Kauhu</option>
          <option value="Musical">Musikaali</option>
          <option value="Sci-Fi">Sci-Fi</option>
        </select>
        <button onClick={showGenres}>Näytä</button>
        <ul>
          {topgenres.map(result => ( 
            <li>Elokuva: {result.primary_title} Arvosana: {result.average_rating}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

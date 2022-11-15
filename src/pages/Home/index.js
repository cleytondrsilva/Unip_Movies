import { useEffect, useState, useRef } from 'react';
import { Link, redirect, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import api from '../../services/api';
import './home.css';

// URL DA API: /movie/now_playing?api_key=28fc232cc001c31e8a031f419d0a14ca&language=pt-BR

function Home(){
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [page, setPage] = useState(1);
  const carousel = useRef(null);

  //console.log(page);

  useEffect(()=>{

    async function loadFilmes(){
      const response = await api.get("movie/now_playing", {
        params:{
         api_key: "28fc232cc001c31e8a031f419d0a14ca",
         language: "pt-BR",
         page: `${page}`,
        }
      })
      //discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22
      //console.log(response.data.results.slice(0, 20));
      setFilmes(response.data.results.slice(0, 20))
      setLoading(false);

    }

    loadFilmes();

  }, [page])

  
  async function handleSearch(e){
    e.preventDefault();

    const response = await api.get("search/movie", {
      params:{
       api_key: "28fc232cc001c31e8a031f419d0a14ca",
       language: "pt-BR",
       query: `${search}`,

      }

    })
    
    setFilmes(response.data.results.slice(0,20));
    //console.log(response);

    if(response.data.results.length === 0){
      toast.error("Filme não encontrado!")
    } 

    //setSearch('');

  
  }

  if(loading){
    return(
      <div className="loadingT">
        <h2>Carregando filmes...</h2>
      </div>
    )
  }

  const handleLeftClick = () => {
    //console.log(carousel.current.offsetWidth);
    carousel.current.scrollLeft -= carousel.current.offsetWidth;
  } 
  
  const handleRightClick = () => {
    //console.log(carousel.current.offsetWidth);
    carousel.current.scrollLeft += carousel.current.offsetWidth;
  }

  return(
    <>

      <div className="container">
          <form onSubmit={handleSearch}>
              <input
                type='text'
                name='search'
                placeholder='Pesquisar'
                value={search}
                onChange={(e) => (setSearch(e.target.value))}
                />
              <button type='submit'>
                Buscar
              </button>
          </form>
          <div className="listar-filmes" ref={carousel}>
            {filmes.map((filme) => {
              return(
                <article key={filme.id}>
                  <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                  <Link to={`/filme/${filme.id}`}>Acessar</Link>
                </article>
              )
            })}
          </div>
        </div>
      {/*searchResult.length === 0 ?
        <div className="container">
          <div className="listar-filmes">
            {filmes.map((filme) => {
              return(
                <article key={filme.id}>
                  <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                  <Link to={`/filme/${filme.id}`}>Acessar</Link>
                </article>
              )
            })}
          </div>
        </div>
        :
        <div className="container">
          <div className="listar-filmes">
            {searchResult.map((filme) => {
              return(
                <article key={filme.id}>
                  <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                  <Link to={`/filme/${filme.id}`}>Acessar</Link>
                </article>
              )
            })}
          </div>
        </div> 
          */}
      <div className='containerPagination'>
        <div className='pagination'>
          <button 
            className='bntPageleft' 
            type='button' 
            onClick={() => setPage(handleLeftClick)} 
            disabled={page < 2? true : false}>
              <FaAngleLeft className='iconPagination'/>
          </button>
          <button 
            type='button' 
            onClick={() => setPage(handleRightClick)}>
              <FaAngleRight className='iconPagination'/>
          </button>
        </div>
        <div className='homeFavoritos'>
          <Link to="/favoritos">FAVORITOS</Link>
        </div>
      </div>
    </>
  )
}

export default Home;
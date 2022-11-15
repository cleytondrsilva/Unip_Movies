import { useEffect, useState } from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'

function Favoritos(){
  const [filmes, setFilmes] = useState([])

  useEffect(()=>{

    const minhaLista = localStorage.getItem("@unipmovies");
    setFilmes(JSON.parse(minhaLista) || [])

  }, [])


  function excluirFilme(id){
    let filtroFilmes = filmes.filter( (item) => {
      return (item.id !== id)
    })

    setFilmes(filtroFilmes);
    localStorage.setItem("@unipmovies", JSON.stringify(filtroFilmes) )
    toast.success("Filme removido com sucesso")
  }

  return(
    <div className="meus-filmes">
      <h1>Favoritos</h1>

      {filmes.length === 0 && <span>Você não possui nenhum filme salvo :( </span>}

      <img src={`https://image.tmdb.org/t/p/original/${filmes.backdrop_path}`} alt={filmes.title} />
      <ul>
        {filmes.map((item) => {
          return(
            <li key={item.id}>
              <span>{item.title}</span>

              <div>
                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                <button onClick={() => excluirFilme(item.id) }>Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Favoritos;
import { useEffect, useState } from "react";
import "./favoritos.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Favoritos() {
  const [filmes, setFilmes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const minhaLista = localStorage.getItem("@unipmovies");
    setFilmes(JSON.parse(minhaLista) || []);
  }, []);

  const lowerSearch = search.toLowerCase();
  const filterFilmes = filmes.filter((filme) =>
    filme.original_title.toLowerCase().includes(lowerSearch)
  );
  console.log(filterFilmes);

  function excluirFilme(id) {
    const minhaLista = localStorage.getItem("@unipmovies");
    setFilmes(JSON.parse(minhaLista) || []);

    let filtroFilmes = filmes.filter((item) => {
      return item.id !== id;
    });

    setFilmes(filtroFilmes);
    localStorage.setItem("@unipmovies", JSON.stringify(filtroFilmes));
    toast.success("Filme removido com sucesso");
  }

  return (
    <div className="container">
      <form className="formSearch">
        <input
          type="search"
          name="search"
          placeholder="Digite para pesquisar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>
          <Link to="/">Inicio</Link>
        </button>
      </form>

      <div className="listFavorite">
        <h1>LISTA DE FAVORITOS</h1>

        {filmes.length === 0 ? (
          <span>Você não possui nenhum filme salvo :( </span>
        ) : (
          filterFilmes.length === 0 && (
            <span>Este filme não está em sua lista :( </span>
          )
        )}
        <ul>
          {filterFilmes.map((item) => {
            return (
              <li key={item.id}>
                <span>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                    alt={filmes.title}
                  />
                  {item.title}
                </span>
                <div>
                  <Link to={`/filme/${item.id}`}>Detalhes</Link>
                  <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Favoritos;

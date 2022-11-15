import './header.css';
import { Link } from 'react-router-dom';

function Header(){
  
  return(
    <header>
      <Link className="logo" to="/"><img src='logo.png' alt='logotipo'/></Link>
    </header>
  )
}

export default Header;
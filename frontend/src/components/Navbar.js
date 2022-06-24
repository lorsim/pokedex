import {Link} from 'react-router-dom'

function Navbar({ user }) {
    
  const logout = () => {
      window.open("/auth/logout", "_self")
  }
    
  return (
      <div className="navbar">
          <span className="logo">
              <Link className="link" to="/">Pokedex</Link>
          </span>
          {
              user ? (
                    <ul className="list">
                        <li className="listItem">
                                {user.displayName}
                        </li>
                        <li className="listItem" onClick={logout}>Logout</li>
                    </ul>
              ) : (
                      <Link className="link" to="/login">Login</Link>
                  )
          }
      </div>
  )
}

export default Navbar
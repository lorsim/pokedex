import Facebook from '../img/Facebook.webp';

function Login() {

  const facebook =() => {
      window.open("http://localhost:5000/auth/facebook", "_self");
  }

  return (
    <div className="login">
          <h1 className="loginTitle">Login</h1>   
          <div className="wrapper">
               
                <div className="center">
                  <div className="loginButton facebook" onClick={facebook}>
                    <img src={Facebook} alt="" className="icon" />
                    Facebook
                  </div>
                </div>
              
          </div>    
    </div>
  )
}

export default Login
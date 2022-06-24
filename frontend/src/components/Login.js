import Facebook from '../img/Facebook.webp';

function Login() {

  const facebook =() => {
      window.open("/auth/facebook", "_self");
  }

  return (
    <div className="login">
          <h1 className="loginTitle">Login using Facebook</h1>   
          
         <div className="center">
            <div className="loginButton facebook" onClick={facebook}>
              <img src={Facebook} alt="" className="icon" />
              Facebook
            </div>
          </div>
              
             
    </div>
  )
}

export default Login
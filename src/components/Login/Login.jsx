import '../index.css';
import { useAuth0 } from '@auth0/auth0-react';

function Login( isAuthenticated ) {

    const { loginWithRedirect } = useAuth0();

    return(
       
        <div className="row mb-3">
            <div className="d-flex justify-content-center col-sm-12">
                <button className="signin ml-12" onClick={() => loginWithRedirect()}>Sign in</button>
            </div>
        </div>

    );
    
  }
 
  export default Login;
  

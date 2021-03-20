// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';

// function ProtectedRoute ({ component: Component, path, ...props }) {
//   return(
//     <Route path={path}>
//       {
//         () => {
//           if (props.isLoggedIn === true) {
//             return <Component {...props} />
//           } else if (props.isLoggedIn === false) {
//             return <Redirect to={{ pathname: "/sign-in", state: {noAuthRedirected: true} }} />
//           } else {
//             return null;
//           }
//         }
//       }
//     </Route>
//   );
// };

// export default ProtectedRoute;

  
import React from 'react';
import { Route, Redirect } from "react-router-dom";


const ProtectedRoute = ({component: Component, ...props}) => {
    
    return(
        <Route>
            {
                () => props.isLoggedIn ? <Component{...props}/> : <Redirect to="/sign-in"></Redirect>
            }
        </Route>
    )
}

export default ProtectedRoute;
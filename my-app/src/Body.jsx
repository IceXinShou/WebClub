import {lazy, createResource} from "solid-js";
import {Routes, Route} from "solid-app-router"

import Homepage from './Page/HomePage'
// const Homepage = lazy(() => import("./Page/HomePage"));
// import day from './Page/day'
const day = lazy(() => import("./Page/Day"));

// import App from "./App"


// function UserData({params, location, navigate, data}) {
//     const [user] = createResource(() => params.id, fetchUser);
//     return user;
// }

const Body = () => {
    return (
            <Routes>
                <Route path="/" component={Homepage}/>
                <Route path="/homepage" component={Homepage}/>
                <Route path="/page/day/:id" component={day}/>
            </Routes>
    );
};

export default Body;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import {RoutesProvider} from "./store/GlobalState";
import Team from "./pages/team/Team";
import Timer from "./pages/Timer/Timer";

export default function AppRouter() {
    return(
        <BrowserRouter>
            <RoutesProvider>
                <Routes>
                    <Route element={<Team/>} path='/team'/>
                    <Route element={<Timer/>} path='/timer'/>
                </Routes>
            </RoutesProvider>
        </BrowserRouter>
    )
}
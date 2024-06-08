import { BrowserRouter, Routes, Route } from "react-router-dom";
import {RoutesProvider} from "./store/GlobalState";
import Team from "./pages/team/Team";

export default function AppRouter() {
    return(
        <BrowserRouter>
            <RoutesProvider>
                <Routes>
                    <Route element={<Team/>} path='/team'/>
                </Routes>
            </RoutesProvider>
        </BrowserRouter>
    )
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {RoutesProvider} from "./store/GlobalState";
import Team from "./pages/team/Team";
import Timer from "./pages/Timer/Timer";
import Waiting from "./pages/Waiting/Waiting";
import Quest from "./pages/Quest/Quest";
import Cronometer from "./pages/Cronometer/Cronometer";
import Question from "./pages/Question/Question";
import Podium from "./pages/Podium/Podium";

export default function AppRouter() {
    return(
        <BrowserRouter>
            <RoutesProvider>
                <Routes>
                    <Route element={<Team/>} path='/team'/>
                    <Route element={<Timer/>} path='/timer'/>
                    <Route element={<Waiting/>} path='/waiting'/>
                    <Route element={<Quest/>} path='/quest'/>
                    <Route element={<Cronometer/>} path='/cronometer'/>
                    <Route element={<Question/>} path='/question'/>
                    <Route element={<Podium/>} path='/podium'/>
                </Routes>
            </RoutesProvider>
        </BrowserRouter>
    )
}
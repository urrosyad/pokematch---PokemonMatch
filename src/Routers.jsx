import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './startPage';
import GamePage from './GamePage';

const Routers = () => {
            return (
                        <BrowserRouter>
                                    <Routes>
                                                <Route path="/" exact element={<StartPage />} />
                                                <Route path="gameplay" element={<GamePage />} />
                                    </Routes>
                        </BrowserRouter>)
}

export default Routers;
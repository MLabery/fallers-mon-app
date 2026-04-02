import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNav from './components/layout/BottomNav';
import Home from './pages/Home';
import Actos from './pages/Actos';
import Mapa from './pages/Mapa';
import Itinerarios from './pages/Itinerarios';
import Lugares from './pages/Lugares';
import EventDetail from './pages/EventDetail';
import Perfil from './pages/Perfil';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-100 flex justify-center p-0 md:p-8 lg:p-12 items-center">
        <div className="w-full max-w-7xl bg-slate-50 h-[100dvh] md:h-[85vh] md:rounded-[48px] shadow-2xl relative flex flex-col border border-slate-200/50 overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/actos" element={<Actos />} />
              <Route path="/mapa" element={<Mapa />} />
              <Route path="/itinerarios" element={<Itinerarios />} />
              <Route path="/lugares" element={<Lugares />} />
              <Route path="/lugares/:id" element={<EventDetail />} />
              <Route path="/actos/:id" element={<EventDetail />} />
              <Route path="/perfil" element={<Perfil />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </div>
    </Router>
  );
}


export default App;


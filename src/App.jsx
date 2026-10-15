import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Battletrips from './pages/Battletrips';
import Update from './pages/Update';
import MPLS16Battletrips from './pages/MPLS16Battletrips';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Battletrips />} />
        <Route path="/update" element={<Update />} />
        <Route path="/mpls16" element={<MPLS16Battletrips />} />
        <Route path="/MPLS18Battletrips" element={<Navigate to="/" replace />} />
        <Route path="/MPLS18Battletrips/update" element={<Navigate to="/update" replace />} />
        <Route path="/MPLS17Battletrips" element={<Navigate to="/" replace />} />
        <Route path="/MPLS16Battletrips" element={<Navigate to="/mpls16" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

import React, { useEffect }  from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouteSetup from 'routes/RoutesSetup';
import Modal from "react-modal";

const App: React.FC = () => {
  // localStorage.removeItem('userProfile');
  return (
    <BrowserRouter>
      <RouteSetup/>
    </BrowserRouter>
  );
}

export default App;
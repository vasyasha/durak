import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import GameScreen from './components/GameScreen.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GameScreen />
    </StrictMode>,
);

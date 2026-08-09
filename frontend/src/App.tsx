import { useState, useEffect } from 'react';
import { Texture } from 'pixi.js';

import { loadGameTextures } from './utils.js';

import { GameScreen } from './components/GameScreen.js';



export function App() {
    const [textures, setTextures] = useState<Record<string, Texture> | null>(null);

    useEffect(() => {
        loadGameTextures().then(setTextures);
    }, []);


    if (!textures) { return <div>Loading...</div>; }
    return <GameScreen />;
}
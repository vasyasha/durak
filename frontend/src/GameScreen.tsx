import './GameScreen.css';

export type Suit = 'h' | 'd' | 'c' | 's';
export type Rank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
interface Card {
    suit: Suit;
    rank: Rank;
}

interface PlayerHandViewProps {
    shown: boolean;
    cards: Card[];
}

interface CardViewProps {
    card: Card
}



function CardView({ card }: CardViewProps) {
    return (
        <div className='card'>{`${card.suit}${card.rank}`}</div>
    );
}

function HandView({ shown, cards }: PlayerHandViewProps) {
    if (shown) { console.log('Showing hand:', cards); };
    const cardElements = cards.map(card => <CardView key={`${card.suit}${card.rank}`} card={card} />);
    return (
        <div className='player-hand'>
            {cardElements}
        </div>
    );
}

function GameScreen() {
    return (
        <div className='game-layout'>
            <HandView shown={true} cards={[{suit: 'h', rank: 6}, {suit: 's', rank: 10}]} />
        </div>
    );
}

export default GameScreen;
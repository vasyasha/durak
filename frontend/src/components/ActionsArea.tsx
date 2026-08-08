import './ActionsArea.css';

interface ActionsAreaProps {
    defending: boolean;
}

function AttackButton() {
    return (
        <button className='action-button action-button-attack'>Attack</button>
    );
}
function TransferButton() {
    return (
        <button className='action-button action-button-transfer'>Transfer</button>
    );
}

function PassButton() {
    return (
        <button className='action-button action-button-pass'>Pass</button>
    );
}
function TakeButton() {
    return (
        <button className='action-button action-button-take'>Take</button>
    );
}

export function ActionsArea({ defending }: ActionsAreaProps) {
    const topButton = defending ? <AttackButton /> : <TransferButton />;
    const bottomButton = defending ? <PassButton /> : <TakeButton />;
    return (
        <div className='actions-area'>
            {topButton}
            {bottomButton}
        </div>
    );
}
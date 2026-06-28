import type { GameState, RuleResponse, Card } from '../types/gameTypes.js';
import { RULE_PASSED } from '../config/constants.js';

// ROUND STAGE BASED CHECKING WILL BE DONE AT SOCKET LEVEL

export function canAttack(gameState: GameState, attackerInd: number, attackCards: Card[]): RuleResponse {
    // Only first attacker of the round can attack
    if (attackerInd !== gameState.firstAttackerInd) {
        const resp: RuleResponse = {
            allowed: false,
            reason: 'Not your turn to attack'
        }
        return resp
    }
    // TODO: ADD ACTUAL GAME RULE CHECKS    
    return RULE_PASSED
}
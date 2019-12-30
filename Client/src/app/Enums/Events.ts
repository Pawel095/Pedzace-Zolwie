export enum Events {
    gameReady = 'GameReady',

    getTurtlePositions = 'getTurtlePositions',
    getAiAmmount = 'getAiAmmount',
    getHuAmmount = 'getHuAmmount',
    getPlayer = 'getPlayer',
    getInitialPlayerBarData = 'getInitialPlayerBarData',
    setup = 'setup',
    playerMove = 'playerMove',

    playerBarUpdates$ = 'playerBarUpdates$',
    gameEndStatus$ = 'gameEndStatus$',
    mapUpdates$ = 'mapUpdates$',
    currentTurn$ = 'currentTurn$',
}

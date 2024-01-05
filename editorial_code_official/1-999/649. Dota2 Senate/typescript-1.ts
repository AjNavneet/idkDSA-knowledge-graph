function predictPartyVictory(senate: string): string {
    
    // Count of Each Type of Senator to check for Winner
    let rCount = senate.split('R').length - 1;
    let dCount = senate.length - rCount;

    // To mark Banned Senators
    let banned = new Array(senate.length).fill(false);

    // Ban the candidate "toBan", immediate next to "startAt"
    let ban = (toBan: string, startAt: number) => {
        // Find the next eligible senator of "toBan" type
        // On found, mark him as banned
        while (true) {
            if (senate[startAt] == toBan && !banned[startAt]) {
                banned[startAt] = true;
                break;
            }
            startAt = (startAt + 1) % senate.length;
        }
    };

    // Turn of Senator at this Index
    let turn = 0;

    // While both parties have at least one senator
    while (rCount > 0 && dCount > 0) {

        if (!banned[turn]) {
            if (senate[turn] == 'R') {
                ban('D', (turn + 1) % senate.length);
                dCount--;
            } else {
                ban('R', (turn + 1) % senate.length);
                rCount--;
            }
        }

        turn = (turn + 1) % senate.length;
    }

    // Return Winner depending on the count of each party
    return dCount == 0 ? "Radiant" : "Dire";
};
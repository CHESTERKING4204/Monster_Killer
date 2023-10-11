const ATTACK_VALUE=10;
const MONSTER_ATTACK_VALUE=14;
const STRONG_ATTACK_VALUE=17;
const HEAL_VALUE=20;

const MODE_ATTACK='ATTACK';
const MODE_STRONG_ATTACK='STRONG_ATTACK';

const LOG_EVENT_PLAYER_ATTACK='PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK='PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK='MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL='PLAYER_HEAL';
const LOG_EVENT_GAME_OVER='GAME_OVER';

let enteredValue=prompt('Enter the health of you and moster:','100');
let chosenMaxLife=parseInt(enteredValue);

if(isNaN(chosenMaxLife)|| chosenMaxLife<=0){
    chosenMaxLife=100;
}

let currentMonsterHealth=chosenMaxLife;
let currentPlayerHelth=chosenMaxLife;
let isBonusLife=true;
let battlelog=[];

function writeTolog(ev,val,monsterHealth,playerHealth){
    let logEntry={
        event:ev,
        value:val,
        //target:'MONSTER',
        finalMonsterHealth:monsterHealth,
        finalPlayerHealth:playerHealth
};

switch(ev){
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
        logEntry.target='MONSTER';
        break;
    case LOG_EVENT_PLAYER_HEAL:
        logEntry.target='PLAYER';
        break;

}

if(ev==LOG_EVENT_PLAYER_ATTACK){
                                        /*JUST A LITTLE CHANGE IN PLAN:*/
        logEntry.target='MONSTER';
    /*}else if(ev==LOG_EVENT_PLAYER_STRONG_ATTACK){
        logEntry={
            event:ev,
            value:val,
            target:'MONSTER',
            finalMonsterHealth:monsterHealth,
            finalPlayerHealth:playerHealth
        };
    }else if(ev==LOG_EVENT_PLAYER_HEAL){
                                        JUST A LITTLE CHANGE IN PLAN:
        logEntry.target='PLAYER';*/
    }else if(ev==LOG_EVENT_GAME_OVER){
        logEntry={
            event:ev,
            value:val,
            //target:'MONSTER',
            finalMonsterHealth:monsterHealth,
            finalPlayerHealth:playerHealth
        };
    }else if(ev==LOG_EVENT_MONSTER_ATTACK){
        logEntry={
            event:ev,
            value:val,
            target:'PLAYER',
            finalMonsterHealth:monsterHealth,
            finalPlayerHealth:playerHealth
        };
    }
    battlelog.push(logEntry);
}

adjustHealthBars(chosenMaxLife);

function reset(){
    let currentMonsterHealth=chosenMaxLife;
    let currentPlayerHelth=chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound(){
    let initialPlayerHealth=currentPlayerHelth;
    const playerDamage=dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHelth-=playerDamage;
    writeTolog(LOG_EVENT_MONSTER_ATTACK,playerDamage,currentMonsterHealth,currentPlayerHelth);

    if(currentPlayerHelth<=0 && isBonusLife){
        isBonusLife=false;
        currentPlayerHelth=initialPlayerHealth;
        removeBonusLife();
        setPlayerHealth(initialPlayerHealth);
        alert('You would be dead but bonus saved u!!');
    }

    if(currentMonsterHealth<=0 && currentPlayerHelth>0){
        alert('YOU WON!!');
        writeTolog(LOG_EVENT_GAME_OVER,'PLAYER_WON',currentMonsterHealth,currentPlayerHelth);
        reset();
    }else if(currentPlayerHelth<=0 && currentMonsterHealth>0){
        alert('YOU LOST!!');
        writeTolog(LOG_EVENT_GAME_OVER,'MONSTER_WON',currentMonsterHealth,currentPlayerHelth);
        reset();
    }else if(currentMonsterHealth<=0 && currentPlayerHelth<=0){
        alert('THAT\'S A FUCKING DRAW!!');
        writeTolog(LOG_EVENT_GAME_OVER,'A_DRAW',currentMonsterHealth,currentPlayerHelth);
        reset();
    }
}

function attackMonster(mode){
    const maxDamage=mode===MODE_ATTACK?ATTACK_VALUE:STRONG_ATTACK_VALUE;
    const logEvent=mode===MODE_ATTACK?LOG_EVENT_PLAYER_ATTACK:LOG_EVENT_PLAYER_STRONG_ATTACK;
    /*if(mode===MODE_ATTACK){
        maxDamage=ATTACK_VALUE;
        logEvent=LOG_EVENT_PLAYER_ATTACK
    }else if(mode===MODE_STRONG_ATTACK){
        maxDamage=STRONG_ATTACK_VALUE;
        logEvent=LOG_EVENT_PLAYER_STRONG_ATTACK
    }*/
    const damage=dealMonsterDamage(maxDamage);
    currentMonsterHealth-=damage;
    writeTolog(logEvent,damage,currentMonsterHealth,currentPlayerHelth);
    endRound();
}

function attackHandler(){
    attackMonster(MODE_ATTACK);
}

function strongAttackHandler(){
    attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler(){
    let healValue;
    if(currentPlayerHelth>=chosenMaxLife-HEAL_VALUE){
        alert('You can\'t maximize ur health than max limit!!');
        healValue=chosenMaxLife-currentPlayerHelth;
    }else{
        healValue=HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHelth+=healValue;
    writeTolog(LOG_EVENT_PLAYER_HEAL,healValue,currentMonsterHealth,currentPlayerHelth);
    endRound();
}

function playerLogHandler(){
    for(let i=0;i<3;i++){
        console.log("MYSELF SHIVANSH");
}
                                          /*just a manual allocation of the entries*/
        /*for(let i=0;i<battleLog.length;i++){
            console.log(battleLog[i]);
        }*/
        let i=0;
    for(const logEntry of battlelog){
        console.log(`#${i}`);
        for(const key in logEntry){
            console.log(`${key} ==> ${logEntry[key]}`);
        }
        i++;
    }
}

attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click',healPlayerHandler);
logBtn.addEventListener('click',playerLogHandler);


window.onload = function(){
    let Slots = [];
    let gameBoard = document.getElementById('board');
    let validClicksCount = 0;
    let mines = 0;

    //create Array with zeros
    for(let i = 1; i <= 100; i++){
        Slots[i] = 0;
    }
    //create the mines
    for(let j = 1; j <= 18 ; j++){
        let randomNum = (Math.random() * 100);
        let slotNum = Math.floor(randomNum);
        Slots[slotNum + 1] += 1;
        Slots[slotNum - 1] += 1;
        Slots[slotNum - 10] += 1;
        Slots[slotNum + 10] += 1;
        Slots[slotNum] = 'mine';
        mines++;
    }
    //create gameboard
    for(let i = 1; i <= 100; i++)
    {
        let box = document.createElement('div');
        box.setAttribute('id','slot'+i);
        box.setAttribute('class','basicSlot');
        box.setAttribute('onclick','checkIfExplode('+i+')');
        box.setAttribute('text',Slots[i]);
        gameBoard.append(box);
    }
    //on div click checks if you hit a mine, if yes -> gameover, if no -> clear box and display proximity sensor number
     checkIfExplode = function(slotNum){
        let checkedSlot = document.getElementById('slot'+slotNum);
        let arrElem = Slots[slotNum].toString();
        let mine = arrElem.slice(0,4);
        if(validClicksCount === (99-mines)){
            checkedSlot.style.backgroundColor = 'white';
            endGame("haliluah you won the game!!!!");
        }
        else if(mine === 'mine'){
            checkedSlot.style.backgroundColor = 'red';
            endGame("Game Over")
        }
        else if(checkedSlot.style.backgroundColor !== 'white'){
            validClicksCount++;
            checkedSlot.style.backgroundColor = 'white';
            addProximitySensor(slotNum);
        }
            };

    //checks how close is the div you clicked to a mine
      function addProximitySensor(slotNum){
          if(typeof Slots[slotNum] === "number" && Slots[slotNum] !== 0){
              let selectedBox = document.getElementById("slot"+slotNum);
              let num = document.createTextNode(""+Slots[slotNum]+"");
              selectedBox.append(num);
          }
      }

      function endGame(scenario){
            setTimeout(function(){alert(scenario)},200);
            setTimeout(function(){location.reload()},3000);
        }
       // flagMine = function(slotNum){
       //     let checkedSlot = document.getElementById('slot'+slotNum);
       //     checkedSlot.style.backgroundColor = 'yellow';
       // }
};
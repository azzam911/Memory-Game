
setTimeout(() => {
    
},5000)

document.querySelector(".start-buttton span").onclick = function() {
    let yourName =prompt("Enter Your Name");
    if (yourName == '' || yourName == null) {
        document.querySelector(".info-container .name span").innerHTML="Unknown";
        
    }else {
        document.querySelector(".info-container .name span").innerHTML=yourName[0].toUpperCase()+yourName.slice(1).toLowerCase();
    }

    document.querySelector(".start-buttton").remove();
}


let duration = 1000;

let containerBlocks = document.querySelector(".memory-game-blocks");

let blocks = Array.from(containerBlocks.children);

let orderRange = [...Array(blocks.length).keys()];


shafel(orderRange);

blocks.forEach((block , index) => {
    block.style.order = orderRange[index];

    block.onclick=function(){
        addclassFliped(block);
    }
});


function addclassFliped(selectedBlock) {

    

    selectedBlock.classList.add("is-flipped");

    let fillpedBlocks = blocks.filter(flipped => flipped.classList.contains("is-flipped"));

    if (fillpedBlocks.length === 2) {

        //Stop Clicking
        stopClicking()


        checkMatchedBlocks(fillpedBlocks[0], fillpedBlocks[1])
        }
}

function checkMatchedBlocks(firstBlock , secondBlock) {

    let tries = document.querySelector(".info-container .wrong-Tries span");
    
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");
        

        firstBlock.classList.add("has-matched");
        secondBlock.classList.add("has-matched");


    }else {
        setTimeout(()=>{
                tries.innerHTML = parseInt(tries.innerHTML) + 1;
                firstBlock.classList.remove("is-flipped");
                secondBlock.classList.remove("is-flipped");

            if (tries.textContent == 5) {
                let spn = document.createElement("span");
                let spnText= document.createTextNode("Game Over");
                spn.appendChild(spnText);
                let endGame = document.getElementById("ending-Game");
                endGame.appendChild(spn);
                endGame.classList.add("end-game");
                
                setTimeout(()=> {
                    location.reload();
                }, 2000)
                
            }
            
        }, duration);
    }
}

function removeFlipped(removeSelected) {
    removeSelected.forEach(blo => {
        blo.classList.remove("is-flipped");
    })
}
function stopClicking() {
    containerBlocks.classList.add("no-clicking");

    setTimeout(()=> {
        containerBlocks.classList.remove("no-clicking");
        }
        ,duration
    )
}


function shafel(arr) {
    let current = arr.length,temp;

    while (current > 0) {

    //Get Random Number
    let random = Math.floor(Math.random() * current)

    current--;
    
    temp = arr[current];
    arr[current] = arr[random];
    arr[random] = temp;

    }
    return arr;
    
}

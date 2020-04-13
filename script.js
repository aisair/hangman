let word = null;
let numberGuesses = 0;
let hits = 0;
let correct = 0;
let guessedLetters = [];
let canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");

function switchInput() {
    let radios = document.getElementsByName('category');

    if (document.getElementById("inputWord").disabled === false) { // word input is enabled
        document.getElementById("inputWord").disabled = true;
        for (let i = 0, r=radios, l=r.length; i < l;  i++){
            r[i].disabled = false;
        }
    }
    else { // radios are enabled
        document.getElementById("inputWord").disabled = false;
        for (let i = 0, r=radios, l=r.length; i < l;  i++){
            r[i].disabled = true;
        }
    }
}

function startGame() {
    numberGuesses = 0;
    guessedLetters = [];
    hits = 0;

    // Get word from player input or randomized category
    if (document.getElementById("inputWord").disabled === false) {
        word = document.getElementById("inputWord").value
    }
    else {
        let radios = document.getElementsByName("category");
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                word = randomize(radios[i].value)
            }
        }
    }

    // Hide intro div, reveal game divs
    document.getElementById("intro").hidden = true;
    document.getElementById("gameInfo").hidden = false;
    document.getElementById("game").hidden = false;

    // Create buttons
    addButtons();

    // Initialize Canvas
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    drawStand();

    // Initialize game board
    refreshBoard();
}

function addButtons() {
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    let alphabetArray = alphabet.split("");
    let parent = document.getElementById("letterInput");
    for (let i = 0; i < alphabetArray.length; i++) {
        let newButton = document.createElement("button"); // create new button
        newButton.innerHTML = alphabetArray[i]; // set button letter
        newButton.setAttribute("type", "button");
        newButton.setAttribute("onclick", "guess(\"" + alphabetArray[i] + "\")");
        newButton.setAttribute("id", "buttonLetter" + alphabetArray[i].toUpperCase());
        newButton.setAttribute("class", "letterInputButton");
        parent.append(newButton)
    }
}

function endGame(win) {
    let buttons = document.getElementsByClassName("letterInputButton");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true
    }
    if (win) {
        alert("You won!")
    }
    else {
        alert("You lost. The word was " + word + ".")
    }
}

function guess(letter) {
    numberGuesses++;
    guessedLetters.push(letter);
    document.getElementById("buttonLetter" + letter.toUpperCase()).disabled = true;
    if (word.includes(letter)) {
        correct++;
    }
    else {
        hits++;
    }
    refreshBoard();
}

function refreshBoard() {
    // word board
    let boardContent = "";
    for (let i = 0; i < word.length; i++) {
        if (guessedLetters.includes(word.charAt(i))) {
            boardContent = boardContent + word.charAt(i) + " "
        }
        else {
            boardContent = boardContent + "_ "
        }
    }
    document.getElementById("wordBoard").innerHTML = boardContent;
    // number of guesses
    document.getElementById("numberGuesses").innerHTML = numberGuesses;
    // guessed letters
    document.getElementById("guessedLetters").innerHTML = guessedLetters.join(", ");
    // hangman guy
    drawGuy(hits);
    if (hits >= 6) {
        endGame(false);
    }
    if (document.getElementById("wordBoard").innerHTML.split(" ").join("") === word) {
        endGame(true);
    }
}

function drawGuy(hits) {
    ctx.clearRect(0, 0, 500, 500);
    drawStand();
    if (hits > 0) {
        drawCircle(250, 175, 50);
        if (hits > 1) {
            drawLine(250, 225, 250, 350);
            if (hits > 2) {
                drawLine(250, 245, 175, 225);
                if (hits > 3) {
                    drawLine(250, 245, 325, 225);
                    if (hits > 4) {
                        drawLine(250, 350, 185, 425);
                        if(hits > 5) {
                            drawLine(250, 350, 315, 425);
                        }
                    }
                }
            }
        }
    }
}

function drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0,  Math.PI*2);
    ctx.stroke();
}

function drawLine(startX, startY, endX, endY) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

function drawStand() {
    drawLine(300, 450, 450, 450);
    drawLine(375, 450, 375, 80);
    drawLine(375, 80, 250, 80);
    drawLine(250, 80, 250, 125);
}

function randomize(category) { //chooses random word from large array of words
    let categories = [];
    let type; //0: verb, 1: noun, 2: adjective
    switch (category) {
        case "verb":
            type = 0;
            break;
        case "noun":
            type = 1;
            break;
        case "adjective":
            type = 2;
            break;
        default:
            type = 0;
    }
    categories[0] = ["travel", "decay", "shade", "ski", "bathe", "record", "wobble", "dare", "raise", "prefer", "radiate", "play", "prevent", "queue", "work", "attract", "reflect", "compare", "yell", "spare", "squeak", "meddle", "polish", "curl", "part", "escape", "note", "detect", "plant", "stitch", "invent", "whip", "twist", "admit", "unite", "avoid", "wander", "suggest", "scratch", "stretch", "deliver", "blind", "challenge", "knock", "share", "repair", "squeal", "grate", "battle", "explode", "announce", "tip", "trap", "suspend", "kiss", "x-ray", "rub", "float", "tap", "clip", "mine", "snow", "watch", "lock", "rejoice", "pull", "stay", "embarrass", "trust", "peep", "bare", "hope", "retire", "train", "change", "report", "shelter", "contain", "intend", "trot", "relax", "attend", "unlock", "interrupt", "sail", "moor", "buzz", "peck", "connect", "use", "strengthen", "whine", "dress", "face", "destroy", "suspect", "stain", "tire", "signal", "unfasten"];
    categories[1] = ["fly", "sneeze", "hat", "finger", "discovery", "alarm", "daughter", "temper", "comparison", "hope", "voyage", "dinosaurs", "view", "muscle", "teaching", "tail", "wren", "finger", "wood", "smash", "tongue", "mark", "song", "pollution", "cast", "pizzas", "achiever", "card", "existence", "move", "snail", "year", "laborer", "winter", "scale", "crate", "oranges", "monkey", "respect", "suit", "force", "day", "rule", "air", "donkey", "hall", "frog", "humor", "store", "scent", "twig", "trouble", "button", "exchange", "writing", "kick", "cobweb", "transport", "ghost", "collar", "education", "son", "fire", "suggestion", "knowledge", "system", "limit", "roll", "curtain", "pin", "church", "ray", "texture", "aunt", "weather", "farm", "squirrel", "veil", "seed", "waste", "top", "kitty", "wing", "bite", "shake", "vegetable", "sleep", "home", "quilt", "guide", "effect", "name", "sea", "animal", "zinc", "substance", "fang", "dogs", "liquid", "nerve"];
    categories[2] = ["nebulous", "scattered", "wet", "devilish", "certain", "agreeable", "dead", "shut", "used", "aback", "perpetual", "wakeful", "incredible", "acceptable", "adventurous", "naughty", "macho", "thoughtless", "far", "abstracted", "unsightly", "glamorous", "equal", "industrious", "remarkable", "aggressive", "miscreant", "terrific", "quarrelsome", "purring", "barbarous", "tall", "longing", "utopian", "worried", "ambiguous", "red", "broad", "domineering", "labored", "unequaled", "internal", "untidy", "whimsical", "sick", "bright", "unhealthy", "versed", "like", "imaginary", "steadfast", "cheerful", "sore", "muddled", "assorted", "whispering", "vulgar", "standing", "calm", "unkempt", "homely", "omniscient", "frail", "burly", "stereotyped", "aboard", "ill-informed", "jittery", "regular", "stingy", "jobless", "woozy", "profuse", "anxious", "fallacious", "annoyed", "fancy", "wide", "axiomatic", "dashing", "reminiscent", "wealthy", "future", "lying", "slim", "full", "plain", "mundane", "incompetent", "yellow", "obese", "mindless", "brash", "amusing", "military", "envious", "fertile", "shaky", "ten", "disgusted"];
    return categories[type][Math.floor(Math.random()*99)] //random word from the category the players chose
}
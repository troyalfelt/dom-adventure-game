/**
 * DOM Adventure Game
 */

//document.querySelector('#game').textContent = 'DOM Adventure Game';//
let sub = document.querySelector("#sub");
let input = document.querySelector("#input");
let desc = document.querySelector("#desc");
sub.addEventListener("click", () => {
  return start(input.value);
});

let bag = []
let water = false;
let goblin = true;
let fire = true;
let keyFloor = false;
let darkness = true;
let wallMask = false;
let wearingMask = false;
//item descriptions
let bread = {name : "bread", description : "A piece of stale bread, not very appetizing."};
let jug = {name : "jug", description : "An empty jug that smells of must."}
let sword = {name : "sword", description : "A finely crafted shortsword with a jewel-encrusted hilt."}
let mask = {name : "mask", description : "An eerie mask with demonic features."}
let torch = {name : "torch", description : "A crudely-made unlit torch"};
let flint = {name : "flint", description : "A small chunk of flint, good for lighting fires."}
let key = {name : "key", description : "A small key with a rusty veneer."};

//help message
let help = "I like you to structure your inputs as verb/noun. Here are the verbs I know.\nTake\nAttack\nWear\nLight\nDouse\nIf you want a description of the room again,\n type 'look around'. If you want to see your items,\ntype 'open bag'. If you want to inspect\nan item in your bag, type 'inspect *item name*.\nIf you want to go somewhere, type\n'go east/west/north/south'.";
//descriptions of rooms. I made these global variables because some events will change them.
let startRoom = {desc : "You are in a barren room with some old hay piled\nup in a corner to make an uncomfortable bed. The only furniture present is a table in the center of\nthe room with some bread and an empty jug sitting\non it. Doors are set in the wall in\nevery cardinal direction.", floor : []}

let fireRoom = {desc : "You stand in a cluttered study. Piles of books\nand papers written in language unknown to you are\npiled from the posh carpet to the stone ceiling.\nAlong one wall, a fire roars in a hearth. You can barely make out the shape of a sword that protrudes\nfrom the bellowing flames. Above the fire a box of\nflint rests on the mantle below a bizaare painting.\nA single door leads back to the west.", floor : []}

let sphinxRoom = {desc : "You feel sand under your feet as you walk in this\ndimly lit room. A rusty metal door leads to the \nnorth. A pile of unlit torches sits on the eastern\nwall.Light shines from a pair of red eyes peering out of the darkness. As your eyes adjust to the\ngloom, you make can make out the body of a crude\nmachine, built to resemble a sphinx. It opens its\nrusty jaws and a crackling voice emerges.\n\nANSWER MY RIDDLE TRAVELER.\nWHAT IS A BOX WITHOUT HINGES KEY OR LID\nYET GOLDEN TREASURE INSIDE IS HID?\nA.) A locked treasure chest!\nB.) An egg\nC.) A skull\nD.) A bottle of beer\n\n(answer with the letter)", floor : []}

let darkRoom = {desc : "This room is pitch black, perhaps unnaturally so.\nAs you strain your eyes to see anything, you \nsense something else in the room with you.\nMuted light glows from a hallway to the east.", floor : []}

let fountainRoom = {desc : "You blink furiously as you step out into sunlight.\nYou are in a beautiful, if ill-maintained, courtyard.\nBirds chirp down at you from the eaves. At the center of the\ncourtyard, a fountain bubbles merrily despite the many\ncracks running down its side. The remains of what appears to have been a stone bench sit nearby,\nin no shape to be sat on.", floor : []}

let goblinRoom = {desc : "Water drips from the cobble ceiling of this\nmusty room and drains down a rusty grate. A long hallway extends to the south.\n To the east stands an ornate archway.\nA door sits at the far west of the room. Guarding it\nis a hunched goblin, holding a scimitar far more resplendant than its wielder. \nHe makes a rude gesture at you.", floor : []}

let finalRoom = {desc : "The walls in this room are an almost blinding white,\nand are strikingly clean compared to other rooms\nyou've been in. A thick iron door with no discernible handle blocks your\nway to the east. A polished bronze placard is bolted to the wall\nnext to it that reads \nTHE MAN WHO LEAVES HERE \nMUST NOT BE THE MAN WHO ENTERED.", floor : []}

let leverRoom = {desc : "A cramped wooden room stands with a door leading eastward.\nIt is barren save for engravings on the wall.\nWISE ADVENTURER\nSOLVE MY WORD JUMBLE\nN I Y R B A", floor : []}
let currentRoom = startRoom;
//a function that handles when the player dies
const death = function(cause) {
  console.log(cause + "\n");
  console.log("Better luck next time!");
}
//a function that handles when the player wins (unlikely)
const victory = function() {
  console.log("As you approach the door while wearing the mask,\n it silently slides open and sunlight streams in.\n\nCongratulations! You've escaped your\nbizaare and pointless prison and may reintegrate into society.");
}
let x = 0;
let y = 0;
const loc = function(hor, vert) {
  if (hor === 0) {
    if (vert === 0) {
      desc.textContent = startRoom.desc;
    } else if (vert === -1) {
      desc.textContent = sphinxRoom.desc;
    } else if (vert === 1) {
      desc.textContent = goblinRoom.desc;
    }
  } else if (hor === 1) {
    if (vert === 0) {
      desc.textContent = fireRoom.desc;
    } else if (y === 1) {
      desc.textContent = finalRoom.desc;
    }
  } else if (hor === -1) {
    if (vert === 0) {
      desc.textContent = darkRoom.desc;
    } else if (vert === -1) {
      desc.textContent = fountainRoom.desc;
    } else if (vert === 1) {
      desc.textContent = leverRoom.desc;
    }
  }
}



const start = function(txt) {
  input.value = "";
  let verb = txt.split(" ")[0];
  let noun = txt.split(" ")[1];
  if (verb == "help") {
    alert(help);
  //blocks for movement
  } else if (verb == "go") {
    if (noun == "east") {
      x += 1;
      return loc(x, y);
    } else if (noun == "west") {
      x -=1;
      return loc(x, y);
    } else if (noun == "south") {
      y -= 1;
      return loc(x, y);
    } else if (noun == "north") {
      y += 1;
      return loc(x,y);
    }
  }
}//this is the last bracket//

/**
 * DOM Adventure Game
 */

//document.querySelector('#game').textContent = 'DOM Adventure Game';//
//grabbing some nodes from DOM to use
let update = document.querySelector("#update");
let sub = document.querySelector("#sub");
let input = document.querySelector("#input");
let desc = document.querySelector("#desc");
let frm = document.querySelector("#frm");
let list = document.querySelector("#list");
//global variable to disable arrow movement on loss
let loss = false;
//this submits the text in the field when you click the button
sub.addEventListener("click", () => {
  return start(input.value);
});
frm.addEventListener("submit", function(event){
  event.preventDefault();
});
//these blocks let you use arrow keys to move around
window.addEventListener("keyup", function(event){
  if (loss == false) {
    switch (event.key) {
      case "ArrowLeft":
        return start("go west");
      case "ArrowUp":
        return start("go north");
      case "ArrowRight":
        return start("go east");
      case "ArrowDown":
        return start("go south");
      case "Enter":
        return start(input.value);
    }
  }
});

//bag as empty array to track items
let bag = []
//some global variables to track events
let goblin = true;
let fire = true;
let darkness = true;
let wearingMask = false;

//item descriptions
let bread = {name : "bread", description : "A piece of stale bread, not very appetizing."};
let jug = {name : "jug", description : "An empty jug that smells of must.", water : false}
let sword = {name : "sword", description : "A finely crafted shortsword with a jewel-encrusted hilt."}
let mask = {name : "mask", description : "An eerie mask with demonic features."}
let torch = {name : "torch", description : "A crudely-made unlit torch", lit : false};
let flint = {name : "flint", description : "A small chunk of flint, good for lighting fires."}
let key = {name : "key", description : "A small key with a rusty veneer."};

//help message
let help = "I like you to structure your inputs as verb/noun. Here are the verbs I know: Take/Attack/Wear/Light/Douse If you want to see your items, type 'open bag'. If you want to inspect an item in your bag, type 'inspect *item name*. If you want to go somewhere, type 'go east/west/north/south' or use the corresponding arrow key. ";
//descriptions of rooms. I made these global variables because some events will change them.
let startRoom = {items : [bread, jug], desc : "You are in a barren room with some old hay piled up in a corner to make an uncomfortable bed. The only furniture present is a table in the center of the room with some bread and an empty jug sitting on it. Doors are set in the wall in every cardinal direction."}
let fireRoom = {items : [sword, flint], desc : "You stand in a cluttered study. Piles of books and papers written in language unknown to you are piled from the posh carpet to the stone ceiling. Along one wall, a fire roars in a hearth. You can barely make out the shape of a sword that protrudes from the bellowing flames. A box of flint rests on a rickety table. A single door leads back to the west."};
let sphinxRoom = {items : [torch], desc : "You feel sand under your feet as you walk in this dimly lit room. A rusty metal door leads to the north. A pile of unlit torches sits on the eastern wall.Light shines from a pair of red eyes peering out of the darkness. As your eyes adjust to the gloom, you make can make out the body of a crude machine, built to resemble a sphinx. It opens its rusty jaws and a crackling voice emerges. ANSWER MY RIDDLE TRAVELER. WHAT IS A BOX WITHOUT HINGES KEY OR LID YET GOLDEN TREASURE INSIDE IS HID?  A.) A locked treasure chest!  B.) An egg  C.) A skull  D.) A bottle of beer!"};
let darkRoom = {items : [], desc : "This room is pitch black, perhaps unnaturally so. As you strain your eyes to see anything, you sense something else in the room with you. Muted light glows from a hallway to the east."}
let fountainRoom = {items : [], desc : "You blink furiously as you step out into sunlight. You are in a beautiful, if ill-maintained, courtyard. Birds chirp down at you from the eaves. At the center of the courtyard, a fountain bubbles merrily despite the many cracks running down its side. The remains of what appears to have been a stone bench sit nearby, in no shape to be sat on."}
let goblinRoom = {items : [], desc : "Water drips from the cobble ceiling of this musty room and drains down a rusty grate. A long hallway extends to the south. To the east stands an ornate archway. A door sits at the far west of the room. Guarding it is a hunched goblin, holding a scimitar far more resplendant than its wielder. He makes a rude gesture at you."};
let finalRoom = {items : [], desc : "The walls in this room are an almost blinding white, and are strikingly clean compared to other rooms you've been in. A thick iron door with no discernible handle blocks your way to the east. A polished bronze placard is bolted to the wall next to it that reads THE MAN WHO LEAVES HERE MUST NOT BE THE MAN WHO ENTERED."};
let leverRoom = {items : [], desc : "A cramped wooden room stands with a door leading eastward. It is barren save for engravings on the wall. WISE ADVENTURER SOLVE MY WORD JUMBLE:    /N I Y R B A/"}
//variable to hold what room your in
let currentRoom = startRoom;
//a function that handles when the player dies
const death = function(cause) {
  loss = true;
  update.textContent = cause + " Better luck next time!";
  update.style.borderStyle = 'solid';
  update.style.borderColor = "red";
  let restart = document.createElement("input");
  //adds a button to restart and hides the button to input text
  restart.type = "submit";
  restart.value = "Restart?"
  frm.appendChild(restart);
  frm.removeChild(sub);
  frm.removeChild(input);
}
//a function that handles when the player wins (unlikely)
const victory = function() {
    update.textContent= "As you approach the door while wearing the mask, it silently slides open and sunlight streams in. Congratulations! You've escaped your bizaare and pointless prison and may reintegrate into society.";
}
//global variables that hold the player's position on an x & y grid
let x = 0;
let y = 0;
//function that takes x & y and returns a new location
const loc = function(hor, vert) {
  if (hor === 0) {
    if (vert === 0) {
      currentRoom = startRoom;
      desc.textContent = currentRoom.desc;
    } else if (vert === -1) {
      currentRoom = sphinxRoom;
      desc.textContent = currentRoom.desc;
    } else if (vert === 1) {
      currentRoom = goblinRoom;
      desc.textContent = currentRoom.desc;
    }
  } else if (hor === 1) {
    if (vert === 0) {
      currentRoom = fireRoom;
      desc.textContent = currentRoom.desc;
    } else if (y === 1) {
      currentRoom = finalRoom;
      desc.textContent = currentRoom.desc;
    }
  } else if (hor === -1) {
    if (vert === 0) {
      currentRoom = darkRoom;
      desc.textContent = currentRoom.desc;
    } else if (vert === -1) {
      currentRoom = fountainRoom;
      desc.textContent = currentRoom.desc;
    } else if (vert === 1) {
      currentRoom = leverRoom;
      desc.textContent = currentRoom.desc;
    }
  }
}
//this function executes when you push the button and tries to interpret text in the field
const start = function(txt) {
  //gets rid of text in field
  input.value = "";
  //gets rid of update txt
  update.textContent = "";
  update.style.borderStyle = 'none';
  //sets focus back to field
  input.focus();
  //this splits the input into a noun and verb
  let verb = txt.split(" ")[0].toLowerCase();
  let noun = txt.split(" ")[1];
  //shows help message
  if (verb == "help") {
    //a lot of update blocks follow this style. Updates the text content and changes the borders
    update.textContent = help;
    update.style.borderStyle = 'solid';
    update.style.borderColor = 'purple';
  //blocks for movement
  } else if (verb == "go") {
    if (noun == "east") {
      //blocks like these govern walls and other obstacles
      if (currentRoom == sphinxRoom || currentRoom == fireRoom) {
        update.textContent = "You can't go that way!";
        update.style.borderStyle = 'solid';
        update.style.borderColor = 'red';
      } else if (currentRoom == finalRoom) {
        if (wearingMask == false) {
          update.textContent = "The door won't budge.";
          update.style.borderStyle = 'solid';
          update.style.borderColor = 'red';
        } else {
          //if your wearing the mask, you win by exiting the last room
          return victory();
        }
      } else {
      //if its a valid direction, the global variable x increases and the location function is run with the new x & y
      x += 1;
      return loc(x, y);
    }
    //same structure for the other cardinal directions
    } else if (noun == "west") {
      if (currentRoom == darkRoom || currentRoom == fountainRoom || currentRoom == leverRoom || currentRoom == sphinxRoom) {
        update.textContent = "You can't go that way!";
        update.style.borderStyle = 'solid';
        update.style.borderColor = 'red';
      } else if (currentRoom == goblinRoom && goblin == true) {
        update.textContent = "The goblin lazily brandishes his sword at you. You can't go that way.";
        update.style.borderStyle = 'solid';
        update.style.borderColor = 'red';
      } else if (currentRoom == startRoom && darkness == true) {
        update.textContent = "The room is pitch black and you hear the sound of heavy breathing. You quickly retreat the way you came.";
        update.style.borderStyle = 'solid';
        update.style.borderColor = 'red';
      } else {
        x -=1;
      return loc(x, y);
    }
    } else if (noun == "south") {
      if (currentRoom == fireRoom || currentRoom == finalRoom || currentRoom == sphinxRoom || currentRoom == leverRoom || currentRoom ==fountainRoom) {
        update.textContent = "You can't go that way!";
        update.style.borderStyle = 'solid';
        update.style.borderColor = 'red';
      } else if (currentRoom == darkRoom) {
        if (bag.includes(key) == true) {
          y -= 1;
          return loc(x, y);
        } else {
          update.textContent= "The door is locked."
          update.style.borderStyle = 'solid';
          update.style.borderColor = 'red';
        }
      } else {
      y -= 1;
      return loc(x, y);
    }
    } else if (noun == "north") {
      if (currentRoom == finalRoom || currentRoom == goblinRoom || currentRoom == leverRoom || currentRoom == fireRoom) {
        update.textContent = "You can't go that way!";
        update.style.borderStyle = 'solid';
        update.style.borderColor = 'red';
      } else {
      y += 1;
      return loc(x,y);
    }
    }
    //lets player see what's in their bag
  } else if (verb == "open") {
    if (noun == "bag") {
      if (bag.length > 0) {
      let str = [];
      for (i of bag) {
        str.push(" " + i.name);
      }
      update.textContent = "In your bag you have" + str
      update.style.borderStyle = 'solid';
      update.style.borderColor = 'blue';
    } else {
      update.textContent = "You don't have anything in your bag.";
      update.style.borderStyle = 'solid';
      update.style.borderColor = 'red';
    }
  }
  //these take blocks push items into the bag if they're in the room
  } else if (verb == "take") {
    if (noun == "bread") {
      if (currentRoom.items.includes(bread) == true) {
        bag.push(bread);
        update.textContent = "You put some bread in your bag.";
        update.style.borderStyle = 'solid';
        update.style.borderColor = 'blue';
      }
    } else if (noun == "jug") {
      if (currentRoom.items.includes(jug) == true) {
        bag.push(jug);
        update.textContent = "You put the jug in your bag.";
        update.style.borderStyle = 'solid';
        update.style.borderColor = 'blue';
        //change room desc to no longer mention jug
        startRoom.desc = "You are in a barren room with some old hay piled up in a corner to make an uncomfortable bed. The only furniture present is a table in the center of the room with some bread sitting on it. Doors are set in the wall in every cardinal direction.";
      }
    } else if (noun == "water") {
      if (currentRoom == fountainRoom) {
        //this one has to check if you have the jug before you can take it
        if (bag.includes(jug) == true) {
          update.textContent = "You scoop some water out of the fountain with the jug.";
          jug.water = true;
          jug.description = "An old jug, filled to the brim with grimy water."
          update.style.borderStyle = 'solid';
          update.style.borderColor = 'blue';
        } else {
          update.textContent = "You don't have anything to carry it with.";
          update.style.borderStyle = 'solid';
          update.style.borderColor = 'red';
        }
      }
    } else if (noun == "flint") {
      if (currentRoom == fireRoom) {
        bag.push(flint);
        update.textContent = "You take a piece of flint and put it in your bag.";
        update.style.borderStyle = 'solid';
        update.style.borderColor = 'blue';
      }
    } else if (noun == "sword") {
      if (currentRoom.items.includes(sword)) {
        //checks if fire is out yet
        if (fire == true) {
          update.textContent = "As you reach for the hilt of the sword, the red flames lash out at you unnaturally. You pull your hand away.";
          update.style.borderStyle = 'solid';
          update.style.borderColor = 'red';
        } else {
          bag.push(sword);
          update.textContent = "You pull the sword from the smoldering logs.";
          fireRoom.desc = "You stand in a cluttered study. Piles of books and papers written in language unknown to you are piled from the posh carpet to the stone ceiling. Along one wall, a pile of damp logs smolder in a hearth. A box of flint rests on a rickety table. A single door leads back to the west."
          update.style.borderStyle = 'solid';
          update.style.borderColor = 'blue';
        }
      }
    } else if (noun == "key") {
      if (currentRoom.items.includes(key)) {
          bag.push(key);
          update.textContent = "You place the key in your bag.";
          update.style.borderStyle = 'solid';
          update.style.borderColor = 'blue';
          sphinxRoom.desc = "You feel sand under your feet as you walk in this dimly lit room. A rusty metal door leads to the north. A pile of unlit torches sits on the eastern wall. The mechanical sphinx sits motionless.";

        }
    } else if (noun == "torch") {
      if (currentRoom.items.includes(torch)) {
        bag.push(torch);
        update.textContent = "You place the torch in your bag.";
        update.style.borderStyle = 'solid';
        update.style.borderColor = 'blue';
      }
    } else if (noun == "mask") {
      if (currentRoom.items.includes(mask)) {
        bag.push(mask);
        update.textContent = "You place the mask in your bag.";
        update.style.borderStyle = 'solid';
        update.style.borderColor = 'blue';
      }
    }
  } else if (verb == "light" && noun == "torch") {
    //checks for both flint and torch in bag
    if (bag.includes(torch) == true) {
      if (bag.includes(flint) == true) {
        torch.lit = true;
        update.textContent = "You strike the flint against the stone walls and ignite the torch.";
        darkness = false;
        //change desc of torch now its lit
        torch.description = "The rough torch crackles with bright flames.";
        //change desc of darkroom now you can see
        darkRoom.desc = "The stone cell is now lit by your torch. Bizarre claw marks cover the walls and ceiling, leading to a hole too small for a person to squeeze through. To the south lies a large red door. To the east is a hallway filled with torchlight.";
        update.style.borderStyle = 'solid';
        update.style.borderColor = 'blue';
      } else {
        update.textContent = "You don't have anything to light it with.";
        update.style.borderStyle = 'solid';
        update.style.borderColor = 'red';
      }
    }
  } else if (verb == "attack" && noun == "goblin" && goblin == true && currentRoom == goblinRoom) {
    //checks for sword in bag
    if (bag.includes(sword) == true) {
    goblin = false;
    update.textContent = "You raise your sword and charge toward the oafish goblin. His eyes grow wide with alarm and he shrieks, pulling the grate open and scurrying into the depths below. He locks the grate behind him."
    update.style.borderStyle = 'solid';
    update.style.borderColor = 'blue';
    goblinRoom.desc = "Water drips from the cobble ceiling of this musty room and drains down a rusty grate. A door sits at the far west of the room. An ornate archway leads to the east. A long hallway leads south.";
    //if you have no sword, you die
    } else {
      return death("As you charge at the goblin, he raises his sword an braces his feet. You impale yourself with minimal effort on his part.")
    }
    //this block is for incorrect answers to the sphinx
  } else if (verb === "a" || verb === "c" || verb === "d") {
    if (currentRoom == sphinxRoom) {
      return death("The sphinx raise off its corroded haunches with suprising speed and sinks its rusted claws into you.")
    }
    //this is correct answer
  } else if (verb === "b" && currentRoom == sphinxRoom) {
    //key can now be taken
    sphinxRoom.items.push(key);
    update.textContent = "The sphinx mechanical head spins around disturbingly as a raspy buzzer sound emanates from its maw. It stops abruptly, then spits out a red key and returns to its rest.";
    update.style.borderStyle = 'solid';
    update.style.borderColor = 'blue';
    sphinxRoom.desc = "You feel sand under your feet as you walk in this dimly lit room. A rusty metal door leads to the north. A pile of unlit torches sits on the eastern wall. The mechanical sphinx sits motionles with a rusty key at its feet.";
  //this is for a successful word jumble
  } else if (verb == "binary" && currentRoom == leverRoom) {
    leverRoom.items.push(mask);
    update.textContent = "You hear a distinctive grinding sound as the panel in the southern wall reveals an ornate mask.";
    update.style.borderStyle = 'solid';
    update.style.borderColor = 'blue';
    leverRoom.desc = "The room is mostly barren except for an indent in the wall which holds an ornate mask.";
  //for putting out fire
  } else if (verb == "douse" && noun == "fire" && currentRoom == fireRoom) {
    //checks if you have water
    if (jug.water == true) {
      fire = false;
      update.textContent = "You pour water from the jug onto the flames, extinguishing them with a hiss."
      update.style.borderStyle = 'solid';
      update.style.borderColor = 'blue';
      fireRoom.desc = "You stand in a cluttered study. Piles of books and papers written in language unknown to you are piled from the posh carpet to the stone ceiling. Along one wall, a pile of damp logs smolder in a hearth with a sword protruding out. A box of flint rests on a rickety table. A single door leads back to the west."
    } else {
      update.textContent = "You don't have anything to put it out with!";
    }
  } else if (verb == "wear" && noun == "mask" && bag.includes(mask) == true) {
    wearingMask = true;
    update.textContent = "You slide the mask onto your face. You feel slightly ridiculous."
    update.style.borderStyle = 'solid';
    update.style.borderColor = 'blue';
  //runs loop to check if an item is in bag and returns description
  } else if (verb == "inspect") {
    for (items in bag) {
      if (bag[items].name == noun) {
        update.textContent = bag[items].description;
        update.style.borderStyle = 'solid';
        update.style.borderColor = 'blue';
      }
    }
  //handles when the player types anything else
  } else {
    update.textContent = "I don't know what that means. Type 'help' for input options.";
    update.style.borderStyle = 'solid';
    update.style.borderColor = 'purple';
  }
}//this is the last bracket//

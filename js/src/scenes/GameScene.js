class GameScene extends Phaser.Scene {
	constructor() {
		super({
			key: "GameScene"
		});
		this.scalingAmt = 1.0;
	}
    init() {
	}
	
	preload() {
 
	}      	

    // Creation function
    create() {

        //Temporary game over trigger and point addition system.

        //**************** DELETE BELOW AFTER IMPLEMENTATION ****************
        var gameOverButton = this.add.sprite(550, 50, 'gameOverButton').setInteractive().setScale(0.25, 0.25);

        gameOverButton.setDepth(500);

        gameOverButton.on('pointerdown', (pointer) => {
			
			//stop game music and play the game over music
            gameMusic.pause();
			gameOverSound.play();
            this.scene.start("GameOverScene");
        })
		/**
		var pointIcon = this.add.sprite(450, 50, 'pointsButton').setInteractive().setScale(0.2, 0.2);

        pointIcon.setDepth(500);

        pointIcon.on('pointerdown', (pointer) => {

            playerScore += 10;
            scoreCounter.setText(scoreTitle + playerScore);
            
        })
		*/
        //**************** DELETE ABOVE AFTER IMPLEMENTATION ****************
          
        // Configure the first fire animation
        var configFire1 = {
            key: "burn1",
            frames: this.anims.generateFrameNumbers("fireAnim1", {
                start : 0,
                end : 23,
                first : 23
            }),
            frameRate: 12,
            repeat: -1,
        }
    
        // Configure the second fire animation
        var configFire2 = {
            key: 'burn2',
            frames: this.anims.generateFrameNumbers('fireAnim2', {
                start: 0,
                end: 24,
                first: 24
            }),
            frameRate: 12,
            repeat: -1
        }
   
        /* -------- Music -------- */
        titleMusic.stop();
        gameMusic = this.sound.add('game', musicConfig);
        gameMusic.play();
        fireSound = this.sound.add('fire', fireConfig);
        waterSound = this.sound.add('water', waterConfig);
        startSound = this.sound.add('start', waterConfig);   
        gameOverSound = this.sound.add('gameover', musicConfig);
        marioMusic = this.sound.add('marioMusic', marioConfig);
		chopTreeSound = this.sound.add('chopTree', waterConfig);

        // x and y coordinates stored in arrays
        var xValues = [];
        var yValues = [];
        // In theory we could force the trees to grab only one of the values from
        // the x/y arrays, thus tiling them and making them more organized. Worth considering.
                	
        // Create the tiled background
        var level = [];
        for (var y = 0; y < height; y++) {
            var row = [];
            yValues[y] += y;
            for (var x = 0; x < width; x++) {
                xValues[x] += x;
                row.push(0);
            }
            level.push(row);
        }
		
        // Initialize the starting map
        var map = this.make.tilemap({ data: level, tileWidth: 16, tileHeight: 16});
        var tileset = map.addTilesetImage('tilesDynamic');
        // Initialize the background layer
        var groundLayer = map.createBlankDynamicLayer("Ground Layer", tileset);
        // Initialize the object layer
        var objectLayer = map.createBlankDynamicLayer("Object Layer", tileset);

        // Scale up the tiles on both the background layer and object layer
        groundLayer.setScale(2);
        objectLayer.setScale(2);
    
        // Fill the background layer and object layer with a specific tile from the tileset
        groundLayer.fill(23, 0, 0, map.width, map.height);
        objectLayer.fill(23, 0, 0, map.width, map.height);

        // Call the random function on the object layer to randomize tiles
        randomObjLayer();

        // Function that randomizes tiles on the object layer 
        // (Indiviudal tile weight / total weight) determines the frequency of the tile
        function randomObjLayer() {
            objectLayer.weightedRandomize(0, 0, map.width, map.height, [
                {index: 30, weight: 17},
                {index: 67, weight: 1},
                {index: 70, weight: 1},
                {index: 89, weight: 1}
            ]);
        }

		//wild fire facts array with 20 facts, 5 will be randomly chosen
		facts = [
		'A typical year has over 9,000 forest fires in Canada.                                                 ', //1
		'An average of 2.5 million hectares of trees are burned in a year.                                     ', //2
		'The smoke released by fire can cause health problems.                                                 ', //3
		'Forest fires can burn from a rate of 0.5 km/h to 6 km/h or more.                                      ', //4
		'In the summer of 2018, three B.C cities were among the worst for air pollution in the world.      ', //5
		'Wildfires need fuel, oxygen, and heat to ignite and burn.                                             ', //6
		'On average, 40% of wildfires in British Columbia were started by humans.                              ', //7
		'Human caused wildfires attribute to: cigarettes, campfires, engines/vehicles, and more.               ', //8
		'Never leave a fire unattended before leaving the campsite.                                            ', //9
		'Call 911, a local fire department, or the park service if you notice smoke or fire.                   ', //10
		'Never discard smoking materials from moving cars or park grounds.                                     ', //11
		'All wildfires in British Columbia are investigated for its origin and cause.                          ', //12
		'Wildfires usually occur in the summer season from May to September.                                   ', //13
		'The smoke from BC\'s 2018 wildfires spread from across Canada to as far as Ireland.                   ', //14
		'Firebreaks are areas with no fuel materials that help slow forest fires.                              ', //15
		'Large wildfires can even change the weather of the surrounding area.                                  ', //16
		'Aircrafts can be used to drop water or fire retardant chemicals onto wildfires.                       ', //17
		'Crown fires are a type of wildfire that spread from tree top to tree top.                             ', //18
		'Large fires can cause a fire whirl - a whirlwind composed of wind and fire.                           ', //19
		'In 2018, the total cost of wildfire suppression was $615 million.                                     ' //20 
		];

/**uncomment this if you want to try centering the text, milestone text will have to be centered as well
facts = [
		'A typical year has over 9,000 forest fires in Canada.', //1
		'An average of 2.5 million hectares of trees are burned in a year.', //2
		'The smoke released by the fire can cause health problems.', //3
		'Forest fires can burn from a rate of 0.5 km/h to 6 km/h or more.', //4
		'In Canada, two-thirds of all forest fires are caused by humans.', //5
		'Wildfires need fuel, oxygen, and heat to ignite and burn.', //6
		'On average, 40% of wildfires in British Columbia were started by humans.', //7
		'Human caused wildfires attribute to: cigarettes, campfires, engines/vehicles, and more.', //8
		'Never leave a fire unattended before leaving the campsite.', //9
		'Call 911, a local fire department, or the park service if you notice smoke or fire.', //10
		'Never discard smoking materials from moving cars or park grounds.', //11
		'All wildfires in British Columbia are investigated for its origin and cause.', //12
		'Wildfires usually occur in the summer season from May to September.', //13
		'The smoke from BC\'s 2018 wildfires spread from across Canada to as far as Ireland.', //14
		'Firebreaks are areas with no fuel materials that help slow forest fires.', //15
		'Large wildfires can even change the weather of the surrounding area.', //16
		'Aircrafts can be used to drop water or fire retardant chemicals onto wildfires.', //17
		'Crown fires are a type of wildfire that spread from tree top to tree top.', //18
		'Large fires can cause a fire whirl - a whirlwind composed of wind and fire.', //19
		'In 2018, the total cost of wildfire suppression was $615 million.' //20 
		];
*/
		//to shuffle the facts array
		function shuffle(array) {
			var currentIndex = array.length, temporaryValue, randomIndex;

			// While there remain elements to shuffle...
			while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
			}
			return array;
		}

		shuffle(facts);

        // Set the camera location
        this.cameras.main.setBounds(0, 0, groundLayer.width, groundLayer.height);    
        this.cameras.main.setBounds(0, 0, groundLayer.width, groundLayer.height);	    
                
        // Create the boundaries of the game
        var bounds = new Phaser.Geom.Rectangle(20, 20, 780, 560);

        // Creating container variables
        var treeContainer = this.add.container(0, 0).setName('treeContainer');
        window['Container1'] = treeContainer;
        var containerNum = 1;
     
        // Configure the first fire animation
        this.anims.create(configFire1);
    
        //Configure the second fire animation
        this.anims.create(configFire2);
    
        // Get the x and y values for the trees
        arrangeTrees(bounds);

		var textStyle = {fontSize: '16pt', fontFamily: 'VT323', fill: 'white', backgroundColor: 'black', align: 'center'};
         
		// Create score counter
        scoreCounter = this.add.text(10, 10, scoreTitle + playerScore, {fontSize: '24pt', fontFamily: 'VT323', fill: 'white'});
        textHolder = this.add.text(0, 580, "default");
		textHolder.setStyle({
        fontSize: '16pt',
        fontFamily: 'VT323',
        color: '#ffffff',
		display: 'block',
		//align center does not work...
        //align: 'center', 
        backgroundColor: 'black',
      });
	  
		//textHolder.setOrigin(0.5);
		//textHolder.setX(200);
		
		//hides it from view before any facts are shown
		textHolder.visible = false;

        // For loop to create trees
        for (let i = 0; i < 200; i++) {
            // Create a tree and add it to the window
            var tree = this.add.sprite(treeArr[i].x, treeArr[i].y, 'tree1').setName('Sprite' + i);	
            var burntTree = this.add.sprite(treeArr[i].x, treeArr[i].y, 'burntTree').setName('Burnt' + i);
            burntTree.setInteractive({ cursor: 'url(assets/sprites/saw.cur), pointer' });
        	
            burntTree.visible = false;
        
            burntTree.setInteractive();
        
            // Creating containers for each individual tree
            // (May be unnecessary but it's working for now so I won't remove it)
            if (i > 0 && i % 8 === 0) {
                treeContainer = this.add.container(0, 0).setName('treeContainer' + containerNum);
                treeContains.push(treeContainer);
                window['treeContainer' + containerNum] = treeContainer;
                containerNum++;
            }
        
            // Add the tree to the containers array (will likely be removed eventually)
            treeContains.push(tree);    
        
            // Generate either 1 or 2 to choose the fire type
            var fireType = Math.floor(Math.random() * 2);
        
            // If the first fire type, add it
            if (fireType == 0) {
          
                // Makes fire on the tree
                fire = this.add.sprite(treeArr[i].x, treeArr[i].y, 'fireAnim1').setName('Fire' + i);
                fire.setInteractive({ cursor: 'url(assets/sprites/cursor2.cur), pointer' });
                
                // Animate the fire
                fire.anims.play("burn1");
				
            // If the second fire type, add it
            } else if (fireType == 1) {
            
                // Makes fire on the tree
                fire = this.add.sprite(treeArr[i].x, treeArr[i].y, 'fireAnim2').setName('Fire' + i);
               	fire.setInteractive({ cursor: 'url(assets/sprites/cursor2.cur), pointer' });
            
                // Animate the fire
                fire.anims.play("burn2");	
					
            // Otherwise, in case of a weird number, add the first one
            } else {
				
                // Makes fire on the tree
                fire = this.add.sprite(treeArr[i].x, treeArr[i].y, 'fireAnim').setName('Fire' + i);
                fire.setInteractive({ cursor: 'url(assets/sprites/cursor2.cur), pointer' });
        
                // Animate the fire
                fire.anims.play("burn1");
            }
        
            // Set the fire to be clickable
            fire.setInteractive();
         
            // Set the fire to be invisibile (it will be visible when it spawns later)
            fire.visible = false;
        
            // Push the new fire to the fire array
            fireArr.push(fire);
        
            // Add the tree, burnt tree, fire and x/y values to the array
            allTrees.push({
                tree: tree,
                burnt: burntTree,
                fire: fire,
                shroom: null,
                deadShroom: null,
                x: treeArr[i].x,
                y: treeArr[i].y
            });
        }
        
        this.children.bringToTop(scoreCounter);
		this.children.bringToTop(textHolder);
		this.children.bringToTop(allTrees.burnt);
    }

    // Arrange the trees using the boundaries
    arrangeTrees(bounds) {
    
        // For the amount of trees you want (200 atm)
        for (let i = 0; i < 200; i++) {
        
            // Get random x and y values
            var x = Phaser.Math.Between(bounds.left, bounds.right);
            var y = Phaser.Math.Between(bounds.top, bounds.bottom);
        
            // Push these values to an array
            treeArr.push({
                x: x,
                y: y
            });
        
            // Then sort the trees by y values
            sortTrees(treeArr[0], treeArr[i]);    
        }
    }

    // Update function, repeats indefinitely
    update() {
    
        // Variable to see what fire is being clicked
        var clickedFire;
        
        // Variable for 'this'
        var th = this;

        // If the game has started
        if (start && !((removedTreeCount + currentFireCount) == 200)) {
			
		//milestone/trophy announcements for the player
		if(!readingToolTip) {
			if(playerScore >= 100 && !trophyTenFin) {
				textHolder.setText("You have saved 10 trees!                                                                                         ");
				th.children.bringToTop(textHolder);
				console.log("should be saying you have saved 10 trees");
				trophyStatus = true;
				
				if(playerScore == 120) { //2 trees after
					setBlank();
					console.log("should be setting trophy 10 blank");
					trophyStatus = false;
					trophyTenFin = true; //do not show this announcement anymore
				}	
			}
			if(playerScore >= 200 && !trophyTwentyFin) {
				textHolder.setText("You have saved 20 trees, keep going!                                                                              ");
				th.children.bringToTop(textHolder);
				console.log("should be saying you have saved 20 trees");
				trophyStatus = true;
				
				if(playerScore == 230) { //3 trees after
					setBlank();
					console.log("should be setting trophy 20 blank");
					trophyStatus = false;
					trophyTwentyFin = true; //do not show this announcement anymore
				}	
			}
			/**
			if(playerScore >= 300 && !trophyThirtyFin) {
				textHolder.setText("Wow! You have saved 30 trees!                                                                                     ");
				th.children.bringToTop(textHolder);
				console.log("should be saying you have saved 30 trees");
				trophyStatus = true;
			    if(playerScore == 340) { //4 trees after
					setBlank();
					console.log("should be setting trophy 30 blank");
					trophyStatus = false;
					trophyThirtyFin = true; //do not show this announcement anymore
				}
			}
			*/
			if(playerScore >= 400 && !trophyFourtyFin) {
				textHolder.setText("Holy smokes, you have saved 40 trees!                                                                              ");
				th.children.bringToTop(textHolder);
				console.log("should be saying you have saved 40 trees");
				trophyStatus = true;
				
				if(playerScore == 440) { //4 trees after
					setBlank();
					console.log("should be setting trophy 40 blank");
					trophyStatus = false;
					trophyFourtyFin = true; //do not show this announcement anymore
				}
			}
			/**
			if(playerScore >= 500 && !trophyFiftyFin) {
				textHolder.setText("Amazing, you have saved 50 trees!                                                                                  ");
				th.children.bringToTop(textHolder);
				console.log("should be saying you have saved 50 trees");
				trophyStatus = true;
				if(playerScore == 550) { //5 trees after
					setBlank();
					console.log("should be setting trophy 50 blank");
					trophyStatus = false;
					trophyFiftyFin = true; //do not show this announcement anymore
				}
			}
			*/
			if(playerScore >= 600 && !trophySixtyFin) {
				textHolder.setText("Amazing! You have saved 60 trees!                                                                    ");
				th.children.bringToTop(textHolder);
				console.log("should be saying you have saved 60 trees");
				trophyStatus = true;
				
				if(playerScore == 650) { //5 trees after
					setBlank();
					console.log("should be setting trophy 60 blank");
					trophyStatus = false;
					trophySixtyFin = true; //do not show this announcement anymore	
				}
			}
			/**
			if(playerScore >= 700 && !trophySeventyFin) {
				textHolder.setText("You are a firefighter, 70 trees have been saved!                                                                   ");
				th.children.bringToTop(textHolder);
				console.log("should be saying you have saved 70 trees");
				trophyStatus = true;
				if(playerScore == 750) { //5 trees after
					setBlank();
					console.log("should be setting trophy 70 blank");
					trophyStatus = false;
					trophySeventyFin = true; //do not show this announcement anymore
				}
			}
			*/
			if(playerScore >= 800 && !trophyEightyFin) {
				textHolder.setText("Unbelievable! You have saved 80 trees!                                           ");
				th.children.bringToTop(textHolder);
				console.log("should be saying you have saved 80 trees");
				trophyStatus = true;
				
				if(playerScore == 850) { //5 trees after
					setBlank();
					console.log("should be setting trophy 80 blank");
					trophyStatus = false;
					trophyEightyFin = true; //do not show this announcement anymore
				}
			}
			/**
			if(playerScore >= 900 && !trophyNinetyFin) {
				textHolder.setText("Unbelievable! You have saved 90 trees!                                                                             ");
				th.children.bringToTop(textHolder);
				console.log("should be saying you have saved 90 trees");
				trophyStatus = true;
				if(playerScore == 950) { //5 trees after
					setBlank();
					console.log("should be setting trophy 90 blank");
					trophyStatus = false;
					trophyNinetyFin = true; //do not show this announcement anymore
				} 
			}
			*/
			if(playerScore >= 1000 && !trophyHunFin) {
				textHolder.setText("You have saved the forest, 100 trees and counting!                                                        ");
				th.children.bringToTop(textHolder);
				console.log("should be saying you have saved 100 trees");
				trophyStatus = true;
				
				if(playerScore == 1100) { //10 trees after 
					setBlank();
					console.log("should be setting trophy 100 blank");
					trophyStatus = false;
					trophyHunFin = true; //do not show this announcement anymore
				}
			}
		}
		
            // When a fire is clicked
            this.input.on('gameobjectdown', function(pointer, fire) {
			 
                // Set the clickedFire variable (may be unnecessary)
                clickedFire = fire;
					
				// Extinguish the fire
				extinguishFire(fire, th);			
            });
        
            // When a burnt tree is clicked
                this.input.on('gameobjectdown', function(pointer, burnt) {					
					
					//Remove the burnt tree
					removeTree(this, burnt, clickedFire);	
                });
        
            // Check what stage the user is at
            detStage();
		
            // Delay and then make the fire
            this.time.addEvent({
                delay: stageDelay,
                callback: ()=>{
                    startFires(this) // Send 'this' over so not everything has to be done in this function
                },
                loop: false // Do not loop, the update function loops by itself
            });
			
			//Mario Easter Egg
            var mKey = this.input.keyboard.addKey('M');
    
            if (mKey.isDown && !marioed) {
                marioMusic.play(marioConfig);
                titleMusic.stop();
                gameMusic.stop();
                marioed = true;
        
                for (let i = 0; i < allTrees.length; i++) {
            
                    var shroom = this.add.sprite(treeArr[i].x, treeArr[i].y, 'mushroom').setName('Shroom' + i);	
                    shroom.setScale(0.7);
            
                    var deadShroom = this.add.sprite(treeArr[i].x, treeArr[i].y, 'deadShroom').setName('deadShroom' + i);
                    deadShroom.setScale(0.7);
            
                    allTrees[i].tree.visible = false;
                    allTrees[i].shroom = shroom;
                    allTrees[i].deadShroom = deadShroom;
                    deadShroom.visible = false;
                    deadShroom.setInteractive({ cursor: 'url(assets/sprites/saw.cur), pointer' });
                }        
            }
		} else if (fireCount + removedTreeCount == 200) {
			gameOver(this);
		}
	}			
}

// Arrange the trees using the boundaries
function arrangeTrees(bounds) {
	    
    // For the amount of trees you want (200 atm)
    for (let i = 0; i < 200; i++) {
	        
        // Get random x and y values
        var x = Phaser.Math.Between(bounds.left, bounds.right);
        var y = Phaser.Math.Between(bounds.top, bounds.bottom);
	        
        // Push these values to an array
        treeArr.push({
            x: x,
            y: y
        });
	        
        // Then sort the trees by y values
        sortTrees(treeArr[0], treeArr[i]);    
    }
}

// Start making fires
// th = 'this'
function startFires(th) {
	    
    // If a fire is not currently being made
    if (!fireMaking) {
	    
        // We are now making a fire, set 'fireMaking' to true.
        // This avoids the update function making infinite fires at once.
        fireMaking = true;
	    
        // Grab a fire, any fire.
        var t = Phaser.Utils.Array.GetRandom(allTrees);
	        
        // Get the fire at the randomly chosen index
        var f = t.fire;
        
        // Make the fire visible for the user, and thus clickable.   
        f.visible = true;
			
        //Start fire sound only once
        if (fireSoundBoolean == false) {
            fireSound.play(fireConfig);
            fireSoundBoolean = true;
        }
			
        // Bring the fire to the top of the window
        th.children.bringToTop(f);
	    
        // Increase the count of total fires (includes past removed fires).
        fireCount++;
		
		// Randomly assigns a number between 1 and 2
		ran = Math.floor(Math.random() * 2 + 1);
		console.log("random is: " + ran);
		
		
		//sets text blank after a new fire pops up if a burnt tree has not showed up yet or recieving trophy
		if (readingToolTip == false && clickedBurntTree == 0 && !firstBurntTree && !trophyStatus) {
			setBlank();
			console.log("setting text blank before tool tip is displayed");
		}
		
		//sets text blank after a new fire pops up and player is not reading the tool tip or recieving trophy
		if (readingToolTip == false && clickedBurntTree >= 1 && !trophyStatus) {
			setBlank();
			console.log("typical setting text blank");
		}
		
		//re-roll random if a burnt tree is there and random is 2 so the fact index doesnt get overwritten
		while (ran == 2 && clickedBurntTree == 0 && firstBurntTree && trophyStatus) {
			ran = 1;
			console.log("new random is: " + ran); 
		}
		
		//shows tool tip only when the random is not a 3 and there's been a burnt tree
		//ran can't be 3 because it will override a fact resulting in the fact not being displayed
		if (firstBurntTree && burntTreeCounter == 0 && ran != 2) {
			if (factsLength == 4) { //workaround for tool tip not showing unless a fact has appeared first
				ran = 2; //show a fact and then the tool tip will show
			} else {	//a fact has already shown so show tool tip	
				toolTip(th);
				burntTreeCounter++;
				console.log("should be reading tool tip");
			}
		}			
		
		//1 in 2 chance of a fact popping up,
		//stops trying to display facts after all facts are displayed
		//and not while displaying a trophy
		if (ran == 2 && !readingToolTip && factsLength >= 0 && !trophyStatus) {
			
			//textHolder is initially not displayed
			textHolder.visible = true;
			
			console.log("Fact supposed to be displayed is: " + facts[factsLength]);
			
			//displays text
			updateInfo(th);
		}
        
        // Increase the current fire count.
        currentFireCount++;
	    
        // Print the fire count to console (for testing purposes)
        console.log('FireCount ' + fireCount);
	        
        // Determine how long until the next fire should pop up
        detStage();
		
		 // Activate function to replace the tree with a burnt tree after a set amount of time
		burnDelay(t, f, th);
		
		// After delay time, allow the update function to make another fire.
        setTimeout(delayFires, stageDelay);	
	}
}

//delays the amount of time a trophy is displayed for
//for some reason it only works for trophyten
//unused for now but don't delete it josh...
function delayTrophy(whichTrophy) {
	switch(whichTrophy) {
		
		case trophyTen: trophyStatus = true; //currently waiting for the trophy to finish its "run-time"
						if(playerScore == 120) { //2 trees after
							setBlank(); //can remove announcement
							console.log("should be setting trophy 10 blank");
							trophyStatus = false; //setting text blank is back to normal
							trophyTenFin = true; //do not show this announcement anymore
						}
						break;
						
		case trophyTwenty: trophyStatus = true;
						   if(playerScore == 230) { //3 trees after
								setBlank();
								console.log("should be setting trophy 20 blank");
								trophyStatus = false;
								trophyTwentyFin = true; //do not show this announcement anymore
							}
							break;
							
		case trophyThirty: trophyStatus = true;
						   if(playerScore == 330) { //3 trees after
								setBlank();
								console.log("should be setting trophy 30 blank");
								trophyStatus = false;
								trophyThirtyFin = true; //do not show this announcement anymore
							}
							break;
							
		case trophyFourty: trophyStatus = true;
							if(playerScore == 440) { //4 trees after
								setBlank();
								console.log("should be setting trophy 40 blank");
								trophyStatus = false;
								trophyFourtyFin = true; //do not show this announcement anymore
							}
							break;	
							
		case trophyFifty: trophyStatus = true;
							if(playerScore == 550) { //5 trees after
								setBlank();
								console.log("should be setting trophy 50 blank");
								trophyStatus = false;
								trophyFiftyFin = true; //do not show this announcement anymore
							}
							break;	
		case trophySixty: trophyStatus = true;
							if(playerScore == 650) { //5 trees after
								setBlank();
								console.log("should be setting trophy 60 blank");
								trophyStatus = false;
								trophySixtyFin = true; //do not show this announcement anymore	
							}
							break;
		
		case trophySeventy: trophyStatus = true;
							if(playerScore == 750) { //5 trees after
								setBlank();
								console.log("should be setting trophy 70 blank");
								trophyStatus = false;
								trophySeventyFin = true; //do not show this announcement anymore
							}
							break;
							
		case trophyEighty: trophyStatus = true;
							if(playerScore == 850) { //5 trees after
								setBlank();
								console.log("should be setting trophy 80 blank");
								trophyStatus = false;
								trophyEightyFin = true; //do not show this announcement anymore
							}
							break;
							
		case trophyNinety: trophyStatus = true;
							if(playerScore == 950) { //5 trees after
								setBlank();
								console.log("should be setting trophy 90 blank");
								trophyStatus = false;
								trophyNinetyFin = true; //do not show this announcement anymore
							}
							break;		

		case trophyHun: trophyStatus = true;
						if(playerScore == 1100) { //10 trees after 
							setBlank();
							console.log("should be setting trophy 100 blank");
							trophyStatus = false;
							trophyHunFin = true; //do not show this announcement anymore
						}
						break;
	}
}	
							
// Dealing with the boolean for making fires
function delayFires() {    
    fireMaking = false;
}

// Determine the rate the fires will spawn
function detStage() {
	    
    // If less than 10 fires, first stage, etc.
    if (fireCount >= 0 && fireCount <= 10) {        
        stageDelay = 5000;
	    
    } else if (fireCount > 10 && fireCount <= 20) {
        stageDelay = 3000;
	    
    } else if (fireCount > 20 && fireCount <= 30) {
        stageDelay = 2000;
	   
    } else if (fireCount > 30 && fireCount <= 40) {
        stageDelay = 1000;
	       
    } else if (fireCount > 40) {
        stageDelay = 500;
	       
    } else {
        stageDelay = 5000;
    }    
}
	
// Adds a point to the player score
function addPoints(th) {
    
    playerScore += 10;
    scoreCounter.setText(scoreTitle + playerScore);
    th.children.bringToTop(scoreCounter);
}

//makes the text disappear
function setBlank() {
	textHolder.setText();
}

//displays a tool tip for chopping down a tree the first time it appears 
function toolTip(th) {
	textHolder.setText("Click on the burnt tree to chop it down, so fires do not spread faster.                        ");
	th.children.bringToTop(textHolder);
	readingToolTip = true;
	
}

//function to update the text holding the informational facts
function updateInfo(th) {
	/** text centering attempt: doesn't look centered sometimes,due to different lengths in text
	var len = facts[factsLength].length / 2;
	console.log("this len is:" + len);
	if(len < 35) {
		len += 100;
	}
	textHolder.setX(len);
	*/
	
	//display the fact and move to next index
	textHolder.setText(facts[factsLength]);
	th.children.bringToTop(textHolder);
	factsLength -= 1;
}	

// Function to sort the trees
function sortTrees() {    
    treeArr.sort((a, b) => (a.y > b.y) ? 1 : -1);
}

//function to delay the text	
function textDelay(th) {
    // Delay and then remove text
    th.time.addEvent({
        delay: 5000,
        callback: ()=>{
            setBlank()
        },
        loop: false // Do not loop, once it's removed once, it's done
    });	
}

// Extinguishes the fire
// f = the fire
function extinguishFire(f, th) {
	
    // Get the number of the fire
    var fireNumber = parseInt((f.name.replace('Fire', '')), 10);
        
    // Check to see if we're actually clicking a fire
    if (!isNaN(fireNumber)) { 

        // If the fire hasn't been put out yet, add points
        // This ensures the points are only added once
        if (f.visible == true) {
            
            // Play extinguish fire sound
            waterSound.play(waterConfig);
			
			//only get points if you are not reading the tool tip
			if(!readingToolTip) {
				// Add points to counter
				addPoints(th);
            }
			
            // Store the last extinguished fire number
            removedFires.push(fireNumber);
                    
            // Decrease the current fire count
            currentFireCount--;
        }
    
        // Now set the fire to invisible
        f.visible = false;

        // Mute the fire noise
        fireSoundBoolean = false;
        fireSound.stop();
    }
}
	
// Function to delay the burning of a tree
// t = specific index at the tree array
// f = the fire from that index
// th = 'this'
function burnDelay(t, f, th) {
    // Delay and then burn the tree
    th.time.addEvent({
        delay: 5000,
        callback: ()=>{
            burnTree(t, f)
        },
        loop: false // Do not loop, once it's burned once it's done
    });	
}

// Function to burn down a tree
// t = specific index at the tree array
// f = the fire from that index
function burnTree(t, f) {
	    
    // Get the actual tree
    var tree = t.tree;

    // Get the currently invisible burnt tree
    var burnt = t.burnt;

    // Ensure the tree isn't already burnt down
    if (burnt.visible == false) {

        // If the fire hasn't been clicked
        if (f.visible == true) {

            // Check if in Mario mode
            if (!marioed) {

                // Make the actual tree invisible
                tree.visible = false;

                // Make the burnt tree visible
                burnt.visible = true;
				
				if(firstBurntTree == false) {
					
					//a burnt tree has appeared for the first time
					firstBurntTree = true;
				}
            } else {
                
                // Make the normal mushroom invisible
                t.shroom.visible = false;
                
                // Make the sad dead mushroom visible
                t.deadShroom.visible = true;
            }
        }
    }
}
	
// Function to remove a burnt tree
// th = 'this'
// b = the burnt tree
function removeTree(th, b, f) {
	        
    // Get the number of the burnt tree
    var burntNumber = parseInt(b.name.replace('Burnt', ''), 10);
    
    var deadShroomNumber = parseInt(b.name.replace('deadShroom', ''), 10);
    
    // Ensure this is a burnt tree
    if (!isNaN(burntNumber)) {
        
        // Go through all previously extinguished fires
        for (let i = 0; i < removedFires.length; i++) {
        
            // Check to see if the fire has been extinguished yet
            if (burntNumber == removedFires[i]) {
                
                // Make the burnt tree disappear
                b.visible = false;
                
                // Increase the count of removed trees
                removedTreeCount++;
                
                // Remove the extinguished fire from the array
                removedFires.splice(i, 1);
				
				//play chopping sound
				chopTreeSound.play();
				
				//no longer reading tool tip
				readingToolTip = false;
				
				//to keep track of tool tip 
				clickedBurntTree += 1;
				
				console.log("clickedBurntTree is: " + clickedBurntTree);
            
				//removes text when user clicks on a burnt tree
				if(clickedBurntTree == 1) {
					setBlank();
					console.log("removing burnt tree inside removeTree");
				}
			}
        } 
    } else if (!isNaN(deadShroomNumber)) {
                
        // Go through all previously extinguished fires
        for (let i = 0; i < removedFires.length; i++) {
            
            // Check to see if the fire has been extinguished yet
            if (deadShroomNumber == removedFires[i]) {
                
                // Make the dead mushroom disappear
                b.visible = false;
                
                // Increase the count of removed trees/shrooms
                removedTreeCount++;
                
                // Remove the extinguished fire from the array
                removedFires.splice(i, 1);
            }
        }
    }
}

// Game over function
function gameOver(th) {
    alert("Game Over"); 
}
		
//changes color of start button on hover
function changeColor() {
    startBtn.setTint(0xa09f9f);
}
	
//changes color of start button back to normal
function revertColor() {
    startBtn.clearTint();
}
	
// Function to destroy sprites, currently unused
function destroySprite(sprite) {
    sprite.destroy();
}

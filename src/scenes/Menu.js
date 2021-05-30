class Menu extends Phaser.Scene{
    constructor(){
        super("MenuScene");
    }

    preload() {
        // Load custom bitmap font
        this.load.bitmapFont('customFont', './assets/CustomFont.png', './assets/CustomFont.fnt');
        // Load Popup
        this.load.image('popup', './assets/tempPopup.png');
        this.load.image('menubg', './assets/Intro.png');
        this.load.image('clue', './assets/Clue.png');
        // Load Music
        this.load.audio('bgm', './assets/VignetteEscapeLevelMusic.mp3');
    }

    // Function for arrows to appear on hover of a menu label (label, left arrow, right arrow)
    menuInteraction(label, marker) {
        label.setInteractive({useHandCursor: true});
        label.on("pointerover", ()=> {
            marker.setVisible(true);
            marker.x = label.x - label.width;
            marker.y = label.y;
        });
        label.on("pointerout", ()=> {
            marker.setVisible(false);
        });
    }

    openSettings() {
        // Temporarily disables menu buttons
        this.start.setVisible(false);
        this.controls.setVisible(false);
        this.settings.setVisible(false);

        // Add popup content
        var popup = this.add.group();
        var popupBack = this.add.sprite(centerWidth, centerHeight, 'popup').setOrigin(0.5);
        var text1 = this.add.bitmapText(popupBack.x, popupBack.y-100, 'customFont', "Settings", 36).setOrigin(0.5);
        var close = this.add.bitmapText(popupBack.x, popupBack.y+100, 'customFont', 'Close', 28).setOrigin(0.5);
        popup.add(popupBack);
        popup.add(text1);
        popup.add(close);

        // Set Close button interaction
        close.setInteractive({useHandCursor: true});
        close.on("pointerup", ()=> {
            popup.destroy(true);
            this.start.setVisible(true);
            this.controls.setVisible(true);
            this.settings.setVisible(true);
        });
    }

    openControls() {
        // Temporarily disables menu buttons
        this.start.setVisible(false);
        this.controls.setVisible(false);
        this.settings.setVisible(false);

        // Add popup content
        var popup = this.add.group();
        var popupBack = this.add.sprite(centerWidth, centerHeight, 'popup').setOrigin(0.5);
        var text1 = this.add.bitmapText(popupBack.x, popupBack.y-100, 'customFont', "Controls", 36).setOrigin(0.5);
        var text2 = this.add.bitmapText(popupBack.x, popupBack.y-50, 'customFont', "Move - WASD", 36).setOrigin(0.5);
        var text3 = this.add.bitmapText(popupBack.x, popupBack.y, 'customFont', "Aim - Mouse", 36).setOrigin(0.5);
        var text4 = this.add.bitmapText(popupBack.x, popupBack.y+50, 'customFont', "Throw - LEFT CLICK", 36).setOrigin(0.5);
        var close = this.add.bitmapText(popupBack.x, popupBack.y+100, 'customFont', 'Close', 28).setOrigin(0.5);
        popup.add(popupBack);
        popup.add(text1);
        popup.add(text2);
        popup.add(text3);
        popup.add(text4);
        popup.add(close);

        // Set Close button interaction
        close.setInteractive({useHandCursor: true});
        close.on("pointerup", ()=> {
            popup.destroy(true);
            this.start.setVisible(true);
            this.controls.setVisible(true);
            this.settings.setVisible(true);
        });
    }
    
    create() {
        // Set Background Image
        this.add.image(0, 0, 'menubg').setScale(0.5).setOrigin(0);


        this.menubgm = this.sound.add('bgm', {
            loop:true,
            volume: 0.5
        });
        this.menubgm.play();

        // Add Menu text
        this.title1 = this.add.bitmapText(100, 35, 'customFont', 'Vignette', 60).setOrigin(0.5).setAngle(-12);
        this.title2 = this.add.bitmapText(135, 75, 'customFont', 'Escape', 56).setOrigin(0.5).setAngle(-12);
        this.start = this.add.bitmapText(centerWidth+150, centerHeight-25, 'customFont', 'START', 35).setOrigin(0.5);
        this.settings = this.add.bitmapText(centerWidth+150, centerHeight+25, 'customFont', 'SETTINGS', 36).setOrigin(0.5);
        this.controls = this.add.bitmapText(centerWidth+150, centerHeight+75, 'customFont', 'CONTROLS', 36).setOrigin(0.5);

        // Initialize label markers
        /*
        this.markerLeft = this.add.bitmapText(0, 0, 'customFont', '>', 28).setOrigin(0.5);
        this.markerRight = this.add.bitmapText(0, 0, 'customFont', '<', 28).setOrigin(0.5);
        this.markerLeft.setVisible(false);
        this.markerRight.setVisible(false);
        */
       this.marker = this.add.image(0, 0, 'clue').setOrigin(0.5);
       this.marker.setVisible(false);

        // Set keys
        cursors = this.input.keyboard.createCursorKeys();
        
        // Initialize variables
        this.clicked = false;
        this.nextScene = false;

        // Set cursor hover interaction
        /*
        this.menuInteraction(this.start, this.markerLeft, this.markerRight);
        this.menuInteraction(this.controls, this.markerLeft, this.markerRight);
        this.menuInteraction(this.settings, this.markerLeft, this.markerRight);
        */
        this.menuInteraction(this.start, this.marker);
        this.menuInteraction(this.controls, this.marker);
        this.menuInteraction(this.settings, this.marker);
        
        // Set interaction on clicking label
        this.start.on("pointerup", ()=> {
            this.nextScene = true;
        });
        this.settings.on("pointerup", ()=> {
            this.openSettings();
        });
        this.controls.on("pointerup", ()=> {
            this.openControls();
        });
    }

    update() {
        // Go to play scene
        if (this.nextScene == true && this.clicked == false) {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                level = 1;
                this.menubgm.pause();
                this.scene.start('PlayScene');
            })
            this.clicked = true;
        }
    }
}
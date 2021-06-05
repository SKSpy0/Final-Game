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

    // Function for icon to appear on hover of a menu label (label, icon/marker)
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
    // icon appears at the selected level
    debugSelection(label, markerSettings, levelSelection) {
        label.setInteractive({useHandCursor: true});
        label.on("pointerdown", ()=> {
            level = levelSelection;
            markerSettings.x = label.x - 50;
            markerSettings.y = label.y;
        });
    }
    // initialize icon/marker position on debug popup
    initDebugMarkerPos(label, markerSettings) {
        markerSettings.x = label.x - 50;
        markerSettings.y = label.y;
    }
    openSettings() {
        // Temporarily disables menu buttons
        this.start.setVisible(false);
        this.controls.setVisible(false);
        this.settings.setVisible(false);

        // Add popup content
        var popup = this.add.group();
        var popupBack = this.add.sprite(centerWidth, centerHeight, 'popup').setOrigin(0.5);
        var text1 = this.add.bitmapText(popupBack.x, popupBack.y-100, 'customFont', "Debug", 36).setOrigin(0.5);
        var text2 = this.add.bitmapText(popupBack.x-75, popupBack.y-50, 'customFont', "Level 1", 30).setOrigin(0.5);
        var text3 = this.add.bitmapText(popupBack.x-75, popupBack.y, 'customFont', "Level 2", 30).setOrigin(0.5);
        var text4 = this.add.bitmapText(popupBack.x-75, popupBack.y+50, 'customFont', "Level 3", 30).setOrigin(0.5);
        var text5 = this.add.bitmapText(popupBack.x+75, popupBack.y-50, 'customFont', "Level 4", 30).setOrigin(0.5);
        var text6 = this.add.bitmapText(popupBack.x+75, popupBack.y, 'customFont', "Level 5", 30).setOrigin(0.5);
        var text7 = this.add.bitmapText(popupBack.x+75, popupBack.y+50, 'customFont', "Level 6", 30).setOrigin(0.5);
        var close = this.add.bitmapText(popupBack.x, popupBack.y+100, 'customFont', 'Close', 28).setOrigin(0.5);
        var markerSettings = this.add.image(0, 0, 'clue').setOrigin(0.5).setScale(0.5);
        popup.add(popupBack);
        popup.add(text1);
        popup.add(text2);
        popup.add(text3);
        popup.add(text4);
        popup.add(text5);
        popup.add(text6);
        popup.add(text7);
        popup.add(close);
        popup.add(markerSettings);
        // The initial position of the marker will be at the selected level
        this.initDebugMarkerPos(popup.getChildren()[level+1], markerSettings);
        // initialize pointer events
        this.debugSelection(text2, markerSettings, 1);
        this.debugSelection(text3, markerSettings, 2);
        this.debugSelection(text4, markerSettings, 3);
        this.debugSelection(text5, markerSettings, 4);
        this.debugSelection(text6, markerSettings, 5);
        this.debugSelection(text7, markerSettings, 6);
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
        // setting level
        level = 1;

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
        this.start = this.add.bitmapText(centerWidth+150, centerHeight-25, 'customFont', 'START', 36).setOrigin(0.5);
        this.settings = this.add.bitmapText(centerWidth+150, centerHeight+25, 'customFont', 'DEBUG', 36).setOrigin(0.5);
        this.controls = this.add.bitmapText(centerWidth+150, centerHeight+75, 'customFont', 'CONTROLS', 36).setOrigin(0.5);

        // Initialize label markers
       this.marker = this.add.image(0, 0, 'clue').setOrigin(0.5);
       this.marker.setVisible(false);

        // Set keys
        cursors = this.input.keyboard.createCursorKeys();
        
        // Initialize variables
        this.clicked = false;
        this.nextScene = false;

        // Set cursor hover interaction
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
                this.menubgm.pause();
                this.scene.start('PlayScene');
            })
            this.clicked = true;
        }
    }
}
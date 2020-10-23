////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW = 0;
var canvasH = 0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w, h) {
    var gameCanvas = document.getElementById("gameCanvas");
    gameCanvas.width =  w;
    gameCanvas.height = h;
    gameCanvas.top = -50;
    canvasW = w;
    canvasH = h;
    var particleCanvas = document.getElementById("particle-canvas");
    particleCanvas.width =  w;
    particleCanvas.height = h;
    particleCanvas.top = -50;
    canvasW = w;
    canvasH = h;
    fireWorks = new Fireworks(particleCanvas);
    
    stage = new createjs.Stage("gameCanvas");

    createjs.Touch.enable(stage);
    stage.enableMouseOver(20);
    stage.mouseMoveOutside = true;

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", tick);
}

var loadingContainer,
        loaderTrackContainer,
        loaderFillMiddle,
        loaderFillRight,
        loaderProgressText,
        loaderStartButton;

function buildLoadingPage() {
    loadingContainer = new createjs.Container();
    loaderTrackContainer = new createjs.Container();

    var loadingIcon = new createjs.Bitmap(loader.getResult('loading-icon'));
    centerReg(loadingIcon);
    loadingIcon.x = canvasW / 2;
    loadingIcon.y = (canvasH * 30) / 100;


    var lottoText = new createjs.Text();
    lottoText.font = '20px Arial';
    lottoText.color = '#fff';
    lottoText.textAlign = 'center';
    lottoText.textBaseline = 'alphabetic';
    lottoText.text = 'MORE CHANCES. MORE PRIZES. MORE REWARDS.';
    lottoText.x = canvasW / 2;
    lottoText.y = (canvasH * 50) / 100;

    var loadingText = new createjs.Text();
    loadingText.font = '20px Arial';
    loadingText.color = '#fff';
    loadingText.textAlign = 'center';
    loadingText.textBaseline = 'alphabetic';
    loadingText.text = 'NOW LOADING';
    loadingText.x = canvasW / 2;
    loadingText.y = (canvasH * 70) / 100;

    var loaderTrack = new createjs.Bitmap(loader.getResult('loader-track'));
    centerReg(loaderTrack);
    loaderTrack.x = canvasW / 2;
    loaderTrack.y = (canvasH * 78) / 100;

    var loaderFillLeft = new createjs.Bitmap(
            loader.getResult('loader-fill-left')
            );
    loaderFillLeft.regX = 0;
    loaderFillLeft.regY = loaderFillLeft.image.naturalHeight / 2;
    loaderFillLeft.x = loaderTrack.x - loaderTrack.image.width / 2;
    loaderFillLeft.y = loaderTrack.y;

    loaderFillMiddle = new createjs.Bitmap(
            loader.getResult('loader-fill-middle')
            );
    loaderFillMiddle.regX = 0;
    loaderFillMiddle.regY = loaderFillMiddle.image.naturalHeight / 2;
    loaderFillMiddle.x = loaderFillLeft.x + loaderFillLeft.image.width;
    loaderFillMiddle.y = loaderTrack.y;
    loaderFillMiddle.scaleX = 0;

    loaderFillRight = new createjs.Bitmap(loader.getResult('loader-fill-right'));
    loaderFillRight.regX = 0;
    loaderFillRight.regY = loaderFillRight.image.naturalHeight / 2;
    loaderFillRight.x = loaderFillMiddle.x;
    loaderFillRight.y = loaderTrack.y;

    loaderProgressText = new createjs.Text();
    loaderProgressText.font = '20px Arial';
    loaderProgressText.color = '#fff';
    loaderProgressText.textAlign = 'center';
    loaderProgressText.textBaseline = 'alphabetic';
    loaderProgressText.text = '0%';
    loaderProgressText.x = loaderFillRight.x;
    loaderProgressText.y = (canvasH * 79) / 100;

    loaderStartButton = new createjs.Bitmap(loader.getResult('buttonGo'));
    centerReg(loaderStartButton);
    loaderStartButton.x = canvasW / 2;
    loaderStartButton.y = (canvasH * 73) / 100;
    loaderStartButton.visible = false;
    loaderStartButton.cursor = 'pointer';
    loaderStartButton.addEventListener('click', onLoaderStartButton);
    pulseAnimation(loaderStartButton);

    loaderTrackContainer.addChild(
            loadingText,
            loaderTrack,
            loaderFillLeft,
            loaderFillMiddle,
            loaderFillRight,
            loaderProgressText
            );
    loadingContainer.addChild(
            loadingIcon,
            lottoText,
            loaderTrackContainer,
            loaderStartButton
            );

    stage.addChild(loadingContainer);
}

var guide = false;
var canvasContainer, mainContainer, popupContainer, selectContainer, gameContainer, linesContainer, planeContainer, collisionContainer, runwayContainer, levelContainer, completeContainer, statusContainer, editContainer, confirmContainer, resultContainer;
var topIcon, topIconGame, topIconPopup, guideline, bg, logo, buttonStart, buttonContinue, buttonFacebook, buttonTwitter, buttonWhatsapp, buttonFullscreen, buttonFullscreenoff, buttonSoundOn, buttonSoundOff;

$.airplane = {};
$.selectStage = {};
$.stage = {};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas() {
    canvasContainer = new createjs.Container();
    popupContainer = new createjs.Container();
    mainContainer = new createjs.Container();
    selectContainer = new createjs.Container();
    gameContainer = new createjs.Container();
    linesContainer = new createjs.Container();
    planeContainer = new createjs.Container();
    runwayContainer = new createjs.Container();
    collisionContainer = new createjs.Container();
    statusContainer = new createjs.Container();
    levelContainer = new createjs.Container();
    editContainer = new createjs.Container();
    completeContainer = new createjs.Container();
    confirmContainer = new createjs.Container();
    resultContainer = new createjs.Container();

    bg = new createjs.Bitmap(loader.getResult('background'));
    logo = new createjs.Bitmap(loader.getResult('logo'));

    $('#mainHolder').css('background-image', 'url(assets/background.png)');//code edit by pulok

    topIcon = new createjs.Bitmap(loader.getResult('topIcon'));
    topIcon.regX = topIcon.image.naturalWidth / 2;
    topIcon.regY = 0;
    topIcon.x = canvasW / 2;
    topIcon.y = topIcon.image.height / 2;

    topIconGame = new createjs.Bitmap(loader.getResult('topIcon'));
    topIconGame.regX = topIconGame.image.naturalWidth / 2;
    topIconGame.regY = 0;
    topIconGame.x = canvasW / 2;
    topIconGame.y = topIconGame.image.height / 2;

    topIconPopup = new createjs.Bitmap(loader.getResult('topIcon'));
    topIconPopup.regX = topIconPopup.image.naturalWidth / 2;
    topIconPopup.regY = 0;
    topIconPopup.x = canvasW / 2;
    topIconPopup.y = topIconPopup.image.height / 2;


    buttonStart = new createjs.Bitmap(loader.getResult('buttonStart'));
    centerReg(buttonStart);
    buttonStart.x = canvasW / 2;
    buttonStart.y = canvasH / 100 * 77;
    pulseAnimation(buttonStart);

    //select
    itemSelect = new createjs.Bitmap(loader.getResult('itemResult'));
    centerReg(itemSelect);
    itemSelect.x = canvasW / 2;
    itemSelect.y = canvasH / 2;

    buttonArrowL = new createjs.Bitmap(loader.getResult('buttonArrow'));
    centerReg(buttonArrowL);

    buttonArrowR = new createjs.Bitmap(loader.getResult('buttonArrow'));
    centerReg(buttonArrowR);

    buttonArrowL.x = canvasW / 100 * 43;
    buttonArrowL.y = canvasH / 100 * 70;
    buttonArrowL.scaleX = -1;

    buttonArrowR.x = canvasW / 100 * 57;
    buttonArrowR.y = canvasH / 100 * 70;

    selectTitleTxt = new createjs.Text();
    selectTitleTxt.font = "50px dimboregular";
    selectTitleTxt.color = "#fff";
    selectTitleTxt.textAlign = "center";
    selectTitleTxt.textBaseline = 'alphabetic';
    selectTitleTxt.text = selectTitleText;

    selectTitleTxt.x = canvasW / 2;
    selectTitleTxt.y = canvasH / 100 * 30;

    selectContainer.addChild(itemSelect, selectTitleTxt, buttonArrowL, buttonArrowR);

    var colCount = 1;
    var rowCount = 1;
    var startX = canvasW / 100 * 33;
    var startY = canvasH / 100 * 42;
    var curX = startX;
    var curY = startY;
    var spaceX = 109;
    var spaceY = 95;

    for (var n = 0; n < levels_arr.length; n++) {
        $.selectStage['icon_' + n] = new createjs.Bitmap(loader.getResult('iconLevel'));
        centerReg($.selectStage['icon_' + n]);

        $.selectStage['iconLock_' + n] = new createjs.Bitmap(loader.getResult('iconLevelLock'));
        centerReg($.selectStage['iconLock_' + n]);

        $.selectStage['iconText_' + n] = new createjs.Text();
        $.selectStage['iconText_' + n].font = "40px dimboregular";
        $.selectStage['iconText_' + n].color = "#fff";
        $.selectStage['iconText_' + n].textAlign = "center";
        $.selectStage['iconText_' + n].textBaseline = 'alphabetic';
        $.selectStage['iconText_' + n].text = n + 1;

        $.selectStage['icon_' + n].x = $.selectStage['iconLock_' + n].x = $.selectStage['iconText_' + n].x = curX;
        $.selectStage['icon_' + n].y = $.selectStage['iconLock_' + n].y = curY;
        $.selectStage['iconText_' + n].y = curY + 13;

        curX += spaceX;
        colCount++;
        if (colCount > 5) {
            colCount = 1;
            curX = startX;
            curY += spaceY;
            rowCount++;
        }

        if (rowCount > 2) {
            rowCount = 1;
            curX = startX;
            curY = startY;
        }

        selectContainer.addChild($.selectStage['icon_' + n], $.selectStage['iconText_' + n], $.selectStage['iconLock_' + n]);
    }

    //game
    for (n = 0; n < levels_arr.length; n++) {
        $.stage[n] = new createjs.Bitmap(loader.getResult('stage' + n));
        levelContainer.addChild($.stage[n]);
    }

    itemSquare = new createjs.Bitmap(loader.getResult('itemSquare'));
    centerReg(itemSquare);
    itemSquare.x = -200;
    itemSquare.alpha = 0;
    itemRunwayHit = new createjs.Bitmap(loader.getResult('itemRunwayHit'));
    centerReg(itemRunwayHit);
    itemRunwayHit.x = -200;
    itemRunwayGuide = new createjs.Bitmap(loader.getResult('itemRunwayGuide'));
    centerReg(itemRunwayGuide);
    itemRunwayGuide.regX = 0;
    itemRunwayGuide.x = -500;

    itemHelipadHit = new createjs.Bitmap(loader.getResult('itemHelipadHit'));
    centerReg(itemHelipadHit);
    itemHelipadHit.x = -200;
    itemHelipadGuide = new createjs.Bitmap(loader.getResult('itemHelipadGuide'));
    centerReg(itemHelipadGuide);
    itemHelipadGuide.x = -500;

    for (var n = 0; n < airplane_arr.length; n++) {
        var _frameW = airplane_arr[n].width;
        var _frameH = airplane_arr[n].height;

        var _frame = {"regX": _frameW / 2, "regY": _frameH / 2, "height": _frameH, "count": 2, "width": _frameW};
        var _animations = {animate: {frames: [0, 1], speed: 1}};

        $.airplane[n + 'Data'] = new createjs.SpriteSheet({
            "images": [loader.getResult('airplane' + n).src],
            "frames": _frame,
            "animations": _animations
        });

        $.airplane[n] = new createjs.Sprite($.airplane[n + 'Data'], "animate");
        $.airplane[n].framerate = 20;
        $.airplane[n].x = -200;

        gameContainer.addChild($.airplane[n]);

    }

    var _frameW = 122;
    var _frameH = 30;
    var _frame = {"regX": 0, "regY": _frameH / 2, "height": _frameH, "count": 5, "width": _frameW};
    var _animations = {animate: {frames: [0, 1, 2, 3, 4], speed: .5}};

    itemRunwayData = new createjs.SpriteSheet({
        "images": [loader.getResult('itemRunwayAnimate').src],
        "frames": _frame,
        "animations": _animations
    });

    itemRunwayAnimate = new createjs.Sprite(itemRunwayData, "animate");
    itemRunwayAnimate.framerate = 20;
    itemRunwayAnimate.x = -200;

    var _frameW = 90;
    var _frameH = 90;
    var _frame = {"regX": _frameW / 2, "regY": _frameH / 2, "height": _frameH, "count": 5, "width": _frameW};
    var _animations = {animate: {frames: [0, 1, 2, 3, 4], speed: .5}};

    itemHelipadData = new createjs.SpriteSheet({
        "images": [loader.getResult('itemHelipadAnimate').src],
        "frames": _frame,
        "animations": _animations
    });

    itemHelipadAnimate = new createjs.Sprite(itemHelipadData, "animate");
    itemHelipadAnimate.framerate = 20;
    itemHelipadAnimate.x = -100;


    gameContainer.addChild(itemRunwayAnimate, itemHelipadAnimate);

    itemAlert = new createjs.Bitmap(loader.getResult('itemAlert'));
    centerReg(itemAlert);
    itemAlert.x = -100;
    itemCollisionOuter = new createjs.Bitmap(loader.getResult('itemCollisionOuter'));
    centerReg(itemCollisionOuter);
    itemCollisionOuter.x = -100;
    itemCollisionInner = new createjs.Bitmap(loader.getResult('itemCollisionInner'));
    centerReg(itemCollisionInner);
    itemCollisionInner.x = -100;

    itemBoom = new createjs.Bitmap(loader.getResult('itemBoom'));
    centerReg(itemBoom);
    itemBoom.x = -100;

    landedTxt = new createjs.Text();
    landedTxt.font = "30px Rubik-Black";
    landedTxt.color = "#fff";
    landedTxt.textAlign = "left";
    landedTxt.textBaseline = 'alphabetic';
    landedTxt.text = 'LANDED: 10';
    landedTxt.visible = false;

    landedShadowTxt = new createjs.Text();
    landedShadowTxt.font = "30px Rubik-Black";
    landedShadowTxt.color = "#555555";
    landedShadowTxt.textAlign = "left";
    landedShadowTxt.textBaseline = 'alphabetic';
    landedShadowTxt.text = 'LANDED: 10';
    landedShadowTxt.visible = false;

    scoreTxt = new createjs.Text();
    scoreTxt.font = "40px Rubik-Black";
    scoreTxt.color = "#fff";
    scoreTxt.textAlign = "center";
    scoreTxt.textBaseline = 'alphabetic';
    scoreTxt.text = '1500PTS';

    scoreShadowTxt = new createjs.Text();
    scoreShadowTxt.font = "35px Rubik-Black";
    scoreShadowTxt.color = "#555555";
    scoreShadowTxt.textAlign = "center";
    scoreShadowTxt.textBaseline = 'alphabetic';
    scoreShadowTxt.text = '1500PTS';
    
    
    streakPointTxt = new createjs.Text();
    streakPointTxt.font = "30px Rubik-Bold";
    streakPointTxt.color = "#fff";
    streakPointTxt.textAlign = "center";
    streakPointTxt.textBaseline = 'alphabetic';
    streakPointTxt.text = 'X1';
    streakPointTxt.visible = false;
    
    planeInAirTxt = new createjs.Text();
    planeInAirTxt.font = "20px Rubik-Bold";
    planeInAirTxt.color = "#fff";
    planeInAirTxt.textAlign = "center";
    planeInAirTxt.textBaseline = 'alphabetic';
    planeInAirTxt.text = 'Aircraft in sky: 4';
    planeInAirTxt.visible = false;
    
    tripplesTxt = new createjs.Text();
    tripplesTxt.font = "30px Rubik-Bold";
    tripplesTxt.color = "#fff";
    tripplesTxt.textAlign = "center";
    tripplesTxt.textBaseline = 'alphabetic';
    tripplesTxt.text = 'Tripples: 4';
    tripplesTxt.visible = false;
    
    tripplesPointTxt = new createjs.Text();
    tripplesPointTxt.font = "20px Rubik-Bold";
    tripplesPointTxt.color = "lightgreen";
    tripplesPointTxt.textAlign = "center";
    tripplesPointTxt.textBaseline = 'alphabetic';
    tripplesPointTxt.text = '+125';
    tripplesPointTxt.visible = false;
    
    getpointtxt = new createjs.Text();
    getpointtxt.font = "20px Rubik-Bold";
    getpointtxt.color = "lightgreen";
    getpointtxt.textAlign = "center";
    getpointtxt.textBaseline = 'alphabetic';
    getpointtxt.text = '+125';
    getpointtxt.visible = false;

    itemCompleted = new createjs.Bitmap(loader.getResult('itemCompleted'));
    centerReg(itemCompleted);
    levelCompletedTxt = new createjs.Text();
    levelCompletedTxt.font = "60px Rubik-Blackr";
    levelCompletedTxt.color = "#fff";
    levelCompletedTxt.textAlign = "center";
    levelCompletedTxt.textBaseline = 'alphabetic';
    levelCompletedTxt.text = levelCompletedText;
    levelCompletedTxt.y = 20
    completeContainer.addChild(itemCompleted, levelCompletedTxt);
    completeContainer.x = canvasW / 2;
    completeContainer.y = canvasH / 2;

    //result
    itemResult = new createjs.Bitmap(loader.getResult('itemResult'));
    centerReg(itemResult);
    itemResult.x = canvasW / 2;
    itemResult.y = canvasH / 2;

    resultTitleTxt = new createjs.Text();
    resultTitleTxt.font = "50px Rubik-Black";
    resultTitleTxt.color = "#fff";
    resultTitleTxt.textAlign = "center";
    resultTitleTxt.textBaseline = 'alphabetic';
    resultTitleTxt.text = 'STAGE 1 COMPLETE';
    resultTitleTxt.x = canvasW / 2;
    resultTitleTxt.y = canvasH / 100 * 30;

    resultScoreTxt = new createjs.Text();
    resultScoreTxt.font = "100px Rubik-Black";
    resultScoreTxt.color = "#663366";
    resultScoreTxt.textAlign = "center";
    resultScoreTxt.textBaseline = 'alphabetic';
    resultScoreTxt.text = '1500PTS';
    resultScoreTxt.x = canvasW / 2;
    resultScoreTxt.y = canvasH / 100 * 46;

    resultShareTxt = new createjs.Text();
    resultShareTxt.font = "25px Rubik-Black";
    resultShareTxt.color = "#555";
    resultShareTxt.textAlign = "center";
    resultShareTxt.textBaseline = 'alphabetic';
    resultShareTxt.text = shareText;
    resultShareTxt.x = canvasW / 2;
    resultShareTxt.y = canvasH / 100 * 52;

    buttonFacebook = new createjs.Bitmap(loader.getResult('buttonFacebook'));
    buttonTwitter = new createjs.Bitmap(loader.getResult('buttonTwitter'));
    buttonWhatsapp = new createjs.Bitmap(loader.getResult('buttonWhatsapp'));
    centerReg(buttonFacebook);
    createHitarea(buttonFacebook);
    centerReg(buttonTwitter);
    createHitarea(buttonTwitter);
    centerReg(buttonWhatsapp);
    createHitarea(buttonWhatsapp);
    buttonFacebook.x = canvasW / 100 * 44;
    buttonTwitter.x = canvasW / 2;
    buttonWhatsapp.x = canvasW / 100 * 56;
    buttonFacebook.y = buttonTwitter.y = buttonWhatsapp.y = canvasH / 100 * 58;

    buttonContinue = new createjs.Bitmap(loader.getResult('buttonContinue'));
    centerReg(buttonContinue);
    createHitarea(buttonContinue);
    buttonContinue.x = canvasW / 2;
    buttonContinue.y = canvasH / 100 * 70;

    //option
    buttonFullscreen = new createjs.Bitmap(loader.getResult('buttonFullscreen'));
    centerReg(buttonFullscreen);
    buttonFullscreenoff = new createjs.Bitmap(loader.getResult('buttonFullscreenoff'));
    centerReg(buttonFullscreenoff);
    buttonFullscreenoff.visible = false;
    buttonSoundOn = new createjs.Bitmap(loader.getResult('buttonSoundOn'));
    centerReg(buttonSoundOn);
    buttonSoundOff = new createjs.Bitmap(loader.getResult('buttonSoundOff'));
    centerReg(buttonSoundOff);
    buttonSoundOn.visible = false;
    buttonExit = new createjs.Bitmap(loader.getResult('buttonExit1'));
    centerReg(buttonExit);
    buttonExit1 = new createjs.Bitmap(loader.getResult('buttonExit1'));
    centerReg(buttonExit1);
//    buttonSettings = new createjs.Bitmap(loader.getResult('buttonSettings'));
//    centerReg(buttonSettings);

    createHitarea(buttonFullscreen);
    createHitarea(buttonFullscreenoff);
    createHitarea(buttonSoundOn);
    createHitarea(buttonSoundOff);
    createHitarea(buttonExit);
    createHitarea(buttonExit1);
//    createHitarea(buttonSettings);
    optionsContainer = new createjs.Container();
    optionsContainer.addChild(buttonFullscreen, buttonFullscreenoff, buttonSoundOn, buttonSoundOff, buttonExit, buttonExit1);
//    optionsContainer.visible = false;

//popup
    buttonLevelSlab = new createjs.Bitmap(loader.getResult('buttonLevelSlab'));
    centerReg(buttonLevelSlab);
    buttonLevelSlab.x = canvasW / 100 * 50;
    buttonLevelSlab.y = canvasH / 100 * 50;
    popupContainer.addChild(buttonLevelSlab);

    buttonLevelHud = new createjs.Bitmap(loader.getResult('buttonLevelHud'));
    centerReg(buttonLevelHud);
    buttonLevelHud.x = canvasW / 100 * 50;
    buttonLevelHud.y = canvasH / 100 * 26;
    popupContainer.addChild(buttonLevelHud);

    levelTxt = new createjs.Text();
    levelTxt.font = "25px Rubik-Black";
    levelTxt.color = "#325b00";
    levelTxt.textAlign = "center";
    levelTxt.textBaseline = 'alphabetic';
    switch (BackEndService.user_play_settings[0].current_goal) {
        case 16:
            levelTxt.text = "LEVEL 1";
            break;

        case 17:
            levelTxt.text = "LEVEL 2";
            break;

        case 18:
            levelTxt.text = "LEVEL 3";
            break;

        case 19:
            levelTxt.text = "LEVEL 4";
            break;

        case 20:
            levelTxt.text = "LEVEL 5";
            break;
    }
//    levelTxt.text = number(BackEndService.user_play_settings[0].current_goal) - 1;
    levelTxt.x = canvasW / 100 * 50;
    levelTxt.y = canvasH / 100 * 27;
    popupContainer.addChild(levelTxt);

    insText = new createjs.Text(BackEndService.properties[0].goal_message, '18px Rubik-Bold', '#713d11');
    insText.textAlign = 'center';
    insText.textBaseline = 'middle';
    insText.x = canvasW / 100 * 50;
    insText.y = canvasH / 100 * 33;
    insText.lineWidth = canvasW / 100 * 22;
    insText.lineHeight = 25;
    popupContainer.addChild(insText);

//    var goalContainer = new createjs.Container();

    goalText = new createjs.Text('GOAL', '30px Rubik-Bold', '#713d11');
//    goalContainer.addChild(goalText);
    goalText.textAlign = 'center';
    goalText.textBaseline = 'middle';
    goalText.x = canvasW / 100 * 50;
    goalText.y = canvasH / 100 * 42;
    popupContainer.addChild(goalText);

    leftLine = new createjs.Shape();
    leftLine.graphics.beginFill('#713d11');
    leftLine.graphics.drawRect(0, 0, 85, 4);
    leftLine.graphics.endFill();
    leftLine.textBaseline = 'middle';
    leftLine.x = canvasW / 100 * 40;
    leftLine.y = canvasH / 100 * 41.5;
    popupContainer.addChild(leftLine);

    rightLine = new createjs.Shape();
    rightLine.graphics.beginFill('#713d11');
    rightLine.graphics.drawRect(0, 0, 85, 4);
    rightLine.graphics.endFill();
    rightLine.textBaseline = 'middle';
    rightLine.x = canvasW / 100 * 53.5;
    rightLine.y = canvasH / 100 * 41.5;
    popupContainer.addChild(rightLine);

    for (var i = 0; i < BackEndService.targets.length; i++) {
        goalIcon = new createjs.Bitmap(loader.getResult('buttonAIcon'));
        centerReg(goalIcon);
        goalIcon.x = canvasW / 100 * 41;
        goalIcon.y = canvasH / 100 * (47 + (i * 6));
        switch (BackEndService.targets[i].label) {
            case 'plan':
                goal1Text = new createjs.Text('Need to land ' + BackEndService.targets[i].value + ' palnes', '18px Rubik-Medium', '#713d11');
                goal1Text.textAlign = 'center';
                goal1Text.textBaseline = 'middle';
                goal1Text.x = canvasW / 100 * 51;
                goal1Text.y = canvasH / 100 * (47 + (i * 6));
                break;
            case 'plan_with_time_limit':
                goal1Text = new createjs.Text('Need to land ' + BackEndService.targets[i].value + ' palnes', '18px Rubik-Medium', '#713d11');
                goal1Text.textAlign = 'center';
                goal1Text.textBaseline = 'middle';
                goal1Text.x = canvasW / 100 * 51;
                goal1Text.y = canvasH / 100 * (47 + (i * 6));
                break;
            case 'plan_inair_time':
                goal1Text = new createjs.Text('Need to land ' + BackEndService.targets[i].value + ' palnes', '18px Rubik-Medium', '#713d11');
                goal1Text.textAlign = 'center';
                goal1Text.textBaseline = 'middle';
                goal1Text.x = canvasW / 100 * 51;
                goal1Text.y = canvasH / 100 * (47 + (i * 6));
                break;
            case 'plan_row_streak':
                goal1Text = new createjs.Text('Need to land ' + BackEndService.targets[i].value + ' palnes', '18px Rubik-Medium', '#713d11');
                goal1Text.textAlign = 'center';
                goal1Text.textBaseline = 'middle';
                goal1Text.x = canvasW / 100 * 51;
                goal1Text.y = canvasH / 100 * (47 + (i * 6));
                break;
            case 'score':
                goal1Text = new createjs.Text('Get ' + BackEndService.targets[i].value + ' points', '18px Rubik-Medium', '#713d11');
                goal1Text.textAlign = 'center';
                goal1Text.textBaseline = 'middle';
                goal1Text.x = canvasW / 100 * 48.5;
                goal1Text.y = canvasH / 100 * (47 + (i * 6));
                break;
        }

        popupContainer.addChild(goalIcon, goal1Text);

    }

    withinText = new createjs.Text('WITHIN', '30px Rubik-Bold', '#713d11');
//    goalContainer.addChild(goalText);
    withinText.textAlign = 'center';
    withinText.textBaseline = 'middle';
    withinText.x = canvasW / 100 * 50;
    withinText.y = canvasH / 100 * 60;

    leftWithinLine = new createjs.Shape();
    leftWithinLine.graphics.beginFill('#713d11');
    leftWithinLine.graphics.drawRect(0, 0, 71, 4);
    leftWithinLine.graphics.endFill();
    leftWithinLine.textBaseline = 'middle';
    leftWithinLine.x = canvasW / 100 * 40;
    leftWithinLine.y = canvasH / 100 * 59.5;

    rightWithinLine = new createjs.Shape();
    rightWithinLine.graphics.beginFill('#713d11');
    rightWithinLine.graphics.drawRect(0, 0, 73, 4);
    rightWithinLine.graphics.endFill();
    rightWithinLine.textBaseline = 'middle';
    rightWithinLine.x = canvasW / 100 * 54.5;
    rightWithinLine.y = canvasH / 100 * 59.5;
    popupContainer.addChild(withinText, leftWithinLine, rightWithinLine);

    for (var i = 0; i < BackEndService.restrictions.length; i++) {
        timeIcon1 = new createjs.Bitmap(loader.getResult('buttonIconTime'));
        centerReg(timeIcon1);
        timeIcon1.x = canvasW / 100 * 41;
        timeIcon1.y = canvasH / 100 * (65 + (i * 6));

        restrText = new createjs.Text('Finish in under ' + BackEndService.restrictions[0].value + ' sec', '18px Rubik-Medium', '#713d11');
        restrText.textAlign = 'center';
        restrText.textBaseline = 'middle';
        restrText.x = canvasW / 100 * 51.5;
        restrText.y = canvasH / 100 * 65;

        popupContainer.addChild(timeIcon1, restrText);
    }
    buttonStartIns = new createjs.Bitmap(loader.getResult('buttonStartIns'));
    centerReg(buttonStartIns);
    buttonStartIns.x = canvasW / 100 * 50;
    buttonStartIns.y = canvasH / 100 * 75;
//    buttonStartIns.name = BackEndService.play_setup; //@to edit the game level pulok
    pulseAnimation(buttonStartIns);

    popupContainer.addChild(buttonStartIns, topIconPopup);
    popupContainer.visible = false;


    //exit
    itemExit = new createjs.Bitmap(loader.getResult('itemExit'));

    buttonConfirm = new createjs.Bitmap(loader.getResult('buttonConfirm'));
    centerReg(buttonConfirm);
    buttonConfirm.x = canvasW / 100 * 40;
    buttonConfirm.y = canvasH / 100 * 67;

    buttonCancel = new createjs.Bitmap(loader.getResult('buttonCancel'));
    centerReg(buttonCancel);
    buttonCancel.x = canvasW / 100 * 60;
    buttonCancel.y = canvasH / 100 * 67;

    confirmMessageTxt = new createjs.Text();
    confirmMessageTxt.font = "45px dimboregular";
    confirmMessageTxt.color = "#663366";
    confirmMessageTxt.textAlign = "center";
    confirmMessageTxt.textBaseline = 'alphabetic';
    confirmMessageTxt.text = exitMessage;
    confirmMessageTxt.x = canvasW / 2;
    confirmMessageTxt.y = canvasH / 100 * 47;

    confirmContainer.addChild(itemExit, buttonConfirm, buttonCancel, confirmMessageTxt);
    confirmContainer.visible = false;

    if (guide) {
        guideline = new createjs.Shape();
        guideline.graphics.setStrokeStyle(2).beginStroke('red').drawRect((stageW - contentW) / 2, (stageH - contentH) / 2, contentW, contentH);
    }

    mainContainer.addChild(topIcon, logo, buttonStart);
    statusContainer.addChild(landedShadowTxt, landedTxt, scoreShadowTxt, scoreTxt, streakPointTxt, planeInAirTxt, getpointtxt, tripplesTxt, tripplesPointTxt);
    gameContainer.addChild(itemAlert, itemCollisionOuter, itemCollisionInner, itemSquare, itemHelipadHit, itemHelipadGuide, itemRunwayHit, itemRunwayGuide, levelContainer, editContainer, runwayContainer, collisionContainer, linesContainer, planeContainer, itemBoom, completeContainer, statusContainer, topIconGame);
    resultContainer.addChild(itemResult, resultTitleTxt, resultScoreTxt, buttonContinue);

    if (shareEnable) {
        resultContainer.addChild(resultShareTxt, buttonFacebook, buttonTwitter, buttonWhatsapp);
    }

    canvasContainer.addChild(bg, mainContainer, selectContainer, gameContainer, resultContainer, confirmContainer, optionsContainer, guideline, popupContainer);
    stage.addChild(canvasContainer);

    resizeCanvas();
}


/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas() {
    if (canvasContainer != undefined) {
        landedTxt.x = canvasW / 2 - 350;
        landedShadowTxt.x = landedTxt.x
        landedTxt.y = offset.y + 55;
        landedShadowTxt.y = landedTxt.y + 5;

        scoreTxt.x = canvasW / 2 + 200;
        scoreShadowTxt.x = scoreTxt.x
        scoreTxt.y = offset.y + 60;
        scoreShadowTxt.y = scoreTxt.y + 5;
        
        streakPointTxt.x = canvasW - 200;
        streakPointTxt.y = offset.y + 120;
        
        planeInAirTxt.x = canvasW - 250;
        planeInAirTxt.y = offset.y + 120;
        
        getpointtxt.x = canvasW - 200;
        getpointtxt.y = offset.y + 150;
        
        tripplesPointTxt.x = canvasW - 200;
        tripplesPointTxt.y = offset.y + 150;
        
        tripplesTxt.x = canvasW - 250;
        tripplesTxt.y = offset.y + 120;

//        buttonSettings.x = (canvasW - offset.x) - 60;
//        buttonSettings.y = offset.y + 45;

        buttonExit1.x = offset.x + 60;
        buttonExit1.y = offset.y + 40;
        buttonExit.x = offset.x + 60;
        buttonExit.y = offset.y + 40;
        topIcon.y = topIconGame.y = topIconPopup.y = offset.y;

        var distanceNum = 80;
        if (curPage != 'game') {
            buttonExit.visible = false;
            buttonExit1.visible = true;
            buttonSoundOn.x = buttonSoundOff.x = (canvasW - offset.x) - 40;
            buttonSoundOn.y = buttonSoundOff.y = offset.y + 45;


            buttonFullscreen.x = buttonSoundOn.x - (distanceNum);
            buttonFullscreen.y = buttonSoundOn.y;
            buttonFullscreenoff.x = buttonSoundOn.x - (distanceNum);
            buttonFullscreenoff.y = buttonSoundOn.y;

        } else {
            buttonExit.visible = true;
            buttonExit1.visible = false;
            buttonSoundOn.x = buttonSoundOff.x = (canvasW - offset.x) - 60;
            buttonSoundOn.y = buttonSoundOff.y = offset.y + 45;


            buttonFullscreen.x = buttonSoundOn.x - (distanceNum);
            buttonFullscreen.y = buttonSoundOn.y;
            buttonFullscreenoff.x = buttonSoundOn.x - (distanceNum);
            buttonFullscreenoff.y = buttonSoundOn.y;

        }
    }
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
function removeGameCanvas() {
    stage.autoClear = true;
    stage.removeAllChildren();
    stage.update();
    createjs.Ticker.removeEventListener("tick", tick);
    createjs.Ticker.removeEventListener("tick", stage);
}

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */
function tick(event) {
    updateGame();
    stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj) {
    obj.regX = obj.image.naturalWidth / 2;
    obj.regY = obj.image.naturalHeight / 2;
}

function createHitarea(obj) {
    obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));
}
/*
 * API error panel
 * 
 */
function showErrorPanel(error_url, error_msg)
{
    ApiErrorPanel = new CApiError(error_url, error_msg);
    ApiErrorPanel.show();
    isPanelShowing = true;
}



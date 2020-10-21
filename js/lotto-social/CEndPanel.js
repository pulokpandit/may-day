function CEndPanel(isWin) {

    var container, panelContainer, titleContainer, crossContainer;
    var leftStar, middleStar, rightStar;
    var leftStarDisable, middleStarDisable, rightStarDisable;
    var buttonFinish, buttonNextlevel, buttonReplay;
    var buttonCross;
    var iconScore, iconTarget1, iconRestric;
    var scaleFactor = 0.1;
    var fireworks;

    this._init = function (isWin) {

//        var CWinPrizePanel = new CWinPrizePanel(isWin);
        var gameCanvas = document.getElementById("gameCanvas");
        gameCanvas.width =  1280;
        gameCanvas.height = 768;
        gameCanvas.top = -50;
        canvasW = 1280;
        canvasH = 768;
        fireWorks = new Fireworks(gameCanvas);

        container = new createjs.Container();
        container.alpha = 0;
        container.visible = false;

        panelContainer = new createjs.Container();
        panelContainer.y = 1200;

        titleContainer = new createjs.Container();
        titleContainer.y = -600;

        crossContainer = new createjs.Container();
        crossContainer.y = 600;

        var bg = new createjs.Bitmap(loader.getResult("bgTransparent"));
        container.addChild(bg);

        var panel = new createjs.Bitmap(loader.getResult("endSlab"));
        centerReg(panel);
        panel.x = canvasW / 2;
        panel.y = canvasH / 2;

        if (isWin) {
            var ribbon = new createjs.Bitmap(loader.getResult("ribbon"));
            centerReg(ribbon);
            ribbon.x = canvasW / 2;
            ribbon.y = panel.y - panel.image.height / 2;

            middleStar = new createjs.Bitmap(loader.getResult("star"));
            centerReg(middleStar);
            middleStar.x = ribbon.x;
            middleStar.y = ribbon.y - 25;
            middleStar.scaleX = middleStar.scaleY = 0;
            middleStarDisable = new createjs.Bitmap(loader.getResult("starDisable"));
            centerReg(middleStarDisable);
            middleStarDisable.x = ribbon.x;
            middleStarDisable.y = ribbon.y - 25;
            middleStarDisable.scaleX = middleStarDisable.scaleY = 0;

            leftStar = new createjs.Bitmap(loader.getResult("star"));
            centerReg(leftStar);
            leftStar.x = ribbon.x - (leftStar.image.width - 5);
            leftStar.y = ribbon.y - 5;
            leftStar.scaleX = leftStar.scaleY = 0;
            leftStarDisable = new createjs.Bitmap(loader.getResult("starDisable"));
            centerReg(leftStarDisable);
            leftStarDisable.x = ribbon.x - (leftStarDisable.image.width - 5);
            leftStarDisable.y = ribbon.y - 5;
            leftStarDisable.scaleX = leftStar.scaleY = 0;

            rightStar = new createjs.Bitmap(loader.getResult("star"));
            centerReg(rightStar);
            rightStar.x = ribbon.x + (rightStar.image.width - 5);
            rightStar.y = ribbon.y - 5;
            rightStar.scaleX = rightStar.scaleY = 0;
            rightStarDisable = new createjs.Bitmap(loader.getResult("starDisable"));
            centerReg(rightStarDisable);
            rightStarDisable.x = ribbon.x + (rightStarDisable.image.width - 5);
            rightStarDisable.y = ribbon.y - 5;
            rightStarDisable.scaleX = rightStarDisable.scaleY = 0;
        } else {
            var lostHeader = new createjs.Bitmap(loader.getResult("lostHeader"));
            centerReg(lostHeader);
            lostHeader.x = canvasW / 2;
            lostHeader.y = panel.y - panel.image.height / 2;
        }

        var headerText = new createjs.Text(BackEndService.end_msg[0].popup_header, "35px Rubik-Black", "#713d11");
        headerText.x = panel.x;
        headerText.y = panel.y - 115;
        headerText.textAlign = "center";
        headerText.textBaseline = "alphabetic";
        headerText.lineWidth = 250;
        headerText.lineHeight = 40;

        var msgText = new createjs.Text(BackEndService.end_msg[0].out_web, "20px Rubik-Medium", "#713d11");
        msgText.x = panel.x;
        msgText.y = panel.y - 85;
        msgText.textAlign = "center";
        msgText.textBaseline = "alphabetic";
        msgText.lineWidth = 280;
        msgText.lineHeight = 30;

        buttonCross = new createjs.Bitmap(loader.getResult("buttonExit1"));
        centerReg(buttonCross);
        buttonCross.x = panel.x - (panel.image.width / 2) - 30;
        buttonCross.y = panel.y - (panel.image.height / 2) - 30;
        buttonCross.cursor = "pointer";
        buttonCross.addEventListener("click", this.onButtonFinish);

        buttonReplay = new createjs.Bitmap(loader.getResult("buttonReplay"));
        centerReg(buttonReplay);
        if (isWin) {
            buttonReplay.x = canvasW / 2 - (buttonReplay.image.width / 2 + 10);
        } else {
            buttonReplay.x = canvasW / 2;
        }
        buttonReplay.y = panel.y + panel.image.height / 2 - 5;
//        buttonFinish.scaleX = buttonFinish.scaleY = scaleFactor
        buttonReplay.cursor = "pointer";
        buttonReplay.addEventListener("click", this.onButtonReplay);

        buttonNextlevel = new createjs.Bitmap(loader.getResult("btnNextlevel"));
        centerReg(buttonNextlevel);
        buttonNextlevel.x = canvasW / 2 + buttonNextlevel.image.width / 2 + 10;
        buttonNextlevel.y = panel.y + panel.image.height / 2 - 5;
        buttonNextlevel.cursor = "pointer";
        buttonNextlevel.addEventListener("click", this.onButtonNextLevel);

        if (isWin) {
            panelContainer.addChild(panel, headerText, msgText, buttonCross, buttonNextlevel, buttonReplay);
        } else {
            panelContainer.addChild(panel, headerText, msgText, buttonCross, buttonReplay);
        }

        if (BackEndService.targets.jump.result) {
            iconTarget1 = new createjs.Bitmap(loader.getResult("iconSuccess"));
        } else {
            iconTarget1 = new createjs.Bitmap(loader.getResult("iconFail"));
        }
        iconTarget1.x = panel.x - 150;
        iconTarget1.y = panel.y - 35;
        if (BackEndService.targets.jump.label == "jump") {
            var targetText = new createjs.Text("Need to land " + BackEndService.targets.jump.value + " planes", "20px Rubik-Medium", "#713d11");
            targetText.x = panel.x - 100;
            targetText.y = panel.y - 5;
            targetText.textAlign = "left";
            targetText.textBaseline = "alphabetic";
            targetText.lineWidth = 300;
            targetText.lineHeight = 20;
            panelContainer.addChild(targetText, iconTarget1);
        }
        if (BackEndService.targets.score.label == "score") {
            if (BackEndService.targets.score.result) {
                iconScore = new createjs.Bitmap(loader.getResult("iconSuccess"));
            } else {
                iconScore = new createjs.Bitmap(loader.getResult("iconFail"));
            }
            iconScore.x = panel.x - 150;
            iconScore.y = panel.y + 25;
            var targetText1 = new createjs.Text("Get " + BackEndService.targets.score.value + " points", "20px Rubik-Medium", "#713d11");
            targetText1.x = panel.x - 100;
            targetText1.y = panel.y + 55;
            targetText.textAlign = "left";
            targetText1.textBaseline = "alphabetic";
            targetText1.lineWidth = 300;
            targetText1.lineHeight = 20;
            panelContainer.addChild(targetText1, iconScore);
        }
        if (BackEndService.restrictions.time.label == "time") {
            if (BackEndService.restrictions.time.result) {
                iconRestric = new createjs.Bitmap(loader.getResult("iconSuccess"));
            } else {
                iconRestric = new createjs.Bitmap(loader.getResult("iconFail"));
            }
            iconRestric.x = panel.x - 150;
            iconRestric.y = panel.y + 85;
            var time = BackEndService.restrictions.time.value;
            if (time >= 60)
            {
                if (time % 60 === 0)
                {
                    var minutes = Math.floor(time / 60);
                    var finishTime = "Finish in under" + " " + minutes + " " + "mins";
                } else {
                    var minutes = Math.floor(time / 60);
                    var seconds = time - minutes * 60;
                    var finishTime = "Finish in under" + " " + minutes + " " + "mins" + " " + seconds + " " + "secs";
                }
            } else
            {
                var finishTime = "Finish in under" + " " + time + " " + "secs";
            }
            var restricText = new createjs.Text(finishTime, "20px Rubik-Medium", "#713d11");
            restricText.x = panel.x - 100;
            restricText.y = panel.y + 115;
            restricText.textAlign = "left";
            restricText.textBaseline = "alphabetic";
            restricText.lineWidth = 300;
            restricText.lineHeight = 20;
            panelContainer.addChild(restricText, iconRestric);
        }

        if (isWin) {
            switch (BackEndService.star_collect)
            {
                case 0:
                    titleContainer.addChild(ribbon, leftStarDisable, middleStarDisable, rightStarDisable);
                    break;
                case 1:
                    titleContainer.addChild(ribbon, leftStar, middleStarDisable, rightStarDisable);
                    break;
                case 2:
                    titleContainer.addChild(ribbon, leftStar, middleStar, rightStarDisable);
                    break;
                case 3:
                    titleContainer.addChild(ribbon, leftStar, middleStar, rightStar);
                    break;
            }
//            titleContainer.addChild(ribbon, leftStar, middleStar, rightStar);
        } else {
            titleContainer.addChild(lostHeader);
        }



        container.addChild(panelContainer, titleContainer);

        stage.addChild(container);
    };

    var backgroundDuration = 500;
    var panelDuration = 200;
    var titleDuration = 100;
    var buttonDelay = 600;
    var middleStarDuration = 400;
    var sideStarsDuration = 600;

    this.show = function (isWin) {
        container.visible = true;

        createjs.Tween.get(container).to({alpha: 1}, 500);

        createjs.Tween.get(panelContainer)
                .wait(backgroundDuration)
                .call(playSwooshSound)
                .to({y: 0}, panelDuration, createjs.Ease.quadOut)
                .call(this.playEndSound);

        var titleDelay = backgroundDuration + panelDuration / 2;

        createjs.Tween.get(titleContainer)
                .wait(titleDelay)
                .to({y: 0}, titleDuration, createjs.Ease.quadOut);

        createjs.Tween.get(crossContainer)
                .wait(titleDelay)
                .to({y: 100}, titleDuration, createjs.Ease.quadOut);



        if (isWin) {
            createjs.Tween.get(middleStar)
                    .wait(titleDelay)
                    .to({scaleX: 1, scaleY: 1}, middleStarDuration, createjs.Ease.quadOut);

            createjs.Tween.get(leftStar)
                    .wait(titleDelay)
                    .to({scaleX: 1, scaleY: 1}, sideStarsDuration, createjs.Ease.quadOut);

            createjs.Tween.get(rightStar)
                    .wait(titleDelay)
                    .to({scaleX: 1, scaleY: 1}, sideStarsDuration, createjs.Ease.quadOut);
            createjs.Tween.get(middleStarDisable)
                    .wait(titleDelay)
                    .to({scaleX: 1, scaleY: 1}, middleStarDuration, createjs.Ease.quadOut);

            createjs.Tween.get(leftStarDisable)
                    .wait(titleDelay)
                    .to({scaleX: 1, scaleY: 1}, sideStarsDuration, createjs.Ease.quadOut);

            createjs.Tween.get(rightStarDisable)
                    .wait(titleDelay)
                    .to({scaleX: 1, scaleY: 1}, sideStarsDuration, createjs.Ease.quadOut);
        }

//        pulseAnimation(buttonFinish);
        pulseAnimation(buttonReplay);
        pulseAnimation(buttonNextlevel);
        this.showFireworks();
    };

    this.playEndSound = function () {
        playSound("soundGameover");
    };

    this.onButtonFinish = function () {

        if (BackEndService.is_prize_achieved)
        {
            var cWinPrizePanel = new CWinPrizePanel(BackEndService.end_play_url);
            cWinPrizePanel.show(isWin);
        } else {
            window.location.href = BackEndService.end_play_url;
        }
    };

    this.onButtonReplay = function () {
//        endGame();
//        showPrizePopup();
        if (BackEndService.is_prize_achieved)
        {
            var cWinPrizePanel = new CWinPrizePanel(BackEndService.replay_url);
            cWinPrizePanel.show(isWin);
        } else {
            window.location.href = BackEndService.replay_url;
        }
    };

    this.onButtonNextlevel = function () {
        if (BackEndService.is_prize_achieved)
        {
            var cWinPrizePanel = new CWinPrizePanel(BackEndService.next_level_url);
            cWinPrizePanel.show(isWin);
        } else {
            window.location.href = BackEndService.next_level_url;
        }
    };

    this.showFireworks = function () {
        var x = canvasW / 2 - 200;
        var y = canvasH / 2 - 250;
        var width = 400;
        var height = 0;
        fireworks.showFireworks(x, y, width, height, 20);
    };

    this._init(isWin);

    return this;
}
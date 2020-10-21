function CWinPrizePanel(redirectUrl) {

    var container, panelContainer, titleContainer;
    var CongoText;
    var buttonClose;
    var scaleFactor = 0.1;

    this._init = function () {
        container = new createjs.Container();
        container.alpha = 0;
        container.visible = false;

        panelContainer = new createjs.Container();
        panelContainer.y = 1200;

        titleContainer = new createjs.Container();
        titleContainer.y = -600;


        var bg = new createjs.Bitmap(loader.getResult("bgTransparent"));
        container.addChild(bg);

        var panel = new createjs.Bitmap(loader.getResult("endSlab"));
        centerReg(panel);
        panel.x = canvasW / 2;
        panel.y = canvasH / 2;

        var ribbon = new createjs.Bitmap(loader.getResult("ribbon"));
        centerReg(ribbon);
        ribbon.x = canvasW / 2;
        ribbon.y = panel.y - panel.image.height / 2;

        CongoText = new createjs.Text("Congratulations!", "25px Rubik-Black", "#fff");
//        centerReg(CongoText);
        CongoText.x = ribbon.x;
        CongoText.y = ribbon.y - 20;
        CongoText.scaleX = CongoText.scaleY = 1;
        CongoText.textAlign = "center";


        buttonClose = new createjs.Bitmap(loader.getResult("btn_close"));
        centerReg(buttonClose);
        buttonClose.x = canvasW / 2;
        buttonClose.y = panel.y + panel.image.height / 2 - 5;
//        buttonClose.scaleX = buttonClose.scaleY = scaleFactor;
        buttonClose.cursor = "pointer";
        buttonClose.addEventListener("click", this.onButtonClose);
        
        
        var prizeAchieve = new createjs.Bitmap(loader.getResult("prizeAchieve"));
        centerReg(prizeAchieve);
        prizeAchieve.x = canvasW / 2;
        prizeAchieve.y = panel.y;
        
        panelContainer.addChild(panel, buttonClose, prizeAchieve);

        titleContainer.addChild(ribbon, CongoText);

        container.addChild(panelContainer, titleContainer);

        stage.addChild(container);
    };

    var backgroundDuration = 500;
    var panelDuration = 200;
    var titleDuration = 100;
    var buttonDelay = 600;
    var middleStarDuration = 400;
    var sideStarsDuration = 600;

    this.show = function () {
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

        pulseAnimation(buttonClose);
    };

    this.playEndSound = function () {
        playSound("soundGameover");
    };

    this.onButtonClose = function () {

//        showPrizeWinPanel();

        window.location.href = redirectUrl;
    };

    this._init();

    return this;
}
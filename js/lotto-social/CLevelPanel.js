function CLevelPanel(isSuccess, continueToGame = false) {
  var container, panelContainer;
  var buttonPlay;

  this._init = function(isSuccess, continueToGame) {
    container = new createjs.Container();
    container.alpha = 0;
    container.visible = false;

    panelContainer = new createjs.Container();
    panelContainer.y = 1200;

    var bg = new createjs.Bitmap(loader.getResult('bgTransparent'));
    container.addChild(bg);

    var panel = new createjs.Bitmap(loader.getResult('panel'));
    centerReg(panel);
    panel.x = canvasW / 2;
    panel.y = canvasH / 2;

    buttonPlay = new createjs.Bitmap(loader.getResult('buttonContinue'));
    centerReg(buttonPlay);
    buttonPlay.x = canvasW / 2;
    buttonPlay.y = canvasH / 2 + panel.image.height / 2;
    buttonPlay.cursor = 'pointer';

    if (isSuccess) {
      buttonPlay.addEventListener('click', this.onButtonPlay);
    } else if (continueToGame) {
      buttonPlay.addEventListener('click', this.onButtonContinueToGame);
    } else {
      buttonPlay.addEventListener('click', this.onButtonContinue);
    }

      var msgString = isSuccess
      ? BackEndService.deposit_success_msg
      : BackEndService.deposit_error_msg;
    var msgText = new createjs.Text(msgString, "20px " + FONT_Rubik_Bold, '#713D11');
    msgText.x = canvasW / 2;
    msgText.y = panel.y - 30;
    msgText.textAlign = 'center';
    msgText.lineWidth = 250;
    msgText.lineHeight = 30;

    panelContainer.addChild(panel, buttonPlay, msgText);
    container.addChild(panelContainer);

    stage.addChild(container);
  };

  this.onButtonPlay = function() {
    playSound('soundClick');
    container.visible = false;
    isPanelShowing = false;
  };

  this.onButtonContinue = function() {
    playSound('soundClick');
    container.visible = false;
    isPanelShowing = false;
  };

  this.onButtonContinueToGame = function() {
    playSound('soundClick');
    container.visible = false;
    goPage('game');
    depositSuccessPanel.show();
  };

  var backgroundDuration = 500;
  var panelDuration = 200;

  this.show = function() {
    container.visible = true;

    createjs.Tween.get(container).to({ alpha: 1 }, backgroundDuration);

    createjs.Tween.get(panelContainer)
      .wait(backgroundDuration)
      .call(playSwooshSound)
      .to({ y: 0 }, panelDuration, createjs.Ease.quadOut);

    pulseAnimation(buttonPlay);
  };

  this._init(isSuccess, continueToGame);

  return this;
}

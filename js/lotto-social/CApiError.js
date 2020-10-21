function CApiError(error_url,error_msg) {
  var container, panelContainer;
  var buttonClose;

  this._init = function(error_url,error_msg) {
    container = new createjs.Container();
    container.alpha = 0;
    container.visible = false;

    panelContainer = new createjs.Container();
    panelContainer.y = 1200;

//    var bg = new createjs.Bitmap(loader.getResult('bgTransparent'));
//    container.addChild(bg);

    var panel = new createjs.Bitmap(loader.getResult('panel'));
    centerReg(panel);
    panel.x = canvasW / 2;
    panel.y = canvasH / 2;
    
    var lostHeader = new createjs.Bitmap(loader.getResult("lostHeader"));
    centerReg(lostHeader);
    lostHeader.x = canvasW/2;
    lostHeader.y = panel.y - panel.image.height/2;
    
    buttonClose = new createjs.Bitmap(loader.getResult('btn_close'));
    centerReg(buttonClose);
    buttonClose.x = canvasW / 2;
    buttonClose.y = canvasH / 2 + panel.image.height / 2;
    buttonClose.cursor = 'pointer';
    buttonClose.addEventListener("click", function(evt) {
            window.location.href = error_url;
    });
        
    var msgText = new createjs.Text(error_msg, "20px Rubik_Bold", '#713D11');
    msgText.x = canvasW / 2;
    msgText.y = panel.y - 40;
    msgText.textAlign = 'center';
    msgText.lineWidth = 275;
    msgText.lineHeight = 30;

    panelContainer.addChild(panel, buttonClose, msgText , lostHeader);
    container.addChild(panelContainer);
    stage.addChild(container);
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

    pulseAnimation(buttonClose);
  };

  this._init(error_url,error_msg);

  return this;
}

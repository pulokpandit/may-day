BackEndDummy = {};

BackEndDummy.gameInit = function() {
  var promise = $.Deferred();

  BackEndService.game_description = 'Spin to win upto 5000 points';
  BackEndService.allocated_points = 10;
  BackEndService.min_slider = BackEndService.allocated_points;
  BackEndService.max_slider = 4000 + BackEndService.allocated_points;
  BackEndService.odds_data = [
    0.134,
    0.133,
    0.133,
    0.125,
    0.125,
    0.1,
    0.1,
    0.1,
    1,
    0.05
  ];
  // BackEndService.winSlotResult = [
  //   [0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 1, 2, 5, 6],
  //   [0, 0, 0, 3, 4, 5, 6, 7, 8, 0, 1, 1, 2, 5, 6],
  //   [0, 0, 2, 3, 3, 4, 5, 6, 7, 8, 0, 1, 7, 2, 5],
  //   [0, 0, 0, 3, 4, 5, 6, 7, 8, 0, 1, 1, 2, 2, 6],
  //   [0, 0, 4, 3, 4, 5, 6, 7, 8, 0, 1, 1, 2, 2, 6],
  //   [0, 0, 0, 3, 0, 5, 6, 7, 8, 0, 0, 1, 2, 5, 6]
  // ];
  BackEndService.win_percentage = 0.75;

  promise.resolve();
  return promise;
};

BackEndDummy.gameStart = function() {
  var promise = $.Deferred();
  promise.resolve();
  return promise;
};

BackEndDummy.gamePoints = function(points) {
  var promise = $.Deferred();
  console.log(points);

  var data = { success: true };
  //    var data = {success: false, currentBalance: 1000};
  //   var data = {success: false, currentBalance: 0};

  if (data.success) {
    BackEndService.deposit_points = points + BackEndService.allocated_points;
    BackEndService.deposit_success_msg =
      'Successfully deposited ' + BackEndService.deposit_points + ' points';
  } else if (data.currentBalance == 0) {
    BackEndService.deposit_points = BackEndService.allocated_points;
    BackEndService.deposit_error_msg =
      'You have no more points left to deposit';
    BackEndService.deposit_success_msg =
      'Successfully deposited ' + BackEndService.deposit_points + ' points';
  } else {
    BackEndService.deposit_error_msg =
      'Your points balance is too low.\nPlease select a new deposit amount.';
  }

  promise.resolve(data);
  return promise;
};

BackEndDummy.gameResult = function(points, checkout, bet_amount, win_amount) {
  var promise = $.Deferred();

  var target = {
    point: points,
    checkout: checkout,
    bet_amount: bet_amount,
    spin_outcome: win_amount > 0 ? 'win' : 'loss',
    spin_point: win_amount > 0 ? win_amount : -bet_amount
  };
  console.log(target);

  BackEndService.end_msg = 'You have checked out with ' + points + ' points';
  BackEndService.end_play_url = '/thanks-for-playing/';
  BackEndService.replay_url =
    '/newgames/games/ecomm-fruit-cocktail-V3/index.php?customerAwardLogID=02000000CEB532B3FAC5CDBBB621E92727335D325633C8F9B584EF0215935A548F2BFE60&gameId=02000000C8BB2852FC814E4A92B55A1E23ED96FF7AF3B2C96359FD181E740C85C2DBE957&platform_type=&play_again=1';

  promise.resolve();
  return promise;
};

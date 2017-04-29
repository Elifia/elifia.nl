<html>
	<head>
		<title>Elifia's Brawler</title>
		<link href="https://fonts.googleapis.com/css?family=Metal+Mania|Rock+Salt" rel="stylesheet">
		<link href="./assets/css/style.css" rel="stylesheet">
		<script src="../assets/js/jquery-3.1.0.js"></script>
		<script src="./assets/js/draw.js"></script>
		<script src="./assets/js/tile.js"></script>
		<script src="./assets/js/player.js"></script>
		<script src="./assets/js/moves.js"></script>
		<script src="./assets/js/particle.js"></script>
		<script src="./assets/js/controller.js"></script>
		<script src="./assets/js/Main.js"></script>
	</head>
	<body oncontextmenu="return false;">
		<h1>Elifia's Brawler</h1>
		<p>Note: Created to work in Chrome with Dualshock4 controllers. Other browsers or controllers might not work.</p>
		<div id="Game-container">
			<canvas id="Game" width="1200" height="600"></canvas>
			<div id="Players">
				<div class="connectMessage">
					<div>Press a button or connect a new controller to join.</div>
				</div>
			</div>
		</div>
		<div class="back">
			<a href="../"> <- Elifia's Games</a>
		</div>
	</body>
</html>

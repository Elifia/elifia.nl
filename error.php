<?php 
	$e = $_GET['error']; 
	$message = '';
	switch($e)
	{
	case '403':
		$message = 'You\'re not supposed to be here <span style="font-size: 1.5em;">!</span>';
		break;
	case '404':
		$message = 'There is nothing here...';
		break;
	default:
		$message = 'I\'m sorry, but I can\'t do that...';
		break;
	}
?>
<html>
	<head>
		<title>Elifia's Games</title>
		<link href="http://<?php echo $_SERVER['HTTP_HOST']; ?>/assets/css/style.css" rel="stylesheet">
	</head>
	<body>
		<div class="error">
			<h1><?php echo $message; ?></h1>
			<div class="back">
				<a href="http://<?php echo $_SERVER['HTTP_HOST']; ?>"> <- Elifia's Games</a>
			</div>
		</div>
	</body>
</html>

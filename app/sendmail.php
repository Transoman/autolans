<?php
	$SITE_TITLE = 'Autolans';
	$SITE_DESCR = '';

	if ( isset($_POST) ) {
		$to = 'Elena357910@yandex.com';
		$name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
		$email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : '';
		$phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : '';
		$subject = isset($_POST['subject']) ? htmlspecialchars(trim($_POST['subject'])) : '';
		$question = isset($_POST['question']) ? htmlspecialchars(trim($_POST['question'])) : '';
		$vin_organization_name = isset($_POST['vin_organization_name']) ? htmlspecialchars(trim($_POST['vin_organization_name'])) : '';
		$model_car = isset($_POST['model_car']) ? htmlspecialchars(trim($_POST['model_car'])) : '';
		$number_vin = isset($_POST['number_vin']) ? htmlspecialchars(trim($_POST['number_vin'])) : '';
		$vin_parts = isset($_POST['vin_parts']) ? htmlspecialchars(trim($_POST['vin_parts'])) : '';

		$headers = "From: $SITE_TITLE \r\n";
		$headers .= "Reply-To: ". $email . "\r\n";
		$headers .= "Content-Type: text/html; charset=utf-8\r\n";

		$data = '<h1>'.$subject."</h1>";

		if (!empty($name)) {
			$data .= 'Имя: '.$name."<br>";
		}

		if (!empty($email)) {
			$data .= 'Email: '.$email."<br>";
		}

		if (!empty($phone)) {
			$data .= 'Телефон: '.$phone."<br>";
		}

		if (!empty($question)) {
			$data .= 'Вопрос: '.$question."<br>";
		}

		if (!empty($vin_organization_name)) {
			$data .= 'Имя или название организации: '.$vin_organization_name."<br>";
		}

		if (!empty($model_car)) {
			$data .= 'Марка и модель авто: '.$model_car."<br>";
		}

		if (!empty($number_vin)) {
			$data .= 'VIN: '.$number_vin."<br>";
		}

		if (!empty($vin_parts)) {
			$data .= 'Запчасти: '.$vin_parts."<br>";
		}

		$message = "<div style='background:#ccc;border-radius:10px;padding:20px;'>
				".$data."
				<br>\n
				<hr>\n
				<br>\n
				<small>это сообщение было отправлено с сайта ".$SITE_TITLE." - ".$SITE_DESCR.", отвечать на него не надо</small>\n</div>";
		$send = mail($to, $subject, $message, $headers);

		if ( $send ) {
			echo '';
		} else {
				echo '<div class="error">Ошибка отправки формы</div>';
		}

	}
	else {
			echo '<div class="error">Ошибка, данные формы не переданы.</div>';
	}
	die();
?>
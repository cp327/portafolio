<?php
header('Content-Type: application/json'); // Define la respuesta como JSON

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars($_POST["nombre"]);
    $email = htmlspecialchars($_POST["email"]);
    $mensaje = htmlspecialchars($_POST["mensaje"]);

    $destinatario = "camilo27pacheco27@gmail.com"; // Cambia esto por tu correo
    $asunto = "Nuevo mensaje de contacto";
    $cuerpo = "Nombre: $nombre\nCorreo: $email\nMensaje:\n$mensaje";
    $cabeceras = "From: $email\r\nReply-To: $email\r\n";

    if (mail($destinatario, $asunto, $cuerpo, $cabeceras)) {
        echo json_encode(["success" => true, "message" => "📩 ¡Tu mensaje ha sido enviado con éxito!"]);
    } else {
        echo json_encode(["success" => false, "message" => "❌ Error al enviar el mensaje. Inténtalo más tarde."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "❌ Método no permitido."]);
}
?>
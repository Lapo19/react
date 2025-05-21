<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class AlunniController
{
  public function index(Request $request, Response $response, $args){
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $result = $mysqli_connection->query("SELECT * FROM alunni");
    $results = $result->fetch_all(MYSQLI_ASSOC);

    $response->getBody()->write(json_encode($results));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function view(Request $request, Response $response, $args){
    $id = $args['id'];
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $sql = "SELECT * FROM alunni WHERE id=?";
    $stmt = $mysqli_connection->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $results = $result->fetch_all(MYSQLI_ASSOC);

    $response->getBody()->write(json_encode($results));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function create(Request $request, Response $response, $args){
    $body = json_decode($request->getBody()->getContents(), true);
    $nome = $body['nome'];
    $cognome = $body['cognome'];
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $result = $mysqli_connection->query("INSERT INTO alunni(nome,cognome) VALUES ('$nome','$cognome') ");
    if($result && $mysqli_connection->affected_rows > 0){
      $response->getBody()->write(json_encode(array("message"=>"Success")));
    } else {
      $response->getBody()->write(json_encode(array("message"=>$mysqli_connection->error)));
    }
    return $response->withHeader("Content-type", "application/json")->withStatus(201);
  }

  public function update(Request $request, Response $response, $args){
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $id = $args['id'];
    $body = json_decode($request->getBody()->getContents(), true);
    $nome = $body['nome'];
    $cognome = $body['cognome'];
    $result = $mysqli_connection->query("UPDATE alunni SET nome = '$nome',cognome = '$cognome' WHERE id = '$id'");
    if($result && $mysqli_connection->affected_rows > 0){
      $response->getBody()->write(json_encode(array("message"=>"Success")));
    } else {
      $response->getBody()->write(json_encode(array("message"=>$mysqli_connection->error)));
    }
    return $response->withHeader("Content-type", "application/json")->withStatus(201);
  }

  public function delete(Request $request, Response $response, $args){
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $id = $args['id'];
    $result = $mysqli_connection->query("DELETE FROM alunni WHERE id= '$id'");
    if($result && $mysqli_connection->affected_rows > 0){
      $response->getBody()->write(json_encode(array("message"=>"Success")));
    } else {
      $response->getBody()->write(json_encode(array("message"=>$mysqli_connection->error)));
    }
    return $response->withHeader("Content-type", "application/json")->withStatus(201);
  }

  public function search(Request $request, Response $response, $args){
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $parametri = $request->getQueryParams();
    $inizioNome = $parametri['search'] ?? null;
    $colonna = $parametri['sortCol'] ?? null;
    $ordine = $parametri['sort'] ?? null;
    $result = $mysqli_connection->query("SELECT * FROM alunni WHERE nome LIKE '%$inizioNome%' ORDER BY $colonna $ordine");
    $result = $result->fetch_all(MYSQLI_ASSOC);
    if($result){
      $response->getBody()->write(json_encode($result));
    } else {
      $response->getBody()->write(json_encode(array("message"=>$mysqli_connection->error)));
    }
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

}
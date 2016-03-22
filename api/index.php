<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\StreamInterface as Reponse;
error_reporting( E_ALL );

require 'vendor/autoload.php';

function db(){
	$database = new medoo([
		'database_type' => 'mysql',
		'database_name' => 'overwatch',
		'server' => 'localhost',
		'username' => 'root',
		'password' => '',
		'charset' => 'utf8'
	]);
    return $database;
}

function classicDb(){
        try {
            $connection = new PDO("mysql:host=localhost;dbname=overwatch;charset=utf8", "root", "");
            $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }catch(PDOException $e){
            echo 'DB Not working';
        }
        return $connection;
    }
session_name('manatools_v1');
$app = new \Slim\App;

$app->get('/', function ($request, $response, $args) {
    return $response->withStatus(200)
        ->withHeader('Content-Type', 'application/json')
        ->write(json_encode(['bonjour']));
});

$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
	return $response->withStatus(200)
        ->withHeader('Content-Type', 'application/json')
        ->write(json_encode($name));
});

$app->get("/heroes", function ($request, $response, $args) {
	$db = db();
	$data = $db->select('heroes',["id","name","label","role"]);
    return $response->withStatus(200)
        ->withHeader('Content-Type', 'application/json')
        ->write(json_encode($data));
});

$app->get('/heroes/{label}', function ($request, $response, $args) {
	$db = classicDb();
	$heroName = $request->getAttribute('label');
            $ask = "SELECT id, name, label, health, ability1, ability2, ability3, ability4, ultimate, role FROM heroes WHERE label='$heroName'";
            $req = $db->query($ask);
            while ($d = $req->fetch(PDO::FETCH_ASSOC)){
                $ability1 = $d['ability1'];
                $ability2 = $d['ability2'];
                $ability3 = $d['ability3'];
                $ability4 = $d['ability4'];
                $abilityu = $d['ultimate'];
                $ab1 = explode(",", $ability1);
                $ab2 = explode(",", $ability2);
                $ab3 = explode(",", $ability3);
                $ab4 = explode(",", $ability4);
                $abu = explode(",", $abilityu);
                if (empty($abu)) {
                	$abu = null;
                }


                $data[] = array(
                        'id' => $d['id'],
                        'name' => $d['name'],
                        'label' => $d['label'],
                        'role' => $d['role'],
                        'health' => $d['health'],
                        'ability1' => $ab1,
                        'ability2' => $ab2,
                        'ability3' => $ab3,
                        'ability4' => $ab4,
                        'abilityu' => $abu
                        );
                }
	//$data = $db->select('heroes','*',  ["label" => $heroName]);
    return $response->withStatus(200)
        ->withHeader('Content-Type', 'application/json')
        ->write(json_encode($data));
});

//SESSION - USERS
$app->get("/session/users", function ($request, $response, $args) {
	$db = db();
	$data = $db->select('users','*');
    return $response->withStatus(200)
        ->withHeader('Content-Type', 'application/json')
        ->write(json_encode($data));
});
$app->get('/user/{id}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');
    $db = db();
    $all = $db->select('users',['user_id','username','avatar','rank'], ['user_id' => "$id"]);
    return $response->withStatus(200)
        ->withHeader('Content-Type', 'application/json')
        ->write(json_encode($all));
});
$app->get("/session/destroy", function ($request, $response, $args) {
	session_start();
    session_destroy();
    session_commit();
    $data[] = array(
            		'status' => false,
            		'destroyed' => true,
            		'message' => 'disconnected'
            		);
    return $response->withStatus(200)
        ->withHeader('Content-Type', 'application/json')
        ->write(json_encode($data));
});
$app->get("/session/check", function ($request, $response, $args) {
		session_start();
        if (isset($_SESSION['uid'])){
            $userid = $_SESSION['user'];
            $username = $_SESSION['username'];
            $rank = $_SESSION['rank'];
                    if($rank == 10){
                        $data[] = array(
		            		'status' => true,
		            		'message' => "connected as $username",
                            'user' => $userid,
		            		'admin' => true,
		            		'moderator' => true,
		            		'beta' => true
		            		);
                    }elseif($rank == 7){
                        $data[] = array(
		            		'status' => true,
		            		'message' => "connected as $username",
                            'user' => $userid,
		            		'admin' => false,
		            		'moderator' => false,
		            		'beta' => true
		            		);
                    }elseif($rank == 1){
                        $data[] = array(
                            'status' => true,
                            'message' => "connected as $username",
                            'user' => $userid,
                            'admin' => false,
                            'moderator' => false,
                            'beta' => false
                            );
                    }
            }else{
            	$data[] = array(
            		'status' => false,
            		'message' => 'not connected'
            		);
            }
    return $response->withHeader('Content-Type', 'application/json')->write(json_encode($data));
});

$app->post("/session/login", function (Request $request, Response $response) {
    $requestBody = $request->getParsedBody();
    $username = $requestBody['username'];
    $password = $requestBody['password'];
    $db = db();
	$users = $db->select('users','*', ['username' => "$username"]);
	if ($users) {
		$registeredPassword = $users[0]['password'];
	}
	session_start();
	if(isset($_SESSION['username'])){
		if(strtolower($_SESSION['username']) == strtolower($username)){
		$data[] = array(
		            		'status' => true,
		            		'message' => 'already connected'
		            		);
		}else{
			session_start();
	        session_destroy();
	        session_commit();
	        $data[] = array(
		            		'status' => false,
		            		'message' => 'user not match, session destroyed'
		            		);
    	}
    }else{
    	if($users == null){
    		$data[] = array(
		            		'status' => false,
		            		'message' => 'no account with this username'
		            		);
    	}else{
			if(strcmp($password, $registeredPassword) == 0){
				$rde = uniqid('mana_');
	        	$_SESSION['uid']=$rde;
	        	$_SESSION['user']=$users[0]['user_id'];
	        	$_SESSION['username']=$users[0]['username'];
	        	$_SESSION['rank']=$users[0]['rank'];
				$data[] = array(
			            		'status' => true,
			            		'message' => 'Connected',
			            		'uid' => $_SESSION['uid'],
                                'message' => "connected as $username",
                                'user' => $_SESSION['user']
			            		);
			}else{
				$data[] = array(
				            	'status' => false,
				            	'message' => 'wrong password'
				            	);
			}
		}
	}
	return $response->withStatus(200)
        ->withHeader('Content-Type', 'application/json')
        ->write(json_encode($data));
});
//COMMUNITY
$app->get('/community/lastpost/{id}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');
    $db = db();
    $lastpost[] = $db->get('talk',['date'], ['topic_id' => "$id", "ORDER" => ['date DESC']]);
    return $response->withStatus(200)
        ->withHeader('Content-Type', 'application/json')
        ->write(json_encode($lastpost));
});
$app->get('/community/{id}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');
    $db = db();
    $all = $db->select('talk','*', ['topic_id' => "$id", "ORDER" => ['date DESC']]);
    return $response->withStatus(200)
        ->withHeader('Content-Type', 'application/json')
        ->write(json_encode($all));
});
$app->post('/community', function (Request $request, Response $response) {
    $requestBody = $request->getParsedBody();
    $topic = $requestBody['topic'];
    $content = $requestBody['content'];
    $poster = $requestBody['poster'];
    $db = db();
    $all = $db->insert('talk', ["topic_id" => "$topic","content" => "$content","poster_id" => "$poster"]);
    return $response->withStatus(200)
        ->withHeader('Content-Type', 'application/json')
        ->write(json_encode($all));
});



$app->run();
?>
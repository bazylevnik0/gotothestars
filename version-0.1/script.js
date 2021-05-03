//init variables
var camera, scene, light, light_ambient, renderer;

//set loaders
const loader = new OBJLoader();
const loader_texture = new THREE.TextureLoader();
const loader_material = new MTLLoader();

//obj for control
const pointer = new THREE.Vector2();
var raycaster = new THREE.Raycaster();

//logic
var score = 0;
var game = false;
var move_array = [];	

	
init();

function init() {
//init
	//camera
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100 );
	camera.position.set(0, -4, 6)	
	camera.rotation.set(-0.3,0,0)
	//scene
	scene = new THREE.Scene();
	
	/*
	//test objects
	//test three object 
	let geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
	let material = new THREE.MeshPhongMaterial( {color: 0xffffff} ); 
    	let mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
	
	//test .obj with .jpeg texture
	loader.load('obj/test.obj', ( object ) => {
					let texture = loader_texture.load( 'obj/test.jpeg' );
					object.children[0].material.map = texture;
				    	scene.add( object );
				    }
	);
	
	//test .obj with .mtl material .png uv
	loader_material.load('obj/test.mtl', function( material ) {
						     	material.preload();
						     	loader.setMaterials( material );
						     	loader.load('obj/test.obj', (object) => {
						     					   	object.children[0].material.color.r = 1;
												object.children[0].material.color.g = 1;
												object.children[0].material.color.b = 1;
												scene.add( object );
											    }
						     	);
						     }
	);
	*/

		
	//point light
	light = new THREE.PointLight( 0xffffff, 1, 25 );
	light.position.set( 0, -2.5, 0 );
	//add point light in scene
	scene.children[0] = light;
	
	//ambient light
	light_ambient = new THREE.AmbientLight( 0x404040 );
	//add ambient light in scene
	scene.children[1] = light_ambient;
		
	//all
	loader_material.load('obj/all.mtl', function( material ) {
						     	material.preload();
						     	loader.setMaterials( material );
						     	loader.load('obj/all.obj', (object) => {
						     					//set color
											object.children[0].material.color.r = 1;
											object.children[0].material.color.g = 1;
											object.children[0].material.color.b = 1;
											//add obj in scene
											scene.children[2] = object;
											scene.children[2].position.set( 0, 0, 0 );
										  	//set start position & scale
											scene.children[2].scale.set( 5, 5, 5 );
											scene.children[2].position.set( 0, -7, 0 );
										    	scene.children[2].rotation.y = 4;
										  	//set status changeable
											scene.children[2].children[1].material.changeable = 1;
											scene.children[2].children[2].material.changeable = 1;
											scene.children[2].children[4].material.changeable = 1;
											scene.children[2].children[5].material.changeable = 1;
										}
						     	);
					     }
	);


//activate
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	let loading = setInterval( function() { 
					//activate animation loop
				 	if (scene.children[scene.children.length-1] !== undefined) { 
						clearInterval(loading); 
						renderer.setAnimationLoop( animation ); 
				 	} 
					
					//set blank color property r
					for (let i = 0; i < scene.children[2].children.length; i++ ) {
						scene.children[2].children[i].material.color.r = 0;
					}
				 } , 1000 );
}

//control
	document.addEventListener( 'mousedown', mouse_down );
	function mouse_down( event ) {
		pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		var intersection = raycaster.intersectObject( scene.children[2], true );
		if ( intersection.length > 0 ) {
			if (intersection[ 0 ].object.material.changeable === 1) {
			intersection[ 0 ].object.material.color.r = 1;
			intersection[ 0 ].object.material.color.r = 1;
			}
		}	
	}	


//logic
	var game_object;
	function show() {
		//hide game objects
		scene.children[2].children[4].visible = false;
		scene.children[2].children[5].visible = false;
		//set game objects to start position 
		scene.children[2].children[4].position.set( 0.25 , 0.05 , -0.25 );
		scene.children[2].children[5].position.set( 0.25 , 0.05 , -0.25 );
		//collect game objects to array
		let objects = [ scene.children[2].children[4] , scene.children[2].children[5] ];
		//choose random game object
		game_object = objects[ Math.round(Math.random()) ];
		game_object.visible = true;
		//add game object  to animation move array
		move_array.push( [game_object, new THREE.Vector3( 0.125 , -0.25 , -0.125 ) , 0.01] );
		return 1;
	}
	

//render
var inhale = true, exhale = false, size = 1;
function animation( time ) {
	 //life
	 if (inhale === true) {
			size -= 0.01;
			if (size > -0.5) {
	
			
			} else { inhale = false; exhale =  true; }
		
	 }
	 if (exhale === true) {
			size += 0.01; 
			if (size < 0.5) {
			
			} else { inhale = true; exhale =  false; }
		
	 }
	
	//move
	move();
	//control
	raycaster.setFromCamera( pointer, camera );
	
	//render	
	renderer.render(scene, camera); 
}

function move() {
	//move_array.push( [game_object, new THREE.Vector3( 0, 0, 0 ) , 0.01] );
	if ( move_array.length > 0 ) {
		for ( let i = 0; i < move_array.length; i++ ) {
			//check: it is object? 
			if ( move_array[i][0] !== undefined ) {
				let temp = move_array[i][0];
				//transform to obj
				temp.move = {};
				temp.move.destination = move_array[i][1];
				temp.move.step = move_array[i][2];
				temp.move.way = temp.position.distanceTo(temp.move.destination); 
				move_array[i] = temp;
			} else {
				let temp = move_array[i];
				//check: obj in the end way?
				if ( temp.move.way >= temp.move.step * 2 ) {
					//move obj
					//x
					if ( temp.position.x > temp.move.destination.x ) temp.position.x -= temp.move.step;
					if ( temp.position.x < temp.move.destination.x ) temp.position.x += temp.move.step;
					//y
					if ( temp.position.y > temp.move.destination.y ) temp.position.y -= temp.move.step;
					if ( temp.position.y < temp.move.destination.y ) temp.position.y += temp.move.step;
					//z
					if ( temp.position.z > temp.move.destination.z ) temp.position.z -= temp.move.step;
					if ( temp.position.z < temp.move.destination.z ) temp.position.z += temp.move.step;
					//recount way
					temp.move.way = temp.position.distanceTo(temp.move.destination); 
					move_array[i] = temp;
				} else {
					//delete obj
					move_array.splice( i , i + 1 );
				}
			}
		}	
	}
}

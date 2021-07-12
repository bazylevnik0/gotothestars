console.log( "app.js" );

import * as THREE         from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OBJLoader }      from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/OBJLoader.js'; 
import { MTLLoader }      from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/MTLLoader.js'; 
import { EffectComposer } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/EffectComposer.js'; 
import { RenderPass }     from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/RenderPass.js'; 
import { BloomPass }      from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/BloomPass.js'; 
import { FilmPass }       from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/FilmPass.js';

var camera = new THREE.PerspectiveCamera( 75 , window.innerWidth / window.innerHeight , 0.1 , 1000 );
    camera.position.z = 1.25;
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth , window.innerHeight );
document.body.appendChild( renderer.domElement );

var loader_game     = new OBJLoader();
var loader_nav      = new OBJLoader();
var loader_intro    = new OBJLoader();
var loader_material_game  = new MTLLoader();
var loader_material_nav   = new MTLLoader();
var loader_material_intro = new MTLLoader();
var loader_texture  = new THREE.TextureLoader();

//global
var process = "game";

var light = new THREE.PointLight( 0xffffff , 1 , 25 );
    light.position.set( 0 , -3 , 3 );
var light_ambient = new THREE.AmbientLight( 0x404040 );

	//add scenes
	var scene_intro = new THREE.Scene();
    		scene_intro.name = "scene_intro";
	var scene_game  = new THREE.Scene();
    		scene_game.name  = "scene_game";
	var scene_nav   = new THREE.Scene();
    		scene_nav.name   = "scene_nav";

	//add groups templates
	var temp_group = new THREE.Group();
    		//lights
    		scene_intro.add( set_name( temp_group.clone() , "lights" ) );
    		scene_game .add( set_name( temp_group.clone() , "lights" ) );
    		scene_nav  .add( set_name( temp_group.clone() , "lights" ) );
 		//objects
    		scene_intro.add( set_name( temp_group.clone() , "objects" ) );
    		scene_game .add( set_name( temp_group.clone() , "objects" ) );
    		scene_nav  .add( set_name( temp_group.clone() , "objects" ) );
		//sprites
		scene_intro.add( set_name( temp_group.clone() , "sprites" ) );
    		scene_game .add( set_name( temp_group.clone() , "sprites" ) );
    		scene_nav  .add( set_name( temp_group.clone() , "sprites" ) );
		//textures
		scene_intro.add( set_name( temp_group.clone() , "textures" ) );
    		scene_game .add( set_name( temp_group.clone() , "textures" ) );
    		scene_nav  .add( set_name( temp_group.clone() , "textures" ) );
		//temp
		scene_intro.add( set_name( temp_group.clone() , "temp" ) );
    		scene_game .add( set_name( temp_group.clone() , "temp" ) );
    		scene_nav  .add( set_name( temp_group.clone() , "temp" ) );

	//add scene id childrens to name grid
	add_gridId( scene_intro );
	add_gridId( scene_game );
	add_gridId( scene_nav );


//scene_intro
scene_intro.lights.add( light.clone() );
scene_intro.lights.add( light_ambient.clone() );
add_sprite_object( "./src/scene_intro/sprites/back.png" , "back" , scene_intro , 1 , false );
add_sprite_object( "./src/scene_intro/sprites/person_close_hand_open_eyes.png" , "person_close_hand_open_eyes" , scene_intro , 2 , false );
add_sprite_object( "./src/scene_intro/sprites/person_close_hand_close_eyes.png" , "person_close_hand_close_eyes" , scene_intro , 2 , false );
add_sprite_object( "./src/scene_intro/sprites/person_open_hand_open_eyes.png" , "person_open_hand_open_eyes" , scene_intro , 2 , false );
add_sprite_object( "./src/scene_intro/sprites/person_open_hand_close_eyes.png" , "person_open_hand_close_eyes" , scene_intro , 2 , false );
add_sprite_object( "./src/scene_intro/sprites/logo.png" , "logo" , scene_intro , 4 , false );
add_sprite_object( "./src/scene_intro/sprites/redcircle.png" , "redcircle" , scene_intro , 1 , false );
add_sprite_object( "./src/scene_intro/sprites/greencircle.png" , "greencircle" , scene_intro , 1 , false );
add_sprite_object( "./src/scene_intro/sprites/bluecircle.png" , "bluecircle" , scene_intro , 1 , false );
add_sprite_object( "./src/scene_intro/sprites/cloudl1.png" , "cloudl1" , scene_intro , 3 , false );
add_sprite_object( "./src/scene_intro/sprites/cloudl2.png" , "cloudl2" , scene_intro , 3 , false );
add_sprite_object( "./src/scene_intro/sprites/cloudl3.png" , "cloudl3" , scene_intro , 3 , false );
add_sprite_object( "./src/scene_intro/sprites/cloudr1.png","cloudr1" , scene_intro , 3 , false );
add_sprite_object( "./src/scene_intro/sprites/cloudr2.png","cloudr2" , scene_intro , 3 , false );
add_sprite_object( "./src/scene_intro/sprites/cloudr3.png","cloudr3" , scene_intro , 3 , false );

//scene_game
scene_game.lights.add( light.clone() );
scene_game.lights.add( light_ambient.clone() );
scene_game.add(light.clone());
scene_game.add(light_ambient.clone());
loader_material_game.load('./src/scene_game/scene_game(out).mtl', function( material ) {
						     	material.preload();
						     	loader_game.setMaterials( material );
						     	loader_game.load('./src/scene_game/scene_game(out).obj', (object) => {
													object.position.z = -1.25;
													object.rotation.set(1.575,0,0);
													scene_game.add(object);
					     							}
					       			   );
				     			}
		    );


	//portals
	var portals_texture_array = [
	  		   	     loader_texture.load( "./src/scene_game/textures/whitenoise/w0.png"  ),
				     loader_texture.load( "./src/scene_game/textures/whitenoise/w1.png"  ),
				     loader_texture.load( "./src/scene_game/textures/whitenoise/w2.png"  ),
				     loader_texture.load( "./src/scene_game/textures/whitenoise/w3.png"  ),
				     loader_texture.load( "./src/scene_game/textures/whitenoise/w4.png"  ),
				     loader_texture.load( "./src/scene_game/textures/whitenoise/w5.png"  ),
				     loader_texture.load( "./src/scene_game/textures/whitenoise/w6.png"  ),
				     loader_texture.load( "./src/scene_game/textures/whitenoise/w7.png"  ),
				     loader_texture.load( "./src/scene_game/textures/whitenoise/w8.png"  ),
				     loader_texture.load( "./src/scene_game/textures/whitenoise/w9.png"  ),
				     loader_texture.load( "./src/scene_game/textures/whitenoise/w10.png" ),
				     loader_texture.load( "./src/scene_game/textures/whitenoise/w11.png" )
				    ];
	var portals_material_array = [];
	var portals_sprite_array   = [];
	for ( let i = 0; i < 12; i++ ) {
		portals__material_array.push( new THREE.SpriteMaterial( { map: portals_texture_array[i] , color: 0xffffff, fog: true  , transparent: false , blending: THREE.AdditiveBlending }) );
		let x = new THREE.Sprite( portals_material_array[i] );
	    	    x.scale.set(1.25,1.25,1.25);
		portals_sprite_array.push(	[x.clone(),x.clone()] );
		portals_sprite_array[i][0].position.set(-1.5,-0.25,-1.30);
		portals_sprite_array[i][1].position.set(1.5,-0.25,-1.30);
	}

//scene_nav
scene_nav.lights.add( light.clone() );
scene_nav.lights.add( light_ambient.clone() );
loader_material_nav.load('./src/scene_nav/scene_nav.mtl', function( material ) {
						     	material.preload();
						     	loader_nav.setMaterials( material );
						     	loader_nav.load('./src/scene_nav/scene_nav.obj', (object) => {
													object.position.z = -3;
													object.position.y = 0.8;
													object.rotation.set(2,0,0);
													scene_nav.add(object);
						     						}
						       		   );
					     		}
			    );
add_sprite_object( "./src/scene_nav/sprites/level.png" , "level" , scene_nav , 0  , false );			//0
add_sprite_object( "./src/scene_nav/sprites/jr.png" , "jr" , scene_nav , 0 , false );				//1
add_sprite_object( "./src/scene_nav/sprites/square-on.png" , "square-on-jr" , scene_nav , 0 , false );		//2
add_sprite_object( "./src/scene_nav/sprites/square-off.png" , "square-off-jr" , scene_nav , 0 , false );	//3
add_sprite_object( "./src/scene_nav/sprites/mid.png","mid" , scene_nav , 0 , false );				//4
add_sprite_object( "./src/scene_nav/sprites/square-on.png" , "square-on-mid" , scene_nav , 0 , false );		//5
add_sprite_object( "./src/scene_nav/sprites/square-off.png" , "square-off-mid" , scene_nav , 0 , false );	//6
add_sprite_object( "./src/scene_nav/sprites/sr.png","sr" , scene_nav , 0 , false );				//7
add_sprite_object( "./src/scene_nav/sprites/square-on.png" , "square-on-sr" , scene_nav , 0 , false );	 	//8
add_sprite_object( "./src/scene_nav/sprites/square-off.png" , "square-off-sr" , scene_nav , 0 , false );	//9

/*
scene_nav.sprites.level.scale.set(0.5,0.25,0.25);
scene_nav.children[2].children[0].position.set(0,0.6,0);

for ( let i = 1; i < 10; i++ ) {
	scene_nav.children[2].children[i].scale.set(0.1,0.1,0.1);
}

scene_nav.children[2].children[1].position.set(-0.5,0.1,0);
scene_nav.children[2].children[2].position.set(-0.5,-0.2,0);
scene_nav.children[2].children[3].position.set(-0.5,-0.2,0);
scene_nav.children[2].children[4].position.set(0,0.1,0);
scene_nav.children[2].children[5].position.set(0,-0.2,0);
scene_nav.children[2].children[6].position.set(0,-0.2,0);
scene_nav.children[2].children[7].position.set(0.5,0.1,0);
scene_nav.children[2].children[8].position.set(0.5,-0.2,0);
scene_nav.children[2].children[9].position.set(0.5,-0.2,0);
*/

//postprocessing

//preloading

//animate

//functions
function set_name( temp_object , temp_name ) {
	temp_object.name = temp_name;
	
	return temp_object;
}


function add_gridGroups( temp_scene ) {
	temp_scene.lights   = temp_scene.children[0];
	temp_scene.objects  = temp_scene.children[1];
	temp_scene.sprites  = temp_scene.children[2];
	temp_scene.textures = temp_scene.children[3];
	temp_scene.temp     = temp_scene.children[4];
	
	return temp_scene;
}

/*
function add_gridNames ( temp_group ) {
	let str;
	for (let i = 0 ; i < temp_group.length; i++) {
		str = temp_group[i].name;
		temp_group
	}
}
*/
function add_sprite_object( temp_path , temp_name , temp_scene , temp_layer , temp_temp ) {
	//create basic object
	let local_mesh     = new THREE.Mesh( new THREE.PlaneGeometry( 0.1 , 0.1 ) ,  new THREE.MeshBasicMaterial( { color: 0xff0000 } ) );
	//create and edit sprite
	let local_loader   = loader_texture.load( temp_path );
	let local_material = new THREE.SpriteMaterial( { map: local_loader , color: 0xffffff , fog: true  , transparent: true  } ); 
	let local_sprite   =  new THREE.Sprite( local_material );
	    local_sprite.scale.set( 1 , 1 , 1);
	    {
		if ( temp_layer == 0 ) { local_sprite.position.z =  0    };
		if ( temp_layer == 1 ) { local_sprite.position.z += 0.05 };
		if ( temp_layer == 2 ) { local_sprite.position.z += 0.10 };
		if ( temp_layer == 3 ) { local_sprite.position.z += 0.15 };
		if ( temp_layer == 4 ) { local_sprite.position.z += 0.20 };
		if ( temp_layer == 5 ) { local_sprite.position.z += 0.25 };
		if ( temp_layer == 6 ) { local_sprite.position.z += 0.30 };
		if ( temp_layer == 7 ) { local_sprite.position.z += 0.35 };
		if ( temp_layer == 8 ) { local_sprite.position.z += 0.40 };
		if ( temp_layer == 9 ) { local_sprite.position.z += 0.45 };
	    }
	//add sprite to mesh
	local_mesh.add( local_sprite );
	local_mesh.name = temp_name;
	//add object to scene
	if ( temp_temp === true ) {
		temp_scene.temp.add( local_mesh );
	} else  temp_scene.sprites.add( local_mesh );

	return local_mesh;
}

console.log( scene_intro , scene_game , scene_nav );

/*

var process = "game";
var move_array = [];

var scene_intro = new THREE.Scene();
    scene_intro.name = "scene_intro";
var scene_game  = new THREE.Scene();
    scene_game.name  = "scene_game";
var scene_nav   = new THREE.Scene();
    scene_nav.name   = "scene_nav";

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 1.25;
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var light = new THREE.PointLight( 0xffffff , 1 , 25 );
    light.position.set( 0 , -3 , 3 );
var light_ambient = new THREE.AmbientLight( 0x404040 );

var loader_texture  = new THREE.TextureLoader();
var loader_game     = new OBJLoader();
var loader_nav      = new OBJLoader();
var loader_intro    = new OBJLoader();
var loader_material_game = new MTLLoader();
var loader_material_nav = new MTLLoader();
var loader_material_intro = new MTLLoader();

var temp_material , temp_sprite , temp_loader;
var fakeObj_geometry , fakeObj_material , fakeObj_mesh;

//scene intro
scene_intro.add(light.clone())
scene_intro.add(light_ambient.clone());

var sprite_group_intro = new THREE.Group();
    scene_intro.add( sprite_group_intro );

add_sprite_object("./src/scene_intro/sprites/back.png","back",0, scene_intro);
add_sprite_object("./src/scene_intro/sprites/person_close_hand_open_eyes.png","person_close_hand_open_eyes" , 2, scene_intro);
add_sprite_object("./src/scene_intro/sprites/person_close_hand_close_eyes.png","person_close_hand_close_eyes" , 2, scene_intro);
add_sprite_object("./src/scene_intro/sprites/person_open_hand_open_eyes.png","person_open_hand_open_eyes" , 2, scene_intro);
add_sprite_object("./src/scene_intro/sprites/person_open_hand_close_eyes.png","person_open_hand_close_eyes" , 2, scene_intro);
add_sprite_object("./src/scene_intro/sprites/logo.png","logo" , 4, scene_intro);
add_sprite_object("./src/scene_intro/sprites/redcircle.png","redcircle" , 1, scene_intro);
add_sprite_object("./src/scene_intro/sprites/greencircle.png","greencircle" , 1, scene_intro);
add_sprite_object("./src/scene_intro/sprites/bluecircle.png","bluecircle" , 1, scene_intro);
add_sprite_object("./src/scene_intro/sprites/cloudl1.png","cloudl1" , 3, scene_intro);
add_sprite_object("./src/scene_intro/sprites/cloudl2.png","cloudl2" , 3, scene_intro);
add_sprite_object("./src/scene_intro/sprites/cloudl3.png","cloudl3" , 3, scene_intro);
add_sprite_object("./src/scene_intro/sprites/cloudr1.png","cloudr1" , 3, scene_intro);
add_sprite_object("./src/scene_intro/sprites/cloudr2.png","cloudr2" , 3, scene_intro);
add_sprite_object("./src/scene_intro/sprites/cloudr3.png","cloudr3" , 3, scene_intro);

scene_intro.children[2].children[0].scale.set(1.3,1,1);

	

//scene game
	scene_game.add(light.clone());
	scene_game.add(light_ambient.clone());
	loader_material_game.load('./src/scene_game/scene_game(out).mtl', function( material ) {
							     	material.preload();
							     	loader_game.setMaterials( material );
							     	loader_game.load('./src/scene_game/scene_game(out).obj', (object) => {
														object.position.z = -1.25;
														object.rotation.set(1.575,0,0);
														scene_game.add(object);
						     							}
						       			   );
					     			}
			    );


	//materials for portals											
	var sprite_video_array = [
	  			  loader_texture.load( "./src/scene_game/textures/whitenoise/w0.png"  ),
				  loader_texture.load( "./src/scene_game/textures/whitenoise/w1.png"  ),
				  loader_texture.load( "./src/scene_game/textures/whitenoise/w2.png"  ),
				  loader_texture.load( "./src/scene_game/textures/whitenoise/w3.png"  ),
				  loader_texture.load( "./src/scene_game/textures/whitenoise/w4.png"  ),
				  loader_texture.load( "./src/scene_game/textures/whitenoise/w5.png"  ),
				  loader_texture.load( "./src/scene_game/textures/whitenoise/w6.png"  ),
				  loader_texture.load( "./src/scene_game/textures/whitenoise/w7.png"  ),
				  loader_texture.load( "./src/scene_game/textures/whitenoise/w8.png"  ),
				  loader_texture.load( "./src/scene_game/textures/whitenoise/w9.png"  ),
				  loader_texture.load( "./src/scene_game/textures/whitenoise/w10.png" ),
				  loader_texture.load( "./src/scene_game/textures/whitenoise/w11.png" )
				 ];
	
	let calc = 0;
	let temp_material_array = [];
	let temp_sprite_array =  [];
	for ( let i = 0; i < 12; i++ ) {
		temp_material_array.push( new THREE.SpriteMaterial( { map: sprite_video_array[i] , color: 0xffffff, fog: true  , transparent: false , blending: THREE.AdditiveBlending }) );
		let x = new THREE.Sprite( temp_material_array[i] );
		    x.scale.set(1.25,1.25,1.25);
		temp_sprite_array.push(	[x.clone(),x.clone()] );
		temp_sprite_array[i][0].position.set(-1.5,-0.25,-1.30);
		temp_sprite_array[i][1].position.set(1.5,-0.25,-1.30);
	} 
	

//scene nav

scene_nav.add(light.clone());
scene_nav.add(light_ambient.clone());
loader_material_nav.load('./src/scene_nav/scene_nav.mtl', function( material ) {
						     	material.preload();
						     	loader_nav.setMaterials( material );
						     	loader_nav.load('./src/scene_nav/scene_nav.obj', (object) => {
													object.position.z = -3;
													object.position.y = 0.8;
													object.rotation.set(2,0,0);
													scene_nav.add(object);
						     						}
						       		   );
					     		}
			    );

var sprite_group_nav = new THREE.Group();
    scene_nav.add( sprite_group_nav );

add_sprite_object("./src/scene_nav/sprites/level.png","level" , 0 , scene_nav);			//0
add_sprite_object("./src/scene_nav/sprites/jr.png","jr" , 0 , scene_nav);			//1
add_sprite_object("./src/scene_nav/sprites/square-on.png","square-on-jr" , 0 , scene_nav);	//2
add_sprite_object("./src/scene_nav/sprites/square-off.png","square-off-jr" , 0 , scene_nav);	//3
add_sprite_object("./src/scene_nav/sprites/mid.png","mid" , 0 , scene_nav);			//4
add_sprite_object("./src/scene_nav/sprites/square-on.png","square-on-mid" , 0 , scene_nav);	//5
add_sprite_object("./src/scene_nav/sprites/square-off.png","square-off-mid" , 0 , scene_nav);	//6
add_sprite_object("./src/scene_nav/sprites/sr.png","sr" , 0 , scene_nav);			//7
add_sprite_object("./src/scene_nav/sprites/square-on.png","square-on-sr" , 0 , scene_nav);	//8
add_sprite_object("./src/scene_nav/sprites/square-off.png","square-off-sr" , 0 , scene_nav);	//9

scene_nav.children[2].children[0].scale.set(0.5,0.25,0.25);
scene_nav.children[2].children[0].position.set(0,0.6,0);

for ( let i = 1; i < 10; i++ ) {
	scene_nav.children[2].children[i].scale.set(0.1,0.1,0.1);
}

scene_nav.children[2].children[1].position.set(-0.5,0.1,0);
scene_nav.children[2].children[2].position.set(-0.5,-0.2,0);
scene_nav.children[2].children[3].position.set(-0.5,-0.2,0);
scene_nav.children[2].children[4].position.set(0,0.1,0);
scene_nav.children[2].children[5].position.set(0,-0.2,0);
scene_nav.children[2].children[6].position.set(0,-0.2,0);
scene_nav.children[2].children[7].position.set(0.5,0.1,0);
scene_nav.children[2].children[8].position.set(0.5,-0.2,0);
scene_nav.children[2].children[9].position.set(0.5,-0.2,0);

//postprocessing
const bloomPass = new BloomPass(
	0.75,    // strength
	25,   // kernel size
    	4,    // sigma ?
    	256,  // blur render target resolution
);

const filmPass = new FilmPass(
   	0.125,   // noise intensity
    	0.025,  // scanline intensity
    	648,    // scanline count
    	false,  // grayscale
);
filmPass.renderToScreen = true;
	
const composer_game  = new EffectComposer(renderer);
const composer_intro = new EffectComposer(renderer);
const composer_nav   = new EffectComposer(renderer);
renderer.autoClear = false;


//check loading
let loading = setInterval( function () {
	if (scene_game.children[2] !== undefined) {
		clearInterval(loading);
		
		//scene_game
		scene_game.children[2].children[10].material.transparent = true;
		scene_game.children[2].children[10].material.opacity = 0.34;
		scene_game.children[2].children[11].material.transparent = true;
		scene_game.children[2].children[11].material.opacity = 0.34;
		scene_game.children[2].children[12].material.transparent = true;
		scene_game.children[2].children[12].material.opacity = 0.34;
		scene_game.children[2].children[13].material.transparent = true;
		scene_game.children[2].children[13].material.opacity = 0.34;
		
		
		composer_game.addPass(new RenderPass(scene_game, camera));
		composer_game.addPass(bloomPass);
		composer_game.addPass(filmPass);
			
			
		//scene_intro
		composer_intro.addPass(new RenderPass(scene_intro, camera));
			
		//scene_intro
		composer_nav.addPass(new RenderPass(scene_nav, camera));
	}
} , 100 );

console.log(scene_game);
console.log(scene_intro);
console.log(scene_nav);
																		//!!function of show intro
																		//!!functions of change scene
																		//!!game function

						
const animate = function () {
	requestAnimationFrame( animate );
	
	move();

	//scene_game
	//update portal materials							
	if (scene_game.children[2] !== undefined ) {
		 scene_game.children[2].children[6].children[0] = temp_sprite_array[calc][0];
		 scene_game.children[2].children[7].children[0] = temp_sprite_array[calc][1];
		 calc++; if (calc == 12) calc = 0;
	}
	
	switch ( process ) {
		case 'intro' : { composer_intro.render(); } break;	
		case 'game'  : { composer_game.render();  } break;	
		case 'nav'   : { composer_nav.render();   } break;		
	}
};

animate();

document.addEventListener('keydown', function(event) {
					switch ( event.keyCode ) {
						case 81 :  change_scene(process, "intro"); process = "intro"; console.log(scene_intro,scene_game,scene_nav);break;
						case 87 :  change_scene(process, "game");  process = "game";  console.log(scene_intro,scene_game,scene_nav);break;
						case 69 :  change_scene(process, "nav");   process = "nav";   console.log(scene_intro,scene_game,scene_nav);break;
					} 
			    	      }
			 );
function add_sprite_object( path , name , layer , scene_var ) {
	fakeObj_geometry = new THREE.PlaneGeometry(0.1,0.1)
	fakeObj_material = new THREE.MeshBasicMaterial( {color: 0xff0000 } ); 
	fakeObj_mesh = new THREE.Mesh( fakeObj_geometry , fakeObj_material );
	temp_loader = loader_texture.load( path );
	temp_material = new THREE.SpriteMaterial( { map: temp_loader, color: 0xffffff, fog: true  , transparent: true  } ); 
	temp_sprite =  new THREE.Sprite( temp_material );
	temp_sprite.scale.set(3,2,1)
	{
		if (layer == 1) { temp_sprite.position.z += 0.05 }
		if (layer == 2) { temp_sprite.position.z += 0.10}
		if (layer == 3) { temp_sprite.position.z += 0.15}
		if (layer == 4) { temp_sprite.position.z += 0.20}
	}
	fakeObj_mesh.add( temp_sprite );
	fakeObj_mesh.name = name;
	scene_var.children[scene_var.children.length-1].add( fakeObj_mesh );
}

function change_scene( temp_process , next_process ) {
	if ( temp_process == "game" ) {
		if ( next_process == "intro" ) {
			console.log(add_sprite_object("./src/switch_intro.png","switch_temp",4,scene_game));
			//let temp = scene_game.children[scene_game.children-1].forEach(element => if(element.name == "switch_temp") { return [element
			//scene_nav.children[2].children[i].scale.set(0.1,0.1,0.1)
			//scene_game.children[scene_var.children.length-1].pop();	
		}
		if ( next_process == "nav" ) {

		}
	}
	
	if (( temp_process == "intro" ) && (next_process = "game")) {

	}
	if (( temp_process == "nav" ) && (next_process = "game")) {

	}
}

function move () {
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
//presentation mode
let presentation_mode = 1;

if (presentation_mode == 1) {
	let timer = setInterval(function(){
						switch(process) {
							case 'intro' : { process = "game" } break;	
							case 'game'  : { process = "nav"  } break;	
							case 'nav'   : { process = "intro"   } break;		
						}
					  } , 500);
}

*/

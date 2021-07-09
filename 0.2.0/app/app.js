/*
console.log("app.js"); 

import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js'
 import {OBJLoader} from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/OBJLoader.js'; 
import {MTLLoader} from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/MTLLoader.js'; 
import {EffectComposer} from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/EffectComposer.js'; 
import {RenderPass} from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/RenderPass.js'; 
import {BloomPass} from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/BloomPass.js'; 
import {FilmPass} from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/FilmPass.js';
*/
console.log("app.js"); import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js'

import {OBJLoader} from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/OBJLoader.js'; import {MTLLoader} from 
'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/MTLLoader.js'; import {EffectComposer} from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/EffectComposer.js'; 
import {RenderPass} from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/RenderPass.js'; import {BloomPass} from 
'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/BloomPass.js'; import {FilmPass} from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/FilmPass.js';


var process = "intro";

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

var geometry = new THREE.PlaneGeometry(3,2);
var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
var cube = new THREE.Mesh( geometry, material );
cube.material.map = loader_texture.load( './src/scene_intro/grid(960x640).png' );
scene_intro.add( cube );
	
	//loading
	var sprite_group = new THREE.Group();
	scene_intro.add( sprite_group );

	add_sprite_object("./src/scene_intro/sprites/back.png","back",0);
	add_sprite_object("./src/scene_intro/sprites/person_close_hand_open_eyes.png","person_close_hand_open_eyes" , 2);
	add_sprite_object("./src/scene_intro/sprites/person_close_hand_close_eyes.png","person_close_hand_close_eyes" , 2);
	add_sprite_object("./src/scene_intro/sprites/person_open_hand_open_eyes.png","person_open_hand_open_eyes" , 2);
	add_sprite_object("./src/scene_intro/sprites/person_open_hand_close_eyes.png","person_open_hand_close_eyes" , 2);
	add_sprite_object("./src/scene_intro/sprites/logo.png","logo" , 4);
	add_sprite_object("./src/scene_intro/sprites/redcircle.png","redcircle" , 1);
	add_sprite_object("./src/scene_intro/sprites/greencircle.png","greencircle" , 1);
	add_sprite_object("./src/scene_intro/sprites/bluecircle.png","bluecircle" , 1);
	add_sprite_object("./src/scene_intro/sprites/cloudl1.png","cloudl1" , 3);
	add_sprite_object("./src/scene_intro/sprites/cloudl2.png","cloudl2" , 3);
	add_sprite_object("./src/scene_intro/sprites/cloudl3.png","cloudl3" , 3);
	add_sprite_object("./src/scene_intro/sprites/cloudr1.png","cloudr1" , 3);
	add_sprite_object("./src/scene_intro/sprites/cloudr2.png","cloudr2" , 3);
	add_sprite_object("./src/scene_intro/sprites/cloudr3.png","cloudr3" , 3);

	function add_sprite_object( path , name , layer ) {
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
		scene_intro.children[3].add( fakeObj_mesh );
	}
		

	

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


	//materials for portals												//!!!WRITE MORE SIMPLEST
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
						case 81 :  process = "intro"; break;
						case 87 :  process = "game";  break;
						case 69 :  process = "nav";   break;
					} 
			    	      }
			 );

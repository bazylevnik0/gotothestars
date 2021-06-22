console.log("app.js");
import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js'

import {OBJLoader}      from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader}      from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/MTLLoader.js';
import {EffectComposer} from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass}     from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/RenderPass.js';
import {BloomPass}      from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/BloomPass.js';
import {FilmPass}       from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/FilmPass.js';



var scene_intro = new THREE.Scene();
var scene_game  = new THREE.Scene();
var scene_nav   = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 1.25;
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var light = new THREE.PointLight( 0xffffff , 1 , 25 );
    light.position.set( 0 , -3 , 3 );
var light_ambient = new THREE.AmbientLight( 0x404040 );

var loader          = new OBJLoader();
var loader_texture  = new THREE.TextureLoader();
var loader_material = new MTLLoader();
//var video = document.getElementById( 'video' );
//var texture_video = new THREE.VideoTexture( video );	

//scene intro
/*
scene_intro.add(light.clone())
scene_game.add(light_ambient.clone());

var geometry = new THREE.PlaneGeometry(3,2);
var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
var cube = new THREE.Mesh( geometry, material );
cube.material.map = loader_texture.load( './src/grid(960x640).png' );
scene_intro.add( cube );
*/

//scene game
scene_game.add(light.clone());
scene_game.add(light_ambient.clone());

//changename!
var sprite_video1 = loader_texture.load( "./src/textures/whitenoise/w1.png" );
var sprite_video2 = loader_texture.load( "./src/textures/whitenoise/w2.png" );
var sprite_video3 = loader_texture.load( "./src/textures/whitenoise/w3.png" );
var sprite_video4 = loader_texture.load( "./src/textures/whitenoise/w4.png" );

loader_material.load('./src/scene_game(out).mtl', function( material ) {
						     	material.preload();
						     	loader.setMaterials( material );
						     	loader.load('./src/scene_game(out).obj', (object) => {
													object.position.z = -1.25;
													object.rotation.set(1.575,0,0);
													//object.children[6].material = new THREE.MeshBasicMaterial( {map: texture_video, color: 0xffffff} );
													//object.children[7].material = new THREE.MeshBasicMaterial( {map: texture_video, color: 0xffffff} );
													let temp_material = new THREE.SpriteMaterial( { map: sprite_video1 , color: 0xffff00, fog: true  , transparent: true , blending: THREE.AdditiveBlending } ); 
													let temp_sprite =  new THREE.Sprite( temp_material );
													temp_sprite.scale.set(1,1,1)
													object.children[6].add( temp_sprite );

													
													scene_game.add(object);
													
						     						}
						       		   );
					     		}
			    );

/*
//scene nav
scene_nav.add(light.clone());
scene_game.add(light_ambient.clone());
loader_material.load('./src/grid(960x640)+3d.mtl', function( material ) {
						     	material.preload();
						     	loader.setMaterials( material );
						     	loader.load('./src/grid(960x640)+3d.obj', (object) => {
													object.position.z = -3;
													object.position.y = 0.8;
													object.rotation.set(2,0,0);
													scene_nav.add(object);
						     						}
						       		   );
					     		}
			    );
*/
console.log(scene_game);
let calc = 1;

let temp_material1 = new THREE.SpriteMaterial( { map: sprite_video1 , color: 0xffff00, fog: true  , transparent: true , blending: THREE.AdditiveBlending } ); 
let temp_sprite1 =  new THREE.Sprite( temp_material1 );
temp_sprite1.scale.set(1,1,1)
let temp_material2 = new THREE.SpriteMaterial( { map: sprite_video2 , color: 0xffff00, fog: true  , transparent: true , blending: THREE.AdditiveBlending } ); 
let temp_sprite2 =  new THREE.Sprite( temp_material2 );
temp_sprite2.scale.set(1,1,1)
let temp_material3 = new THREE.SpriteMaterial( { map: sprite_video3 , color: 0xffff00, fog: true  , transparent: true , blending: THREE.AdditiveBlending } ); 
let temp_sprite3 =  new THREE.Sprite( temp_material3 );
temp_sprite3.scale.set(1,1,1)
let temp_material4 = new THREE.SpriteMaterial( { map: sprite_video4 , color: 0xffff00, fog: true  , transparent: true , blending: THREE.AdditiveBlending } ); 
let temp_sprite4 =  new THREE.Sprite( temp_material4 );
temp_sprite4.scale.set(1,1,1)
						
const animate = function () {
	requestAnimationFrame( animate );
	if (scene_game.children[2] !== undefined ) {

		if (calc == 1) scene_game.children[2].children[6].children[0] = temp_sprite1;
		if (calc == 2) scene_game.children[2].children[6].children[0] = temp_sprite2;
		if (calc == 3) scene_game.children[2].children[6].children[0] = temp_sprite3;
		if (calc == 4) scene_game.children[2].children[6].children[0] = temp_sprite4;
	calc++; if (calc == 5) calc = 1;
	}
	renderer.render( scene_game, camera );

};

animate();
 	

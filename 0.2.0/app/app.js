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
	
//scene intro
scene_intro.add(light.clone())
scene_game.add(light_ambient.clone());

const geometry = new THREE.PlaneGeometry(3,2);
const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
const cube = new THREE.Mesh( geometry, material );
cube.material.map = loader_texture.load( './src/grid(960x640).png' );
scene_intro.add( cube );

//scene game
scene_game.add(light.clone());
scene_game.add(light_ambient.clone());
loader_material.load('./src/grid(960x640).mtl', function( material ) {
						     	material.preload();
						     	loader.setMaterials( material );
						     	loader.load('./src/grid(960x640).obj', (object) => {
													object.position.z = -1.25;
													object.rotation.set(1.575,0,0);
													scene_game.add(object);
						     						}
						       		   );
					     		}
			    );
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

const animate = function () {
	requestAnimationFrame( animate );

	renderer.render( scene_nav, camera );
};

animate();
 	

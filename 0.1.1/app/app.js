console.log("app.js");
import * as TOOLS from './tools.js'
import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js'

import {OBJLoader}      from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader}      from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/MTLLoader.js';
import {EffectComposer} from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass}     from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/RenderPass.js';
import {BloomPass}      from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/BloomPass.js';
import {FilmPass}       from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/FilmPass.js';

var score ,         process ,         move_array ,		                //game  
    pointer ,       raycaster , 				                //control
    loader ,        loader_material , loader_texture , 	                        //loaders obj&material&imgtexture
    video ,         texture_video ,   map_glow ,		                //domvideo, videotexture, glowshader 
    camera ,        scene ,           light ,          light_ambient ,		//scene objects
    temp_material , temp_sprite;			                        //temp objects

scene = new THREE.Scene();
load();

//prerender
const renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

//postprocessing 
const bloomPass = new BloomPass(
    1.875,    // strength
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

const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));

filmPass.renderToScreen = true;
composer.addPass(bloomPass);
composer.addPass(filmPass);

//render
const animate = function () {
	requestAnimationFrame( animate );
	
	renderer.autoClear = false;
	renderer.clear();
  
	renderer.clearDepth();
  
	camera.layers.set(1);
  	composer.render();
  
  	renderer.clearDepth();
  	camera.layers.set(0);
  	renderer.render(scene, camera);
};

function load() {
	score = 0;
	process = undefined;
	move_array = [];

	pointer = new THREE.Vector2();
	raycaster = new THREE.Raycaster();

	loader = new OBJLoader();
	loader_material = new MTLLoader();
	loader_texture = new THREE.TextureLoader();
	video = document.getElementById( 'video' );
	texture_video = new THREE.VideoTexture( video );
	map_glow = loader_texture.load( "./src/images/glow.png" );	
	
	loader_material.load('./src/objects/all.mtl', function( material ) {
						     	material.preload();
						     	loader.setMaterials( material );
						     	loader.load('./src/objects/all.obj', (object) => {
													scene.add(object);
						     						}
						       		   );
					     		}
			    );
	//go to init
	init();
}

function init() {
	//camera
	camera = new THREE.PerspectiveCamera( 75 , window.innerWidth / window.innerHeight , 0.1 , 1000 );
	camera.layers.enable(0); 
	camera.layers.enable(1);
	camera.rotation.set( -0.3 , 0 , 0 );
	camera.position.set(  0 ,  -4 , 6 );	
	//light
	light = new THREE.PointLight( 0xffffff , 1 , 25 );
    	light.position.set( 0 , -2.5 , +2.5 );
    	light.layers.enable(0);
    	light.layers.enable(1);
    	scene.add(light)
	//ambient light
	light_ambient = new THREE.AmbientLight( 0x404040 );
    	light_ambient.layers.enable(0);
    	light_ambient.layers.enable(1);
    	scene.add(light_ambient);
	//main objects group
	let loading = setInterval( function() { 
				 	if (scene.children[2] !== undefined) { 
						console.log(scene);
						clearInterval(loading);
						//set start position & settings
							//set clear under color
								//portal right out
								scene.children[2].children[0].material.color.r = 1;
								scene.children[2].children[0].material.color.g = 1;
								scene.children[2].children[0].material.color.b = 1;
								//portal left out
								scene.children[2].children[1].material.color.r = 1;
								scene.children[2].children[1].material.color.g = 1;
								scene.children[2].children[1].material.color.b = 1;
								//back
								scene.children[2].children[4].material.color.r = 1;
								scene.children[2].children[4].material.color.g = 1;
								scene.children[2].children[4].material.color.b = 1;
							//set base color
								//game object cube
								scene.children[2].children[2].material.color.r = 1;
								scene.children[2].children[2].material.color.g = 1;
								scene.children[2].children[2].material.color.b = 0;
								//game object sphere
								scene.children[2].children[3].material.color.r = 1;
								scene.children[2].children[3].material.color.g = 1;
								scene.children[2].children[3].material.color.b = 0;
							//set normal maps
								//portal right out
								scene.children[2].children[0].material.normalMap = loader_texture.load( './src/objects/normal.png' );
								//portal left out
								scene.children[2].children[1].material.normalMap = loader_texture.load( './src/objects/normal.png' );
							//set effects
								//video texture
									//portal right in
									scene.children[2].children[5].material = new THREE.MeshBasicMaterial( {map: texture_video, color: 0xffffff} );
									//portal left in
									scene.children[2].children[6].material = new THREE.MeshBasicMaterial( {map: texture_video, color: 0xffffff} );
								//shader glow
								temp_material = new THREE.SpriteMaterial( { map: map_glow, color: 0xffff00, fog: true  , transparent: true , blending: THREE.AdditiveBlending } ); 
								temp_sprite =  new THREE.Sprite( temp_material );
								temp_sprite.scale.set(3,3,3)
									//game object cube
									scene.children[2].children[2].add( temp_sprite );
									//game object sphere
									scene.children[2].children[3].add( temp_sprite );
							//set start position & scale
								scene.children[2].scale.set( 5, 5, 5 );
								scene.children[2].position.set( 0, -7, 0 );
							 	scene.children[2].rotation.y = 4;
						  	//set statuses 		
								//set info about changeable
									//portal right in
									scene.children[2].children[5].material.changeable = 1;
									//portal left in
									scene.children[2].children[6].material.changeable = 1;
								//set info about form
									//game objects
									scene.children[2].children[2].form = "cube";
									scene.children[2].children[3].form = "sphere";
									//portal right in
									scene.children[2].children[5].form = "cube";
									//portal left in
									scene.children[2].children[6].form = "sphere";
					//listening resize window event				
					window.addEventListener( 'resize', onWindowResize, false );
					//run animate
					animate();
				 	} 
				 } , 1000 );

									
	
	

}
//extra
function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

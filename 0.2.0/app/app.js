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
    camera.layers.enable(1);
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
	loader_material.load('./src/scene_game(out).mtl', function( material ) {
							     	material.preload();
							     	loader.setMaterials( material );
							     	loader.load('./src/scene_game(out).obj', (object) => {
														object.position.z = -1.25;
														object.rotation.set(1.575,0,0);
														scene_game.add(object);
						     							}
						       			   );
					     			}
			    );


	//materials for portals
	var sprite_video1  = loader_texture.load( "./src/textures/whitenoise/w1.png"  );
	var sprite_video2  = loader_texture.load( "./src/textures/whitenoise/w2.png"  );
	var sprite_video3  = loader_texture.load( "./src/textures/whitenoise/w3.png"  );
	var sprite_video4  = loader_texture.load( "./src/textures/whitenoise/w4.png"  );
	var sprite_video5  = loader_texture.load( "./src/textures/whitenoise/w5.png"  );
	var sprite_video6  = loader_texture.load( "./src/textures/whitenoise/w6.png"  );
	var sprite_video7  = loader_texture.load( "./src/textures/whitenoise/w7.png"  );
	var sprite_video8  = loader_texture.load( "./src/textures/whitenoise/w8.png"  );
	var sprite_video9  = loader_texture.load( "./src/textures/whitenoise/w9.png"  );
	var sprite_video10 = loader_texture.load( "./src/textures/whitenoise/w10.png" );
	var sprite_video11 = loader_texture.load( "./src/textures/whitenoise/w11.png" );
	var sprite_video12 = loader_texture.load( "./src/textures/whitenoise/w12.png" );

	let calc = 1
	//1
	let temp_material1 = new THREE.SpriteMaterial( { map: sprite_video1 , color: 0xffffff, fog: true  , transparent: false , blending: THREE.AdditiveBlending } ); 
	let temp_sprite1_left =  new THREE.Sprite( temp_material1 );
	let temp_sprite1_right =  new THREE.Sprite( temp_material1 );
	sprite_videomaterial_scale_set(temp_sprite1_left);
	sprite_videomaterial_scale_set(temp_sprite1_right);
	sprite_videomaterial_portalleft_position_set(temp_sprite1_left);
	sprite_videomaterial_portalright_position_set(temp_sprite1_right)
	//2
	let temp_material2 = new THREE.SpriteMaterial( { map: sprite_video2 , color: 0xffffff, fog: true  , transparent: false , blending: THREE.AdditiveBlending } ); 
	let temp_sprite2_left =  new THREE.Sprite( temp_material2 );
	let temp_sprite2_right =  new THREE.Sprite( temp_material2 );
	sprite_videomaterial_scale_set(temp_sprite2_left);
	sprite_videomaterial_scale_set(temp_sprite2_right);
	sprite_videomaterial_portalleft_position_set(temp_sprite2_left);
	sprite_videomaterial_portalright_position_set(temp_sprite2_right)
	//3
	let temp_material3 = new THREE.SpriteMaterial( { map: sprite_video3 , color: 0xffffff, fog: true  , transparent: false , blending: THREE.AdditiveBlending } ); 
	let temp_sprite3_left =  new THREE.Sprite( temp_material3 );
	let temp_sprite3_right =  new THREE.Sprite( temp_material3 );
	sprite_videomaterial_scale_set(temp_sprite3_left);
	sprite_videomaterial_scale_set(temp_sprite3_right);
	sprite_videomaterial_portalleft_position_set(temp_sprite3_left);
	sprite_videomaterial_portalright_position_set(temp_sprite3_right)
	//4
	let temp_material4 = new THREE.SpriteMaterial( { map: sprite_video4 , color: 0xffffff, fog: true  , transparent: false , blending: THREE.AdditiveBlending } ); 
	let temp_sprite4_left =  new THREE.Sprite( temp_material4 );
	let temp_sprite4_right =  new THREE.Sprite( temp_material4 );
	sprite_videomaterial_scale_set(temp_sprite4_left);
	sprite_videomaterial_scale_set(temp_sprite4_right);
	sprite_videomaterial_portalleft_position_set(temp_sprite4_left);
	sprite_videomaterial_portalright_position_set(temp_sprite4_right)
	//5
	let temp_material5 = new THREE.SpriteMaterial( { map: sprite_video5 , color: 0xffffff, fog: true  , transparent: false , blending: THREE.AdditiveBlending } ); 
	let temp_sprite5_left =  new THREE.Sprite( temp_material5 );
	let temp_sprite5_right =  new THREE.Sprite( temp_material5 );
	sprite_videomaterial_scale_set(temp_sprite5_left);
	sprite_videomaterial_scale_set(temp_sprite5_right);
	sprite_videomaterial_portalleft_position_set(temp_sprite5_left);
	sprite_videomaterial_portalright_position_set(temp_sprite5_right)
	//6
	let temp_material6 = new THREE.SpriteMaterial( { map: sprite_video6 , color: 0xffffff, fog: true  , transparent: false , blending: THREE.AdditiveBlending } ); 
	let temp_sprite6_left =  new THREE.Sprite( temp_material6 );
	let temp_sprite6_right =  new THREE.Sprite( temp_material6 );
	sprite_videomaterial_scale_set(temp_sprite6_left);
	sprite_videomaterial_scale_set(temp_sprite6_right);
	sprite_videomaterial_portalleft_position_set(temp_sprite6_left);
	sprite_videomaterial_portalright_position_set(temp_sprite6_right)
	//7
	let temp_material7 = new THREE.SpriteMaterial( { map: sprite_video7 , color: 0xffffff, fog: true  , transparent: false , blending: THREE.AdditiveBlending } ); 
	let temp_sprite7_left =  new THREE.Sprite( temp_material7 );
	let temp_sprite7_right =  new THREE.Sprite( temp_material7 );
	sprite_videomaterial_scale_set(temp_sprite7_left);
	sprite_videomaterial_scale_set(temp_sprite7_right);
	sprite_videomaterial_portalleft_position_set(temp_sprite7_left);
	sprite_videomaterial_portalright_position_set(temp_sprite7_right)
	//8
	let temp_material8 = new THREE.SpriteMaterial( { map: sprite_video8 , color: 0xffffff, fog: true  , transparent: false , blending: THREE.AdditiveBlending } ); 
	let temp_sprite8_left =  new THREE.Sprite( temp_material8 );
	let temp_sprite8_right =  new THREE.Sprite( temp_material8 );
	sprite_videomaterial_scale_set(temp_sprite8_left);
	sprite_videomaterial_scale_set(temp_sprite8_right);
	sprite_videomaterial_portalleft_position_set(temp_sprite8_left);
	sprite_videomaterial_portalright_position_set(temp_sprite8_right)
	//9
	let temp_material9 = new THREE.SpriteMaterial( { map: sprite_video9 , color: 0xffffff, fog: true  , transparent: false , blending: THREE.AdditiveBlending } ); 
	let temp_sprite9_left =  new THREE.Sprite( temp_material9 );
	let temp_sprite9_right =  new THREE.Sprite( temp_material9 );
	sprite_videomaterial_scale_set(temp_sprite9_left);
	sprite_videomaterial_scale_set(temp_sprite9_right);
	sprite_videomaterial_portalleft_position_set(temp_sprite9_left);
	sprite_videomaterial_portalright_position_set(temp_sprite9_right)
	//10
	let temp_material10 = new THREE.SpriteMaterial( { map: sprite_video10 , color: 0xffffff, fog: true  , transparent: false , blending: THREE.AdditiveBlending } ); 
	let temp_sprite10_left =  new THREE.Sprite( temp_material10 );
	let temp_sprite10_right =  new THREE.Sprite( temp_material10 );
	sprite_videomaterial_scale_set(temp_sprite10_left);
	sprite_videomaterial_scale_set(temp_sprite10_right);
	sprite_videomaterial_portalleft_position_set(temp_sprite10_left);
	sprite_videomaterial_portalright_position_set(temp_sprite10_right)
	//11
	let temp_material11 = new THREE.SpriteMaterial( { map: sprite_video11 , color: 0xffffff, fog: true  , transparent: false , blending: THREE.AdditiveBlending } ); 
	let temp_sprite11_left =  new THREE.Sprite( temp_material11 );
	let temp_sprite11_right =  new THREE.Sprite( temp_material11 );
	sprite_videomaterial_scale_set(temp_sprite11_left);
	sprite_videomaterial_scale_set(temp_sprite11_right);
	sprite_videomaterial_portalleft_position_set(temp_sprite11_left);
	sprite_videomaterial_portalright_position_set(temp_sprite11_right)
	//12
	let temp_material12 = new THREE.SpriteMaterial( { map: sprite_video12 , color: 0xffffff, fog: true  , transparent: false , blending: THREE.AdditiveBlending } ); 
	let temp_sprite12_left =  new THREE.Sprite( temp_material12 );
	let temp_sprite12_right =  new THREE.Sprite( temp_material12 );
	sprite_videomaterial_scale_set(temp_sprite12_left);
	sprite_videomaterial_scale_set(temp_sprite12_right);
	sprite_videomaterial_portalleft_position_set(temp_sprite12_left);
	sprite_videomaterial_portalright_position_set(temp_sprite12_right);
	
	function sprite_videomaterial_scale_set(object) {
		object.scale.set(1.25,1.25,1.25);
	}
	function sprite_videomaterial_portalleft_position_set(object) {
		object.position.set(-1.5,-0.25,-1.30);
	}
	function sprite_videomaterial_portalright_position_set(object) {
		object.position.set(1.5,-0.25,-1.30);
	}

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
      	composer.addPass(new RenderPass(scene_game, camera));

	filmPass.renderToScreen = true;
	composer.addPass(bloomPass);
	composer.addPass(filmPass);

	//check loading

	let loading = setInterval( function () {
		if (scene_game.children[2] !== undefined) {
			clearInterval(loading);
			scene_game.children[2].children[10].layers.set(1);
			scene_game.children[2].children[11].layers.set(1);
			scene_game.children[2].children[12].layers.set(1);
			scene_game.children[2].children[13].layers.set(1);						
		}
	} , 100 );
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
						
const animate = function () {
	requestAnimationFrame( animate );
	//update portal materials
	if (scene_game.children[2] !== undefined ) {
		if (calc == 1)  { scene_game.children[2].children[6].children[0] = temp_sprite1_left;  scene_game.children[2].children[7].children[0] = temp_sprite1_right; }
		if (calc == 2)  { scene_game.children[2].children[6].children[0] = temp_sprite2_left;  scene_game.children[2].children[7].children[0] = temp_sprite2_right; }
		if (calc == 3)  { scene_game.children[2].children[6].children[0] = temp_sprite3_left;  scene_game.children[2].children[7].children[0] = temp_sprite3_right; }
		if (calc == 4)  { scene_game.children[2].children[6].children[0] = temp_sprite4_left;  scene_game.children[2].children[7].children[0] = temp_sprite4_right; }
		if (calc == 5)  { scene_game.children[2].children[6].children[0] = temp_sprite5_left;  scene_game.children[2].children[7].children[0] = temp_sprite5_right; }
		if (calc == 6)  { scene_game.children[2].children[6].children[0] = temp_sprite6_left;  scene_game.children[2].children[7].children[0] = temp_sprite6_right; }
		if (calc == 7)  { scene_game.children[2].children[6].children[0] = temp_sprite7_left;  scene_game.children[2].children[7].children[0] = temp_sprite7_right; }
		if (calc == 8)  { scene_game.children[2].children[6].children[0] = temp_sprite8_left;  scene_game.children[2].children[7].children[0] = temp_sprite8_right; }
		if (calc == 9)  { scene_game.children[2].children[6].children[0] = temp_sprite9_left;  scene_game.children[2].children[7].children[0] = temp_sprite9_right; }
		if (calc == 10) { scene_game.children[2].children[6].children[0] = temp_sprite10_left; scene_game.children[2].children[7].children[0] = temp_sprite10_right; }
		if (calc == 11) { scene_game.children[2].children[6].children[0] = temp_sprite11_left; scene_game.children[2].children[7].children[0] = temp_sprite11_right; }
		if (calc == 12) { scene_game.children[2].children[6].children[0] = temp_sprite12_left; scene_game.children[2].children[7].children[0] = temp_sprite12_right; }
	calc++; if (calc == 13) calc = 1;
	}
	//renderer.render( scene_game, camera );

	renderer.autoClear = false;
	renderer.clear();

	renderer.clearDepth();

	camera.layers.set(1);
  	composer.render();

  	renderer.clearDepth();
  	camera.layers.set(0);
  	renderer.render(scene_game, camera);

};

animate();
 	

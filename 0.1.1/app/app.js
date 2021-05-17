console.log("app.js");
import * as TOOLS from './tools.js'
import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js'
import {EffectComposer} from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/RenderPass.js';
import {BloomPass} from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/BloomPass.js';
import {FilmPass} from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/FilmPass.js';

const loader_texture = new THREE.TextureLoader();

//load
const video = document.getElementById( 'video' );
const texture_video = new THREE.VideoTexture( video );
const map_glow = loader_texture.load( "./src/images/glow.png" );
//const material_glow = new THREE.SpriteMaterial( { map: map_glow, color: 0xffffff, fog: true  , transparent: true, blending: THREE.AdditiveBlending } );


//init
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.layers.enable(0);
camera.layers.enable(1);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//light
var light = new THREE.PointLight( 0xffffff, 1, 25 );
    light.position.set( 0, -2.5, +2.5 );
    light.layers.enable(0);
    light.layers.enable(1);
    scene.add(light)
//ambient light
var light_ambient = new THREE.AmbientLight( 0x404040 );
    light_ambient.layers.enable(0);
    light_ambient.layers.enable(1);
    scene.add(light_ambient);
	
const geometryA = new THREE.BoxGeometry();
const materialA = new THREE.MeshPhongMaterial( {color: 0xff0000} );
const cubeA = new THREE.Mesh( geometryA, materialA );
cubeA.position.y = +1.5;
cubeA.layers.set(1);
scene.add( cubeA );

const geometryB = new THREE.BoxGeometry();
const materialB = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cubeB = new THREE.Mesh( geometryB, materialB );
cubeB.position.y = -1.5;
cubeB.position.x = -1.5;
cubeB.layers.set(0);

let cubeB_material = new THREE.SpriteMaterial( { map: map_glow, color: 0x00ff00, fog: true  , transparent: true , blending: THREE.AdditiveBlending } ); 
let cubeB_sprite =  new THREE.Sprite( cubeB_material );
cubeB_sprite.scale.set(2.5,2.5,2.5)
cubeB.add( cubeB_sprite );
scene.add( cubeB );



const geometryC = new THREE.BoxGeometry();
const materialC =  new THREE.MeshBasicMaterial( {map: texture_video, color: 0x0000ff} );
const cubeC = new THREE.Mesh( geometryC, materialC );
cubeC.position.y = -1.5;
cubeC.position.x = +1.5;
cubeC.layers.set(0);
scene.add( cubeC );

/*
var spriteMaterial = new THREE.SpriteMaterial( 
	{ 
		map: loader_texture.load( '../src/images/glow.png' ), 
		useScreenCoordinates: false, alignment: THREE.SpriteAlignment.center,
		color: 0x00ff00, transparent: false, blending: THREE.AdditiveBlending
	});
	var sprite = new THREE.Sprite( spriteMaterial );
	sprite.scale.set(200, 200, 1.0);
	cubeC.add(sprite);
*/

camera.position.z = 5;

//postprocessing 
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

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
filmPass.renderToScreen = true;
composer.addPass(bloomPass);
composer.addPass(filmPass);

//render
window.addEventListener( 'resize', onWindowResize, false );
let target = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight)
const animate = function () {
	requestAnimationFrame( animate );

	cubeA.rotation.x += 0.01;
	cubeA.rotation.y += 0.01;
	cubeB.rotation.x += 0.01;
	cubeB.rotation.y += 0.01;
	cubeC.rotation.x += 0.01;
	cubeC.rotation.y += 0.01;

	//renderer.render( scene, camera );
	//composer.render();
	
	renderer.autoClear = false;
	renderer.clear();
  
	renderer.clearDepth();
  
	camera.layers.set(1);
  	composer.render();
  
  	renderer.clearDepth();
  	camera.layers.set(0);
  	renderer.render(scene, camera);
	
};

animate();

//extra
function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

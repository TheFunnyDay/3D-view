


let ProductVer = `Prototype`;


document.querySelector("title").innerHTML = `3D-View ${ProductVer}`;

document.querySelector("#nav").innerHTML = `
<div class="burger-menu">
<div class="lines">
<div id="line" class="line1"></div>
<div id="line" class="line2"></div>
<div id="line" class="line3"></div>
</div>
</div>
<div id="settings">
<div class="icons">
<img src="img/settings.svg" alt="">
<img data-toggle-fullscreen src="img/fullscreen.svg" alt="">
</div>
</div>
`;
document.addEventListener('click', function (event) {

  if (!event.target.hasAttribute('data-toggle-fullscreen')) return;

  if (document.fullscreenElement) {
   document.exitFullscreen();
  } else {
   document.documentElement.requestFullscreen();
  }

 }, false);



let scene, camera, renderer, controls, light, model;

      function init() {

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x232323);
       /* scene.background = new THREE.CubeTextureLoader()
          .setPath( 'skybox/' )
          .load( [
            'posx.jpg',
            'negx.jpg',
            'posy.jpg',
            'negy.jpg',
            'posz.jpg',
            'negz.jpg'
          ] );*/

        camera = new THREE.PerspectiveCamera(5,window.innerWidth/window.innerHeight,1,5000);
        camera.position.set(0,0,15);
        controls = new THREE.OrbitControls(camera);
		controls.touches = {
			ONE: THREE.TOUCH.ROTATE,
			TWO: THREE.TOUCH.DOLLY_PAN
		}
       // scene.add( new THREE.AxesHelper(500));

        light = new THREE.SpotLight(0xffa95c,4);
        light.position.set(-50,50,50);
        light.castShadow = true;
        light.shadow.bias = -0.001;
        light.shadow.mapSize.width = 2048*4;
        light.shadow.mapSize.height = 2048*4;
        scene.add( light );

        hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
        scene.add(hemiLight);

		
		renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.toneMapping = THREE.ReinhardToneMapping;
        renderer.toneMappingExposure = 4;
        renderer.setSize(window.innerWidth,window.innerHeight);
        renderer.shadowMap.enabled = true;
        document.body.appendChild(renderer.domElement);
		window.addEventListener('resize', () => {
			renderer.setSize(window.innerWidth,window.innerHeight);
			camera.aspect = window.innerWidth / window.innerHeight;
		
			camera.updateProjectionMatrix();
		})
		
        
        new THREE.GLTFLoader().load('model/scene.gltf', result => { 
          model = result.scene.children[0]; 
		  model.position.set(0, -1, 0);
          model.traverse(n => { if ( n.isMesh ) {
            n.castShadow = true; 
            n.receiveShadow = true;
            if(n.material.map) n.material.map.anisotropy = 1; 
          }});
          scene.add(model);

          animate();
        });
      }
      function animate() {
        renderer.render(scene,camera);
        light.position.set( 
          camera.position.x + 10,
          camera.position.y + 10,
          camera.position.z + 10,
        );
        requestAnimationFrame(animate);
      }
	  init();
	  
document.querySelector("canvas").style.cssText = `
width: 100%;
height: 100%;
`;
/**
 * theta_gl.js
 * THETA GL
 * @version 0.1.0
 * @author mganeko and baba
 * @license MIT
 */

var _theta_gl = function() {
  // -- this --
  var self = this;
  
  // -- member --
  var camera, scene, renderer;
  var videoImage, videoImageContext, videoTexture;
  var videoRenderElement;
  
  var isUserInteracting = false,
    onMouseDownMouseX = 0, onMouseDownMouseY = 0,
    lon = 0, onMouseDownLon = 0,
    lat = 0, onMouseDownLat = 0,
    phi = 0, theta = 0;

  var isPinching = false;
  var pinchStartDistance = 0;
  var doesFollowOrientatoin = false;
  lon = 90;

  var debugMode = false;

  // -- method --

  //
  // set Video Source URL
  //
  this.setVideoSrc = function(url, loopFlag) {
    videoRenderElement.loop = loopFlag;
    videoRenderElement.src = url;
    videoRenderElement.play();
  }

  //
  // stop Video Source
  //
  this.stopVideoSrc = function() {
    videoRenderElement.pause();
    videoRenderElement.src = "";
    videoImageContext.clearRect(0, 0, videoImage.width, videoImage.height);
  }

  //
  // start WebGL animation
  //
  this.startAnimate = function() {
    animate();
  }

  //
  // follow orientation of SmartPhone
  //
  this.followOrientation = function(flag) {
    doesFollowOrientatoin = flag;
    if (doesFollowOrientatoin) {
      addOrientationEvent();
    }
    else {
      removeOrientationEvent();
    }
  }

  //
  // init WebGL (THREE.js)
  //
  this.init = function(divId, autoResize, debugFlag) {
    var container, mesh;
    var winWidth = 30*16;
    var winHeight = 30*9;

    debugMode = debugFlag;
    prepareVideoElements(debugFlag);
    
    //var loader = new THREE.JSONLoader(true); // init the loader util
    var loader = new THREE.JSONLoader(); // init the loader util
    container = document.getElementById(divId);

    // camera
    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 100);
    camera.target = new THREE.Vector3( 0, 0, 0 );
    //camera.fov = 60; // zoom out
    camera.fov = 45; // zoom out
    camera.zoom = 0.8;
    var light = new THREE.AmbientLight(0xffffff);
    light.position.set(0, 0, 0).normalize();
    scene = new THREE.Scene();
    scene.add(light);

    videoTexture = new THREE.Texture( videoImage );
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    //var videoMaterial = new THREE.MeshBasicMaterial( { map: videoTexture, overdraw: true, side:THREE.DoubleSide } );
    loader.load('uv/half_sphere_1.json', function(geometry1, materials1) {
      // create a new material
      var material1 = new THREE.MeshPhongMaterial({
          map: videoTexture, // specify and load the texture
          color: 0xffffff,
          specular: 0xcccccc,
          shininess: 50,
          //ambient: 0xffffff,
          overdraw: true
      });

      // create a mesh with models geometry and material
      var mesh1 = new THREE.Mesh(
          geometry1,
          material1
      );

      mesh1.scale.set(0.1, 0.1, 0.1);
      mesh1.position.set(0, 0, 0).normalize();
      scene.add(mesh1);
      
      console.log('mesh1 ready');
    });

    loader.load('uv/half_sphere_2.json', function(geometry2, materials2) {
      // create a new material
      var material2 = new THREE.MeshPhongMaterial({
          map: videoTexture, // specify and load the texture
          color: 0xffffff,
          specular: 0xcccccc,
          shininess: 50,
          //ambient: 0xffffff,
          overdraw: true
      });

      // create a mesh with models geometry and material
      var mesh2 = new THREE.Mesh(
          geometry2,
          material2
      );

      mesh2.scale.set(0.1, 0.1, 0.1);
      mesh2.position.set(0, 0, 0).normalize();
      scene.add(mesh2);

      console.log('mesh2 ready');
    });

    var geometry = new THREE.SphereGeometry( 500, 60, 40 );
    geometry.scale( - 1, 1, 1 );

    renderer = new THREE.WebGLRenderer({
        alpha: true
    });

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( winWidth, winHeight );
    container.appendChild( renderer.domElement );

    container.addEventListener( 'mousedown', onDocumentMouseDown, false );
    container.addEventListener( 'mousemove', onDocumentMouseMove, false );
    container.addEventListener( 'mouseup', onDocumentMouseUp, false );
    container.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
    container.addEventListener( 'MozMousePixelScroll', onDocumentMouseWheel, false);

    container.addEventListener( 'touchstart', onDocumentTouchStart, false );
    container.addEventListener( 'touchend', onDocumentTouchEnd, false );
    container.addEventListener( 'touchcancel', onDocumentTouchEnd, false );
    container.addEventListener( 'touchmove', onDocumentTouchMove, false );

    if (autoResize !== false) {
      window.addEventListener( 'resize', onWindowResize, false );
      onWindowResize();
    }
  }

  // prepare Hidden elements to convert video to texture
  function prepareVideoElements(debugFlag) {
    // video element to render 
    videoRenderElement = document.createElement('video');
    videoRenderElement.width = 1280;
    videoRenderElement.height = 720;
    if (debugFlag) {
      videoRenderElement.style.visibility = 'true';
      videoRenderElement.style.position = 'absolute';
      videoRenderElement.style.top = '200px';
      videoRenderElement.width = 320;
      videoRenderElement.height = 180;
    }
    else {
      videoRenderElement.style.visibility = 'hidden';
    }
    videoRenderElement.volume = 0;
    document.body.appendChild(videoRenderElement);
    
    // canvas to convert
    videoImage =  document.createElement('canvas');

    if (debugFlag) {
      videoImage.style.visibility = 'true';
      videoImage.style.position = 'absolute';
      videoImage.style.top = '200px';
      videoImage.style.left = '400px';
      videoImage.width = 320;
      videoImage.height = 180;
    }
    else {    
      videoImage.style.visibility = 'hidden';
      videoImage.width = 1280;
      videoImage.height = 720;
    }
    document.body.appendChild(videoImage);
    
    // context
    videoImageContext = videoImage.getContext('2d');
    videoImageContext.transform( -1, 0, 0, 1, videoImage.width, 0 );
  }

  function onWindowResize() {
    var winWidth = window.innerWidth;
    var winHeight = window.innerHeight;
    camera.aspect = winWidth / winHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( winWidth, winHeight )
  }

  function followOrientation(event) {
    var orientation = event.alpha; // 0 to 360
    var pitch = event.beta; // -90 to 90
    var roll= event.gamma;  // -90 to 270

    lon = -orientation;
    lat = pitch - 90;
  }

  function addOrientationEvent() {
    window.addEventListener("deviceorientation", followOrientation, false);
  }

  function removeOrientationEvent() {
    window.removeEventListener("deviceorientation", followOrientation, false);
  }

  function onDocumentMouseDown(event) {
    event.preventDefault();

    isUserInteracting = true;

    onPointerDownPointerX = event.clientX;
    onPointerDownPointerY = event.clientY;

    onPointerDownLon = lon;
    onPointerDownLat = lat;
  }

  function onDocumentMouseMove(event) {
    if ( isUserInteracting === true ) {
      lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
      lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;
    }
  }

  function onDocumentMouseUp(event) {
    isUserInteracting = false;
  }

  var FOV_MIN = 20;
  var FOV_MAX = 140;
  function onDocumentMouseWheel(event) {
    // WebKit
    if ( event.wheelDeltaY ) {
      camera.fov -= event.wheelDeltaY * 0.05;

    // Opera / Explorer 9
    } else if ( event.wheelDelta ) {
      camera.fov -= event.wheelDelta * 0.05;

    // Firefox
    } else if ( event.detail ) {
      camera.fov += event.detail * 1.0;
    }

    if (camera.fov < FOV_MIN) {
      camera.fov = FOV_MIN;
    }
    else if (camera.fov > FOV_MAX) {
      camera.fov = FOV_MAX;
    }

    showMessage('mouseWheel camera.fov=' + camera.fov);
    camera.updateProjectionMatrix();
  }

  function onDocumentTouchStart(event) {
    event.preventDefault();

    isUserInteracting = true;

    var touches = event.touches;
    var l = touches.length;
    if (l == 1) {
      var touch = touches[0];
      onPointerDownPointerX = touch.clientX;
      onPointerDownPointerY = touch.clientY;
      onPointerDownLon = lon;
      onPointerDownLat = lat;

      showMessage('touch start:' + l);
    }
    else if (l == 2) {
      isPinching = true;

      // distance
      var touch1 = touches[0];
      var touch2 = touches[1];
      var dx = touch1.clientX - touch2.clientX;
      var dy = touch1.clientY - touch2.clientY;
      pinchStartDistance = Math.sqrt(dx*dx + dy*dy);

      showMessage('pinch start:' + l + ', dist=' + pinchStartDistance);
    }
  }

 function onDocumentTouchEnd(event) {
    isUserInteracting = false;
    showMessage('touch end');

    if (isPinching) {
      isPinching = false;
      showMessage('pinch end');
    }
  }

  function onDocumentTouchMove(event) {
    if ( isUserInteracting === true ) {
      var touches = event.touches;
      var l = touches.length;
      if (l == 1) {
        var touch = touches[0];
        lon = ( onPointerDownPointerX - touch.clientX ) * 0.1 + onPointerDownLon;
        lat = ( touch.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

        showMessage('touch move:' + l);
      }
      else if (l == 2) {
        // distance
        var touch1 = touches[0];
        var touch2 = touches[1];
        var dx = touch1.clientX - touch2.clientX;
        var dy = touch1.clientY - touch2.clientY;
        var distance = Math.sqrt(dx*dx + dy*dy);

        showMessage('pinch move:' + l + ', dist=' + distance);

        camera.fov -= (distance -  pinchStartDistance)*0.02;
        if (camera.fov > FOV_MAX) {
          camera.fov = FOV_MAX;
        }
        if (camera.fov < FOV_MIN) {
          camera.fov = FOV_MIN;
        }
        camera.updateProjectionMatrix();
      }
    }
  }

  function showMessage(msg) {
    if (debugMode) {
      console.log(msg);
    }
  }

  function animate() {
    requestAnimationFrame( animate );
    update();
  }

  function update() {
    lat = Math.max( - 85, Math.min( 85, lat ) );
    phi = THREE.Math.degToRad( 90 - lat );
    theta = THREE.Math.degToRad( lon );

    //camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
    //camera.target.y = 500 * Math.cos( phi );
    //camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta );

    camera.target.x = Math.sin(phi) * Math.cos(theta);
    camera.target.y = Math.cos(phi);
    camera.target.z = Math.sin(phi) * Math.sin(theta);

    camera.lookAt( camera.target );

    // video to image
    videoImageContext.drawImage( videoRenderElement, 0, 0, videoImage.width, videoImage.height );
    if ( videoTexture ) { 
      videoTexture.needsUpdate = true;
    }


    renderer.render( scene, camera );
  }

};

// Global Instance for THETA_GL.js
var THETA_GL = new _theta_gl();

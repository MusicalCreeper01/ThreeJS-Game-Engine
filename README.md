# Ember
WIP Javascript game engine framework based around Three.js.

The core focus is a lose wrapper around Three.JS and other GFX libraries to make it simple to create a game without having to deal with the hassle that comes with using Three.JS.

```
<div id="game" style="width: 480px; height: 420px"></div>
<script>
    var ember = new Ember($('#game')[0]);
    ember.begin();

    var scene = new Ember.Scene();
    scene.name = "Scene 1";

    ember.SceneManager.add(scene);
    ember.SceneManager.load(0);

    var gameObject = new Ember.GameObject();
    gameObject.mesh = new THREE.BoxGeometry(2, 2, 2);
    gameObject.material = new THREE.MeshPhongMaterial();
    scene.add(gameObject);
</script>
```

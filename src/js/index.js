/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-08-24 14:47:28
 * @version $Id$
 */
'use strict';

import '../less/style.less';

class Main {
    constructor () {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.stats = new Stats();
        this.cube = null;
        this.tweenA = null;
        this.tweenB = null;
        this.$mainWrap = document.querySelector('.m-wrap');
        this.orientation = {};
    }

    getOrientation () {
        window.addEventListener('deviceorientation', (event) => {
            this.orientation = {
                alpha: event.alpha,
                beta: event.beta,
                gamma: event.gamma
            };
            console.log(this.orientation);
        });
    }

    initStats () {
        this.stats.setMode(0);
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.top = '0';
        this.stats.domElement.style.left = '0';
        this.$mainWrap.appendChild(this.stats.domElement);
    }

    createObject () {
        const geometry = new THREE.CubeGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff
        });
        const cube = new THREE.Mesh(geometry, material);
        this.cube = cube;

        this.scene.add(this.cube);
        this.camera.position.z = 5;
    }

    initTween () {
        this.tweenA = new TWEEN.Tween(this.cube.position)
            .to({
                x: 1,
                y: 1,
                z: 1
            }, 3000)
            // .repeat(Infinity)
            .start();

        this.tweenB = new TWEEN.Tween(this.cube.position)
            .to({
                x: 0,
                y: 0,
                z: 0
            }, 3000)
            // .repeat(Infinity)
            .start();

        this.tweenA.chain(this.tweenB);
        this.tweenB.chain(this.tweenA);
    }

    render () {
        // this.cube.rotation.x += 0.1;
        // this.cube.rotation.y += 0.1;
        // this.cube.rotation.z += 0.1;

        this.cube.rotation.x = this.orientation.beta / 30;
        this.cube.rotation.y = this.orientation.gamma / 30;
        this.cube.rotation.z = this.orientation.alpha / 30;

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
        this.stats.update();
        // TWEEN.update();
    }

    init () {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMapEnbled = true;
        this.$mainWrap.appendChild(this.renderer.domElement);

        this.initStats();
        this.createObject();
        this.getOrientation();
        // this.initTween();
        this.render();
    }
};

const main = new Main();

main.init();

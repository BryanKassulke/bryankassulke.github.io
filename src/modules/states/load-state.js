import { State } from "../state-machine.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { scene } from "../scene.js";
/**
 * @typedef {{ url: string, progress: number }} LoadedAsset
 */

export default class LoadState extends State {
  /** @type {LoadedAsset[]} */
  queue;
  /** @type {number} */
  totalProgress;
  /** @param {string[]} urls */
  constructor(urls) {
    super();
    this.queue = urls.map(url => { return { url, progress: 0 } });
  }
  onEnter = () => {
    this.totalProgress = 0;
    const loader = new GLTFLoader();
    this.queue.forEach((asset) => {
      loader.load(asset.url,
        (data) => {
          console.log(data);
          asset.progress = 1;
          scene.add(data.scene);
          this.recalculateTotalProgress();
        },
        (progress) => {
          if (progress.total !== 0) {
            asset.progress = progress.loaded / progress.total;
            this.recalculateTotalProgress();
          }
        },
        (error) => {
          console.log(error);
        })
    });
  };
  update = () => {
    console.log(this.totalProgress);
  };
  onExit = () => {
    console.log("Exiting intro state");
  };
  isComplete = () => {
    return !this.queue.some(asset => asset.progress !== 1)
  };
  recalculateTotalProgress = () => {
    this.totalProgress = this.queue.map(asset => asset.progress).reduce((result, progress) => result + progress) / this.queue.length;
  };
}


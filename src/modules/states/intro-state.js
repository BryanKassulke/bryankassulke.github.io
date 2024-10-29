import { State } from "../state-machine.js";
import { scene } from "../scene.js";
import { floor, leftWall, rightWall, windows } from "../objects.js";

export default class IntroState extends State {
  onEnter = () => {
    console.log("Entering intro state");
    scene.add(...floor, ...leftWall, ...rightWall, ...windows);
  };
  onExit = () => {
    console.log("Exiting intro state");
    //scene.remove(...floor, ...leftWall, ...rightWall);
  };
}

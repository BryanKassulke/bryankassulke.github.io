import { State } from "../state-machine.js";

export default class SceneState extends State {
  onEnter = () => {
    console.log("Entering scene state");
  };
  onExit = () => {
    console.log("Exiting scene state");
    console.trace();
  };
}

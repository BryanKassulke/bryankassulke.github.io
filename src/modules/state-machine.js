/**
 * @typedef {() => boolean} Predicate
 * @typedef {{ to: State, condition: Predicate }} Transition
 */

export class State {
  /**
   * Performs the state's enter event behaviour.
   * @type {() => void}
   */
  onEnter = () => {};
  /**
   * Performs the state's update behaviour.
   * @type {() => void}
   */
  update = () => {};
  /**
   * Performs the state's exit event behaviour.
   * @type {() => void}
   */
  onExit = () => {};
}

class StateNode {
  /** @type {State} */
  state;
  /** @type {Set<Transition>} */
  transitions;
  /**
   * A node used in the state machine to manage a state and its transitions.
   * @param {State} state
   */
  constructor(state) {
    this.state = state;
    this.transitions = new Set();
  }
  /**
   * Adds a transition to the state node
   * @param {State} to
   * @param {Predicate} condition
   */
  addTransition(to, condition) {
    this.transitions.add({ to, condition });
  }
}

/**
 * A state machine that manages states and transitions between them.
 */
export class StateMachine {
  /** @type {StateNode} */
  current;
  /** @type {Map<string, StateNode>} */
  nodes = new Map();
  /** @type {Set<Transition>} Transitions that are possible from all states. */
  anyTransitions = new Set();
  /**
   * Updates the state machine. Checks for changes to the current state and updates the current state.
   */
  update() {
    const transition = this.getTransition();
    transition && this.changeState(transition.to);
    this.current?.state?.update();
  }
  /**
   * Sets the current state. Does not perform any exit events.
   * @param {State} state
   */
  setState(state) {
    this.current = this.nodes.get(state.constructor.name);
    this.current?.state?.onEnter();
  }
  /**
   * Changes to the given state and handles the exit and enter events.
   * @param {State} state
   */
  changeState(state) {
    if (state == this.current.state) return;
    this.current?.state?.onExit();
    this.nodes.get(state.constructor.name)?.state?.onEnter();
    this.current = this.nodes.get(state.constructor.name);
  }
  /**
   * Returns a transition if the current state has a transition that can be taken.
   * @returns {Transition | null}
   */
  getTransition() {
    for (const transition of this.anyTransitions) {
      if (transition.condition()) return transition;
    }
    for (const transition of this.current.transitions) {
      if (transition.condition()) return transition;
    }
    return null;
  }
  /**
   * Adds a transition to the state machine from one state to another.
   * @param {State} from
   * @param {State} to
   * @param {Predicate} condition
   */
  addTransition(from, to, condition) {
    this.#getOrAddNode(from).addTransition(
      this.#getOrAddNode(to).state,
      condition
    );
  }
  /**
   * Adds a transition to the state machine from any state to another.
   * @param {State} to
   * @param {Predicate} condition
   */
  addAnyTransition(to, condition) {
    this.anyTransitions.add({ to: this.#getOrAddNode(to).state, condition });
  }
  /**
   * Returns the state node for the given state. If the state node does not exist, it is created.
   * @param {State} state
   * @returns {StateNode}
   */
  #getOrAddNode(state) {
    let node = this.nodes.get(state.constructor.name);
    if (!node) {
      node = new StateNode(state);
      this.nodes.set(state.constructor.name, node);
    }
    return node;
  }
}

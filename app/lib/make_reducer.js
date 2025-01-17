export default function make_reducer(initial_state,handlers) {
    return function reducer(state=initial_state,action) {
      if(handlers.hasOwnProperty(action.type)){
          return handlers[action.type](state,action);
      }else {
          return state;
      }
    };
}

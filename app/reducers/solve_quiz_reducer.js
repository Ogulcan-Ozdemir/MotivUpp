import make_reducer from '../lib/make_reducer'
import * as types from '../actions/types'
export const selected_answer =make_reducer([],{
    [types.selected_answers](state,action){
        let temp_array=[];
        // state.forEach((value)=>{
        //     Object.keys(value).map((key)=>{
        //         if(action.key===key){
        //             state[state.indexOf(value)]=action.answer;
        //             console.log(state);
        //         }
        //     })
        // })
        temp_array[action.key]=action.answer;
        let new_state=[...state,temp_array]
        return new_state;
    }
});


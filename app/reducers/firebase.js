import make_reducer from '../lib/make_reducer'
import * as types from '../actions/types'
// export const count =make_reducer(0,{
//     [types.increment_number](state,action){
//          return state+1;
//      }
// });
export const user=make_reducer({},{
    [types.sign_in](state,action){
        if(action!==null){
            return action
        }else {
            console.log("action failed");
            return state;
        }

    }
});

export const incoming_data=make_reducer({},{
    [types.firebase_array](state,action){
        if(action!==null){
            return action
        }else {
            console.log("action failed");
            return state;
        }

    }
});

export const incoming_questions_array=make_reducer({},{
    [types.firebase_questions_array](state,action){
        if(action!==null){
            return action
        }else {
            console.log("action failed");
            return state;
        }

    }
});

// export const urls=make_reducer({},{
//     [types.firebase_image_video_url](state,action){
//         if(action!==null){
//             console.log(action);
//             return action
//         }else {
//             console.log("action failed");
//             return state;
//         }
//
//     }
// });

export const flag_auth_state=make_reducer(false,{
    [types.firebase_auth_state](state,action){
        if(action!==null){
            return action
        }else {
            console.log("action failed");
            return state;
        }

    }
});
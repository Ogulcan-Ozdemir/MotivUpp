import * as types from './types'
export function selected_answer_fun(key,answer) {
    return{
        type: types.selected_answers,
        answer,
        key
    }
}

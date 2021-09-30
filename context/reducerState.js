export const reducerState = (state, action) => {
    switch (action.type) {
        case 'ADD_COLOR':
            return {
                ...state, allCart: {...state.allCart,  color: action.payload.toLowerCase()}
            }
        case 'ADD_SIZE':
            return {
                ...state, allCart: {...state.allCart,  size: action.payload}
            }
        case 'ADD_BRAND':
            const regex = /(&)| /gi;
            return {
                ...state, allCart: {...state.allCart,  brand: action.payload.toLowerCase().replace(regex, '')}
            }
        case 'ADD_MIN_RANGE':
            return {
                ...state, allCart: {...state.allCart,  minPrice: action.payload}
            }
        case 'ADD_MAX_RANGE':
            return {
                ...state, allCart: {...state.allCart,  maxPrice: action.payload}
            }
        case 'CANCEL_AL':
            return {
                ...state, allCart: {color: '',size: '', brand:'', minPrice: '',maxPrice: ''}
            }
        default:
            return state
    }
}
import { createSlice } from "@reduxjs/toolkit";

const initialState = {items:[], kotId:''};
const kotSlice = createSlice({
  name: "kot",
  initialState,
  reducers: {
    addItem(state, { payload }) {
      // console.log(payload);
      const { data} = payload;
        state.kotId = Date.now()
        // if that item is already there
        if (state.items.find(ele=>ele.title == data.title)){
            state.items.forEach(ele=>ele.title == data.title?ele.quantity+=1:ele)
        }
        else{
            state.items.push(data)
        }
        return state
    },
    decrementQuantity(state, { payload }) {
      const { title} = payload;
      return {...state, items: state.items.map((item)=>item.title==title?{...item, quantity:item.quantity-1}:item)}
    },
    removeItem: (state, {payload}) => {
      const {title} = payload;
      return {...state, items:state.items.filter((item)=>item.title !=title)}
    },
    cleanKot() {
      return {items:[], kotId:''}

    },
  },
});

export const { addItem , decrementQuantity, removeItem, cleanKot} = kotSlice.actions;
const kotReducer = kotSlice.reducer;
export default kotReducer;
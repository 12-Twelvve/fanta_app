import { createSlice } from "@reduxjs/toolkit";

const initialState = [{tableNo:'', items:[]}];

const tableOrderSlice = createSlice({
  name: "table_order",
  initialState,
  reducers: {
    addTableOrderItem(state, { payload }) {
      // console.log(payload);
      const { data, tableNo} = payload;
      let checkList = state.map((it)=>(it.tableNo == tableNo)?true:false).includes(true)
      if(checkList) {
        state.forEach((item)=>{
            if (item.tableNo == tableNo){
                // if that item is already there
                if (item.items.find(ele=>ele.title == data.title)){
                    item.items.forEach(ele=>ele.title == data.title?ele.quantity+=1:ele)
                }
                else{
                    item.items.push(data)
                }
            }})}
      else{
        let temp={tableNo, items:[data]}
        state.push(temp)
      }
      return state
    },
    incrementQuantity(state, { payload }) {
      return state
    },
    decrementQuantity(state, { payload }) {
      const {tableNo, title} = payload;
      return state.forEach(table=>{
        if(table.tableNo == tableNo){
            table.items=table.items.map((item)=>item.title==title?{...item, quantity:item.quantity-1}:item)
        }}
        )
    },
    removeTableOrderItem: (state, {payload}) => {
      const {tableNo, title} = payload;
      return state.forEach(table=>{
        if(table.tableNo == tableNo){
            table.items=table.items.filter((item)=>item.title!=title)
        }}
        )
    },
    cleanTable(state, {payload}) {
      const {tableNo} = payload
      return state.filter(table => table.tableNo != tableNo)

    },
    updateServedItem(state, {payload}){
      const {tableNo, index, value }= payload
      return state.forEach((table)=>{
          if (table.tableNo == tableNo){
              table.items[index].served=value
          }
      })
    }
  },
});

export const { addTableOrderItem, incrementQuantity , decrementQuantity, removeTableOrderItem, cleanTable, updateServedItem } =
  tableOrderSlice.actions;
const tableOrderReducer = tableOrderSlice.reducer;

export default tableOrderReducer;
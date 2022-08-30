import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
const initialState = [{tableNo:'', kot:[],orderId:'', date:''}];

const tableOrderSlice = createSlice({
  name: "table_order",
  initialState,
  reducers: {

    addTableKot(state, { payload }) {
      // console.log(payload);
      const { kot, tableNo} = payload;
      // console.log('--addkot', kot, tableNo)

      let checkList = state.map((table)=>(table.tableNo == tableNo)?true:false).includes(true)
      if(checkList){
        state.forEach((table)=>{
            if (table.tableNo == tableNo){
                table.kot.push(kot)
            }})}
      else{
        let temp={tableNo, kot:[kot], orderId:Date.now(), date:moment(Date.now()).format('YYYY-MM-DD') }
        state.push(temp)
      }
      // console.log('--addkot', state)
      return state
    },
    cleanTable(state, {payload}) {
      const {tableNo} = payload
      return state.filter(table => table.tableNo != tableNo)
    },
    updateServedItem(state, {payload}){
      const {tableNo, kotId, index, value } = payload
      return state.forEach((table)=>{
          if (table.tableNo == tableNo){
              table.kot.forEach((kot)=>{
                if (kot.kotId ==kotId){
                  kot.items[index].served=value
                  // kot.items.forEach((item=>{
                  //   if(item.title ==title){
                  //     item.served=value
                  //   }
                  // }))
                }
              })
          }
      })
    },
    updateAllServedItem(state, {payload}){
      const { value, tableNo } = payload
      return state.forEach((table)=>{
          if (table.tableNo == tableNo){
              table.kot.forEach((kot)=>{
                  kot.items.forEach((item)=>{
                    item.served=value
                  })
              })
          }
      })
    },
  },
});

export const { addTableKot,  cleanTable, updateServedItem, updateAllServedItem } =
  tableOrderSlice.actions;
const tableOrderReducer = tableOrderSlice.reducer;

export default tableOrderReducer;

export const initialState = {
    tableOrder: [{tableNo:'', items:[]}]
}
export const reducer = (state = initialState, action) => {

    switch (action.type) {
        case "ADD_TABLE_ORDER_ITEM":{
            // console.log("------",state)
            let newState = {...state };
            let checkList = newState.tableOrder.map((it)=>(it.tableNo == action.payload.tableNo)?true:false).includes(true)
            if(checkList){
                newState.tableOrder.forEach((item)=>{
                    if (item.tableNo == action.payload.tableNo){
                        item.items.push(action.payload.data)
                    }
                })
            }
            else{
                let temp={tableNo:action.payload.tableNo, items:[action.payload.data]}
                newState.tableOrder.push(temp)
                newState.tableOrder.splice(0,1)
            }
            // console.log("->>-",newState.tableOrder[0].items, action.payload.tableNo, action.payload.data)
            return {...newState}
        }
        case "REMOVE_ORDER_ITEM":{
            // state ={...action.payload.data}
            state=  {...action.payload.data}
            console.log('*****',state.tableOrder)
            return {...action.payload.data}
        }
        case "CLEAN_TABLE":{
            return  {...state, tableOrder:state.tableOrder.filter(item => item.tableNo != action.payload.tableNo)}
        }
        case "UPDATE_SERVED_ITEM":{
            let newState = {...state };
            newState.tableOrder.forEach((item)=>{
                if (item.tableNo == action.payload.tableNo){
                    item.items[action.payload.data.index].served=!item.items[action.payload.data.index].served
                }
            })

            // console.log("->>-",newState.tableOrder, action.payload.data)
            return {...newState}
        }

        default:
            return state
    }
};
// import { createContext, useContext } from "solid-js";
// import { createSignal } from "solid-js";

// const KanbanContext = createContext()

// export function KanbanProvider() {

//     const [source,setSource] = createSignal(0)
//     const [desc,setDesc] = createSignal(0)

//     const [noc,setNoc] = createSignal([0,0,0])

//     const [text,setText] = createSignal(
//         {
//             0:[],
//             1:[],
//             2:[]
//         });


//     const addNew = (index,value) => {
//         let temp = text();
//         temp[Number(index)].push(value);

//         let noOfCells = noc();

//         noOfCells[Number(index)] += 1;
//         setText(temp);
//         setNoc(noOfCells);
//     }


//     const collapseBoard = () => {
//         let arr = [...noc()];
//         arr[source()[0]] = arr[source()[0]] - 1;
//         arr[desc()[0]] = arr[desc()[0]] + 1;

//             let Descbox = desc()[0]
//             let srcBox = source()[0]


//             let srcValue = text()[source()[0]][source()[1]]

//             let cpy = text();

//             if(Descbox - srcBox == 0) {

//                 let temp = []
//                 let srcRow = cpy[Descbox]

//                 for(let i=0;i<srcRow.length;i++) {
//                     if(i!=source()[1]) {
//                         temp.push(srcRow[i])
//                     }
//                 }
//                 // remove and insert!
//                 cpy[Descbox] = temp;
//                 cpy[Descbox].splice(desc()[1],0,srcValue);
//                 console.log(temp)

//             }
//             else if (desc()[1]) {
//                 // insert and remove
//                 cpy[Descbox].splice(desc()[1],0,srcValue);
//             } else {
//                 cpy[Descbox].push(srcValue);
//             }

//             let srcRow = cpy[srcBox]

//             let temp = []

//             if(srcBox != Descbox) {
//                 for(let i=0;i<srcRow.length;i++) {
//                     if(i!=source()[1]) {
//                         temp.push(srcRow[i])
//                     }
//                 }
//             } else {
//                 temp = srcRow;
//             }

//             cpy[srcBox] = temp;
//             setText(cpy)
//             setNoc(arr);
//         }


//      kanban = [
//         source,
//         setSource,
//         desc,
//         setDesc,
//         noc,
//         setNoc,
//         text,
//         setText,
//         addNew,
//         collapseBoard
//     ]

//         return (
//             <KanbanContext.KanbanProvider value={kanban}>

//             </KanbanContext.KanbanProvider>
//         )
// }

// export function useKanban() {return useContext(KanbanContext)}
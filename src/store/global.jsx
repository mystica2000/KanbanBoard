import { createSignal, onMount } from "solid-js";
import { createRoot } from "solid-js";


function createData() {


    const [text, setText] = createSignal();

    const [noc, setNoc] = createSignal();

    onMount(() => {
        setText(JSON.parse(localStorage.getItem('cells')) || { 0: [], 1: [], 2: [] })
        setNoc(JSON.parse(localStorage.getItem('noc')) || [0, 0, 0])
    })

    const [source, setSource] = createSignal(0)
    const [desc, setDesc] = createSignal(0)


    const addNew = (index, value) => {
        let temp = text();
        temp[Number(index)].push(value);

        let noOfCells = noc();

        noOfCells[Number(index)] += 1;
        setText({ ...temp });
        setNoc([...noOfCells]);

        updateLocalStorage()

    }

    const updateLocalStorage = () => {
        localStorage.setItem("noc", JSON.stringify(noc()))
        localStorage.setItem("cells", JSON.stringify(text()))
    }

    const updateCell = (index, value) => {
        console.log("UPDATE!")

        if (Object.keys(value).length != 0) {

            let col = index[0]
            let row = index[1]
            let temp = text();

            temp[col][row] = value;

            setNoc([...noc()])
            setText({ ...temp })

            updateLocalStorage()

        } else {
            console.log("Hello")
            // delete
            deleteCell(index)
        }

    }

    const deleteCell = (index) => {
        let col = index[0]
        let row = index[1]
        let temp = text();

        let tempnoc = noc()

        tempnoc[col]--;

        Object.keys(temp).forEach((key) => {
            if (key == col) {
                let columnValue = temp[key]
                columnValue.splice(row, 1)
                // row index and column index!
                temp[key] = columnValue;
            }
        })

        setNoc([...tempnoc])

        setText({ ...temp })


        updateLocalStorage()
    }


    const collapseBoard = () => {
        let arr = [...noc()];
        arr[source()[0]] = arr[source()[0]] - 1;
        arr[desc()[0]] = arr[desc()[0]] + 1;

        let Descbox = desc()[0]
        let srcBox = source()[0]


        let srcValue = text()[source()[0]][source()[1]]

        let cpy = text();

        if (Descbox - srcBox == 0) {

            let temp = []
            let srcRow = cpy[Descbox]

            for (let i = 0; i < srcRow.length; i++) {
                if (i != source()[1]) {
                    temp.push(srcRow[i])
                }
            }
            // remove and insert!
            cpy[Descbox] = temp;
            cpy[Descbox].splice(desc()[1], 0, srcValue);

        }
        else if (desc()[1]) {
            // insert and remove
            cpy[Descbox].splice(desc()[1], 0, srcValue);
        } else {
            cpy[Descbox].push(srcValue);
        }

        let srcRow = cpy[srcBox]

        let temp = []

        if (srcBox != Descbox) {
            for (let i = 0; i < srcRow.length; i++) {
                if (i != source()[1]) {
                    temp.push(srcRow[i])
                }
            }
        } else {
            temp = srcRow;
        }

        cpy[srcBox] = temp;
        setText({ ...cpy })
        setNoc([...arr]);

        updateLocalStorage()
    }

    return { source, setSource, desc, setDesc, noc, addNew, text, collapseBoard, updateCell, deleteCell }
}


export default createRoot(createData);
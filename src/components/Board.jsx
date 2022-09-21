
import { createSignal } from 'solid-js';
import './Board.css';


function Cell({box,id,storeSourceDrag,text}) {

    return (
        <div className='cell-container' draggable={true} onDragStart={storeSourceDrag} box={box} id={id}>
            {text}
        </div>
    )
}


function Box(props) {

    const onTargetDropped = (event) => {
        props.setDesc(event.target.id);
        props.collapseBoard();
    }

    const onTargetDraggedOver = (event) => {
        event.preventDefault();
    }


    return (
        <div className="box" onDrop={onTargetDropped}
        onDragOver={onTargetDraggedOver} box={props.id} id={props.id}
        >
            { ()=> {
                let arr = []
                for(let i=0;i<props.noc;i++) {
                    arr.push(<Cell box={props.id} id={props.id + i} storeSourceDrag={(e)=> {
                        props.setSource(e.target.id)}}
                    text={props.text[i]}/>)
                }
                return arr;
            }
            }
        </div>
    )
}

function Board() {

    const [source,setSource] = createSignal(0)
    const [desc,setDesc] = createSignal(0);

    const [noc,setNoc] = createSignal([3,0,2]);

    const [text,setText] = createSignal(
        {
            0:['A','B','C'],
            1:[],
            2:['D','E']
        });

    const collapseBoard = () => {
        let arr = [...noc()];
        arr[source()[0]] = arr[source()[0]] - 1;

        arr[desc()[0]] = arr[desc()[0]] + 1;

        let Descbox = desc()[0]
        let srcBox = source()[0]


        let srcValue = text()[source()[0]][source()[1]]

        let cpy = text();

        console.log(source())
        console.log(desc())

        if(Descbox - srcBox == 0) {

            let temp = []
            let srcRow = cpy[Descbox]

            console.log(cpy[Descbox])
            for(let i=0;i<srcRow.length;i++) {
                console.log(i,source()[1])
                if(i!=source()[1]) {
                    temp.push(srcRow[i])
                }
            }
            // remove and insert!
            cpy[Descbox] = temp;
            cpy[Descbox].splice(desc()[1],0,srcValue);
            console.log(temp)

        }
        else if (desc()[1]) {
            // insert and remove
            cpy[Descbox].splice(desc()[1],0,srcValue);
        } else {
            cpy[Descbox].push(srcValue);
        }


        console.log(cpy[Descbox])
        console.log(cpy[srcBox])


        let srcRow = cpy[srcBox]

        let temp = []

        if(srcBox != Descbox) {
            for(let i=0;i<srcRow.length;i++) {
                if(i!=source()[1]) {
                    temp.push(srcRow[i])
                }
            }
        } else {
            temp = srcRow;
        }

        console.log(temp)

        cpy[srcBox] = temp;
        setText(cpy)
        setNoc(arr);
    }


    return (
      <div className="box-container">
        {renderBox()}
      </div>
    );


    function renderBox() {
            let arr = []
            for(let i=0;i<noc().length;i++) {
              arr.push(<Box noc={noc()[i]} id={i.toString()} source={source} setSource={setSource} desc={desc} setDesc={setDesc}
              collapseBoard={collapseBoard} text={text()[i]}/>);
            }
            return arr;
    }
  }

  export default Board;
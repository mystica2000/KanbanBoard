import './Board.css';
import global from '../store/global';
import Row from './Row'
import { Dynamic } from 'solid-js/web';


const rowTodo = () => <Row name="todo" index="0"/>
const rowInProgress = () => <Row name="inprogress" index="1"/>
const rowDone = () => <Row name="done" index="2"/>

const options = {
    Todo: rowTodo,
    InProgress: rowInProgress,
    Done: rowDone
}


function Cell({box,id,storeSourceDrag,text}) {

    const handleDoubleClick = (e) => {
        console.log("SAVE",e)
        e.target.contentEditable = true;
    }

    const handleFocusOut = (e) => {
        e.target.contentEditable = false
    }

    return (
        <li className='cell-container' draggable={true}
        onDragStart={storeSourceDrag} box={box} id={id}
        onDblClick={handleDoubleClick} onBlur={handleFocusOut}
        >
            <ul>
                <li>{text}</li>
                <li></li>
            </ul>
        </li>
    )
}


function Box(props) {


    const {setSource,setDesc,collapseBoard} = global

    const onTargetDropped = (event) => {
        setDesc(event.target.id);
        collapseBoard();
    }

    const onTargetDraggedOver = (event) => {
        event.preventDefault();
    }


    return (
        <section className="box" >
            <div className="section_head">
                <h2>{props.name}</h2>
                <Dynamic component={options[props.name.split(" ").join("")]}/>
            </div>
            <ul onDrop={onTargetDropped} onDragOver={onTargetDraggedOver} box={props.id} id={props.id} className="ul"
              ref={ (e) => {console.log(e)}}>
                {
                     ()=> {
                         let arr = []
                         for(let i=0;i<props.noc;i++) {
                            arr.push(
                               <Cell
                                    box={props.id}
                                    id={props.id + i}
                                    storeSourceDrag={(e)=> {
                                         setSource(e.target.id)
                                    }}
                                    text={props.text[i]}
                                />)
                         }
                         return arr;
                        }
                }
            </ul>
        </section>
    )
}

function Board() {

    const {noc,text} = global

    const boardNames = ["Todo","In Progress","Done"]

    return (
      <main className="box-container">
        {
           ()=> {
            let arr = []
            for(let i=0;i<noc().length;i++) {
              arr.push(
                   <Box ref={box}
                       noc={noc()[i]}
                       id={i.toString()}
                       text={text()[i]}
                       name={boardNames[i]}
                   />
                );
            }

            return arr;
           }
        }
      </main>
    );
  }

  export default Board;
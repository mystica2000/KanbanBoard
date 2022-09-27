import './Board.css';
import global from '../store/global';
import Row from './Row'
import { Dynamic } from 'solid-js/web';
import deleteIcon from '../assets/delete.svg'

const rowTodo = () => <Row name="todo" index="0" />
const rowInProgress = () => <Row name="inprogress" index="1" />
const rowDone = () => <Row name="done" index="2" />

const options = {
    Todo: rowTodo,
    InProgress: rowInProgress,
    Done: rowDone
}


function Cell({ box, id, storeSourceDrag, text }) {

    const { updateCell, deleteCell } = global
    const handleDoubleClick = (e) => {
        e.target.contentEditable = true;
    }

    const handleFocusOut = (e) => {
        updateCell(e.target.id, e.target.innerText)
        e.target.contentEditable = false
    }

    const handleDelete = (e) => {
        deleteCell(e.target.id)
    }

    return (
        <li className='cell-container' draggable={true}
            onDragStart={storeSourceDrag} box={box} id={id}>
            <span onDblClick={handleDoubleClick} onBlur={handleFocusOut} id={id}>{text()}</span>
            <button type="button" className='btn-none' onClick={handleDelete}
            >
                <img src={deleteIcon} width="20px" height="20px" className='delete-img' alt='delete icon' id={id} />
            </button>
        </li>
    )
}


function Box(props) {


    const { setSource, setDesc, collapseBoard } = global

    const onTargetDropped = (event) => {
        console.log(event.target.id)
        setDesc(event.target.id);
        collapseBoard();
    }

    const onTargetDraggedOver = (event) => {

        if(event.cancelable && event.preventDefault()) {
            event.preventDefault()
        }

        if(event instanceof MouseEvent) {
            event.dataTransfer.dropEffect = 'move';
        }
    }


    return (
        <section className="box" >
            <div className="section_head">
                <h2>{props.name}</h2>
                <Dynamic component={options[props.name.split(" ").join("")]} />
            </div>
            <ul onDrop={onTargetDropped}
            onDragOver={onTargetDraggedOver}
            box={props.id} id={props.id} className="ul">
                {
                    () => {
                        let arr = []
                        for (let i = 0; i < props.noc; i++) {
                            arr.push(
                                <Cell
                                    box={props.id}
                                    id={props.id + i}
                                    storeSourceDrag={(e) => {
                                        if(e instanceof MouseEvent){ e.dataTransfer.effectAllowed = 'move';}
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

    const { noc, text } = global

    const boardNames = ["Todo", "In Progress", "Done"]

    return (
        <main className="box-container">
            {
                () => {
                    let arr = []
                    for (let i = 0; i < noc().length; i++) {
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
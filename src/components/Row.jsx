import { createSignal } from "solid-js";
import global from "../store/global";


function Row(props) {

    const {addNew} = global;
    const [textInput,setTextInput] = createSignal('');

    let dialog;

    const handleSubmit = () => {
        // Error boundary check for NULL!!
        addNew(props.index,textInput());
    }

    return (
        <div className="btn-wrapper">
          <button className="btn" onClick={(e) => dialog.showModal()}>
            {/* <img src="src/assets/add.svg" alt="Add icon" /> */}
            Add!
          </button>
            <dialog id="dialog" ref={dialog}>
                <span className="row">
                <h3>Add New {props.name}</h3>
                <button onClick={(e)=> dialog.close()}>close</button>
                </span>
                <form method="dialog" onSubmit={handleSubmit}>
                <textarea cols="40" rows="5"
                value={textInput()}
                onInput={(e)=> {setTextInput(e.target.value)}}></textarea>
                <input type="submit" value="Add"/>
                </form>
        </dialog>
        </div>
    );
  }

  export default Row;
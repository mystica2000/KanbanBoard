import { createSignal } from "solid-js";
import global from "../store/global";


function Row(props) {

  const { addNew } = global;
  const [textInput, setTextInput] = createSignal('');

  let dialog;

  const handleSubmit = () => {
    // Error boundary check for NULL!!
    if (textInput().length > 0) {
      addNew(props.index, textInput());
    }
  }

  return (
    <div className="btn-wrapper">
      <button className="btn" onClick={(e) => dialog.showModal()}>
        {/* <img src="src/assets/add.svg" alt="Add icon" /> */}
        ADD NEW
      </button>
      <dialog id="dialog" ref={dialog}>
        <span className="row">
          <h3>Add New {props.name}</h3>
          <button onClick={(e) => {
            e.preventDefault()
            dialog.close()
          }} className="btn close" >X</button>
        </span>
        <form method="dialog" onSubmit={handleSubmit}>
          <textarea cols="40" rows="5"
            value={textInput()}
            onInput={(e) => { setTextInput(e.target.value) }}></textarea>
          <span className="footer">
            <input type="submit" value="Add" className="btn" />
            <button className="btn close" onClick={(e) => {
              e.preventDefault()
              dialog.close()
            }}>Close</button>
          </span>
        </form>
      </dialog>
    </div>
  );
}

export default Row;
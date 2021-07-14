import { ALL_COMPLETED, COMPLETED_CLEARED } from "../../redux/todo/todoTypes";
import "./Actions.css";

const Actions = ({dispatchAction}) => {
    return ( 
        <div className="actions-container">
            <h3>Actions</h3>
            <button type="button" className="btn btn-primary" onClick={e=> dispatchAction(e, ALL_COMPLETED)}>Mark All Completed</button>
            <button type="button" className="btn btn-primary" onClick={e=> dispatchAction(e, COMPLETED_CLEARED)}>Clear Completed</button>
        </div>
    );
}
 
export default Actions;
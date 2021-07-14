import { STATUS_FILTER_CHANGED } from "../../redux/todo/todoTypes";
import "./Status.css";

const Status = ({dispatchAction}) => {
    return ( 
        <div className="status-container">
            <h3>Filter by Status</h3>
            <ul className="status-list">
                <li><button type="button" className="btn btn-link" onClick={ e => dispatchAction(e, STATUS_FILTER_CHANGED, "all")}>All</button></li>
                <li><button type="button" className="btn btn-link" onClick={ e => dispatchAction(e, STATUS_FILTER_CHANGED, "active")}>Active</button></li>
                <li><button type="button" className="btn btn-link" onClick={ e => dispatchAction(e, STATUS_FILTER_CHANGED, "completed")}>Completed</button></li>
            </ul>
        </div>
     );
}
 
export default Status;
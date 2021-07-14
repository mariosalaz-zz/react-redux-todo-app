import { COLOR_FILTER_CHANGED, COLOR_FILTER_SELECTED } from "../../redux/todo/todoTypes";
import "./Colors.css";

const Colors = ({dispatchAction}) => {
    const colors = ["green", "blue", "orange", "purple", "red"];
    const isFilterColorSelected = () => {
        const checkbox = document.querySelectorAll(".colors-list input[type='checkbox']")
        for (let index = 0; index < checkbox.length; index++) {
            if (checkbox[index].checked) {
                return dispatchAction(checkbox[index], COLOR_FILTER_SELECTED, true)
            }  
        }

        dispatchAction(null, COLOR_FILTER_SELECTED, false)
    }
    
    return ( 
        <div className="colors-menu">
            <h3>Filter by Color</h3>
            <ul className="colors-list">
                {colors.map(color => {
                    return (
                        <li key={color}>
                            <input 
                                type="checkbox" 
                                id={color} 
                                onClick={e => {
                                    isFilterColorSelected();
                                    dispatchAction(e, COLOR_FILTER_CHANGED, {color: color, changeType: e.target.checked});
                                }}/>
                            <div className={color}></div>
                            <label htmlFor={color}>{color}</label>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}
 
export default Colors;
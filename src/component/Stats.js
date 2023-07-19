import {appContext} from "../app/context";
import {useContext} from "react";

function Stats() {
    const [state, setState] = useContext(appContext);
    return (
        <button type="button" className="ms-2 btn btn-primary">
            Caddy
            <span className="badge text-bg-secondary"></span>
            {state.products.length}
        </button>
    )
}

export default Stats

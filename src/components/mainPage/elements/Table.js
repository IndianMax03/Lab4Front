import {useSelector} from "react-redux";

function Table(props) {

    let hits = useSelector(state => state.hit.data);

    return (
        <div className="table-container mx-5">
            {!hits ? null :
                <table className="table is-hoverable is-fullwidth">
                    <thead>
                    <tr>
                        <th className="has-text-centered">
                            <abbr title="x is the coordinate you have selected or marked on the graph">
                                X
                            </abbr>
                        </th>
                        <th className="has-text-centered">
                            <abbr title="y is the coordinate you have selected or marked on the graph">
                                Y
                            </abbr>
                        </th>
                        <th className="has-text-centered">
                            <abbr title="r is the coordinate you have selected">R</abbr>
                        </th>
                        <th className="has-text-centered">
                            <abbr title="hit shows success finding your point in the shaded area of the graph">
                                Hit
                            </abbr>
                        </th>
                        <th className="has-text-centered">
                            <abbr title="the time in ms it took the script for you to get the response">
                                Time used
                            </abbr>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="has-text-centered">
                    {
                        hits.map((element, index) =>
                            <tr key={index}>
                                <td>{element.x}</td>
                                <td>{element.y}</td>
                                <td>{element.r}</td>
                                <td>{element.success ? "success" : "miss"}</td>
                                <td>{element.executionTime}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            }
        </div>
    );
}

export default Table;

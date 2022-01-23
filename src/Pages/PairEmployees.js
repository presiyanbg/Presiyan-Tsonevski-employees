import { useEffect, useState } from "react";
import PairEmployeesLogic from "./PairEmployeesLogic";

const PairEmployees = () => {
    const [ csvFile, setCsvFile ] = useState({});

    const { bestPair, findBestPairOfEmployees } = PairEmployeesLogic();

    /**
     * Handle button click.
     *
     * @param {string} btn
     */
    const handleClick = (btn) => {
        switch (btn) {
            case 'csvSubmit' :
                findBestPairOfEmployees(csvFile);

                break;
            default:
                console.log("Button click not defined");
                break;
        }
    }

    return (
        <div className="page">
            <header className="page-header">
                <div className="page-title">
                    <h1>Pair of employees who have worked together</h1>
                </div>

                <div className="page-subtitle">
                    <h3>Identify the pair of employees who have worked together on common projects for the longest period of time.</h3>
                </div>
            </header>

            <div className="page-body">
                <div className="card card-m mx-auto">
                    <header className="card-header">
                        <div className="row p-1">
                            <div className="col-9">
                                <input type="file" accept=".csv"
                                className="form-control" id="csvFileInput"
                                onChange={(e) => {
                                    setCsvFile(e.target.files[0])
                                }}/>
                            </div>

                            <div className="col-3">
                                <div onClick={() => handleClick("csvSubmit")} className="btn btn-primary w-100">Submit file</div>
                            </div>
                        </div>
                    </header>

                    <div className="card-body">
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th>Employee ID #1</th>
                                    <th>Employee ID #2</th>
                                    <th>Project ID</th>
                                    <th>Days worked</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td> { bestPair.firstEmployeeId } </td>
                                    <td> { bestPair.secondEmployeeId } </td>
                                    <td> { bestPair.projectId } </td>
                                    <td> { bestPair.timeWorkTogether } </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PairEmployees;

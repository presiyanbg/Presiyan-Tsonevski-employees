import { useState } from "react";
import Moment from 'react-moment';
import moment from 'moment';

const PairEmployeesLogic = () => {
    const empIdPosition = 0;
    const projectIdPosition = 1;
    const dateFromPosition = 2;
    const dateToPosition = 3;

    const [ bestPair, setBestPair ] = useState({
        firstEmployeeId: '-/-',
        secondEmployeeId: '-/-',
        projectId: '-/-',
        timeWorkTogether: 0
    });

    /**
     * Find pair of employees who have worked together for the longest time.
     *
     * @param {obj} fileObj Loaded csv file.
     */
    const findBestPairOfEmployees = (fileObj) => {
        loadDataFromCsv(fileObj);
    };

    /**
     * Load data from csv file to array.
     *
     * @param {obj} fileObj Loaded csv file.
     */
    const loadDataFromCsv = (fileObj) => {
        const reader = new FileReader();

        reader.onload = function(e) {
            processCsvRow(e.target.result);
        }

        reader.readAsText(fileObj);
    }

    /**
     * Process csv file rows into array.
     *
     * @param {string} str Text from csv file row.
     * @param {string} separator Symbol separating the text.
     */
    const processCsvRow = (str, separator =',') => {
        const rows = str.slice(0).split('\n');

        let employees = [];

        rows.forEach( row => {
            const values = row.split(separator);

            if (validateRowValues(values)) {
                employees.push({
                    'id' : values[empIdPosition],
                    'projectId' : values[projectIdPosition],
                    'dateFrom' : values[dateFromPosition],
                    'dateTo' : values[dateToPosition]
                });
            }
        });

        let pairs = [];

        employees.forEach( firstEmployee => {
            employees.forEach( secondEmployee => {
                if (firstEmployee.id != secondEmployee.id && firstEmployee.projectId === secondEmployee.projectId) {
                    const timeWorkTogether = calculateDays(firstEmployee.dateFrom, firstEmployee.dateTo, secondEmployee.dateFrom, secondEmployee.dateTo);

                    if (timeWorkTogether > 0 ) {
                        pairs.push({
                            'firstEmployeeId' : firstEmployee.id,
                            'secondEmployeeId' : secondEmployee.id,
                            'projectId' : firstEmployee.projectId,
                            'timeWorkTogether' : timeWorkTogether
                        });
                    }
                }
            })
        });

        pairs = pairs.sort( sortPairsByTimeWorkTogether );

        if (pairs[0].timeWorkTogether && pairs[0].timeWorkTogether > 0) {
            setBestPair(pairs[0]);
        }
    }

    /**
     * Calculate time between two dates.
     *
     * @param {string} firstDateStart
     * @param {string} firstDateEnd
     * @param {string} secondDateStart
     * @param {string} secondDateEnd
     * @returns integer
     */
    const calculateDays = (firstDateStart, firstDateEnd, secondDateStart, secondDateEnd) => {
        const firstStart = moment(firstDateStart, "YYYY-MM-DD");
        const firstEnd = moment(firstDateEnd, "YYYY-MM-DD");

        const secondStart = moment(secondDateStart, "YYYY-MM-DD");
        const secondEnd = moment(secondDateEnd, "YYYY-MM-DD");

        if (secondStart.isBetween(firstStart, firstEnd) || firstStart.isSame(secondStart)) {
            if (secondEnd.isBetween(firstStart, firstEnd) || firstEnd.isSame(secondEnd)) {
                return secondEnd.diff(secondStart, 'days');
            }

            return firstEnd.diff(secondStart, 'days');
        } else if (secondEnd.isBetween(firstStart, firstEnd) || firstEnd.isSame(secondEnd)) {
            if (secondStart.isBetween(firstStart, firstEnd) || firstStart.isSame(secondStart)) {
                return secondEnd.diff(secondStart, 'days');
            }

            return secondEnd.diff(secondStart, 'days');
        }

        return -1;
    }

    /**
     * Sort pairs by time worked together.
     *
     * @param {object} a
     * @param {object} b
     * @returns integer
     */
    const sortPairsByTimeWorkTogether = (a, b) => {
        if ( a.timeWorkTogether < b.timeWorkTogether ){
            return 1;
        }
        if ( a.timeWorkTogether > b.timeWorkTogether ){
            return -1;
        }
        return 0;
    }

    /**
     * Validate row values.
     *
     * @param {array} values
     * @returns boolean
     */
    const validateRowValues = (values = []) => {
        return values.length === 4 && Number.isInteger(parseInt(values[empIdPosition])) && Number.isInteger(parseInt(values[projectIdPosition]));
    }

    return {
        bestPair : bestPair,
        findBestPairOfEmployees : findBestPairOfEmployees,
    };
}

export default PairEmployeesLogic;

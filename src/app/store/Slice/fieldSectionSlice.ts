import { createSlice } from "@reduxjs/toolkit";

const initState = {
    fields: [
        {
            "fieldname": "details_tab",
            "fieldtype": "Tab Break",
            "label": "Details"
        },
        {
            "fieldname": "naming_series",
            "fieldtype": "Select",
            "label": "Naming Series",
            "options": "HR-HIREQ-"
        },
        {
            "fieldname": "designation",
            "fieldtype": "Link",
            "in_list_view": 1,
            "label": "Designation",
            "options": "Designation",
            "reqd": 1
        },
        {
            "fieldname": "department",
            "fieldtype": "Link",
            "label": "Department",
            "options": "Department"
        },
        {
            "fieldname": "column_break_qkna",
            "fieldtype": "Column Break"
        },
        {
            "fieldname": "no_of_positions",
            "fieldtype": "Int",
            "in_list_view": 1,
            "label": "No of. Positions",
            "reqd": 1
        },
        {
            "fieldname": "expected_compensation",
            "fieldtype": "Currency",
            "in_list_view": 1,
            "label": "Expected Compensation",
            "options": "Company:company:default_currency",
            "reqd": 1
        },
        {
            "fieldname": "column_break_4",
            "fieldtype": "Column Break"
        },
        {
            "fieldname": "company",
            "fieldtype": "Link",
            "label": "Company",
            "options": "Company",
            "reqd": 1
        },
        {
            "fieldname": "status",
            "fieldtype": "Select",
            "in_list_view": 1,
            "label": "Status",
            "options": "Pending\nOpen & Approved\nRejected\nFilled\nOn Hold\nCancelled",
            "reqd": 1
        },
        {
            "fieldname": "section_break_7",
            "fieldtype": "Section Break",
            "label": "Requested By"
        },
        {
            "fieldname": "requested_by",
            "fieldtype": "Link",
            "in_standard_filter": 1,
            "label": "Requested By",
            "options": "Employee",
            "reqd": 1
        },
        {
            "fetch_from": "requested_by.employee_name",
            "fieldname": "requested_by_name",
            "fieldtype": "Data",
            "in_list_view": 1,
            "label": "Requested By (Name)",
            "read_only": 1
        },
        {
            "fieldname": "column_break_10",
            "fieldtype": "Column Break"
        },
        {
            "fetch_from": "requested_by.department",
            "fieldname": "requested_by_dept",
            "fieldtype": "Link",
            "label": "Department",
            "options": "Department",
            "read_only": 1
        },
        {
            "fetch_from": "requested_by.designation",
            "fieldname": "requested_by_designation",
            "fieldtype": "Link",
            "label": "Designation",
            "options": "Designation",
            "read_only": 1
        },
        {
            "fieldname": "timelines_tab",
            "fieldtype": "Section Break",
            "label": "Timelines"
        },
        {
            "default": "Today",
            "fieldname": "posting_date",
            "fieldtype": "Date",
            "label": "Posting Date",
            "reqd": 1
        },
        {
            "depends_on": "eval:doc.status==\"Filled\"",
            "fieldname": "completed_on",
            "fieldtype": "Date",
            "label": "Completed On",
            "mandatory_depends_on": "eval:doc.status==\"Filled\""
        },
        {
            "fieldname": "column_break_15",
            "fieldtype": "Column Break"
        },
        {
            "fieldname": "expected_by",
            "fieldtype": "Date",
            "in_list_view": 1,
            "label": "Expected By"
        },
        {
            "description": "Time taken to fill the open positions",
            "fieldname": "time_to_fill",
            "fieldtype": "Duration",
            "hide_seconds": 1,
            "label": "Time to Fill",
            "read_only": 1
        },
        {
            "fieldname": "job_description_tab",
            "fieldtype": "Tab Break",
            "label": "Job Description"
        },
        {
            "fetch_from": "designation.description",
            "fetch_if_empty": 1,
            "fieldname": "description",
            "fieldtype": "Text Editor",
            "label": "Job Description",
            "reqd": 1
        },
        {
            "fieldname": "reason_for_requesting",
            "fieldtype": "Text",
            "label": "Reason for Requesting"
        },
        {
            "fieldname": "section_break_6",
            "fieldtype": "Section Break",
            "label": ""
        },
        {
            "fieldname": "connections_tab",
            "fieldtype": "Tab Break",
            "label": "Connections",
            "show_dashboard": 1
        },
    ],
    listId: ''
}

const fieldSectionSlice = createSlice({
    name: 'fieldSection',
    initialState: initState,
    reducers: {
        increment: state => state,
        decrement: state => state,
        // moveItem: (state,fromListId, fromIndex, toListId, toIndex) => {

        // },
    }
})

export const { increment, decrement } = fieldSectionSlice.actions;
export default fieldSectionSlice.reducer;
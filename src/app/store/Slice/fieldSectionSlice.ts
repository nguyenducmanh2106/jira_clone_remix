import { FieldDto } from "@/src/api";
import { FIELD_TYPE } from "@/src/constants";
import { ItemTypes } from "@app/components/testm/ItemTypes";
import { nestElementType } from "@domain/types/nestElement";
import { createSlice } from "@reduxjs/toolkit";
import update from "immutability-helper";

export type fieldSectionType = {
    fields: FieldDto[],
    listId: string,
    nestElement: nestElementType
}

const initState: fieldSectionType = {
    fields: [
        {
            "fieldname": "custom_tab_break",
            "fieldtype": "Tab Break",
            "label": "Details"
        },
        {
            "fieldname": "custom_section_break",
            "fieldtype": "Section Break",
            "label": "detail"
        },
        {
            "fieldname": "custom_column_break",
            "fieldtype": "Column Break",
            "label": ""
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
            "fieldname": "column_break_12",
            "fieldtype": "Column Break"
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
            "fieldname": "column_break_1151",
            "fieldtype": "Column Break"
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
            "fieldname": "custom_section_break_onym",
            "fieldtype": "Section Break",
            "label": "Job Description section"
        },
        {
            "fieldname": "custom_column_break_onym",
            "fieldtype": "Column Break",
            "label": "Job Description column"
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
            "fieldname": "connections_tab",
            "fieldtype": "Tab Break",
            "label": "Connections",
            "show_dashboard": 1
        },
    ],
    listId: '',
    nestElement: {
        fieldtype: "root",
        components: []
    }
}
function isEmptyObject(obj: FieldDto) {
    return Object.keys(obj).length === 0;
}

function moveField(fromColumnName: string, fromColumnIndex: number, toColumnName: string, toColumnIndex: number, fromFieldIndex: number, toFieldIndex: number, fieldInColumns: nestElementType[]) {
    console.log("toList:")
    if (fromColumnName === toColumnName) {
        const newList: nestElementType[] = fieldInColumns[fromColumnIndex].components as nestElementType[];
        const item = newList[fromFieldIndex];
        newList.splice(fromFieldIndex, 1);
        newList.splice(toFieldIndex, 0, item);

        // if (fromListId === 'listA') {
        //     setListA(newList);
        // } else {
        //     setListB(newList);
        // }
    } else {
        const fromList: nestElementType[] = fieldInColumns[fromColumnIndex].components as nestElementType[];
        const item = fromList[fromFieldIndex];
        fromList.splice(fromFieldIndex, 1);
        // console.log("toList:",toColumnIndex)

        const toList: nestElementType[] = (fieldInColumns[toColumnIndex].components ?? []) as nestElementType[];
        toList.splice(toFieldIndex, 0, item);
        // fromListId === 'listA' ? setListA(fromList) : setListB(fromList)
        // toListId === 'listA' ? setListA(toList) : setListB(toList)
    }
}
const fieldSectionSlice = createSlice({
    name: 'fieldSection',
    initialState: initState,
    reducers: {
        nestComponent: (state) => {
            const fields = state.fields
            const cloneFields: FieldDto[] | nestElementType[] = [...fields]

            const tree: nestElementType = {
                fieldtype: "root",
                components: []
            }
            const componentResult: nestElementType[] = [];
            let tempTab: nestElementType = {}
            let tempSection: nestElementType = {}
            let tempColumn: nestElementType = {}
            cloneFields.forEach((field: FieldDto | nestElementType) => {
                switch (field.fieldtype) {
                    case FIELD_TYPE.TAB_BREAK:
                        if (isEmptyObject(tempTab)) {
                            tempTab = { ...field };
                            break;
                        }

                        //chuyển tab
                        if (tempTab.fieldname !== field.fieldname) {
                            if (!tempTab["components"]) {
                                tempTab["components"] = [];
                            }
                            tempTab.components.push(tempSection);
                            componentResult.push(tempTab);
                            tempTab = { ...field };
                            tempSection = {};
                        }
                        break;
                    case FIELD_TYPE.SECTION_BREAK:
                        if (isEmptyObject(tempSection)) {
                            tempSection = { ...field };
                            break;
                        }

                        //chuyển section
                        if (tempSection.fieldname !== field.fieldname) {

                            if (!tempSection["components"]) {
                                tempSection["components"] = []
                            }
                            tempSection.components.push(tempColumn);

                            if (!tempTab["components"]) {
                                tempTab["components"] = []
                            }
                            tempTab.components.push(tempSection);

                            tempSection = { ...field };
                            tempColumn = {};
                        }
                        break;
                    case FIELD_TYPE.COLUMN_BREAK:
                        if (isEmptyObject(tempColumn)) {
                            tempColumn = { ...field };
                            break;
                        }

                        //chuyển column
                        if (tempColumn.fieldname !== field.fieldname) {
                            if (!tempSection["components"]) {
                                tempSection["components"] = []
                            }
                            tempSection.components.push(tempColumn);
                            tempColumn = { ...field };
                        }
                        break;
                    default:
                        if (!tempColumn["components"]) {
                            tempColumn["components"] = []
                        }
                        tempColumn.components.push(field);
                        break;
                }
            })

            componentResult.push(tempTab);
            tree.components = componentResult;
            // console.log(JSON.parse(JSON.stringify(componentResult)));
            state.nestElement = tree
            return state;
        },
        moveItem: (state, action) => {
            const components = state.nestElement.components as nestElementType[]
            // console.log(JSON.parse(JSON.stringify(nestElement)));
            const {
                fromTab,
                fromIndexTab,
                toTab,
                toIndexTab,
                fromSection,
                fromIndexSection,
                toSection,
                toIndexSection,
                fromColumn,
                fromIndexColumn,
                toColumn,
                toIndexColumn,
                fromIndexField,
                toIndexField,
                fieldDnD
            } = action.payload
            // console.log(action.payload)

            // const item = fromListId === 'listA' ? listA[fromIndex] : listB[fromIndex];
            // if (fromListId === toListId) {
            //     const newList = fromListId === 'listA' ? [...listA] : [...listB];
            //     newList.splice(fromIndex, 1);
            //     newList.splice(toIndex, 0, item);
            //     if (fromListId === 'listA') {
            //         setListA(newList);
            //     } else {
            //         setListB(newList);
            //     }
            // } else {
            //     const fromList = fromListId === 'listA' ? [...listA] : [...listB];
            //     fromList.splice(fromIndex, 1);
            //     const toList = toListId === 'listA' ? [...listA] : [...listB];
            //     toList.splice(toIndex, 0, item);
            //     fromListId === 'listA' ? setListA(fromList) : setListB(fromList)
            //     toListId === 'listA' ? setListA(toList) : setListB(toList)
            // }

            switch (fieldDnD) {
                case ItemTypes.FIELD:
                    if (fromTab === toTab) {
                        const fieldInTab = components[fromIndexTab].components as nestElementType[]
                        if (fromSection === toSection) {
                            const fieldInSection = fieldInTab[fromIndexSection].components as nestElementType[]
                            moveField(fromColumn, fromIndexColumn, toColumn, toIndexColumn, fromIndexField, toIndexField, fieldInSection)
                        }
                    }
                    break;
                case ItemTypes.TAB:
                    break;
                case ItemTypes.SECTION:
                    break;
                case ItemTypes.COLUMN:
                    break;
                default:
                    break;
            }

            console.log(JSON.parse(JSON.stringify(components)));
            return state;
        }
    }
})

export const { nestComponent, moveItem } = fieldSectionSlice.actions;
export default fieldSectionSlice.reducer;
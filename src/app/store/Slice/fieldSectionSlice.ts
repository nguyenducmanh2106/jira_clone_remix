import { FieldDto } from "@/src/api";
import { FIELD_TYPE } from "@/src/constants";
import { ItemTypes } from "@app/components/testm/ItemTypes";
import { nestElementType } from "@domain/types/nestElement";
// import { createSlice } from "@reduxjs/toolkit";
import * as toolkitRaw from '@reduxjs/toolkit';

const { createSlice } = ((toolkitRaw as any).default ?? toolkitRaw) as typeof toolkitRaw;
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
            "fieldname": "column_break_11511",
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
            "fieldname": "column_break_1551",
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
            "fieldname": "custom_section_break_onym142",
            "fieldtype": "Section Break",
            "label": "Job Description section 1"
        },
        {
            "fieldname": "custom_column_break_onym1424",
            "fieldtype": "Column Break",
            "label": "Job Description column 1"
        },
        {
            "fetch_from": "designation.description",
            "fetch_if_empty": 1,
            "fieldname": "description1",
            "fieldtype": "Text Editor",
            "label": "Job Description 1",
            "reqd": 1
        },
        {
            "fieldname": "connections_tab",
            "fieldtype": "Tab Break",
            "label": "Connections",
            "show_dashboard": 1
        },
        {
            "fieldname": "custom_section_break_onym14452",
            "fieldtype": "Section Break",
            "label": "Job Description section 122"
        },
        {
            "fieldname": "custom_column_break_onym2424",
            "fieldtype": "Column Break",
            "label": "Job Description column 11212"
        },
        {
            "fieldname": "reason_for_requesting12",
            "fieldtype": "Text",
            "label": "Reason for Requesting 12"
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

function moveFieldInSection(fromColumnIndex: number, toColumnIndex: number, fromFieldIndex: number, toFieldIndex: number, fieldInColumns: nestElementType[]) {
    // console.log("from field index - to field index",fromFieldIndex,toFieldIndex)

    if (fromColumnIndex === toColumnIndex) {
        const newList: nestElementType[] = fieldInColumns[fromColumnIndex].components as nestElementType[];
        fromFieldIndex = newList.findIndex((item: nestElementType) => item.fieldname === fieldname);
        console.log("fromList:", fromFieldIndex)
        const item = newList[fromFieldIndex];
        newList.splice(fromFieldIndex, 1);
        newList.splice(toFieldIndex, 0, item);
    } else {
        const fromList: nestElementType[] = fieldInColumns[fromColumnIndex].components as nestElementType[];
        fromFieldIndex = fromList.findIndex((item: nestElementType) => item.fieldname === fieldname);
        const item = fromList[fromFieldIndex];
        fromList.splice(fromFieldIndex, 1);
        if (!fieldInColumns[toColumnIndex].components) {
            fieldInColumns[toColumnIndex].components = []
        }
        const toList: nestElementType[] = fieldInColumns[toColumnIndex].components as nestElementType[];
        toList.splice(toFieldIndex, 0, item);
    }
}
function moveFieldInTwoSection(fromColumnIndex: number, toColumnIndex: number, fromFieldIndex: number, toFieldIndex: number, fieldInColumnsOfSectionOne: nestElementType[], fieldInColumnsOfSectionTwo: nestElementType[]) {
    const fromList: nestElementType[] = fieldInColumnsOfSectionOne[fromColumnIndex].components as nestElementType[];
    const item = fromList[fromFieldIndex];
    fromList.splice(fromFieldIndex, 1);

    if (!fieldInColumnsOfSectionTwo[toColumnIndex].components) {
        fieldInColumnsOfSectionTwo[toColumnIndex].components = []
    }
    const toList: nestElementType[] = fieldInColumnsOfSectionTwo[toColumnIndex].components as nestElementType[];
    toList.splice(toFieldIndex, 0, item);
}

function moveColumnInSection(fromTab: number, toTab: number, fromSection: number, toSection: number, fromColumn: number, toColumn: number, components: nestElementType[]) {
    // console.log({ fromTab, toTab, fromSection, toSection, fromColumn, toColumn })

    if (fromTab === toTab) {
        const fieldInTab = components[fromTab].components as nestElementType[]
        if (fromSection == toSection) {
            const fieldInSection = fieldInTab[fromSection].components as nestElementType[]
            const item = fieldInSection[fromColumn];
            fieldInSection.splice(fromColumn, 1);
            fieldInSection.splice(toColumn, 0, item);
        }
        else {
            const fieldInSectionOne = fieldInTab[fromSection].components as nestElementType[]

            if (!fieldInTab[toSection].components) {
                fieldInTab[toSection].components = []
            }
            const fieldInSectionTwo = fieldInTab[toSection].components as nestElementType[]
            const item = fieldInSectionOne[fromColumn];
            fieldInSectionOne.splice(fromColumn, 1);
            fieldInSectionTwo.splice(toColumn, 0, item);
        }
    }
    // else {
    //     const fieldInTabOne = components[fromTab].components as nestElementType[]
    //     const fieldInTabTwo = components[fromTab].components as nestElementType[]
    // }
}
function moveSectionInTab(fromTab: number, toTab: number, fromSection: number, toSection: number, components: nestElementType[]) {
    console.log({ fromTab, toTab, fromSection, toSection })

    if (fromTab === toTab) {
        const fieldInTab = components[fromTab].components as nestElementType[]
        const item = fieldInTab[fromSection];
        fieldInTab.splice(fromSection, 1);
        fieldInTab.splice(toSection, 0, item);
    }
    // else {
    //     const fieldInTabOne = components[fromTab].components as nestElementType[]
    //     const fieldInTabTwo = components[fromTab].components as nestElementType[]
    // }
}

function makeid(length: number) {
    // let result = '';
    // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // const charactersLength = characters.length;
    // let counter = 0;
    // while (counter < length) {
    //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //     counter += 1;
    // }
    // return result;
    return (Math.random() + 1).toString(36).substring(length)
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

            let tabIndex = 0;
            let sectionIndex = 0;
            let columnIndex = 0;
            cloneFields.forEach((field: FieldDto | nestElementType, idx: number) => {
                switch (field.fieldtype) {
                    case FIELD_TYPE.TAB_BREAK:
                        if (isEmptyObject(tempTab)) {
                            tempTab = { ...field, tabIndex: tabIndex };
                            tabIndex++;
                            break;
                        }

                        //chuyển tab
                        if (tempTab.fieldname !== field.fieldname) {
                            sectionIndex = 0;
                            columnIndex = 0;

                            if (!tempSection["components"]) {
                                tempSection["components"] = []
                            }
                            tempSection.components.push({ ...tempColumn, tabIndex: tempSection.tabIndex })

                            if (!tempTab["components"]) {
                                tempTab["components"] = [];
                            }

                            tempTab.components.push({ ...tempSection, tabIndex: tempTab.tabIndex });
                            componentResult.push(tempTab);
                            tempTab = { ...field, tabIndex: tabIndex };
                            tempSection = {};
                            tempColumn = {};
                        }
                        tabIndex++;

                        break;
                    case FIELD_TYPE.SECTION_BREAK:
                        if (isEmptyObject(tempSection)) {
                            tempSection = { ...field, sectionIndex: sectionIndex, tabIndex: tabIndex - 1 };
                            sectionIndex++;
                            break;
                        }

                        //chuyển section
                        if (tempSection.fieldname !== field.fieldname) {
                            columnIndex = 0;
                            if (!tempSection["components"]) {
                                tempSection["components"] = []
                            }
                            tempSection.components.push({ ...tempColumn, tabIndex: tempSection.tabIndex, sectionIndex: tempSection.sectionIndex });

                            if (!tempTab["components"]) {
                                tempTab["components"] = []
                            }
                            tempTab.components.push({ ...tempSection, tabIndex: tempTab.tabIndex });

                            //gán lại section mới
                            tempSection = { ...field, sectionIndex: sectionIndex, tabIndex: tabIndex - 1 };
                            tempColumn = {};
                        }
                        sectionIndex++;
                        break;
                    case FIELD_TYPE.COLUMN_BREAK:
                        if (isEmptyObject(tempColumn)) {
                            tempColumn = { ...field, columnIndex: columnIndex };
                            columnIndex++;
                            break;
                        }

                        //chuyển column
                        if (tempColumn.fieldname !== field.fieldname) {
                            if (!tempSection["components"]) {
                                tempSection["components"] = []
                            }
                            tempSection.components.push({ ...tempColumn, tabIndex: tempSection.tabIndex, sectionIndex: tempSection.sectionIndex });

                            //gán lại column mới
                            tempColumn = { ...field, columnIndex: columnIndex };
                        }
                        columnIndex++;
                        break;
                    default:
                        if (!tempColumn["components"]) {
                            tempColumn["components"] = []
                        }
                        tempColumn.components.push(field);
                        break;
                }
            })

            if (!tempSection["components"]) {
                tempSection["components"] = []
            }
            tempSection.components.push({ ...tempColumn, tabIndex: tempSection.tabIndex, sectionIndex: tempSection.sectionIndex });
            if (!tempTab["components"]) {
                tempTab["components"] = []
            }
            tempTab.components.push({ ...tempSection, tabIndex: tempTab.tabIndex });
            componentResult.push(tempTab);
            tree.components = componentResult;
            // console.log(JSON.parse(JSON.stringify(componentResult)));
            state.nestElement = tree
            return state;
        },
        moveItem: (state, action) => {
            const components = state.nestElement.components as nestElementType[]
            const {
                fromIndexTab,
                toIndexTab,
                fromIndexSection,
                toIndexSection,
                fromIndexColumn,
                toIndexColumn,
                fromIndexField,
                toIndexField,
                fieldname,
                fieldDnD
            } = action.payload

            switch (fieldDnD) {
                case ItemTypes.FIELD:
                    if (fromIndexTab === toIndexTab) {
                        const fieldInTab = components[fromIndexTab].components as nestElementType[]
                        if (fromIndexSection === toIndexSection) {
                            const fieldInSection = fieldInTab[fromIndexSection].components as nestElementType[]
                            moveFieldInSection(fromIndexColumn, toIndexColumn, fromIndexField, toIndexField, fieldInSection)
                        }
                        else {
                            const fieldInSectionOne = fieldInTab[fromIndexSection].components as nestElementType[]
                            const fieldInSectionTwo = fieldInTab[toIndexSection].components as nestElementType[]
                            moveFieldInTwoSection(fromIndexColumn, toIndexColumn, fromIndexField, toIndexField, fieldInSectionOne, fieldInSectionTwo)
                        }
                    }
                    break;
                case ItemTypes.TAB:
                    break;
                case ItemTypes.SECTION:
                    moveSectionInTab(fromIndexTab, toIndexTab, fromIndexField, toIndexField, components)
                    break;
                case ItemTypes.COLUMN:
                    moveColumnInSection(fromIndexTab, toIndexTab, fromIndexSection, toIndexSection, fromIndexField, toIndexField, components);

                    break;
                default:
                    break;
            }

            // console.log(JSON.parse(JSON.stringify(components)));
            return state;
        },
        addSection: (state, action) => {
            const components = state.nestElement.components as nestElementType[]
            const {
                currentTabIndex,
                aboveSectionIndex
            } = action.payload
            const fieldInTab = components[currentTabIndex].components as nestElementType[]
            const newSection = {
                "fieldname": `custom_section_break_${makeid(2)}`,
                "fieldtype": "Section Break",
                "label": "No label"
            }

            fieldInTab.splice(aboveSectionIndex, 0, newSection)
            if (!fieldInTab[aboveSectionIndex].components) {
                fieldInTab[aboveSectionIndex].components = []
            }
            const fieldInSection = fieldInTab[aboveSectionIndex].components as nestElementType[]
            const newColumn1 = {
                "fieldname": `custom_column_break__${makeid(2)}`,
                "fieldtype": "Column Break",
                "label": "No label"
            }
            const newColumn2 = {
                "fieldname": `custom_column_break__${makeid(2)}`,
                "fieldtype": "Column Break",
                "label": "No label"
            }

            fieldInSection.splice(0, 0, newColumn1, newColumn2)
            return state
        },
        removeSection: (state, action) => {
            const components = state.nestElement.components as nestElementType[]
            const {
                currentTabIndex,
                aboveSectionIndex
            } = action.payload
            const fieldInTab = components[currentTabIndex].components as nestElementType[]

            fieldInTab.splice(aboveSectionIndex, 1)
            return state
        },
        addColumn: (state, action) => {
            const components = state.nestElement.components as nestElementType[]
            const {
                currentTabIndex,
                currentSectionIndex,
                columnIndex
            } = action.payload
            const fieldInTab = components[currentTabIndex].components as nestElementType[]
            const fieldInSection = fieldInTab[currentSectionIndex].components as nestElementType[]
            const newColumn = {
                "fieldname": `custom_column_break__${makeid(2)}`,
                "fieldtype": "Column Break",
                "label": "No label"
            }

            fieldInSection.splice(columnIndex, 0, newColumn)
            return state
        },
        removeColumn: (state, action) => {
            const components = state.nestElement.components as nestElementType[]
            const {
                currentTabIndex,
                currentSectionIndex,
                columnIndex
            } = action.payload
            const fieldInTab = components[currentTabIndex].components as nestElementType[]
            const fieldInSection = fieldInTab[currentSectionIndex].components as nestElementType[]


            fieldInSection.splice(columnIndex, 1)
            return state
        },
        addField: (state, action) => {
            const components = state.nestElement.components as nestElementType[]
            const {
                currentTabIndex,
                currentSectionIndex,
                currentColumnIndex,
                fieldIndex,
                fieldType
            } = action.payload
            const fieldInTab = components[currentTabIndex].components as nestElementType[]
            const fieldInSection = fieldInTab[currentSectionIndex].components as nestElementType[]
            const fieldInColumn = fieldInSection[currentColumnIndex].components as nestElementType[]
            const newField = {
                "fieldname": `field_custom_${makeid(2)}${makeid(4)}`,
                "fieldtype": fieldType,
                "label": "No label"
            }

            fieldInColumn.splice(fieldIndex, 0, newField)
            return state
        },
        removeField: (state, action) => {
            const components = state.nestElement.components as nestElementType[]
            const {
                currentTabIndex,
                currentSectionIndex,
                currentColumnIndex,
                fieldIndex,
            } = action.payload
            const fieldInTab = components[currentTabIndex].components as nestElementType[]
            const fieldInSection = fieldInTab[currentSectionIndex].components as nestElementType[]
            const fieldInColumn = fieldInSection[currentColumnIndex].components as nestElementType[]

            fieldInColumn.splice(fieldIndex, 1)
            return state
        },
    }
})

export const { nestComponent, moveItem, addSection, removeSection, addColumn, removeColumn, addField, removeField } = fieldSectionSlice.actions;
export default fieldSectionSlice.reducer;
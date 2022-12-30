import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
} from '@mui/x-data-grid';
import { HttpError } from '../../common/http-error';
import { Alert } from '@mui/material';
import NoRows from '../NoRows';

function EditToolbar(props) {
    const { rows, setRows, setRowModesModel } = props;

    const handleClick = async () => {
        const maximumId = rows.length > 0 ? Math.max(...rows.map(r => r.id)) : 0;
        const id =  maximumId + 1;
        const data = await props.rowPreProcessFunction();
        setRows([...rows, {
            id: id,
            ...data,
            isNew: true
        }]);
        setRowModesModel((oldModel) => {
            return ({
                ...oldModel,
                [id]: { mode: GridRowModes.Edit, fieldToFocus: Object.keys(data)[0] }
            })
        });
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                {props.addButtonText}
            </Button>
        </GridToolbarContainer>
    );
}

EditToolbar.propTypes = {
    setRowModesModel: PropTypes.func.isRequired,
    setRows: PropTypes.func.isRequired,
};

export default function CrudTable(props) {
    const [rows, setRows] = React.useState(props.rows);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [error, setError] = React.useState({});

    async function fetchData() {
        try {
            const data = await props.readFunction();
            setRows(data);
            setError({});
        } catch (e) {
            if (e instanceof HttpError) {
                setError(await e.response.json());
            } else {
                throw e;
            }
        }
    };

    React.useEffect(() => { fetchData(); }, [ ]);

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => async () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => async () => {
        try {
            await props.deleteFunction(id);
            await fetchData(); 
            setError({});
        } catch (e) {
            if (e instanceof HttpError) {
                setError(await e.response.json());
            } else {
                throw e;
            }
        }
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = React.useCallback(async (rowUpdated, rowOriginal) => {
        try {
            props.rowPostProcessFunction(rowUpdated, rowUpdated.isNew);
            if (rowUpdated.isNew === true) {
                await props.createFunction(rowUpdated);
            } else {
                await props.updateFunction(rowUpdated);
            }
            setError({});
        } catch (e) {
            if (e instanceof HttpError) {
                setError(await e.response.json());
            } else {
                throw e;
            }
        }
        await fetchData();
        return rowUpdated;
    });

    const actionsColumn = {
        field: 'actions',
        type: 'actions',
        headerName: 'Akcje',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

            if (isInEditMode) {
                return [
                    <GridActionsCellItem
                        icon={<SaveIcon />}
                        label="Save"
                        onClick={handleSaveClick(id)}
                    />,
                    <GridActionsCellItem
                        icon={<CancelIcon />}
                        label="Cancel"
                        className="textPrimary"
                        onClick={handleCancelClick(id)}
                        color="inherit"
                    />,
                ];
            }

            return [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    className="textPrimary"
                    onClick={handleEditClick(id)}
                    color="inherit"
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={handleDeleteClick(id)}
                    color="inherit"
                />,
            ];
        },
    };

    const columns = [
        {
            field: "id",
            headerName: "ID"
        },
        ...props.columns
    ];

    if (props.addButtonText) {
        columns.push(actionsColumn);
    }

    const toolbar = props.addButtonText ? EditToolbar : null;
    return (
        <Box
            sx={{
                height: 500,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            {error.message && <Alert sx={{ maxWidth: 500 }} severity="error">Wystąpił błąd sieciowy: {error.message}</Alert>}
            <DataGrid
                checkboxSelection={props.checkboxSelection}
                rows={rows ?? props.rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onSelectionModelChange={props.onSelectionModelChange}
                onRowEditStart={handleRowEditStart}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={(e) => setError(e)}
                components={{
                    Toolbar: toolbar,
                    NoRowsOverlay: NoRows
                }}
                componentsProps={{
                    toolbar: {
                        rows: rows ?? props.rows,
                        setRows,
                        setRowModesModel,
                        addButtonText: props.addButtonText,
                        rowPreProcessFunction: props.rowPreProcessFunction
                    },
                }}
                experimentalFeatures={{ newEditingApi: true }}
            />
        </Box>
    );
}

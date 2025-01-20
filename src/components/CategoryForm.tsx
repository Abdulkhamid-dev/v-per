import React, { FC, useEffect, useId, useState } from "react";
import {
    Box,
    Button,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { EActionType, ICategory } from "../type";
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addCategory, udpateCategory } from "../store/reducers/categories";

const CategoryForm: FC<TProps> = ({
    actionType,
    onToggle,
    visible,
}) => {
    const dispatch = useAppDispatch()
    const selectedCategory = useAppSelector((state) => state.categories?.selectedCategory)
    const { handleSubmit, control, reset, setValue } = useForm<Omit<ICategory, "id">>({
        defaultValues: { name: "" },
    });


    const handleClose = () => {
        onToggle();
        reset();
    };

    const onSubmit: SubmitHandler<any> = (data) => {
        if (actionType === EActionType.Add) {
            dispatch(addCategory({ name: data.name, id: uuidv4() }))
        } else {
            dispatch(udpateCategory({ name: data.name, id: selectedCategory?.id! }))
        }
        handleClose();
    };


    useEffect(() => {
        if (selectedCategory?.name && actionType === EActionType.Edit) {
            setValue("name", selectedCategory?.name);
        }
    }, [selectedCategory, actionType]);
    return (
        <Modal
            open={visible}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
                    {actionType === EActionType.Add ? "Add" : "Edit"} Category
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue={selectedCategory?.name}
                        rules={{ required: "Name is required" }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Category Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 2,
                            mt: 2,
                        }}
                    >
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained">
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default CategoryForm;

type TProps = {
    actionType: EActionType;
    onToggle: () => void;
    visible: boolean;
};
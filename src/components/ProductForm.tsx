import { FC, useEffect } from "react";
import {
    Box,
    Button,
    Modal,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { EActionType } from "../type";
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addProduct, udpateProduct } from "../store/reducers/products";

interface FormValues {
    title: string;
    price: number;
    category: string;
    description: string;
}


const ProductForm: FC<TProps> = ({ actionType, onToggle, visible }) => {
    const { handleSubmit, control, reset, setValue } = useForm<FormValues>();
    const dispatch = useAppDispatch()
    const { selectedProduct } = useAppSelector((state) => state.products)
    const { categories } = useAppSelector((state) => state.categories)
    
    const handleClose = () => {
        onToggle();
        reset();
    };

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const category = categories.find(c => c.id === data.category)
        if (actionType === EActionType.Add) {
            dispatch(addProduct({
                id: uuidv4(),
                title: data.title,
                price: data.price,
                description: data.description,
                category: category!
            }))
        } else {
            dispatch(udpateProduct({
                id: selectedProduct?.id!,
                title: data.title,
                price: data.price,
                description: data.description,
                category: category!
            }))
        }
        handleClose();
    };

    useEffect(() => {
        if (selectedProduct && actionType === EActionType.Edit) {
            setValue("title", selectedProduct.title);
            setValue("price", selectedProduct.price);
            setValue("description", selectedProduct.description);
            setValue("category", selectedProduct.category.id);
        }
    }, [selectedProduct, actionType]);

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
                    {actionType === EActionType.Add ? "Add" : "Edit"} Product
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="title"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Title is required" }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Title"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />

                    <Controller
                        name="price"
                        control={control}
                        rules={{
                            required: "Price is required",
                            min: { value: 0, message: "Price must be positive" },
                        }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Price"
                                type="number"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />

                    <Controller
                        name="category"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Category is required" }}
                        render={({ field, fieldState }) => (
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Category</InputLabel>
                                <Select
                                    {...field}
                                    label="Category"
                                    error={!!fieldState.error}
                                >
                                    {categories?.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {fieldState.error && (
                                    <Typography color="error" variant="caption">
                                        {fieldState.error.message}
                                    </Typography>
                                )}
                            </FormControl>
                        )}
                    />

                    <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Description is required" }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Description"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={4}
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

export default ProductForm;

type TProps = {
    actionType: EActionType
    onToggle: () => void
    visible: boolean
}
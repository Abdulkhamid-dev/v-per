import { Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react'
import { EActionType, ICategory } from '../../type';
import CategoryForm from '../../components/CategoryForm';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import CategoryCard from '../../components/CategoryCard';
import { selectCategory } from '../../store/reducers/categories';

const Categories = () => {
    const dispatch = useAppDispatch()
    const { categories } = useAppSelector((state) => state.categories)
    const [open, setOpen] = useState(false);
    const [actionType, setActionType] = useState<EActionType>(EActionType.Add)

    const handleModalVisibilty = () => {
        setOpen((open) => !open);
    }

    const onEdit = (category: ICategory) => {
        dispatch(selectCategory(category))
        setActionType(EActionType.Edit)
        handleModalVisibilty()
    }

    return (
        <div>
            <Stack
                direction={"row"}
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                <Typography variant='h4'>Categories</Typography>
                <Button variant='contained' onClick={() => { setActionType(EActionType.Add); handleModalVisibilty() }}><AddIcon /> Add</Button>
            </Stack>
            <Stack direction={"row"}
                sx={{
                    alignItems: "center",
                    gap: "12px",
                    mt: 4
                }}
            >
                {categories.length > 0 ? categories?.map((ctg, inx) => <CategoryCard category={ctg} onEdit={onEdit} key={inx} />) : <Typography variant='h6'>
                    No Categories
                </Typography>}
            </Stack>
            <CategoryForm visible={open} actionType={actionType} onToggle={() => {
                handleModalVisibilty();
                setActionType(EActionType.Add)
            }} />
        </div>
    )
}

export default Categories

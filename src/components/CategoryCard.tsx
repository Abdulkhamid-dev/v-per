import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { FC } from 'react'
import { ICategory } from '../type'
import { useAppDispatch } from '../store/hooks'
import { removeCategory } from '../store/reducers/categories'

const CategoryCard: FC<TProps> = ({ category, onEdit }) => {
    const dispatch = useAppDispatch()

    const onDelete = () => {
        dispatch(removeCategory(category.id))
    }

    return (
        <Card >
            <CardContent sx={{ height: '100%' }}>
                <Typography variant="h5" component="div">
                    {category.name}
                </Typography>
                <CardActions
                    sx={{
                        paddingBottom: "0px"
                    }}
                >
                    <Button size="small" onClick={() => onEdit(category)}>Edit</Button>
                    <Button size="small" onClick={onDelete}>Delete</Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default CategoryCard

type TProps = {
    category: ICategory
    onEdit: (data: ICategory) => void
}

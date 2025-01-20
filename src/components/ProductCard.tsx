import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React, { FC } from 'react'
import NotAvailabeImg from "../assets/image-not-available.png"
import { IProduct } from '../type'
import { useAppDispatch } from '../store/hooks'
import { removeProduct } from '../store/reducers/products'

const ProductCard: FC<TProps> = ({ item, onEdit }) => {
    const dispatch = useAppDispatch()


    const onDelete = () => {
        dispatch(removeProduct(item.id))
    }
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={NotAvailabeImg}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {item?.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item?.description}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Price: {item?.price ?? 0} $
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => onEdit(item)}>Edit</Button>
                <Button size="small" onClick={onDelete}>Delete</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard

type TProps = {
    item: IProduct
    onEdit: (data: IProduct) => void
}

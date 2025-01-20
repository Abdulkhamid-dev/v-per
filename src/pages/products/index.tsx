import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ProductCard from '../../components/ProductCard';
import { useState } from 'react';
import { EActionType, IProduct } from '../../type';
import ProductForm from '../../components/ProductForm';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectProduct } from '../../store/reducers/products';



const Products = () => {
  const dispatch = useAppDispatch()
  const {products} = useAppSelector((state) => state.products)
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState<EActionType>(EActionType.Add)

  const handleModalVisibilty = () => {
    setOpen((open) => !open);
  }

  const onEdit = (product: IProduct) => {
    dispatch(selectProduct(product))
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
        <Typography variant='h4'>Products</Typography>
        <Button variant='contained' onClick={handleModalVisibilty}><AddIcon /> Add</Button>
      </Stack>
      <Stack direction={"row"}
        sx={{
          alignItems: "center",
          gap: "12px",
          mt: 4
        }}
      >
        {products.length > 0 ? products?.map((pdt, inx) => <ProductCard key={inx} item={pdt} onEdit={onEdit} />) : <Typography variant='h6'>
          No Products
          </Typography>}
      </Stack>
      <ProductForm
        visible={open}
        onToggle={() => {
          handleModalVisibilty();
          setActionType(EActionType.Add)
        }}
        actionType={actionType}
      />
    </div>
  )
}

export default Products

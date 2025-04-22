
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { filterByCategory, removeProduct } from '@/redux/features/productsSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const ProductsComponent = () => {
  const dispatch = useAppDispatch();
  const { items, selectedCategory } = useAppSelector((state) => state.products);
  
  // Get unique categories
  const categories = Array.from(new Set(items.map(item => item.category)));
  
  // Filter products by category if selected
  const filteredProducts = selectedCategory 
    ? items.filter(item => item.category === selectedCategory) 
    : items;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>Data display with filtering</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-4">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => dispatch(filterByCategory(null))}
            >
              All
            </Button>
            
            {categories.map(category => (
              <Button 
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => dispatch(filterByCategory(category))}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map(product => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge>{product.category}</Badge>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => dispatch(removeProduct(product.id))}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProductsComponent;

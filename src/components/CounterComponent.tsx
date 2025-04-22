
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { increment, decrement, incrementByAmount, reset } from '@/redux/features/counterSlice';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const CounterComponent = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const handleIncrementByAmount = () => {
    dispatch(incrementByAmount(Number(incrementAmount) || 0));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Counter</CardTitle>
        <CardDescription>Basic Redux state management example</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <h2 className="text-4xl font-bold my-4">{count}</h2>
          <div className="flex gap-2 justify-center my-4">
            <Button onClick={() => dispatch(decrement())}>-</Button>
            <Button onClick={() => dispatch(increment())}>+</Button>
          </div>
          
          <div className="flex items-center gap-2 my-4">
            <Input
              type="number"
              value={incrementAmount}
              onChange={(e) => setIncrementAmount(e.target.value)}
              className="w-20"
            />
            <Button onClick={handleIncrementByAmount}>Add Amount</Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="outline" onClick={() => dispatch(reset())}>Reset</Button>
      </CardFooter>
    </Card>
  );
};

export default CounterComponent;

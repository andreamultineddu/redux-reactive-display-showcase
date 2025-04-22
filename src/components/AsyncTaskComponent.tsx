
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { performAsyncTask, resetTask } from '@/redux/features/asyncTaskSlice';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader, CircleCheck } from "lucide-react";

const AsyncTaskComponent = () => {
  const dispatch = useAppDispatch();
  const { isLoading, data, error, progress } = useAppSelector((state) => state.asyncTask);
  const [duration, setDuration] = useState(3); // Default 3 seconds

  const handleStartTask = () => {
    dispatch(performAsyncTask(duration));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Async Task</CardTitle>
        <CardDescription>Simulate a long-running async operation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span>Task Duration:</span>
            <select 
              value={duration} 
              onChange={(e) => setDuration(Number(e.target.value))}
              className="border rounded px-2 py-1"
              disabled={isLoading}
            >
              <option value={1}>1 second</option>
              <option value={2}>2 seconds</option>
              <option value={3}>3 seconds</option>
              <option value={5}>5 seconds</option>
            </select>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleStartTask} 
              disabled={isLoading}
              className="w-32"
            >
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Running...
                </>
              ) : 'Start Task'}
            </Button>
            
            <Button 
              onClick={() => dispatch(resetTask())} 
              variant="outline"
              disabled={isLoading || (!data && !error)}
            >
              Reset
            </Button>
          </div>
          
          <div className="py-4">
            <Progress value={progress} className="h-2 w-full" />
            <p className="text-center mt-1">{progress}%</p>
          </div>
          
          {data && (
            <div className="flex items-center p-4 bg-green-50 text-green-700 rounded-md">
              <CircleCheck className="h-5 w-5 mr-2" />
              {data}
            </div>
          )}
          
          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-md">
              Error: {error}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AsyncTaskComponent;

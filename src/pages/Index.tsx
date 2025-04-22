
import { useAppSelector } from '@/redux/hooks';
import CounterComponent from '@/components/CounterComponent';
import ProductsComponent from '@/components/ProductsComponent';
import AsyncTaskComponent from '@/components/AsyncTaskComponent';

const Index = () => {
  // Just to show that we can access Redux state from anywhere
  const count = useAppSelector((state) => state.counter.value);
  
  return (
    <div className="container py-8 mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Redux Framework Showcase</h1>
        <p className="text-gray-600 mt-2">
          Demonstrating Redux patterns for state management
        </p>
        {count > 0 && (
          <p className="text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-full inline-block mt-4">
            Current count across components: {count}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <CounterComponent />
        <AsyncTaskComponent />
      </div>
      
      <div className="mt-8">
        <ProductsComponent />
      </div>
    </div>
  );
};

export default Index;

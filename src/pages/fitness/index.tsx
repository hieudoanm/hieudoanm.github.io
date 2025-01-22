import { NextPage } from 'next';

const FitnessPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <div className="shadow-3xl relative aspect-square w-72 overflow-hidden rounded-3xl bg-black text-white">
          <div className="h-full w-full p-8">
            <div className="grid h-full grid-rows-5">
              <div className="row-span-1">
                <div className="flex h-full items-center">
                  <p className="text-2xl font-bold">Fitness</p>
                </div>
              </div>
              <div className="row-span-2">
                <div className="flex h-full items-center justify-between">
                  <p className="text-6xl font-black text-red-500">10,000</p>
                  <div className="flex h-full items-end">
                    <p className="text-sm">steps</p>
                  </div>
                </div>
              </div>
              <div className="row-span-2">
                <div className="flex h-full items-center justify-between">
                  <p className="text-6xl font-black text-red-500">2,500</p>
                  <div className="flex h-full items-end">
                    <p className="text-sm">calories</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessPage;

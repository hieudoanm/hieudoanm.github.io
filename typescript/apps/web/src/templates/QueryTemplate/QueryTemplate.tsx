import { TRPCClientErrorLike } from '@trpc/client';
import { Layout } from '@web/layout';
import { FC, ReactNode } from 'react';

export type QueryTemplateProps = {
  children?: ReactNode;
  isPending: boolean;
  noData: boolean;
  error: TRPCClientErrorLike<any> | null;
};

export const QueryTemplate: FC<QueryTemplateProps> = ({
  children = <></>,
  isPending = false,
  noData = false,
  error = null,
}) => {
  if (isPending) {
    return (
      <Layout full nav>
        <div className='container mx-auto h-full'>
          <div className='h-full p-4 md:p-8'>
            <div className='flex h-full items-center justify-center'>
              <span className='loading loading-infinity loading-lg'></span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout full nav>
        <div className='container mx-auto h-full'>
          <div className='h-full p-4 md:p-8'>
            <div className='flex h-full items-center justify-center'>
              <div className='text-center text-xl uppercase'>
                {error?.message ?? 'Error'}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (noData) {
    return (
      <Layout full nav>
        <div className='container mx-auto h-full'>
          <div className='h-full p-4 md:p-8'>
            <div className='flex h-full items-center justify-center'>
              <div className='text-center text-xl uppercase'>No Data</div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return <>{children}</>;
};

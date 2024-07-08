import notes from '@web/json/notes.json';
import { NextPage } from 'next';
import Link from 'next/link';

const NotesPage: NextPage = () => {
  return (
    <div className='min-h-screen'>
      <div className='container mx-auto'>
        <div className='p-4 md:p-8'>
          <div className='rounded-lg border border-base-content'>
            <div className='p-4'>
              <h1 className='text-xl'>Notes</h1>
            </div>
            {notes.map((note: string) => {
              return (
                <div key={note} className='border-t border-base-content p-4'>
                  <Link href={`/apps/notes/${note}`}>{note}</Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;

import notes from '@web/json/notes.json';
import { Layout } from '@web/layout';
import { NextPage } from 'next';
import Link from 'next/link';

const NotesPage: NextPage = () => {
  const firstLetters: string[] = [
    ...new Set(notes.map((note: string) => note.charAt(0))),
  ];
  const groups = firstLetters.map((letter: string) => {
    const notesByLetter: string[] = notes.filter((note: string) =>
      note.startsWith(letter)
    );
    return { letter, notes: notesByLetter };
  });

  return (
    <Layout nav>
      <div className='container mx-auto'>
        <div className='p-4 md:p-8'>
          <div className='flex flex-col gap-y-4 md:gap-y-8'>
            <h1 className='text-xl font-black'>Notes</h1>
            {groups.map(({ letter, notes }) => {
              return (
                <div key={letter} className='flex flex-col gap-y-4 md:gap-y-8'>
                  <h2 className='text-lg uppercase'>{letter}</h2>
                  <div className='rounded-lg border border-base-content'>
                    {notes.map((note: string, index: number) => {
                      const last: boolean = index === notes.length - 1;
                      const border: string = last
                        ? ''
                        : 'border-b border-base-content';
                      return (
                        <div key={note} className={`${border} p-4`}>
                          <Link href={`/apps/notes/${note}`}>{note}</Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotesPage;

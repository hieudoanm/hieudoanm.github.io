import { useSqlDatabaseIo } from '@/hooks/useSqlDatabaseIo';
import { useSqlDatabaseMutations } from '@/hooks/useSqlDatabaseMutations';
import { useSqlDatabaseQuery } from '@/hooks/useSqlDatabaseQuery';
import { useSqlDatabaseSchema } from '@/hooks/useSqlDatabaseSchema';
import { useSqlDatabaseState } from '@/hooks/useSqlDatabaseState';

export { IMPORT_BATCH_SIZE } from '@/hooks/useSqlDatabaseMutations';
export { WASM_PATH } from '@/hooks/useSqlDatabaseState';

export const useSqlDatabase = () => {
  const state = useSqlDatabaseState();
  const query = useSqlDatabaseQuery(state);
  const io = useSqlDatabaseIo(state);
  const mutations = useSqlDatabaseMutations(state);
  const schema = useSqlDatabaseSchema(state);

  return {
    dbInstance: state.dbInstance,
    dbFileName: state.dbFileName,
    tables: state.tables,
    activeTable: state.activeTable,
    queryResult: state.queryResult,
    error: state.error,
    lastElapsed: state.lastElapsed,
    loading: state.loading,
    loadingMsg: state.loadingMsg,
    status: state.status,
    opfsFiles: state.opfsFiles,
    setActiveTable: state.setActiveTable,
    setQueryResult: state.setQueryResult,
    setError: state.setError,
    ...query,
    ...io,
    ...mutations,
    ...schema,
  };
};

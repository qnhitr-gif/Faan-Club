import { useRef, useState } from 'react';
import { fetchCounts, checkLocked, recordSession } from '@/lib/drillSessions';

export function useDrillSession(storageKey: string, userId: string | null) {
  const [local, setLocal]   = useState(0);
  const [member, setMember] = useState(0);
  const recordedRef         = useRef(false);

  function reload() {
    return fetchCounts(storageKey, userId).then(({ local: l, member: m }) => {
      setLocal(l); setMember(m);
      return { local: l, member: m, isLocked: checkLocked(l, m, userId) };
    });
  }

  function record() {
    return recordSession(storageKey, userId).then(({ local: l, member: m }) => {
      setLocal(l); setMember(m);
      return { local: l, member: m, isLocked: checkLocked(l, m, userId) };
    });
  }

  function recordOnce() {
    if (recordedRef.current) return;
    recordedRef.current = true;
    record();
  }

  function resetRecorded() {
    recordedRef.current = false;
  }

  return {
    local,
    member,
    isLocked: checkLocked(local, member, userId),
    reload,
    record,
    recordOnce,
    resetRecorded,
  };
}

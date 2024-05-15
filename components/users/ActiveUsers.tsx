import { useOthers, useSelf } from "@/liveblocks.config";
import { Avatar } from "./Avatars";
import styles from "./index.module.css";
import { generateRandomName } from "@/lib/utils";
import { useMemo } from "react";

const ActiveUsers = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;

  const memoizedUsers = useMemo(() => {
    return (
      <main className="flex justify-center items-center gap-1 py-2">
        <div className="flex pl-3">
          {currentUser && (
            <Avatar
              name="You"
              otherStyles="border-[3px] bprder-primary-green"
            />
          )}
          {users.slice(0, 3).map(({ connectionId }) => {
            return (
              <Avatar
                key={connectionId}
                otherStyles="-ml-3"
                name={generateRandomName()}
              />
            );
          })}

          {hasMoreUsers && (
            <div className={styles.more}>+{users.length - 3}</div>
          )}
        </div>
      </main>
    );
  }, [users.length]);
  return memoizedUsers;
};

export default ActiveUsers;

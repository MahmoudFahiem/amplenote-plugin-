import fs from "fs";
import { App } from "./types/App";

const appOption = async (app: App) => {
  const noteUUID = "cc9acb28-b540-11ee-abc3-5e5205d63e2e";
  fs.writeFileSync();
  // const note = await app.findNote({ uuid: noteUUID });
  // app.alert();
};

export const plugin = {
  appOption,
};

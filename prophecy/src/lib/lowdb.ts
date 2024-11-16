import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const adapter = new JSONFile<{
  subscribers: Record<string, string>[]; // Address, Status
}>(".data/db.json");
export const db = new Low<{
  subscribers: Record<string, string>[]; // Address, Status
}>(adapter, {
  subscribers: [],
});

export async function updateRecordById(
  collection: keyof typeof db.data,
  id: string,
  updateData: Record<string, any>
) {
  await db.read();
  const record = await getRecordById(collection as keyof typeof db.data, id);
  if (record) {
    Object.assign(record, updateData);
  }
  await db.write();
  return true;
}
export async function getRecords(collection: keyof typeof db.data) {
  await db.read();
  return db?.data?.[collection];
}
export async function getRecordByField(
  collection: keyof typeof db.data, // This is the key change
  field: string,
  value: string
) {
  await db.read();
  const record = db?.data?.[collection]?.find(
    (record: Record<string, any>) => record[field] === value
  );
  return record;
}
export async function removeRecordById(
  collection: keyof typeof db.data,
  id: string
) {
  await db.read();
  db.data[collection] = db.data[collection].filter((r) => r.id !== id);
  await db.write();
}
export async function checkIfRecordExists(
  collection: keyof typeof db.data,
  id: string
) {
  await db.read();
  return (await getRecordByField(collection, "id", id)) ? true : false;
}
export async function getRecordById(
  collection: keyof typeof db.data,
  id: string
) {
  await db.read();
  return getRecordByField(collection, "id", id);
}
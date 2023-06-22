import { Event } from "nostr-tools";
import { pool } from "../main";

declare global {
  interface Window {
   nostr: Nostr;
 }
}

type EventTamplate = {
  tags: string[][] | [],
  content: string,
  created_at: number,
  kind: number
}

type Nostr = {
 getPublicKey() : Promise<string>;
 signEvent(event: EventTamplate) : Promise<Event>;
};

export async function publishJoinGroup(groupSlug: string, relay: string, pk: string) {
    const event = {
        kind: 9000,
        tags: [
            ["g", groupSlug],
            ["action", "add", pk, "user"],
        ],
        content: "Testing",
        created_at: Math.floor(Date.now() / 1000),
    };
    const signedEvent = await window.nostr.signEvent(event);
    console.log(signedEvent);
    return await new Promise((resolve, reject) => {
      const pub = pool.publish([relay], signedEvent);
      pub.on('ok', resolve);
      pub.on('failed', reject);
    })
}

export async function postEvent(content:string, relay: string, groupSlug: string) {
  const event = {
    kind: 9,
    content,
    tags: [['g', groupSlug]],
    created_at: Math.floor(Date.now() / 1000),
  }
  const signedEvent = await window.nostr.signEvent(event) 
  return new Promise<void>((resolve, reject) => {
    const pub = pool.publish([relay], signedEvent);
    pub.on('ok', () => {resolve()});
    pub.on('failed', (reason: string) => {reject(reason)});
  })
}

export async function getUserData(pk: string, relay: string) {
  return pool.get([relay], {kinds: [0], authors: [pk], limit: 1})
}

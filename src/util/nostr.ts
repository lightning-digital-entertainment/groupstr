import { getEventHash, getPublicKey, getSignature } from "nostr-tools";
import { pool } from "../main";

export async function publishJoinGroup(groupSlug: string, relay: string, sk: string) {
  const pk = getPublicKey(sk)
    const event = {
        kind: 9000,
        tags: [
            ["g", groupSlug],
            ["action", "add", pk, "user"],
        ],
        content: "Testing",
        created_at: Math.floor(Date.now() / 1000),
        pubkey: pk,
        sig: '',
        id: ''
    };

    event.id = getEventHash(event);
    event.sig = getSignature(event, sk);

    return await new Promise((resolve, reject) => {
      console.log(event)
      const pub = pool.publish([relay], event);
      pub.on('ok', resolve);
      pub.on('failed', reject);
    })
}

export async function postEvent(content:string, sk: string, relay: string, groupSlug: string) {
  const pk = getPublicKey(sk);
  const event = {
    kind: 9,
    content,
    tags: [['g', `/${groupSlug}`]],
    created_at: Math.floor(Date.now() / 1000),
    pubkey: pk,
    id: '',
    sig: ''
  }
  event.id = getEventHash(event);
  event.sig = getSignature(event, sk);  
  return new Promise((resolve, reject) => {
    const pub = pool.publish([relay], event);
    pub.on('ok', () => {resolve()});
    pub.on('failed', (reason: string) => {reject(reason)});
  })
}

import Dexie, { type Table } from 'dexie';
import { UserScrapbook } from '../types/models';

export class GlimpseDatabase extends Dexie {
  userScrapbook!: Table<UserScrapbook, number>;

  constructor() {
    super('glimpseDatabase');
    
    this.version(1).stores({
      userScrapbook: '++id, term, domainUrl, learnedAt'
    });

    this.version(2).stores({
      userScrapbook: '++id, term, domainUrl, learnedAt, archivedAt'
    });
  }
}

export const db = new GlimpseDatabase();

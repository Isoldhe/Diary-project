export class Post {
  id: number;
  title: string;
  smiley: string;
  date: string;
  entry: string;
  userId: number;


  constructor(id: number, title: string, smiley: string, date: string, entry: string, userId: number) {
    this.id = id;
    this.title = title;
    this.smiley = smiley;
    this.date = date;
    this.entry = entry;
    this.userId = userId;
  }
}
